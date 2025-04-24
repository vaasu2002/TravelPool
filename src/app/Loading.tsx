export default function Loading() {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto"></div>
          </div>
          <h2 className="text-xl font-semibold text-indigo-800">Loading taxi pools...</h2>
          <p className="text-gray-600 mt-2">Please wait while we fetch the latest available rides</p>
        </div>
      </div>
    );
}