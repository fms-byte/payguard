"use client"
import PaymentTable from "@/components/admin/payment-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import PaymentList from "@/components/dashboard/payment-list";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Payment } from "@/lib/schema/payment";
import { createClient } from "@/lib/supabase/client";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const supabase = createClient();

  const fetchPayments = useCallback(async () => {
    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setPayments(data);
    }
  }, [supabase]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]); 

  return (
    <div className="container min-h-screen p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Payment Management</h1>
          <p className="text-gray-600">View and manage all payments</p>
        </div>
        <Link href="/payments">
          <Button>Create Payment</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <PaymentTable />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <PaymentList payments={payments} onUpdate={fetchPayments} isAdmin={true} />
        </CardContent>
      </Card>
    </div>
  );
}
