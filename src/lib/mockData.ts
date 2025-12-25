import { PNode, NetworkStats } from './types';

// Simple seeded random for deterministic data
let seed = 123456789;
function random() {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

export const mockNodes: PNode[] = Array.from({ length: 50 }).map((_, i) => ({
    id: `8x${Math.floor(random() * 100000000).toString(16)}...`,
    ip: `192.168.1.${i}`,
    region: ['US-East', 'EU-West', 'Asia-East', 'US-West'][Math.floor(random() * 4)],
    storageCommitted: Math.floor(random() * 10000) + 1000,
    storageUsed: Math.floor(random() * 5000),
    uptime: 90 + random() * 10,
    credits: Math.floor(random() * 5000),
    status: random() > 0.9 ? 'Degraded' : 'Healthy',
    version: '1.2.0',
    lastSeen: 1700000000000 - Math.floor(random() * 60000),
    isPublic: random() > 0.2,
    lat: (random() * 160) - 80,
    lng: (random() * 360) - 180,
}));

export const mockNetworkStats: NetworkStats = {
    totalNodes: mockNodes.length,
    activeNodes: mockNodes.filter(n => n.status === 'Healthy').length,
    totalCapacity: 540000,
    totalUsed: 120000,
    medianUptime: 99.8,
    totalCredits: 1500000,
    networkStatus: 'Healthy',
    lastUpdated: 1700000000000,
};
