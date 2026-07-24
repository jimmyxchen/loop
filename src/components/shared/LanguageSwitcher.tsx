import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const isZh = i18n.language === 'zh'

  return (
    <button
      onClick={() => i18n.changeLanguage(isZh ? 'en' : 'zh')}
      className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
      title={isZh ? 'Switch to English' : '切换为中文'}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
      {isZh ? 'EN' : '中文'}
    </button>
  )
}
