export function AvailableBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 px-3 py-1 text-sm backdrop-blur-sm dark:bg-slate-900/50">
      <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
      <span className="text-xs text-slate-500 dark:text-slate-400">Available for new projects</span>
    </div>
  );
}
