import { FaBell, FaUser } from "react-icons/fa"

export default function DashboardNavbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 !pl-16 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-orange-600">NutriAI</span>
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
              <FaBell className="h-6 w-6" />
            </button>
            <button className="ml-3 p-2 rounded-full text-gray-600 hover:bg-gray-100">
              <FaUser className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

