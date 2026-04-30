import { getDashboardData, getUserAccounts } from '@/actions/dashboard';
import CreateAccountDrawer from '@/components/create-account-drawer';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Suspense } from 'react';
import AccountCard from './_components/account-card';
import { getCurrentBudget } from '@/actions/budget';
import BudgetProgress from './_components/budget-progress';
import DashboardOverview from './_components/transaction-overview';
import {
  BudgetSkeleton,
  OverviewSkeleton,
  AccountsGridSkeleton,
} from './_components/dashboard-skeletons';

// ── per-widget async fetchers (enable independent streaming) ─────────────────

async function BudgetProgressWidget() {
  const accounts = await getUserAccounts();
  const defaultAccount = accounts?.find((a) => a.isDefault);
  if (!defaultAccount) return null;
  const budgetData = await getCurrentBudget(defaultAccount.id);
  return (
    <BudgetProgress
      initialBudget={budgetData?.budget}
      currentExpenses={budgetData?.currentExpenses || 0}
    />
  );
}

async function DashboardOverviewWidget() {
  const [accounts, transactions] = await Promise.all([
    getUserAccounts(),
    getDashboardData(),
  ]);
  return (
    <DashboardOverview
      accounts={accounts}
      transactions={transactions || []}
    />
  );
}

async function AccountsGridWidget() {
  const accounts = await getUserAccounts();
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {accounts?.length > 0 &&
        accounts.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      <CreateAccountDrawer>
        <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
          <CardContent className='flex flex-col gap-2 items-center justify-center text-muted-foreground h-full pt-5'>
            <Plus className='h-10 w-10' />
            <p className='text-sm font-medium'>Add New Account</p>
          </CardContent>
        </Card>
      </CreateAccountDrawer>
    </div>
  );
}

// ── page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    <div className='space-y-8'>

      {/* Budget Progress — streams independently */}
      <Suspense fallback={<BudgetSkeleton />}>
        <BudgetProgressWidget />
      </Suspense>

      {/* Overview (recent transactions + expense breakdown) */}
      <Suspense fallback={<OverviewSkeleton />}>
        <DashboardOverviewWidget />
      </Suspense>

      {/* Accounts grid */}
      <Suspense fallback={<AccountsGridSkeleton />}>
        <AccountsGridWidget />
      </Suspense>

    </div>
  );
}
