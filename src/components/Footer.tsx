import React from 'react';

export default function Footer() {
    return (
        <footer style={{
            marginTop: '64px',
            padding: '32px 0',
            borderTop: '1px solid var(--card-border)',
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: '14px'
        }}>
            <div className="container">
                <p>© 2025 xdisplay. Built for the Community.</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '16px' }}>
                    <a href="#" className="hover:text-primary">Docs</a>
                    <a href="#" className="hover:text-primary">GitHub</a>
                    <a href="#" className="hover:text-primary">Discord</a>
                </div>
            </div>
        </footer>
    );
}
