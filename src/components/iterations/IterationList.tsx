const iterations = [
  { id: '1', score: 42, status: 'passed', timestamp: '2025-07-24T10:32:00Z', summary: 'Initial page structure generated' },
  { id: '2', score: 48, status: 'passed', timestamp: '2025-07-24T10:33:00Z', summary: 'Added dark mode toggle, fixed layout shift' },
  { id: '3', score: 55, status: 'passed', timestamp: '2025-07-24T10:34:00Z', summary: 'Replaced stock image with generated illustration' },
  { id: '4', score: 52, status: 'failed', timestamp: '2025-07-24T10:35:00Z', summary: 'Button interaction broken — Verify rejected' },
  { id: '5', score: 61, status: 'passed', timestamp: '2025-07-24T10:36:00Z', summary: 'Fixed button event binding, style unified' },
]

export default function IterationList() {
  return (
    <div className="space-y-3">
      {iterations.map((iter) => (
        <div key={iter.id} className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm font-medium text-gray-900">#{iter.id}</p>
              <p className="text-xs text-gray-500">{new Date(iter.timestamp).toLocaleTimeString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-700">{iter.summary}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className={`text-sm font-medium ${iter.status === 'passed' ? 'text-gray-900' : 'text-red-600'}`}>
              {iter.score}%
            </span>
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
              iter.status === 'passed' ? 'bg-gray-100 text-gray-800' : 'bg-red-50 text-red-700'
            }`}>
              {iter.status === 'passed' ? 'Passed' : 'Failed'}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
