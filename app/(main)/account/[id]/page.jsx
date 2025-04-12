import { getAccountWithTransactions } from '@/actions/accounts';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import TransactionTable from '../_components/transaction-table';
import { BarLoader } from 'react-spinners';
import AccountChart from '../_components/account-chart';

export default async function AccountsPage(props) {
  // Await the params object before using it
  const params = await props.params;
  const { id } = params;

  const accountData = await getAccountWithTransactions(id);

  if(!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;
// There was supposed to be a 'space-y-8' in the first div below but the 2 elements within it weren't aligning that's why had to take it off.
  return (
    <div className= 'space-y-8 px-5'>
      <div className='flex gap-4 items-end justify-between' >
        <div>
          <h1 className='text-5xl sm:text-6xl font-bold gradient-title capitalize' >
            {account.name}
          </h1>
          <p className='text-muted-foreground' >
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account
          </p>
        </div>

        <div className='text-right pb-2' >
          <div className='text-xl sm:text-2xl font-bold' >
            ${parseFloat(account.balance).toFixed(2)}
          </div>
          <p className='text-sm text-muted-foreground' >
            {account._count.transactions} Transactions
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color='#9333ea' />}
      >
        <AccountChart transactions={transactions} />
      </Suspense>

      {/* Transaction Table */}
      <Suspense
        fallback={null}
      >
        <TransactionTable transactions={transactions} />
      </Suspense>
    </div>
  )
}

// export default AccountsPage;
