import Link from "next/link"



interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  isNew?: boolean
  href?: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, isNew = false, href = '/' }) => {
  return (
    <Link href={`/dashboard${href}`} className="relative bg-white rounded-xl shadow-[0_0_7px_rgba(234,88,12,1)] p-6 hover:shadow-[0_0_10px_2px_rgba(234,88,12,1)] transition-shadow duration-300">
      {isNew && (
        <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          NEW
        </span>
      )}
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Link>
  )
}

export default FeatureCard