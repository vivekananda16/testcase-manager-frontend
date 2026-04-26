import React from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const TestCaseList = ({ testCases, onAdd, onEdit, onDelete }) => {

    // Color coding for status badges
    const getStatusStyle = (status) => {
        switch (status) {
            case 'PASS':    return { ...styles.badge, backgroundColor: '#27ae60' };
            case 'FAIL':    return { ...styles.badge, backgroundColor: '#e74c3c' };
            case 'PENDING': return { ...styles.badge, backgroundColor: '#f39c12' };
            default:        return { ...styles.badge, backgroundColor: '#95a5a6' };
        }
    };

    // Color coding for priority badges
    const getPriorityStyle = (priority) => {
        switch (priority) {
            case 'HIGH':   return { ...styles.badge, backgroundColor: '#e74c3c' };
            case 'MEDIUM': return { ...styles.badge, backgroundColor: '#f39c12' };
            case 'LOW':    return { ...styles.badge, backgroundColor: '#27ae60' };
            default:       return { ...styles.badge, backgroundColor: '#95a5a6' };
        }
    };

    // Format date nicely
    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit', month: 'short', year: 'numeric'
        });
    };

    return (
        <div style={styles.container}>

            {/* Header Row */}
            <div style={styles.headerRow}>
                <h2 style={styles.heading}>📋 Test Cases</h2>
                <button onClick={onAdd} style={styles.addBtn}>
                    <FaPlus style={{ marginRight: '6px' }} />
                    Add Test Case
                </button>
            </div>

            {/* Empty State */}
            {testCases.length === 0 ? (
                <div style={styles.emptyState}>
                    <p style={styles.emptyText}>No test cases found.</p>
                    <p style={styles.emptySubText}>Click "Add Test Case" to create your first one!</p>
                </div>
            ) : (
                /* Table */
                <div style={styles.tableWrapper}>
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.tableHeadRow}>
                                <th style={styles.th}>#</th>
                                <th style={styles.th}>Title</th>
                                <th style={styles.th}>Description</th>
                                <th style={styles.th}>Status</th>
                                <th style={styles.th}>Priority</th>
                                <th style={styles.th}>Created At</th>
                                <th style={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testCases.map((tc, index) => (
                                <tr key={tc.id} style={
                                    index % 2 === 0 ? styles.trEven : styles.trOdd
                                }>
                                    <td style={styles.td}>{index + 1}</td>
                                    <td style={{ ...styles.td, fontWeight: 'bold', color: '#1E5AA0' }}>
                                        {tc.title}
                                    </td>
                                    <td style={styles.td}>
                                        {tc.description
                                            ? tc.description.length > 50
                                                ? tc.description.substring(0, 50) + '...'
                                                : tc.description
                                            : '—'}
                                    </td>
                                    <td style={styles.td}>
                                        <span style={getStatusStyle(tc.status)}>
                                            {tc.status}
                                        </span>
                                    </td>
                                    <td style={styles.td}>
                                        <span style={getPriorityStyle(tc.priority)}>
                                            {tc.priority}
                                        </span>
                                    </td>
                                    <td style={styles.td}>
                                        {formatDate(tc.createdAt)}
                                    </td>
                                    <td style={styles.td}>
                                        <div style={styles.actionBtns}>
                                            <button
                                                onClick={() => onEdit(tc)}
                                                style={styles.editBtn}
                                                title="Edit"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => onDelete(tc.id)}
                                                style={styles.deleteBtn}
                                                title="Delete"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Total Count */}
            {testCases.length > 0 && (
                <div style={styles.footer}>
                    Total: <strong>{testCases.length}</strong> test case(s)
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px 30px',
    },
    headerRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    heading: {
        margin: 0,
        fontSize: '22px',
        color: '#1E5AA0',
    },
    addBtn: {
        padding: '10px 20px',
        backgroundColor: '#1E5AA0',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        cursor: 'pointer',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
    },
    tableWrapper: {
        overflowX: 'auto',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: 'white',
    },
    tableHeadRow: {
        backgroundColor: '#1E5AA0',
    },
    th: {
        padding: '12px 16px',
        textAlign: 'left',
        color: 'white',
        fontSize: '13px',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
    },
    trEven: {
        backgroundColor: '#ffffff',
    },
    trOdd: {
        backgroundColor: '#f4f8fd',
    },
    td: {
        padding: '12px 16px',
        fontSize: '13px',
        color: '#333',
        borderBottom: '1px solid #eee',
    },
    badge: {
        padding: '4px 10px',
        borderRadius: '12px',
        color: 'white',
        fontSize: '11px',
        fontWeight: 'bold',
        display: 'inline-block',
    },
    actionBtns: {
        display: 'flex',
        gap: '8px',
    },
    editBtn: {
        padding: '6px 10px',
        backgroundColor: '#f39c12',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '13px',
    },
    deleteBtn: {
        padding: '6px 10px',
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '13px',
    },
    emptyState: {
        textAlign: 'center',
        padding: '60px 20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    emptyText: {
        fontSize: '18px',
        color: '#666',
        margin: 0,
    },
    emptySubText: {
        fontSize: '14px',
        color: '#999',
        marginTop: '8px',
    },
    footer: {
        marginTop: '12px',
        fontSize: '13px',
        color: '#666',
        textAlign: 'right',
    },
};

export default TestCaseList;