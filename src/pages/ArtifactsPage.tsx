import ArtifactGrid from "../components/artifacts/ArtifactGrid";
export default function ArtifactsPage(){
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Generated Artifacts</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-md bg-white text-gray-700">All</button>
          <button className="px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-md bg-white text-gray-700">Images</button>
          <button className="px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-md bg-white text-gray-700">Logs</button>
        </div>
      </div>
      <ArtifactGrid />
    </div>
  )
}
