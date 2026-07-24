export default function IterationCard({ id, summary, score, issues }: { id: string; summary: string; score: number; issues: string[] }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-900">Iteration #{id}</h3>
        <span className="text-sm font-semibold text-gray-900">{score}%</span>
      </div>
      <p className="text-sm text-gray-700 mb-3">{summary}</p>
      {issues.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500">Issues found:</p>
          {issues.map((issue, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
              <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-gray-400 flex-shrink-0" />
              {issue}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
