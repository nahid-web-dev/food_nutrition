import FeatureCard from "@/components/FeatureCard";
import Image from "next/image";
import Link from "next/link";
import { FaBrain, FaCamera, FaGlobe, FaHeart, FaShieldAlt, FaUtensils } from "react-icons/fa"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-yellow-500 to-orange-600" />
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">AI-Powered Nutrition Tracking</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Your personal AI health assistant for smarter food choices and better nutrition
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-6 py-3 text-lg font-semibold bg-white text-orange-600 rounded-lg hover:bg-white/90 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 text-lg font-semibold text-white border-2 border-white rounded-lg hover:bg-white/10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-transparent">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Powered by Advanced AI</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<FaCamera className="w-10 h-10 text-orange-600" />}
              title="AI Food Recognition"
              description="Instantly identify and track nutrients from food photos"
              isNew
              href=""
            />
            <FeatureCard
              icon={<FaBrain className="w-10 h-10 text-orange-600" />}
              title="AI Health Score"
              description="Get personalized health insights based on your eating habits"
              href="/health-score"
            />
            <FeatureCard
              icon={<FaUtensils className="w-10 h-10 text-orange-600" />}
              title="Diet Recommendations"
              description="Receive AI-powered suggestions for balanced nutrition"
              href="diet-recommendations"
            />
            {/* <FeatureCard
              icon={<FaGlobe className="w-10 h-10 text-orange-600" />}
              title="Multi-Language"
              description="Access nutrition tracking in your preferred language"
            /> */}
            <FeatureCard
              icon={<FaHeart className="w-10 h-10 text-orange-600" />}
              title="Recipe Generator"
              description="Smart AI adjustments for your dietary goals"
              href="/recipe-generator"
              isNew
            />
            {/* <FeatureCard
              icon={<FaShieldAlt className="w-10 h-10 text-orange-600" />}
              title="Nutrition Warnings"
              description="Real-time AI alerts for dietary concerns"
              isNew
            /> */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your Health Journey Today</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already benefiting from AI-powered nutrition tracking
          </p>
          <Link
            href="/signup"
            className="inline-block px-6 py-3 text-lg font-semibold text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Try It Free
          </Link>
        </div>
      </section>
    </div>
  )
}

