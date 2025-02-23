"use client"

import type React from "react"
import { useState } from "react"
import { FaAppleAlt, FaCarrot, FaDrumstickBite, FaFish, FaCheese } from "react-icons/fa"

export default function DietRecommendations() {

  const [recommendations, setRecommendations] = useState<string[] | null>(null)

  const generateRecommendations = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // This is a placeholder. In a real app, this would involve an API call to your AI service.
    const dummyRecommendations = [
      "Increase your intake of leafy green vegetables like spinach and kale.",
      "Include more lean proteins such as chicken breast and fish in your diet.",
      "Reduce consumption of processed foods and sugary drinks.",
      "Incorporate whole grains like quinoa and brown rice into your meals.",
      "Add healthy fats from sources like avocados, nuts, and olive oil.",
      "Ensure adequate hydration by drinking at least 8 glasses of water daily.",
      "Consider adding probiotic-rich foods like yogurt or kefir to support gut health.",
    ]
    setRecommendations(dummyRecommendations)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* <h1 className="text-3xl font-bold mb-6">AI Diet Recommendations</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Get Personalized Diet Recommendations</h2>
        <form onSubmit={generateRecommendations} className="space-y-4">
          <div>
            <label htmlFor="goal" className="block mb-1">
              Health Goal
            </label>
            <select id="goal" className="w-full border rounded p-2" required>
              <option value="">Select an option</option>
              <option value="weight-loss">Weight Loss</option>
              <option value="muscle-gain">Muscle Gain</option>
              <option value="maintenance">Maintenance</option>
              <option value="heart-health">Heart Health</option>
              <option value="diabetes-management">Diabetes Management</option>
            </select>
          </div>
          <div>
            <label htmlFor="restrictions" className="block mb-1">
              Dietary Restrictions
            </label>
            <select id="restrictions" className="w-full border rounded p-2" required>
              <option value="">Select an option</option>
              <option value="none">None</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="gluten-free">Gluten-Free</option>
              <option value="dairy-free">Dairy-Free</option>
              <option value="nut-allergy">Nut Allergy</option>
            </select>
          </div>
          <div>
            <label htmlFor="activity" className="block mb-1">
              Activity Level
            </label>
            <select id="activity" className="w-full border rounded p-2" required>
              <option value="">Select an option</option>
              <option value="sedentary">Sedentary</option>
              <option value="light">Lightly Active</option>
              <option value="moderate">Moderately Active</option>
              <option value="very">Very Active</option>
              <option value="extra">Extra Active</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors"
          >
            Get Recommendations
          </button>
        </form>
      </div>

      {recommendations && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Your Personalized Diet Recommendations</h2>
          <ul className="space-y-4">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start">
                {index % 5 === 0 && <FaAppleAlt className="text-red-500 mr-2 mt-1 flex-shrink-0" />}
                {index % 5 === 1 && <FaCarrot className="text-orange-500 mr-2 mt-1 flex-shrink-0" />}
                {index % 5 === 2 && <FaDrumstickBite className="text-brown-500 mr-2 mt-1 flex-shrink-0" />}
                {index % 5 === 3 && <FaFish className="text-blue-500 mr-2 mt-1 flex-shrink-0" />}
                {index % 5 === 4 && <FaCheese className="text-yellow-500 mr-2 mt-1 flex-shrink-0" />}
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  )
}

