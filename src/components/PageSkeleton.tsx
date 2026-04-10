import { Skeleton } from "@/components/ui/skeleton";

export const DashboardSkeleton = () => (
  <div className="min-h-screen bg-background">
    <header className="glass border-b border-border/30 px-4 py-4 sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between">
        <Skeleton className="h-6 w-48" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-28 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </header>
    <main className="container mx-auto px-4 py-8 space-y-6">
      <Skeleton className="h-36 w-full rounded-2xl" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-24 rounded-2xl" />
        ))}
      </div>
      <Skeleton className="h-44 w-full rounded-2xl" />
      <div className="grid lg:grid-cols-2 gap-6">
        <Skeleton className="h-40 rounded-2xl" />
        <Skeleton className="h-40 rounded-2xl" />
      </div>
      <Skeleton className="h-48 w-full rounded-2xl" />
    </main>
  </div>
);

export const PracticeSkeleton = () => (
  <div className="flex-1 flex flex-col p-4 space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}>
        <div className={`flex gap-3 ${i % 2 === 0 ? "flex-row-reverse" : ""}`}>
          {i % 2 !== 0 && <Skeleton className="w-8 h-8 rounded-full shrink-0" />}
          <Skeleton className={`h-20 rounded-2xl ${i % 2 === 0 ? "w-48" : "w-64"}`} />
        </div>
      </div>
    ))}
  </div>
);

export const ProgressSkeleton = () => (
  <div className="container mx-auto px-4 py-8 space-y-8">
    <div className="flex gap-2">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-10 w-28 rounded-xl" />
      ))}
    </div>
    <div className="grid lg:grid-cols-2 gap-6">
      <Skeleton className="h-64 rounded-2xl" />
      <Skeleton className="h-64 rounded-2xl" />
    </div>
    <Skeleton className="h-64 w-full rounded-2xl" />
    <Skeleton className="h-48 w-full rounded-2xl" />
  </div>
);

export const VocabularySkeleton = () => (
  <div className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
    <div className="flex flex-wrap items-center gap-3">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-7 w-24 rounded-full" />
      ))}
    </div>
    <Skeleton className="h-11 w-full rounded-xl" />
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <Skeleton key={i} className="h-8 w-20 rounded-full" />
      ))}
    </div>
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <Skeleton key={i} className="h-16 w-full rounded-2xl" />
      ))}
    </div>
  </div>
);
