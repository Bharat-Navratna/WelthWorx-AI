import { BarLoader } from "react-spinners";

export default function TransactionLoading() {
  return (
    <div className="px-5 max-w-3xl mx-auto space-y-6">
      <div className="h-10 w-48 animate-pulse rounded bg-muted" />
      <BarLoader width="100%" color="#9333ea" />
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 w-full animate-pulse rounded bg-muted" />
        ))}
      </div>
    </div>
  );
}
