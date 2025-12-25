import { useState, useEffect } from 'react';
import { PNode, NetworkStats } from './types';

const emptyStats: NetworkStats = {
    totalNodes: 0,
    activeNodes: 0,
    totalCapacity: 0,
    totalUsed: 0,
    medianUptime: 0,
    totalCredits: 0,
    networkStatus: 'Healthy',
    lastUpdated: 0
};

export function useNodes() {
    const [nodes, setNodes] = useState<PNode[]>([]);
    const [stats, setStats] = useState<NetworkStats>(emptyStats);
    const [loading, setLoading] = useState(true);
    const [source, setSource] = useState<'simulation' | 'live'>('live'); // Default to live, will update on fetch

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/api/nodes');
                const data = await res.json();
                setNodes(data.nodes);
                setStats(data.stats);
                setSource(data.source);
            } catch (error) {
                console.error('Failed to fetch nodes:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
        const interval = setInterval(fetchData, 30000); // Poll every 30s
        return () => clearInterval(interval);
    }, []);

    return { nodes, stats, loading, source };
}
