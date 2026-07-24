import { useTranslation } from 'react-i18next'

const logLines = [
  { time: '10:32:01', level: 'info', msg: 'Pipeline started' },
  { time: '10:32:02', level: 'info', msg: 'Generate Agent: drafting HTML/JS...' },
  { time: '10:32:04', level: 'info', msg: 'Generate Agent: completed (3.2s, 2.1k tokens)' },
  { time: '10:32:05', level: 'info', msg: 'Screenshot captured (1920x1080)' },
  { time: '10:32:08', level: 'warn', msg: 'Verify: layout shift detected' },
  { time: '10:32:09', level: 'info', msg: 'Interaction test passed (3/3)' },
  { time: '10:32:10', level: 'info', msg: 'Score: 42/100 - issues identified' },
]

const levelColor: Record<string, string> = { info: 'text-gray-600', warn: 'text-gray-800', error: 'text-red-600' }

export default function LogViewer() {
  const { t } = useTranslation()
  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-900">{t('dashboard.logs.title')}</h3>
        <span className="text-xs text-gray-500">{logLines.length} {t('dashboard.logs.entries')}</span>
      </div>
      <div className="p-4 max-h-80 overflow-auto space-y-1">
        {logLines.map((line, i) => (
          <div key={i} className="log-line text-xs leading-relaxed">
            <span className="text-gray-400 mr-2">{line.time}</span>
            <span className={`mr-2 font-medium ${levelColor[line.level] || 'text-gray-600'}`}>[{t('logLevels.' + line.level)}]</span>
            <span className="text-gray-700">{line.msg}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
