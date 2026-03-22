type Props = React.ComponentProps<'svg'>

export default function MovieSearchLogo(props: Props) {
  return (
    <svg width={168} height={72} viewBox="0 0 140 60" {...props}>
      <defs>
        <linearGradient id="a" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#110110" />
          <stop offset="100%" stopColor="#011110" />
        </linearGradient>
        <filter x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceAlpha" stdDeviation={1} />
          <feOffset dx={1} dy={1} result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope={0.2} />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g transform="translate(10 14)">
        <rect width={40} height={40} rx={8} fill="url(#a)" />
        <rect
          x={6}
          y={4}
          width={6}
          height={4}
          rx={1}
          fill="#fff"
          fillOpacity={0.3}
        />
        <rect
          x={17}
          y={4}
          width={6}
          height={4}
          rx={1}
          fill="#fff"
          fillOpacity={0.3}
        />
        <rect
          x={28}
          y={4}
          width={6}
          height={4}
          rx={1}
          fill="#fff"
          fillOpacity={0.3}
        />
        <rect
          x={6}
          y={32}
          width={6}
          height={4}
          rx={1}
          fill="#fff"
          fillOpacity={0.3}
        />
        <rect
          x={17}
          y={32}
          width={6}
          height={4}
          rx={1}
          fill="#fff"
          fillOpacity={0.3}
        />
        <rect
          x={28}
          y={32}
          width={6}
          height={4}
          rx={1}
          fill="#fff"
          fillOpacity={0.3}
        />
        <circle
          cx={18}
          cy={18}
          r={6.5}
          fill="none"
          stroke="#fff"
          strokeWidth={2}
        />
        <path
          stroke="#fff"
          strokeWidth={2}
          strokeLinecap="round"
          d="M24 24L29 29"
        />
      </g>
      <text
        x={60}
        y={32}
        fontFamily="Helvetica Neue, Verdana, Arial, sans-serif"
        fontWeight={800}
        fontSize={20}
        fill="#1e293b"
      >
        {'MOVIE'}
      </text>
      <text
        x={60}
        y={50}
        fontFamily="Helvetica Neue, Verdana, Arial, sans-serif"
        fontWeight={300}
        fontSize={16}
        fill="#64748b"
        letterSpacing={1}
      >
        {'SEARCH'}
      </text>
    </svg>
  )
}
