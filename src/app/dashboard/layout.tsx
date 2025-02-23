import type React from "react"
import DashboardSidebar from "@/components/DashboardSidebar"
import DashboardNavbar from "@/components/DashboardNavbar"
import DashboardFooter from "@/components/DashboardFooter"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardNavbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">{children}</div>
        </main>
        <DashboardFooter />
      </div>
    </div>
  )
}

