const stats = [
  { label: 'Iterations', value: '24' },
  { label: 'Pass Rate', value: '87%' },
  { label: 'Tokens Used', value: '1.2M' },
  { label: 'Images Generated', value: '48' },
]

export default function StatusCards() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">{stat.label}</p>
          <p className="mt-1 text-xl font-semibold text-gray-900">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}
