'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import StatsCard from '@/components/StatsCard';
import NodeTable from '@/components/NodeTable';
import dynamic from 'next/dynamic';

const NetworkMap = dynamic(() => import('@/components/NetworkMap'), { ssr: false });
const StorageChart = dynamic(() => import('@/components/StorageChart'), { ssr: false });
import Footer from '@/components/Footer';
import Skeleton from '@/components/Skeleton';
import { useSearchParams } from 'next/navigation';
import { useNodes } from '@/lib/hooks';
import { HardDrive, Server, Activity, Coins } from 'lucide-react';

function HomeContent() {
  const { nodes, stats, loading, source } = useNodes();
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  const filteredNodes = nodes.filter(node =>
    node.id.toLowerCase().includes(query) ||
    node.ip.toLowerCase().includes(query) ||
    (node.region && node.region.toLowerCase().includes(query)) ||
    node.status.toLowerCase().includes(query)
  );

  return (
    <main style={{ minHeight: '100vh', paddingBottom: '40px' }}>
      <Navbar />

      <div className="container">
        {/* Header Section */}
        <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>Network Overview</h1>
            <p style={{ color: 'var(--text-muted)' }}>Real-time performance metrics of the Xandeum decentralized storage network.</p>
          </div>

          {loading ? (
            <Skeleton width={150} height={32} borderRadius={20} />
          ) : (
            <div style={{
              padding: '6px 12px',
              borderRadius: '20px',
              background: source === 'live' ? 'rgba(0, 255, 157, 0.1)' : 'rgba(255, 189, 0, 0.1)',
              color: source === 'live' ? 'var(--success)' : 'var(--warning)',
              border: source === 'live' ? '1px solid rgba(0, 255, 157, 0.2)' : '1px solid rgba(255, 189, 0, 0.2)',
              fontSize: '12px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'currentColor' }} />
              {source === 'live' ? 'Live Network Data' : 'Simulation Mode'}
            </div>
          )}
        </div>

        {/* KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {loading ? (
            <>
              <Skeleton height={140} borderRadius={16} />
              <Skeleton height={140} borderRadius={16} />
              <Skeleton height={140} borderRadius={16} />
              <Skeleton height={140} borderRadius={16} />
            </>
          ) : (
            <>
              <StatsCard
                label="Active pNodes"
                value={`${stats.activeNodes} / ${stats.totalNodes}`}
                subValue="Healthy / Total"
                trend={12}
                icon={<Server size={20} />}
              />
              <StatsCard
                label="Total Capacity"
                value={`${(stats.totalCapacity / 1000).toFixed(1)} TB`}
                subValue={`${(stats.totalUsed / 1000).toFixed(1)} TB Used`}
                icon={<HardDrive size={20} />}
              />
              <StatsCard
                label="Network Uptime"
                value={`${stats.medianUptime.toFixed(1)}%`}
                trend={0.1}
                icon={<Activity size={20} />}
              />
              <StatsCard
                label="Monthly Credits"
                value={(stats.totalCredits / 1000000).toFixed(2) + 'M'}
                subValue="Est. Earnings: 450 SOL"
                icon={<Coins size={20} />}
              />
            </>
          )}
        </div>

        {/* Main Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
          {/* Charts Section */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
            {/* Storage Chart */}
            {loading ? <Skeleton height={400} borderRadius={16} /> : <StorageChart />}

            {/* Network Map */}
            {loading ? <Skeleton height={400} borderRadius={16} /> : <NetworkMap nodes={filteredNodes} />}
          </div>

          {/* Node Explorer */}
          {loading ? <Skeleton height={500} borderRadius={16} /> : <NodeTable nodes={filteredNodes} />}
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default function Home() {
  return (
    <React.Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <HomeContent />
    </React.Suspense>
  );
}
