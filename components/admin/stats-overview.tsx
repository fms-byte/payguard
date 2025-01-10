import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const StatsOverview = () => {
  const stats = [
    { title: "Total Users", value: "1,234", change: "+12%" },
    { title: "Total Payments", value: "$12,345", change: "+24%" },
    { title: "Active Users", value: "891", change: "+6%" },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default StatsOverview