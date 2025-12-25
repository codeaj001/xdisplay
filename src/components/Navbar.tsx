'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Github, FileText } from 'lucide-react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

function NavbarContent() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('q')?.toString() || '');

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('q', term);
        } else {
            params.delete('q');
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <nav className="glass-panel" style={{
            position: 'sticky',
            top: 20,
            zIndex: 50,
            margin: '0 auto 32px',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '1400px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: 32,
                        height: 32,
                        background: 'var(--primary)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        color: '#000'
                    }}>X</div>
                    <span style={{ fontWeight: 600, fontSize: '18px' }}>xdisplay</span>
                </Link>

                <div style={{ display: 'flex', gap: '24px', fontSize: '14px', fontWeight: 500 }}>
                    <Link href="/" className="hover:text-primary">Dashboard</Link>
                    <Link href="/nodes" className="hover:text-primary">Explorer</Link>
                    <Link href="/leaderboard" className="hover:text-primary">Leaderboard</Link>
                    <Link href="/earnings" className="hover:text-primary">Earnings</Link>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '8px' }}>
                    <button style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        background: 'transparent',
                        color: 'var(--text-muted)',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px'
                    }}>Mainnet</button>
                    <button style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        background: 'var(--primary)',
                        color: '#000',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 500,
                        fontSize: '14px'
                    }}>Devnet</button>
                </div>

                <div style={{ position: 'relative' }}>
                    <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                    <input
                        type="text"
                        placeholder="Search pNode ID / IP..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{
                            background: 'rgba(0,0,0,0.2)',
                            border: '1px solid var(--card-border)',
                            borderRadius: '8px',
                            padding: '8px 12px 8px 36px',
                            color: 'var(--foreground)',
                            outline: 'none',
                            width: '240px',
                            fontFamily: 'var(--font-sans)'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '16px', color: 'rgba(255,255,255,0.6)' }}>
                    <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}><Github size={18} /></a>
                    <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}><FileText size={18} /></a>
                </div>
            </div>
        </nav>
    );
}

export default function Navbar() {
    return (
        <React.Suspense fallback={<div style={{ height: '80px' }} />}>
            <NavbarContent />
        </React.Suspense>
    );
}
