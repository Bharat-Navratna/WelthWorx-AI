import { Card, CardContent, CardHeader } from "@/components/ui/card";

function SkeletonBox({ className = "" }) {
  return (
    <div className={`animate-pulse rounded bg-muted ${className}`} />
  );
}

export function BudgetSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2 space-y-2">
        <SkeletonBox className="h-5 w-48" />
        <SkeletonBox className="h-4 w-64" />
      </CardHeader>
      <CardContent>
        <SkeletonBox className="h-3 w-full rounded-full" />
        <SkeletonBox className="h-3 w-16 mt-2 ml-auto" />
      </CardContent>
    </Card>
  );
}

export function OverviewSkeleton() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      {/* Recent Transactions card */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <SkeletonBox className="h-5 w-36" />
            <SkeletonBox className="h-9 w-36 rounded-md" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="space-y-1.5">
                  <SkeletonBox className="h-4 w-40" />
                  <SkeletonBox className="h-3 w-24" />
                </div>
                <SkeletonBox className="h-5 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Breakdown card */}
      <Card>
        <CardHeader className="pb-4">
          <SkeletonBox className="h-5 w-44" />
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <SkeletonBox className="h-56 w-56 rounded-full" />
        </CardContent>
      </Card>
    </div>
  );
}

export function AccountsGridSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <SkeletonBox className="h-5 w-28" />
              <SkeletonBox className="h-6 w-10 rounded-full" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <SkeletonBox className="h-8 w-32" />
            <SkeletonBox className="h-3 w-24" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
