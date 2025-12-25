'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calculator, Coins, AlertTriangle } from 'lucide-react';

export default function EarningsPage() {
    const [storage, setStorage] = useState(1000); // GB
    const [uptime, setUptime] = useState(99.9); // %
    const [networkSize, setNetworkSize] = useState(500000); // GB

    // Simple earnings formula (mock)
    // Credits = (Storage * UptimeFactor * NetworkShare)
    const calculateEarnings = () => {
        const uptimeFactor = uptime >= 99 ? 1 : uptime >= 95 ? 0.8 : 0.1;
        const share = storage / networkSize;
        const totalNetworkCredits = 10000000; // Mock pool
        const credits = totalNetworkCredits * share * uptimeFactor;
        const solPrice = 150; // Mock SOL price
        const creditsToSol = 0.0001; // Mock rate

        return {
            credits: Math.floor(credits),
            sol: (credits * creditsToSol).toFixed(2),
            usd: (credits * creditsToSol * solPrice).toFixed(2)
        };
    };

    const earnings = calculateEarnings();

    return (
        <main style={{ minHeight: '100vh', paddingBottom: '40px' }}>
            <Navbar />

            <div className="container">
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '32px', textAlign: 'center' }}>
                        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>Earnings Simulator</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Estimate your potential rewards for running a Xandeum pNode.</p>
                    </div>

                    <div className="glass-panel" style={{ padding: '32px' }}>
                        <div style={{ display: 'grid', gap: '32px' }}>

                            {/* Inputs */}
                            <div>
                                <label style={{ display: 'block', marginBottom: '12px', fontWeight: 500 }}>Storage Allocated (GB)</label>
                                <input
                                    type="range"
                                    min="100"
                                    max="10000"
                                    step="100"
                                    value={storage}
                                    onChange={(e) => setStorage(Number(e.target.value))}
                                    style={{ width: '100%', marginBottom: '8px', accentColor: 'var(--primary)' }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                                    <span>100 GB</span>
                                    <span style={{ fontSize: '18px', fontWeight: 600 }}>{storage} GB</span>
                                    <span>10 TB</span>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '12px', fontWeight: 500 }}>Expected Uptime (%)</label>
                                <input
                                    type="range"
                                    min="90"
                                    max="100"
                                    step="0.1"
                                    value={uptime}
                                    onChange={(e) => setUptime(Number(e.target.value))}
                                    style={{ width: '100%', marginBottom: '8px', accentColor: 'var(--success)' }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)', fontFamily: 'var(--font-mono)' }}>
                                    <span>90%</span>
                                    <span style={{ fontSize: '18px', fontWeight: 600 }}>{uptime}%</span>
                                    <span>100%</span>
                                </div>
                            </div>

                            <div style={{ padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', marginTop: '16px' }}>
                                <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Calculator size={20} />
                                    Estimated Monthly Rewards
                                </h3>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                    <div>
                                        <div style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '4px' }}>Credits</div>
                                        <div style={{ fontSize: '28px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{earnings.credits.toLocaleString()}</div>
                                    </div>
                                    <div>
                                        <div style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '4px' }}>SOL Value</div>
                                        <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>{earnings.sol} SOL</div>
                                        <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>≈ ${earnings.usd}</div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', padding: '16px', background: 'rgba(255, 189, 0, 0.1)', borderRadius: '8px', border: '1px solid rgba(255, 189, 0, 0.2)' }}>
                                <AlertTriangle size={20} color="var(--warning)" style={{ flexShrink: 0 }} />
                                <p style={{ fontSize: '13px', color: 'var(--warning)' }}>
                                    Estimates are based on current network parameters and devnet assumptions. Actual mainnet rewards may vary significantly based on global network participation and tokenomics adjustments.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
