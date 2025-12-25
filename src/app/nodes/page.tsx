'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NodeTable from '@/components/NodeTable';
import { useNodes } from '@/lib/hooks';

export default function NodesPage() {
    const { nodes } = useNodes();

    return (
        <main style={{ minHeight: '100vh', paddingBottom: '40px' }}>
            <Navbar />

            <div className="container">
                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>pNodes Explorer</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Browse all active storage provider nodes on the network.</p>
                </div>

                <NodeTable nodes={nodes} />
            </div>

            <Footer />
        </main>
    );
}
