import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatsCardProps {
    label: string;
    value: string | number;
    subValue?: string;
    trend?: number; // percentage
    icon?: React.ReactNode;
}

export default function StatsCard({ label, value, subValue, trend, icon }: StatsCardProps) {
    return (
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: 500 }}>{label}</span>
                {icon && <div style={{ color: 'var(--primary)', opacity: 0.8 }}>{icon}</div>}
            </div>

            <div>
                <div style={{ fontSize: '28px', fontWeight: 600, fontFamily: 'var(--font-mono)', letterSpacing: '-0.5px' }}>
                    {value}
                </div>
                {subValue && <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>{subValue}</div>}
            </div>

            {trend !== undefined && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '13px',
                    color: trend >= 0 ? 'var(--success)' : 'var(--error)'
                }}>
                    {trend >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    <span>{Math.abs(trend)}% vs last week</span>
                </div>
            )}
        </div>
    );
}
