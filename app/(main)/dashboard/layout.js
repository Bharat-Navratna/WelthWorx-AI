import React, { Suspense } from 'react';
import DashboardPage from './page';
import { BarLoader } from "react-spinners";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import DemoBanner from "@/components/demo-banner";

async function getDemoStatus() {
  try {
    const { userId } = await auth();
    if (!userId) return false;
    const user = await db.user.findUnique({ where: { clerkUserId: userId }, select: { email: true } });
    return user?.email === process.env.DEMO_EMAIL;
  } catch {
    return false;
  }
}

const Dashboard = async () => {
  const isDemo = await getDemoStatus();

  return (
    <div>
      {isDemo && <DemoBanner />}
      <div>
        <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold gradient-title mb-5'>
          Dashboard
        </h1>
        {/* Dashboard Page */}
        <Suspense fallback={<BarLoader className='mt-4' width={"100%"} color='#9333ea' />}>
          <DashboardPage />
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;
