import { BarLoader } from "react-spinners";

export default function AccountLoading() {
  return (
    <div className="space-y-8 px-5">
      <div className="flex gap-4 items-end justify-between">
        <div className="space-y-2">
          <div className="h-12 w-52 animate-pulse rounded bg-muted" />
          <div className="h-4 w-32 animate-pulse rounded bg-muted" />
        </div>
        <div className="text-right space-y-2">
          <div className="h-7 w-28 animate-pulse rounded bg-muted ml-auto" />
          <div className="h-4 w-24 animate-pulse rounded bg-muted ml-auto" />
        </div>
      </div>
      <BarLoader width="100%" color="#9333ea" />
    </div>
  );
}
