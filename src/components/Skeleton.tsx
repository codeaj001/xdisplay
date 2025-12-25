import React from 'react';

interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
    className?: string;
    style?: React.CSSProperties;
}

export default function Skeleton({ width = '100%', height = '20px', borderRadius = '4px', className = '', style = {} }: SkeletonProps) {
    return (
        <div
            className={`skeleton ${className}`}
            style={{
                width,
                height,
                borderRadius,
                background: 'rgba(255, 255, 255, 0.05)',
                animation: 'pulse 1.5s infinite ease-in-out',
                ...style
            }}
        />
    );
}
