"use client";

import { PaymentCard } from "@/components/dashboard/payment-card";
import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button"
import PaymentList from "@/components/dashboard/payment-list"
import Link from "next/link"

export default function PaymentListPage() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // async function fetchPayments() {
    //   const { data, error } = await supabaseClient.from("payments").select("*");
    //   if (!error) setPayments(data);
    // }

    // fetchPayments();
  }, []);

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="text-gray-600">Manage your payments</p>
        </div>
        <Link href="/payments/create">
          <Button>New Payment</Button>
        </Link>
      </div>
      <PaymentList />
    </div>
  )
}
