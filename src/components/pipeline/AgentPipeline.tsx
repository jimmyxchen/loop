import AgentNode from './AgentNode'

const stages = [
  { id: 'generate', label: 'Generate', description: 'Agent writes code', status: 'running' as const, active: true },
  { id: 'verify', label: 'Verify', description: 'Screenshot + multimodal', status: 'idle' as const },
  { id: 'iterate', label: 'Iterate', description: 'Fix & re-generate', status: 'idle' as const },
]

export default function AgentPipeline() {
  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2">
      {stages.map((stage, i) => (
        <div key={stage.id} className="flex items-center gap-3">
          <AgentNode label={stage.label} description={stage.description} status={stage.status} active={stage.active} />
          {i < stages.length - 1 && (
            <div className="flex-shrink-0 flex items-center">
              <div className="h-px w-8 bg-gray-300" />
              <svg className="h-3 w-3 text-gray-400 -ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
