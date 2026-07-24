import { useTranslation } from 'react-i18next'

const sections = [
  { title: "settings.sections.apiKeys", fields: ["settings.fields.openaiKey", "settings.fields.imageGenApi", "settings.fields.browserEndpoint"] },
  { title: "settings.sections.agentConfig", fields: ["settings.fields.generateModel", "settings.fields.verifyModel", "settings.fields.maxIterations", "settings.fields.timeout"] },
  { title: "settings.sections.costControls", fields: ["settings.fields.tokenBudget", "settings.fields.maxImages", "settings.fields.cooldown"] },
]

export default function SettingsPage(){
  const { t } = useTranslation()
  return (
    <div className="max-w-2xl space-y-6">
      {sections.map((section) => (
        <div key={section.title} className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-4">{t(section.title)}</h3>
          <div className="space-y-3">
            {section.fields.map((field) => (
              <div key={field}><label className="block text-xs text-gray-500 mb-1">{t(field)}</label><input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900" placeholder={t('settings.notConfigured')} /></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
