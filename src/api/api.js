import axios from 'axios';
const API_BASE_URL = 'https://testcase-manager-backend-production.up.railway.app/api/testcases';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Get all test cases
export const getAllTestCases = () => api.get('');

// Get test case by ID
export const getTestCaseById = (id) => api.get(`/${id}`);

// Create new test case
export const createTestCase = (testCase) => api.post('', testCase);

// Update test case
export const updateTestCase = (id, testCase) => api.put(`/${id}`, testCase);

// Delete test case
export const deleteTestCase = (id) => api.delete(`/${id}`);

// Search by title
export const searchTestCases = (title) => api.get(`/search?title=${title}`);

// Filter by status
export const filterByStatus = (status) => api.get(`/status/${status}`);

// Filter by priority
export const filterByPriority = (priority) => api.get(`/priority/${priority}`);