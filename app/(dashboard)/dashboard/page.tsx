"use client";

// import { useState, useEffect } from "react";
// import { supabaseClient } from "@/lib/supabase/client";
// import PaymentList from "@/components/dashboard/payment-list";
import PaymentCard from "@/components/dashboard/payment-card";
import StatsCard from "@/components/dashboard/stats-card";

export default function UserDashboard() {
  // const [stats, setStats] = useState({
  //   totalPayments: 0,
  //   pendingPayments: 0,
  //   completedPayments: 0,
  // });

  // useEffect(() => {
  //   async function fetchStats() {
  //     const { data, error } = await supabaseClient
  //       .from("payments")
  //       .select("status");

  //     if (error) return;

  //     const total = data.length;
  //     const pending = data.filter((payment) => payment.status === "pending").length;
  //     const completed = data.filter((payment) => payment.status === "completed").length;

  //     setStats({ totalPayments: total, pendingPayments: pending, completedPayments: completed });
  //   }

  //   fetchStats();
  // }, []);

  return (
    <div className="container min-h-screen p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome back to your dashboard</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <PaymentCard />
        <PaymentCard />
        <PaymentCard />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <StatsCard />
        {/* <PaymentList /> */}
      </div>
    </div>
  );
}
