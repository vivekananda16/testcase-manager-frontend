import React from 'react';
import { FaClipboardList } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav style={styles.nav}>
            <div style={styles.brand}>
                <FaClipboardList style={styles.icon} />
                <span style={styles.title}>Test Case Manager</span>
            </div>
            <div style={styles.subtitle}>
                Manage your test cases efficiently
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        backgroundColor: '#1E5AA0',
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
    },
    brand: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    icon: {
        color: 'white',
        fontSize: '24px',
    },
    title: {
        color: 'white',
        fontSize: '22px',
        fontWeight: 'bold',
        letterSpacing: '1px',
    },
    subtitle: {
        color: '#a8c8f0',
        fontSize: '13px',
    }
};

export default Navbar;