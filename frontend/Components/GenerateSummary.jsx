"use client"
const GenerateSummary = ({summary}) => {
  return (
    <div>

    {/* display summary */}
{summary && (
  <div className="mt-10 p-6 bg-white rounded-2xl w-72 h-96 overflow-y-auto sm:w-96 xl:w-[40vw]">
    <h2 className="font-bold text-lg mb-3">Summary</h2>
    <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
</div>
)}

    </div>
  )
}

export default GenerateSummary
