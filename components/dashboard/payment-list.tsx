import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const PaymentList = () => {
  const payments = [
    { id: 1, amount: 250, date: "2024-01-10", status: "completed" },
    { id: 2, amount: 150, date: "2024-01-05", status: "pending" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Payments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {payments.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">${payment.amount}</p>
                <p className="text-sm text-muted-foreground">{payment.date}</p>
              </div>
              <Badge
                variant={payment.status === "completed" ? "default" : "secondary"}
              >
                {payment.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default PaymentList