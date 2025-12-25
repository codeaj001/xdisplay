import React, { useMemo } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import { PNode } from '@/lib/types';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface NetworkMapProps {
    nodes: PNode[];
}

export default function NetworkMap({ nodes }: NetworkMapProps) {
    const [isMounted, setIsMounted] = React.useState(false);
    // Filter nodes that have coordinates
    const activeNodes = useMemo(() => nodes.filter(n => n.lat !== undefined && n.lng !== undefined), [nodes]);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    // Scale for marker size based on storage
    const sizeScale = scaleLinear()
        .domain([0, Math.max(...activeNodes.map(n => n.storageCommitted || 0), 1000)])
        .range([4, 12]);

    if (!isMounted) {
        return (
            <div className="glass-panel" style={{ width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'var(--text-muted)' }}>Loading Map...</span>
            </div>
        );
    }

    return (
        <div className="glass-panel" style={{ width: '100%', height: '400px', overflow: 'hidden', position: 'relative' }}>
            <div style={{
                position: 'absolute',
                top: 20,
                left: 20,
                zIndex: 10,
                pointerEvents: 'none'
            }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Global Distribution</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {activeNodes.length} Active Nodes with Geo-Location
                </p>
            </div>

            <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                    scale: 100,
                }}
                style={{ width: "100%", height: "100%" }}
            >
                <ZoomableGroup center={[0, 20]} zoom={1}>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill="rgba(255, 255, 255, 0.05)"
                                    stroke="rgba(255, 255, 255, 0.1)"
                                    strokeWidth={0.5}
                                    style={{
                                        default: { outline: "none" },
                                        hover: { fill: "rgba(255, 255, 255, 0.1)", outline: "none" },
                                        pressed: { outline: "none" },
                                    }}
                                />
                            ))
                        }
                    </Geographies>

                    {activeNodes.map((node) => (
                        <Marker key={node.id} coordinates={[Number(node.lng), Number(node.lat)]}>
                            <circle
                                r={sizeScale(node.storageCommitted)}
                                fill={node.status === 'Healthy' ? 'var(--primary)' : 'var(--warning)'}
                                stroke="rgba(0,0,0,0.5)"
                                strokeWidth={1}
                                style={{ cursor: 'pointer', opacity: 0.8 }}
                            >
                                <title>{`${node.id}\n${node.region}\n${node.storageCommitted} GB`}</title>
                            </circle>
                        </Marker>
                    ))}
                </ZoomableGroup>
            </ComposableMap>
        </div>
    );
}
