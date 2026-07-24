import { useTranslation } from 'react-i18next'
import AgentPipeline from "../components/pipeline/AgentPipeline"
import DemandCardInput from "../components/dashboard/DemandCardInput"
import MetricsChart from "../components/dashboard/MetricsChart"
import StatusCards from "../components/dashboard/StatusCards"

export default function DashboardPage(){
  const { t } = useTranslation()
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">{t('dashboard.title')}</h2>
      <StatusCards />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-4">{t('dashboard.pipeline.title')}</h3>
            <AgentPipeline />
          </div>
          <MetricsChart />
        </div>
        <div><DemandCardInput /></div>
      </div>
    </div>
  )
}
