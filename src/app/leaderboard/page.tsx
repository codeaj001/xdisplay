'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useNodes } from '@/lib/hooks';
import { Trophy, Medal, Award } from 'lucide-react';

export default function LeaderboardPage() {
    const { nodes } = useNodes();
    const sortedByCredits = [...nodes].sort((a, b) => b.credits - a.credits);
    const top3 = sortedByCredits.slice(0, 3);
    const rest = sortedByCredits.slice(3, 20);

    return (
        <main style={{ minHeight: '100vh', paddingBottom: '40px' }}>
            <Navbar />

            <div className="container">
                <div style={{ marginBottom: '32px', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>Leaderboard</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Top performing pNodes on the Xandeum network.</p>
                </div>

                {/* Top 3 Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                    {top3.map((node, index) => (
                        <div key={node.id} className="glass-panel" style={{
                            padding: '32px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            position: 'relative',
                            border: index === 0 ? '1px solid var(--primary)' : '1px solid var(--card-border)',
                            background: index === 0 ? 'rgba(0, 229, 255, 0.05)' : 'var(--card-bg)'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: -20,
                                background: 'var(--background)',
                                padding: '8px',
                                borderRadius: '50%',
                                border: '1px solid var(--card-border)'
                            }}>
                                {index === 0 && <Trophy size={32} color="var(--primary)" />}
                                {index === 1 && <Medal size={32} color="#C0C0C0" />}
                                {index === 2 && <Medal size={32} color="#CD7F32" />}
                            </div>

                            <div style={{ marginTop: '16px', fontSize: '20px', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                                {node.id.slice(0, 12)}...
                            </div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px' }}>{node.ip}</div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%' }}>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Credits</div>
                                    <div style={{ fontWeight: 700 }}>{node.credits.toLocaleString()}</div>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Uptime</div>
                                    <div style={{ fontWeight: 700, color: 'var(--success)' }}>{node.uptime.toFixed(2)}%</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* The Rest Table */}
                <div className="glass-panel">
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.2)' }}>
                                <th style={{ padding: '16px 24px', textAlign: 'left', width: '60px' }}>Rank</th>
                                <th style={{ padding: '16px 24px', textAlign: 'left' }}>Node ID</th>
                                <th style={{ padding: '16px 24px', textAlign: 'right' }}>Credits</th>
                                <th style={{ padding: '16px 24px', textAlign: 'right' }}>Storage</th>
                                <th style={{ padding: '16px 24px', textAlign: 'right' }}>Uptime</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rest.map((node, index) => (
                                <tr key={node.id} style={{ borderBottom: '1px solid var(--card-border)' }} className="hover:bg-white/5">
                                    <td style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>{index + 4}</td>
                                    <td style={{ padding: '16px 24px', fontFamily: 'var(--font-mono)' }}>{node.id}</td>
                                    <td style={{ padding: '16px 24px', textAlign: 'right', fontWeight: 600 }}>{node.credits.toLocaleString()}</td>
                                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>{node.storageCommitted} GB</td>
                                    <td style={{ padding: '16px 24px', textAlign: 'right', color: 'var(--success)' }}>{node.uptime.toFixed(2)}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Footer />
        </main>
    );
}
