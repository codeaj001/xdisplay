export interface PNode {
    id: string; // Pubkey
    ip: string;
    region?: string;
    storageCommitted: number; // in GB
    storageUsed: number; // in GB
    uptime: number; // Percentage 0-100
    credits: number;
    status: 'Healthy' | 'Degraded' | 'Offline';
    version: string;
    lastSeen: number; // Timestamp
    isPublic: boolean;
    lat?: number;
    lng?: number;
}

export interface NetworkStats {
    totalNodes: number;
    activeNodes: number;
    totalCapacity: number; // GB
    totalUsed: number; // GB
    medianUptime: number;
    totalCredits: number;
    networkStatus: 'Healthy' | 'Degraded' | 'Down';
    lastUpdated: number;
}
