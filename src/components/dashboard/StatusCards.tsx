import { useTranslation } from 'react-i18next'

const stats = [
  { label: 'dashboard.stats.iterations', value: '24' },
  { label: 'dashboard.stats.passRate', value: '87%' },
  { label: 'dashboard.stats.tokensUsed', value: '1.2M' },
  { label: 'dashboard.stats.imagesGenerated', value: '48' },
]

export default function StatusCards() {
  const { t } = useTranslation()
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">{t(stat.label)}</p>
          <p className="mt-1 text-xl font-semibold text-gray-900">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}
