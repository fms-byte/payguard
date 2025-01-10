import PaymentTable from "@/components/admin/payment-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card"
import Link from "next/link"

export default function AdminPaymentsPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Payment Management</h1>
          <p className="text-gray-600">View and manage all payments</p>
        </div>
        <Link href="/payments/create">
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
    </div>
  )
}