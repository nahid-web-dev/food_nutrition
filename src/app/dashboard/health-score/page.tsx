"use client"

import React, { useState } from 'react'
import { FaHeartbeat, FaWeight, FaRulerVertical, FaAppleAlt } from 'react-icons/fa'

export default function HealthScore() {
  const [score, setScore] = useState<number | null>(null)

  const calculateScore = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // This is a placeholder calculation. In a real app, this would be more complex
    // and likely involve an API call to your backend.
    const randomScore = Math.floor(Math.random() * 100) + 1
    setScore(randomScore)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Health Score</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Calculate Your Health Score</h2>
        <form onSubmit={calculateScore} className="space-y-4">
          <div>
            <label htmlFor="age" className="block mb-1">Age</label>
            <input type="number" id="age" className="w-full border rounded p-2" required />
          </div>
          <div>
            <label htmlFor="weight" className="block mb-1">Weight (kg)</label>
            <input type="number" id="weight" className="w-full border rounded p-2" required />
          </div>
          <div>
            <label htmlFor="height" className="block mb-1">Height (cm)</label>
            <input type="number" id="height" className="w-full border rounded p-2" required />
          </div>
          <div>
            <label htmlFor="activity" className="block mb-1">Activity Level</label>
            <select id="activity" className="w-full border rounded p-2" required>
              <option value="">Select an option</option>
              <option value="sedentary">Sedentary</option>
              <option value="light">Lightly Active</option>
              <option value="moderate">Moderately Active</option>
              <option value="very">Very Active</option>
              <option value="extra">Extra Active</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors">
            Calculate Score
          </button>
        </form>
      </div>

      {score !== null && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Your Health Score</h2>
          <div className="text-5xl font-bold text-center text-orange-500 mb-4">{score}</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <FaHeartbeat className="text-red-500 mr-2" />
              <span>Cardiovascular Health</span>
            </div>
            <div className="flex items-center">
              <FaWeight className="text-blue-500 mr-2" />
              <span>Weight Management</span>
            </div>
            <div className="flex items-center">
              <FaRulerVertical className="text-green-500 mr-2" />
              <span>Physical Fitness</span>
            </div>
            <div className="flex items-center">
              <FaAppleAlt className="text-red-500 mr-2" />
              <span>Nutritional Balance</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
