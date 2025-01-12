"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Payment } from "@/lib/schema/payment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PaymentListProps {
  payments: Payment[];
  onUpdate: () => Promise<void>;
  isAdmin?: boolean;
}

export default function PaymentList({ payments, onUpdate, isAdmin = false }: PaymentListProps) {
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    setLoading(false);
  }, [payments]);

  const updatePaymentStatus = async (id: string, status: "approved" | "rejected") => {
    const { error } = await supabase
      .from("payments")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("Error updating payment:", error);
    } else {
      await onUpdate();
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isAdmin ? "All Payment Requests" : "Your Payment Requests"}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {payments.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">{payment.title}</h3>
                <p className="text-sm text-muted-foreground">${payment.amount.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">{new Date(payment.created_at).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={payment.status === "approved" ? "default" : payment.status === "rejected" ? "destructive" : "secondary"}>
                  {payment.status}
                </Badge>
                {isAdmin && payment.status === "pending" && (
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => updatePaymentStatus(payment.id, "approved")}>
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => updatePaymentStatus(payment.id, "rejected")}>
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}