import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ searchTerm, setSearchTerm, statusFilter, 
                     setStatusFilter, priorityFilter, setPriorityFilter, 
                     onSearch, onReset }) => {
    return (
        <div style={styles.container}>

            {/* Search Input */}
            <div style={styles.searchBox}>
                <FaSearch style={styles.searchIcon} />
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.input}
                />
            </div>

            {/* Status Filter */}
            <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={styles.select}
            >
                <option value="">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="PASS">Pass</option>
                <option value="FAIL">Fail</option>
            </select>

            {/* Priority Filter */}
            <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                style={styles.select}
            >
                <option value="">All Priority</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
            </select>

            {/* Search Button */}
            <button onClick={onSearch} style={styles.searchBtn}>
                Search
            </button>

            {/* Reset Button */}
            <button onClick={onReset} style={styles.resetBtn}>
                Reset
            </button>

        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '20px 30px',
        backgroundColor: '#f0f4f8',
        flexWrap: 'wrap',
        borderBottom: '1px solid #dce3ed',
    },
    searchBox: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '6px',
        padding: '6px 12px',
        gap: '8px',
        flex: 1,
        minWidth: '200px',
    },
    searchIcon: {
        color: '#1E5AA0',
        fontSize: '14px',
    },
    input: {
        border: 'none',
        outline: 'none',
        fontSize: '14px',
        width: '100%',
        backgroundColor: 'transparent',
    },
    select: {
        padding: '8px 12px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '14px',
        backgroundColor: 'white',
        cursor: 'pointer',
        color: '#333',
    },
    searchBtn: {
        padding: '8px 20px',
        backgroundColor: '#1E5AA0',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    resetBtn: {
        padding: '8px 20px',
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
};

export default SearchBar;