import type { CAEdge } from '../../lib/types';

export function Edge(edge: CAEdge) {
    const strokeColor = edge.status === 'VIOLATION' ? '#d32f2f' : 'black';
    const x1 = 100;
    const y1 = 120;
    const x2 = 300;
    const y2 = 200;

    const left = Math.min(x1, x2);
    const top = Math.min(y1, y2);
    const width = Math.max(Math.abs(x2 - x1), 1);
    const height = Math.max(Math.abs(y2 - y1), 1);

    return (
        <svg
            style={{
                position: 'absolute',
                left,
                top,
                width,
                height,
                overflow: 'visible',
                pointerEvents: 'none',
            }}
            aria-hidden="true"
            focusable="false"
        >
            <line
                x1={x1 - left}
                y1={y1 - top}
                x2={x2 - left}
                y2={y2 - top}
                stroke={strokeColor}
                strokeWidth={2}
            />
        </svg>
    )
}