"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaHome, FaCamera, FaChartBar, FaUtensils, FaBars, FaTimes } from "react-icons/fa"
import { GiMeal } from "react-icons/gi"

const sidebarItems = [
  // { name: "Dashboard", icon: FaHome, path: "/dashboard" },
  { name: "Food Recognition", icon: FaCamera, path: "/dashboard" },
  { name: "Health Score", icon: FaChartBar, path: "/dashboard/health-score" },
  { name: "Diet Recommendations", icon: FaUtensils, path: "/dashboard/diet-recommendations" },
  // { name: "Recipe Generator", icon: GiMeal, path: "/dashboard/recipe-generator" },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-orange-600 text-white rounded-md lg:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={toggleSidebar}></div>}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          bg-gradient-to-bl from-orange-600 to-yellow-600
          w-64 min-h-screen p-4 pt-10
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static
        `}
      >
        <nav>
          <ul>
            {sidebarItems.map((item) => (
              <li key={item.name} className="mb-2">
                <Link href={item.path} onClick={() => setIsOpen(false)}>
                  <span
                    className={`flex items-center p-2 rounded-lg ${pathname === item.path ? "bg-orange-200 text-orange-800" : "text-white hover:bg-orange-400"
                      }`}
                  >
                    <item.icon className="mr-2" />
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}

