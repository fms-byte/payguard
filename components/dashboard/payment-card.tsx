import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const PaymentCard = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Last Payment</CardTitle>
        <Badge variant="secondary">Completed</Badge>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$250.00</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </CardContent>
    </Card>
  )
}

export default PaymentCard