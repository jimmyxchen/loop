import { useTranslation } from 'react-i18next'

const points = [42, 48, 55, 52, 61, 58, 67, 64, 72, 68, 75, 71]

export default function MetricsChart() {
  const { t } = useTranslation()
  const max = Math.max(...points)
  const width = 600
  const height = 160
  const padding = 20

  const stepX = (width - padding * 2) / (points.length - 1)
  const stepY = (height - padding * 2) / max

  const pathD = points
    .map((v, i) => {
      const x = padding + i * stepX
      const y = height - padding - v * stepY
      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`
    })
    .join(' ')

  const areaD = pathD + ` L ${padding + (points.length - 1) * stepX} ${height - padding} L ${padding} ${height - padding} Z`

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-gray-900">{t('dashboard.metrics.title')}</h3>
          <p className="text-xs text-gray-500">{t('dashboard.metrics.desc')}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-gray-900">{points[points.length - 1]}%</p>
          <p className="text-xs text-gray-500">{t('dashboard.metrics.latest')}</p>
        </div>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e5e7eb" />
            <stop offset="100%" stopColor="#f9fafb" />
          </linearGradient>
        </defs>
        <path d={areaD} fill="url(#areaGrad)" />
        <path d={pathD} fill="none" stroke="#171717" strokeWidth="1.5" />
        {points.map((v, i) => {
          const x = padding + i * stepX
          const y = height - padding - v * stepY
          return <circle key={i} cx={x} cy={y} r="2" fill="#171717" />
        })}
      </svg>
    </div>
  )
}
