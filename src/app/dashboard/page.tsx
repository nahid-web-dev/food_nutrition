"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import { FaCloudUploadAlt } from "react-icons/fa"

export default function DashboardHome() {
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [response, setResponse] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
    }
  }

  const setImageFile = useCallback((file: File) => {
    setImage(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }, [])

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
      const file = e.dataTransfer.files?.[0]
      if (file) {
        setImageFile(file)
      }
    },
    [setImageFile],
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!image) return

    setIsLoading(true)
    setResponse(null)

    // Simulating API call
    try {
      // Replace this with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setResponse(
        "This image contains a plate of spaghetti with tomato sauce and meatballs. Estimated calories: 550. Main ingredients: pasta, tomatoes, ground beef.",
      )
    } catch (error) {
      setResponse("Error recognizing food. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">AI Food Recognition</h1>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
        <div
          className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all duration-300 ease-in-out
            ${isDragging ? "border-orange-500 bg-orange-100" : "border-gray-300 hover:border-orange-500"}`}
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {preview ? (
            <img src={preview || "/placeholder.svg"} alt="Preview" className="max-h-64 mx-auto mb-4" />
          ) : (
            <FaCloudUploadAlt
              className={`mx-auto pointer-events-none text-6xl mb-4 transition-colors duration-300 ${isDragging ? "text-orange-500" : "text-gray-400"}`}
            />
          )}
          <p className={`mb-2 pointer-events-none transition-colors duration-300 ${isDragging ? "text-orange-600" : "text-gray-600"}`}>
            {image
              ? image.name
              : isDragging
                ? "Drop the image here"
                : "Drag and drop an image here, or click to select"}
          </p>
          <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
        </div>
        <button
          type="submit"
          className="w-full mt-4 px-6 py-3 text-lg font-semibold text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!image || isLoading}
        >
          {isLoading ? "Analyzing..." : "Recognize Food"}
        </button>
      </form>

      {response && (
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Recognition Result:</h2>
          <p className="text-gray-700">{response}</p>
        </div>
      )}
    </div>
  )
}

