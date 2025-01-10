import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const PaymentTable = () => {
  const payments = [
    { id: 1, user: "John Doe", amount: 250, date: "2024-01-10", status: "completed" },
    { id: 2, user: "Jane Smith", amount: 150, date: "2024-01-05", status: "pending" },
  ]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>{payment.user}</TableCell>
              <TableCell>${payment.amount}</TableCell>
              <TableCell>{payment.date}</TableCell>
              <TableCell>
                <Badge
                  variant={payment.status === "completed" ? "default" : "secondary"}
                >
                  {payment.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default PaymentTable