import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const StatsCard = () => {
  const data = [
    { month: "Jan", amount: 400 },
    { month: "Feb", amount: 300 },
    { month: "Mar", amount: 600 },
    { month: "Apr", amount: 800 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default StatsCard