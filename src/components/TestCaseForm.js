import React, { useState, useEffect } from 'react';
import { FaTimes, FaSave } from 'react-icons/fa';

const TestCaseForm = ({ onSubmit, onCancel, editData }) => {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'PENDING',
        priority: 'MEDIUM'
    });

    // If editing, fill form with existing data
    useEffect(() => {
        if (editData) {
            setFormData({
                title: editData.title,
                description: editData.description,
                status: editData.status,
                priority: editData.priority
            });
        }
    }, [editData]);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim()) {
            alert('Title is required!');
            return;
        }
        onSubmit(formData);
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>

                {/* Header */}
                <div style={styles.header}>
                    <h2 style={styles.heading}>
                        {editData ? '✏️ Edit Test Case' : '➕ Add New Test Case'}
                    </h2>
                    <button onClick={onCancel} style={styles.closeBtn}>
                        <FaTimes />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} style={styles.form}>

                    {/* Title */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter test case title"
                            style={styles.input}
                        />
                    </div>

                    {/* Description */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter description"
                            rows={4}
                            style={styles.textarea}
                        />
                    </div>

                    {/* Status & Priority in a row */}
                    <div style={styles.row}>

                        {/* Status */}
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                style={styles.select}
                            >
                                <option value="PENDING">Pending</option>
                                <option value="PASS">Pass</option>
                                <option value="FAIL">Fail</option>
                            </select>
                        </div>

                        {/* Priority */}
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Priority</label>
                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                style={styles.select}
                            >
                                <option value="HIGH">High</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="LOW">Low</option>
                            </select>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div style={styles.btnRow}>
                        <button type="submit" style={styles.saveBtn}>
                            <FaSave style={{ marginRight: '6px' }} />
                            {editData ? 'Update' : 'Save'}
                        </button>
                        <button type="button" onClick={onCancel} style={styles.cancelBtn}>
                            <FaTimes style={{ marginRight: '6px' }} />
                            Cancel
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '30px',
        width: '520px',
        maxWidth: '95%',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    heading: {
        margin: 0,
        fontSize: '20px',
        color: '#1E5AA0',
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        fontSize: '18px',
        cursor: 'pointer',
        color: '#666',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        flex: 1,
    },
    label: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        padding: '10px 12px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '14px',
        outline: 'none',
    },
    textarea: {
        padding: '10px 12px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '14px',
        outline: 'none',
        resize: 'vertical',
    },
    select: {
        padding: '10px 12px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '14px',
        backgroundColor: 'white',
    },
    row: {
        display: 'flex',
        gap: '16px',
    },
    btnRow: {
        display: 'flex',
        gap: '12px',
        marginTop: '8px',
    },
    saveBtn: {
        padding: '10px 24px',
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
    cancelBtn: {
        padding: '10px 24px',
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        cursor: 'pointer',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
    },
};

export default TestCaseForm;