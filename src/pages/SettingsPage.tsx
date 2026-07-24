const sections=[{title:"API Keys",fields:["OpenAI API Key","Image Generation API","Browser Automation Endpoint"]},{title:"Agent Configuration",fields:["Generate Model","Verify Model","Max Iterations","Timeout (s)"]},{title:"Cost Controls",fields:["Token Budget per Run","Max Image Generations","Cooldown Between Runs"]}];
export default function SettingsPage(){
  return (
    <div className="max-w-2xl space-y-6">
      {sections.map(section=>(
        <div key={section.title} className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-4">{section.title}</h3>
          <div className="space-y-3">
            {section.fields.map(field=>(
              <div key={field}><label className="block text-xs text-gray-500 mb-1">{field}</label><input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900" placeholder="Not configured" /></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
