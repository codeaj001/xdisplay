import React from 'react';
import { PNode } from '@/lib/types';
import { Server, Activity, HardDrive, Clock } from 'lucide-react';

interface NodeTableProps {
    nodes: PNode[];
}

export default function NodeTable({ nodes }: NodeTableProps) {
    return (
        <div className="glass-panel" style={{ overflow: 'hidden' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid var(--card-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Active pNodes</h3>
                <div style={{ display: 'flex', gap: '12px' }}>
                    {/* Filters could go here */}
                </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.2)' }}>
                            <th style={{ padding: '16px 24px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 500 }}>ID / IP</th>
                            <th style={{ padding: '16px 24px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 500 }}>Region</th>
                            <th style={{ padding: '16px 24px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 500 }}>Storage</th>
                            <th style={{ padding: '16px 24px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 500 }}>Uptime</th>
                            <th style={{ padding: '16px 24px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 500 }}>Credits</th>
                            <th style={{ padding: '16px 24px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 500 }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nodes.map((node) => (
                            <tr key={node.id} style={{ borderBottom: '1px solid var(--card-border)', transition: 'background 0.2s' }} className="hover:bg-white/5">
                                <td style={{ padding: '16px 24px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span className="font-mono" style={{ color: 'var(--primary)' }}>{node.id.slice(0, 8)}...</span>
                                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{node.ip}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '16px 24px' }}>{node.region || 'Unknown'}</td>
                                <td style={{ padding: '16px 24px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        <span>{node.storageCommitted} GB</span>
                                        <div style={{ width: '100px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                                            <div style={{
                                                width: `${(node.storageUsed / node.storageCommitted) * 100}%`,
                                                height: '100%',
                                                background: 'var(--primary)'
                                            }} />
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '16px 24px' }}>
                                    <span style={{ color: node.uptime > 98 ? 'var(--success)' : 'var(--warning)' }}>
                                        {node.uptime.toFixed(2)}%
                                    </span>
                                </td>
                                <td style={{ padding: '16px 24px' }} className="font-mono">{node.credits.toLocaleString()}</td>
                                <td style={{ padding: '16px 24px' }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        background: node.status === 'Healthy' ? 'rgba(0, 255, 157, 0.1)' : 'rgba(255, 189, 0, 0.1)',
                                        color: node.status === 'Healthy' ? 'var(--success)' : 'var(--warning)',
                                        border: `1px solid ${node.status === 'Healthy' ? 'rgba(0, 255, 157, 0.2)' : 'rgba(255, 189, 0, 0.2)'}`
                                    }}>
                                        {node.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
