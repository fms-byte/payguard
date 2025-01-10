import LoadingSpinner from "@/components/shared/loading-spinner"

export default function DashboardLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner />
    </div>
  )
}