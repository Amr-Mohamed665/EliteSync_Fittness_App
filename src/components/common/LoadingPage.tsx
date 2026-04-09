import { Skeleton } from "../ui/skeleton";

const Loading = () => {
  return (
    <section className="max-w-7xl mx-auto section-padding py-10 px-8 space-y-12">
      <Skeleton className="h-8 w-48 mx-auto" />
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 flex flex-col md:flex-row gap-6">
        <Skeleton className="w-full md:w-64 h-64 rounded-lg" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-7 w-40" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-28 rounded-full" />
          </div>
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-24 rounded-md" />
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-6 w-36 mx-auto" />
        <Skeleton className="h-20 w-full max-w-3xl mx-auto" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-lg" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-lg" />
        ))}
      </div>
    </section>
  );
};

export default Loading;
