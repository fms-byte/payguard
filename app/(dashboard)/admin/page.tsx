"use client"
import StatsOverview from "@/components/admin/stats-overview"

export default function AdminDashboardPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of system statistics</p>
      </div>
      
      <StatsOverview />
    </div>
  )
}