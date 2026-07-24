import { useTranslation } from 'react-i18next'
import Button from "../components/shared/Button"

interface LandingPageProps {
  onNavigate?: (page: string) => void
}

export default function LandingPage({ onNavigate }: LandingPageProps){
  const { t } = useTranslation()
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="h-12 w-12 bg-gray-900 rounded-lg flex items-center justify-center mb-6"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg></div>
      <h1 className="text-3xl font-semibold text-gray-900 tracking-tight mb-3">{t('brand')}</h1>
      <p className="text-lg text-gray-600 max-w-lg mb-8">{t('tagline')}. {t('subtitle')}</p>
      <div className="flex gap-3"><Button onClick={() => onNavigate?.("dashboard")}>{t('openDashboard')}</Button><Button variant="secondary">{t('viewDocs')}</Button></div>
      <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl">
        <div className="text-center"><p className="text-2xl font-semibold text-gray-900">{t('hero.generate')}</p><p className="text-sm text-gray-500 mt-1">{t('hero.generateDesc')}</p></div>
        <div className="text-center"><p className="text-2xl font-semibold text-gray-900">{t('hero.verify')}</p><p className="text-sm text-gray-500 mt-1">{t('hero.verifyDesc')}</p></div>
        <div className="text-center"><p className="text-2xl font-semibold text-gray-900">{t('hero.iterate')}</p><p className="text-sm text-gray-500 mt-1">{t('hero.iterateDesc')}</p></div>
      </div>
    </div>
  )
}
