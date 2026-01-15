const Loading = ({text="AI is analyzing your PDF..."}) => {
  return (
        <div className="flex flex-col items-center justify-center py-10">
      
      {/* Spinner */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
      </div>

      {/* Text */}
      <p className="mt-6 text-lg font-semibold text-gray-700 animate-pulse">
        {text}
      </p>

      {/* Subtext */}
      <p className="mt-2 text-sm text-gray-400">
        Please wait, this may take a few seconds
      </p>
    </div>

  )
}

export default Loading
