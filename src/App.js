import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import TestCaseList from './components/TestCaseList';
import TestCaseForm from './components/TestCaseForm';
import {
    getAllTestCases,
    createTestCase,
    updateTestCase,
    deleteTestCase,
    searchTestCases,
    filterByStatus,
    filterByPriority
} from './api/api';

const App = () => {

    // ─── State Variables ───────────────────────────────
    const [testCases, setTestCases]         = useState([]);
    const [showForm, setShowForm]           = useState(false);
    const [editData, setEditData]           = useState(null);
    const [searchTerm, setSearchTerm]       = useState('');
    const [statusFilter, setStatusFilter]   = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [loading, setLoading]             = useState(false);
    const [error, setError]                 = useState('');

    // ─── Load all test cases on page load ─────────────
    useEffect(() => {
        fetchAllTestCases();
    }, []);

  const fetchAllTestCases = async () => {
    try {
        setLoading(true);
        const response = await getAllTestCases();
        // Make sure we always set an array
        const data = Array.isArray(response.data) ? response.data : [];
        setTestCases(data);
        setError('');
    } catch (err) {
        setError('Failed to load test cases. Make sure your backend is running!');
        setTestCases([]);
    } finally {
        setLoading(false);
    }
};

    // ─── Search ────────────────────────────────────────
  const handleSearch = async () => {
    try {
        setLoading(true);
        if (searchTerm.trim()) {
            const response = await searchTestCases(searchTerm);
            setTestCases(Array.isArray(response.data) ? response.data : []);
        } else if (statusFilter) {
            const response = await filterByStatus(statusFilter);
            setTestCases(Array.isArray(response.data) ? response.data : []);
        } else if (priorityFilter) {
            const response = await filterByPriority(priorityFilter);
            setTestCases(Array.isArray(response.data) ? response.data : []);
        } else {
            fetchAllTestCases();
        }
    } catch (err) {
        setError('Search failed. Please try again.');
        setTestCases([]);
    } finally {
        setLoading(false);
    }
};

    // ─── Reset Search ──────────────────────────────────
    const handleReset = () => {
        setSearchTerm('');
        setStatusFilter('');
        setPriorityFilter('');
        fetchAllTestCases();
    };

    // ─── Add Test Case ─────────────────────────────────
    const handleAdd = () => {
        setEditData(null);
        setShowForm(true);
    };

    // ─── Edit Test Case ────────────────────────────────
    const handleEdit = (testCase) => {
        setEditData(testCase);
        setShowForm(true);
    };

    // ─── Delete Test Case ──────────────────────────────
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this test case?')) {
            try {
                await deleteTestCase(id);
                fetchAllTestCases();
            } catch (err) {
                setError('Failed to delete. Please try again.');
            }
        }
    };

    // ─── Submit Form (Add or Edit) ─────────────────────
    const handleSubmit = async (formData) => {
        try {
            if (editData) {
                await updateTestCase(editData.id, formData);
            } else {
                await createTestCase(formData);
            }
            setShowForm(false);
            setEditData(null);
            fetchAllTestCases();
        } catch (err) {
            setError('Failed to save test case. Please try again.');
        }
    };

    // ─── Cancel Form ───────────────────────────────────
    const handleCancel = () => {
        setShowForm(false);
        setEditData(null);
    };

    // ─── Render ────────────────────────────────────────
    return (
        <div style={styles.app}>

            {/* Navbar */}
            <Navbar />

            {/* Error Message */}
            {error && (
                <div style={styles.error}>
                    ⚠️ {error}
                    <button onClick={() => setError('')} style={styles.closeError}>✕</button>
                </div>
            )}

            {/* Search Bar */}
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                priorityFilter={priorityFilter}
                setPriorityFilter={setPriorityFilter}
                onSearch={handleSearch}
                onReset={handleReset}
            />

            {/* Loading */}
            {loading && (
                <div style={styles.loading}>
                    Loading...
                </div>
            )}

            {/* Test Case List */}
            {!loading && (
                <TestCaseList
                    testCases={testCases}
                    onAdd={handleAdd}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            {/* Form Modal */}
            {showForm && (
                <TestCaseForm
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    editData={editData}
                />
            )}

        </div>
    );
};

const styles = {
    app: {
        minHeight: '100vh',
        backgroundColor: '#f0f4f8',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    },
    error: {
        backgroundColor: '#fdecea',
        color: '#e74c3c',
        padding: '12px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '14px',
        borderBottom: '1px solid #f5c6cb',
    },
    closeError: {
        background: 'none',
        border: 'none',
        color: '#e74c3c',
        fontSize: '16px',
        cursor: 'pointer',
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        fontSize: '16px',
        color: '#1E5AA0',
    },
};

export default App;