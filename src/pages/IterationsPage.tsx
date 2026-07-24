import { useTranslation } from 'react-i18next'
import IterationList from "../components/iterations/IterationList"
import IterationCard from "../components/iterations/IterationCard"
import ScreenshotCompare from "../components/iterations/ScreenshotCompare"

const sampleIteration = {
  id: "5",
  summary: "Fixed button event binding, unified style across breakpoints",
  score: 61,
  issues: ["Button click handler missing on mobile", "Hero illustration palette mismatched footer"],
}

export default function IterationsPage(){
  const { t } = useTranslation()
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">{t('iterations.title')}</h2>
      <IterationList />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IterationCard {...sampleIteration} />
        <ScreenshotCompare />
      </div>
    </div>
  )
}
