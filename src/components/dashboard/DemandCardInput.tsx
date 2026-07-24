import { useTranslation } from 'react-i18next'

export default function DemandCardInput() {
  const { t } = useTranslation()
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <h3 className="text-sm font-medium text-gray-900 mb-3">{t('dashboard.demandCard.title')}</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">{t('dashboard.demandCard.requirement')}</label>
          <textarea
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            rows={2}
            placeholder={t('dashboard.demandCard.requirementPlaceholder')}
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">{t('dashboard.demandCard.style')}</label>
          <input
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            placeholder={t('dashboard.demandCard.stylePlaceholder')}
          />
        </div>
        <div className="flex justify-end">
          <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed">
            {t('dashboard.demandCard.startBtn')}
          </button>
        </div>
      </div>
    </div>
  )
}
