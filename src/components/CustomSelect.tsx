'use client'

import { useState } from "react"
import { FaChevronDown } from "react-icons/fa"

export function CustomSelect({
  label,
  options,
  value,
  onChange,
  name,
}: {
  label: string
  options: any
  value: string
  onChange: (value: string) => void
  // onChange: any
  name: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <input type="text" className="hidden" name={name} onChange={() => { onChange(value) }} value={value} />
      <label className="block mb-1 font-medium text-gray-700">{label}</label>
      <div
        className="w-full border rounded p-2 flex justify-between items-center cursor-pointer bg-white hover:border-orange-500 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value ? (
          <span className="flex items-center">
            {options.find((option: any) => option.value === value)?.icon}
            <span className="ml-2">{options.find((option: any) => option.value === value)?.label}</span>
          </span>
        ) : (
          <span className="text-gray-400">Select an option</span>
        )}
        <FaChevronDown className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </div>
      <div className={` ${isOpen ? 'opacity-100 h-60 p-2' : 'opacity-0 h-0 p-0'} z-10 hide-scrollbar overflow-y-scroll duration-500 transition-all absolute w-full mt-1 bg-slate-300 border rounded shadow-lg`}>
        {options.map((option: any, idx: number) => (
          <div
            key={idx}
            className="p-2 my-1 bg-gray-100 hover:bg-orange-100 cursor-pointer flex items-center"
            onClick={() => {
              onChange(option.value)
              setIsOpen(false)
            }}
          >
            {option.icon}
            <span className="ml-2">{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}