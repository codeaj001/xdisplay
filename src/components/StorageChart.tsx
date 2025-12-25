import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Simple seeded random for deterministic data
let seed = 987654321;
function random() {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

const data = Array.from({ length: 30 }).map((_, i) => ({
    name: `Day ${i + 1}`,
    used: Math.floor(random() * 200000) + 100000 + (i * 5000),
    total: 540000 + (i * 1000),
}));

export default function StorageChart() {
    return (
        <div className="glass-panel" style={{ width: '100%', height: '400px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Storage Utilization</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Network capacity vs usage over the last 30 days</p>
            </div>

            <div style={{ flex: 1, width: '100%', minHeight: '250px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorUsed" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="rgba(255,255,255,0.3)"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            interval={6}
                        />
                        <YAxis
                            stroke="rgba(255,255,255,0.3)"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${(value / 1000).toFixed(0)}TB`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(15, 17, 21, 0.9)',
                                borderColor: 'rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                backdropFilter: 'blur(4px)'
                            }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="used"
                            stroke="var(--primary)"
                            fillOpacity={1}
                            fill="url(#colorUsed)"
                            strokeWidth={2}
                            name="Used Storage"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
