import { useTranslation } from 'react-i18next'
import ArtifactGrid from "../components/artifacts/ArtifactGrid"

export default function ArtifactsPage(){
  const { t } = useTranslation()
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">{t('artifacts.title')}</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-md bg-white text-gray-700">{t('artifacts.filters.all')}</button>
          <button className="px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-md bg-white text-gray-700">{t('artifacts.filters.images')}</button>
          <button className="px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-md bg-white text-gray-700">{t('artifacts.filters.logs')}</button>
        </div>
      </div>
      <ArtifactGrid />
    </div>
  )
}
