export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mx-2 p-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse space-y-3"
        >
          <div className="bg-gray-300 h-70 w-full rounded-md"></div>
          <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
          <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
        </div>
      ))}
    </div>
  );
}