"use client"

import { CustomSelect } from "@/components/CustomSelect"
import { generateRecipes } from "@/lib/action"
import Image from "next/image"
import type React from "react"
import { startTransition, useActionState, useCallback, useEffect, useRef, useState } from "react"
import {
  FaUtensils,
  FaClock,
  FaUsers,
  FaListUl,
  FaClipboardList,
  FaCloudUploadAlt,
  FaLeaf,
  FaCarrot,
  FaPizzaSlice,
  FaBreadSlice,
  FaBacon,
  FaDrumstickBite,
  FaFish,
  FaPepperHot,
  FaCheese,
  FaLemon,
} from "react-icons/fa"
import { FaBowlRice, FaTachographDigital } from "react-icons/fa6"
import { GiMeat } from "react-icons/gi"

interface Recipe {
  name: string
  prepTime: string
  servings: number
  ingredients: string[]
  instructions: string[]
  image?: string
}

const dietaryOptions = [
  { value: "vegetarian", label: "Vegetarian", icon: <FaLeaf className="text-green-500" /> },
  { value: "non-veg", label: "Non Veg", icon: <GiMeat className="text-orange-500" /> },
  { value: "gluten-free", label: "Gluten-Free", icon: <FaBreadSlice className="text-yellow-500" /> },
  { value: "keto", label: "Keto", icon: <FaBacon className="text-pink-500" /> },
  { value: "paleo", label: "Paleo", icon: <FaDrumstickBite className="text-brown-500" /> },
]

const cuisineOptions = [
  { value: "italian", label: "Italian", icon: <FaPizzaSlice className="text-red-500" /> },
  { value: "mexican", label: "Mexican", icon: <FaTachographDigital className="text-yellow-500" /> },
  { value: "japanese", label: "Japanese", icon: <FaFish className="text-blue-500" /> },
  { value: "indian", label: "Indian", icon: <FaPepperHot className="text-red-700" /> },
  { value: "french", label: "French", icon: <FaCheese className="text-yellow-600" /> },
  { value: "thai", label: "Thai", icon: <FaBowlRice className="text-green-600" /> },
  { value: "mediterranean", label: "Mediterranean", icon: <FaLemon className="text-blue-400" /> },
]

export default function RecipeGenerator() {

  const [state, formAction, isPending] = useActionState<any, any>(generateRecipes, null)

  const [dietary, setDietary] = useState("")
  const [cuisine, setCuisine] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
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

  const generateRecipe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    startTransition(() => {
      formAction(formData)
    })
  }

  return (
    <div className="max-w-7xl mx-auto p-1 sm:p-4 flex flex-col-reverse lg:flex-row gap-6">
      <div className="lg:w-1/2">
        <h1 className="text-xl sm:text-3xl font-bold mb-1 text-gray-700 sm:mb-6">AI Recipe Generator</h1>

        <div className="bg-white shadow-md rounded-lg p-3 sm:p-6 mb-2 sm:mb-6">
          <h2 className=" text-lg sm:text-xl font-semibold mb-4 text-gray-700">Generate a Healthy Recipe</h2>

          <form onSubmit={generateRecipe} className="space-y-4">
            <CustomSelect
              name="dietaryOption"
              label="Dietary Preferences"
              options={dietaryOptions}
              value={dietary}
              onChange={setDietary}
            />
            <CustomSelect
              name="cuisineOption"
              label="Cuisine Type"
              options={cuisineOptions}
              value={cuisine}
              onChange={setCuisine}
            />

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
                  className={`mx-auto pointer-events-none text-6xl mb-4 transition-colors duration-300 ${isDragging ? "text-orange-500" : "text-gray-400"
                    }`}
                />
              )}
              <p
                className={`mb-2 pointer-events-none transition-colors duration-300 ${isDragging ? "text-orange-600" : "text-gray-600"
                  }`}
              >
                {image
                  ? image.name
                  : isDragging
                    ? "Drop the image here"
                    : "Drag and drop an image here, or click to select"}
              </p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
                name="image"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={isPending || !dietary || !cuisine}
            >
              {isPending ? "Generating..." : "Generate Recipe"}
            </button>
          </form>
        </div>
      </div>

      <div className="lg:w-1/2">
        {state as any ? (
          <div className="bg-white shadow-md rounded-lg sm:p-6 p-3">
            <h2 className=" text-xl text-gray-700 sm:text-2xl font-semibold mb-4">{state?.name}</h2>
            {/* {state?.imageUrl ? (
              <div className="mb-4 relative mx-auto aspect-square sm:w-80 w-full rounded-xl overflow-hidden">
                <Image
                  src={state?.imageUrl}
                  alt={state?.name}
                  className=" object-cover rounded-lg"
                  fill
                />
              </div>
            ) : null} */}
            <div className="flex justify-between mb-4">
              <div className="flex items-center">
                <FaClock className="text-gray-500 mr-2" />
                <span>{state?.prepTime} min</span>
              </div>
              <div className="flex items-center">
                <FaUsers className="text-gray-500 mr-2" />
                <span>Serves {state?.servings}</span>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <FaListUl className="mr-2" /> Ingredients
              </h3>
              <ul className=" px-3 sm:px-5 flex sm:gap-y-1 gap-x-2 sm:gap-x-4 flex-wrap sm:text-base text-sm">
                {state?.ingredients?.map((ingredient: any, index: number) => (
                  <li className=" line-clamp-1" key={index}>{ingredient},</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <FaClipboardList className="mr-2" /> Instructions
              </h3>
              <ol className="list-decimal pl-5 flex flex-col sm:text-base text-sm">
                {state?.instructions?.map((instruction: any, index: number) => (
                  <li key={index} className="mb-2">
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <FaUtensils className="mx-auto text-6xl mb-4" />
              <p className="text-xl">Generate a recipe to see the results here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

