import { BarLoader } from "react-spinners";

export default function DashboardLoading() {
  return (
    <div className="px-5">
      <div className="h-10 w-48 animate-pulse rounded bg-muted mb-5" />
      <BarLoader width="100%" color="#9333ea" />
    </div>
  );
}
