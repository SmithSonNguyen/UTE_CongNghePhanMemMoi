// Test script để kiểm tra API lazy loading
const axios = require('axios');

const BASE_URL = 'http://localhost:8888/v1/api';

async function testLazyLoadingAPI() {
    console.log('🧪 Testing Lazy Loading API...\n');

    try {
        // Test 1: Lấy users với pagination
        console.log('1️⃣ Testing pagination API...');
        const response = await axios.get(`${BASE_URL}/user?page=1&limit=5`);

        if (response.data.EC === 0) {
            console.log('✅ API Response:', {
                users: response.data.DT.users.length,
                pagination: response.data.DT.pagination
            });
        } else {
            console.log('❌ API Error:', response.data);
        }

        // Test 2: Test với page khác
        console.log('\n2️⃣ Testing page 2...');
        const response2 = await axios.get(`${BASE_URL}/user?page=2&limit=3`);

        if (response2.data.EC === 0) {
            console.log('✅ Page 2 Response:', {
                users: response2.data.DT.users.length,
                currentPage: response2.data.DT.pagination.currentPage
            });
        }

        console.log('\n🎉 API Test completed successfully!');
        console.log('\n📝 Next steps:');
        console.log('1. Start backend: cd ExpressJS01 && npm run dev');
        console.log('2. Start frontend: cd ReactJS01 && npm run dev');
        console.log('3. Open http://localhost:5173/user to see lazy loading');

    } catch (error) {
        console.log('❌ Error testing API:', error.message);
        console.log('\n🔧 Make sure:');
        console.log('1. Backend is running on port 8888');
        console.log('2. MongoDB is running');
        console.log('3. Environment variables are set');
    }
}

// Run test
testLazyLoadingAPI();
