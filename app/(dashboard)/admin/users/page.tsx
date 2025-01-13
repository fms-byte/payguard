"use client"
import UserTable from "@/components/admin/user-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminUsersPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-gray-600">View and manage system users</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <UserTable />
        </CardContent>
      </Card>
    </div>
  )
}