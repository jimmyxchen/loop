import { useTranslation } from 'react-i18next'

export default function ScreenshotCompare() {
  const { t } = useTranslation()
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <h3 className="text-sm font-medium text-gray-900 mb-3">{t('iterations.screenshot.title')}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500 mb-2">{t('iterations.screenshot.before')}</p>
          <div className="aspect-video w-full rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center">
            <span className="text-xs text-gray-400">screenshot_prev.png</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-2">{t('iterations.screenshot.after')}</p>
          <div className="aspect-video w-full rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center">
            <span className="text-xs text-gray-400">screenshot_current.png</span>
          </div>
        </div>
      </div>
    </div>
  )
}
