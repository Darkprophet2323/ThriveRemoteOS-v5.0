import requests
import sys
import time
from datetime import datetime

class ThriveRemoteAPITester:
    def __init__(self, base_url="https://1766eea5-ea12-44e0-8d5c-4add4645e8ea.preview.emergentagent.com"):
        self.base_url = base_url
        self.session_token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.user_id = None
        self.username = None

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        
        if headers is None:
            headers = {'Content-Type': 'application/json'}
        
        if self.session_token and 'Authorization' not in headers:
            headers['Authorization'] = f'Bearer {self.session_token}'

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers)
            
            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    return success, response.json()
                except:
                    return success, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    print(f"Response: {response.text}")
                    return False, response.json()
                except:
                    return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root(self):
        """Test the root endpoint"""
        success, response = self.run_test(
            "Root Endpoint",
            "GET",
            "",
            200
        )
        if success:
            print(f"API Version: {response.get('version')}")
            print(f"Features: {', '.join(response.get('features', []))}")
        return success

    def test_register(self, username, password):
        """Test user registration"""
        test_user = f"{username}_{int(time.time())}"
        success, response = self.run_test(
            "User Registration",
            "POST",
            "api/auth/register",
            200,
            data={"username": test_user, "password": password, "email": f"{test_user}@test.com"}
        )
        if success:
            self.session_token = response.get('session_token')
            self.user_id = response.get('user_id')
            self.username = test_user
            print(f"Registered user: {test_user}")
        return success

    def test_login(self, username, password):
        """Test login"""
        success, response = self.run_test(
            "User Login",
            "POST",
            "api/auth/login",
            200,
            data={"username": username, "password": password}
        )
        if success:
            self.session_token = response.get('session_token')
            self.user_id = response.get('user_id')
            self.username = username
            print(f"Logged in as: {username}")
        return success

    def test_current_user(self):
        """Test getting current user info"""
        success, response = self.run_test(
            "Current User Info",
            "GET",
            "api/user/current",
            200
        )
        if success:
            print(f"User: {response.get('username')}")
            print(f"Streak: {response.get('daily_streak')} days")
            print(f"Productivity: {response.get('productivity_score')} points")
        return success

    def test_jobs_live(self):
        """Test getting live jobs"""
        success, response = self.run_test(
            "Live Jobs",
            "GET",
            "api/jobs/live",
            200
        )
        if success:
            jobs = response.get('jobs', [])
            print(f"Found {len(jobs)} jobs")
            if jobs:
                print(f"Sample job: {jobs[0].get('title')} at {jobs[0].get('company')}")
        return success

    def test_dashboard_stats(self):
        """Test getting dashboard stats"""
        success, response = self.run_test(
            "Dashboard Stats",
            "GET",
            "api/dashboard/stats",
            200
        )
        if success:
            print(f"Applications: {response.get('total_applications')}")
            print(f"Tasks: {response.get('total_tasks')}")
            print(f"Achievements: {response.get('achievements_unlocked')}")
        return success

    def test_network_scan(self):
        """Test network scan"""
        success, response = self.run_test(
            "Network Scan",
            "GET",
            "api/network/scan",
            200
        )
        if success:
            print(f"Arizona Networks: {response.get('arizona_networks', {}).get('active_connections')} connections")
            print(f"Peak District LAN: {response.get('peak_district_lan', {}).get('nodes_detected')} nodes")
        return success

    def test_terminal_command(self):
        """Test terminal command execution"""
        success, response = self.run_test(
            "Terminal Command",
            "POST",
            "api/terminal/command",
            200,
            data={"command": "help"}
        )
        if success:
            output = response.get('output', [])
            if output:
                print(f"Terminal response: {output[0]}")
        return success

    def test_tasks(self):
        """Test getting tasks"""
        success, response = self.run_test(
            "Tasks",
            "GET",
            "api/tasks",
            200
        )
        if success:
            tasks = response.get('tasks', [])
            print(f"Found {len(tasks)} tasks")
            if tasks:
                print(f"Sample task: {tasks[0].get('title')}")
        return success

    def test_create_task(self):
        """Test creating a task"""
        success, response = self.run_test(
            "Create Task",
            "POST",
            "api/tasks",
            200,
            data={
                "title": "Test Task",
                "description": "This is a test task",
                "priority": "high",
                "category": "testing"
            }
        )
        if success:
            print(f"Created task: {response.get('task', {}).get('title')}")
            return response.get('task', {}).get('id')
        return None

    def test_complete_task(self, task_id):
        """Test completing a task"""
        if not task_id:
            print("❌ No task ID provided for completion test")
            return False
            
        success, response = self.run_test(
            "Complete Task",
            "PUT",
            f"api/tasks/{task_id}/complete",
            200
        )
        if success:
            print(f"Points earned: {response.get('points_earned')}")
        return success

    def test_savings(self):
        """Test getting savings data"""
        success, response = self.run_test(
            "Savings Data",
            "GET",
            "api/savings",
            200
        )
        if success:
            print(f"Current savings: ${response.get('current_amount')}")
            print(f"Target: ${response.get('target_amount')}")
            print(f"Progress: {response.get('progress_percentage')}%")
        return success

    def test_update_savings(self):
        """Test updating savings amount"""
        success, response = self.run_test(
            "Update Savings",
            "POST",
            "api/savings/update",
            200,
            data={"amount": 1000}
        )
        if success:
            print(f"New amount: ${response.get('new_amount')}")
            print(f"Progress: {response.get('progress_percentage')}%")
        return success

    def test_achievements(self):
        """Test getting achievements"""
        success, response = self.run_test(
            "Achievements",
            "GET",
            "api/achievements",
            200
        )
        if success:
            achievements = response.get('achievements', [])
            print(f"Found {len(achievements)} achievements")
            unlocked = [a for a in achievements if a.get('unlocked')]
            print(f"Unlocked: {len(unlocked)} achievements")
        return success

    def test_relocate_data(self):
        """Test getting relocation data"""
        success, response = self.run_test(
            "Relocation Data",
            "GET",
            "api/relocate/data",
            200
        )
        if success:
            data = response.get('data', {})
            print(f"Properties: {len(data.get('properties', []))}")
            print(f"Moving tips: {len(data.get('moving_tips', []))}")
        return success

    def test_relocate_properties(self):
        """Test getting relocation properties"""
        success, response = self.run_test(
            "Relocation Properties",
            "GET",
            "api/relocate/properties",
            200
        )
        if success:
            properties = response.get('properties', [])
            print(f"Found {len(properties)} properties")
            if properties:
                print(f"Sample property: {properties[0].get('title')} - {properties[0].get('price')}")
        return success

    def test_notifications(self):
        """Test getting notifications"""
        success, response = self.run_test(
            "Notifications",
            "GET",
            "api/realtime/notifications",
            200
        )
        if success:
            notifications = response.get('notifications', [])
            print(f"Found {len(notifications)} notifications")
        return success

def main():
    # Setup
    tester = ThriveRemoteAPITester()
    test_password = "TestPass123!"
    
    print("🚀 Starting ThriveRemote API Tests")
    print(f"🌐 API URL: {tester.base_url}")
    print("=" * 50)

    # Test root endpoint
    tester.test_root()

    # Test registration and login
    if not tester.test_register("test_user", test_password):
        # Try login with demo user if registration fails
        tester.test_login("demo_user", "demo_password")

    # Test user info
    tester.test_current_user()

    # Test jobs
    tester.test_jobs_live()

    # Test dashboard stats
    tester.test_dashboard_stats()

    # Test network scan
    tester.test_network_scan()

    # Test terminal command
    tester.test_terminal_command()

    # Test tasks
    tester.test_tasks()
    task_id = tester.test_create_task()
    if task_id:
        tester.test_complete_task(task_id)

    # Test savings
    tester.test_savings()
    tester.test_update_savings()

    # Test achievements
    tester.test_achievements()

    # Test relocation data
    tester.test_relocate_data()
    tester.test_relocate_properties()

    # Test notifications
    tester.test_notifications()

    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Tests passed: {tester.tests_passed}/{tester.tests_run}")
    print(f"📈 Success rate: {(tester.tests_passed / tester.tests_run * 100) if tester.tests_run > 0 else 0:.1f}%")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())