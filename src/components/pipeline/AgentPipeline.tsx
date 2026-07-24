import { useTranslation } from 'react-i18next'
import AgentNode from './AgentNode'

const stages = [
  { id: 'generate', label: 'dashboard.pipeline.generate', description: 'dashboard.pipeline.generateDesc', status: 'running' as const, active: true },
  { id: 'verify', label: 'dashboard.pipeline.verify', description: 'dashboard.pipeline.verifyDesc', status: 'idle' as const },
  { id: 'iterate', label: 'dashboard.pipeline.iterate', description: 'dashboard.pipeline.iterateDesc', status: 'idle' as const },
]

export default function AgentPipeline() {
  const { t } = useTranslation()
  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2">
      {stages.map((stage, i) => (
        <div key={stage.id} className="flex items-center gap-3">
          <AgentNode label={t(stage.label)} description={t(stage.description)} status={stage.status} active={stage.active} />
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
