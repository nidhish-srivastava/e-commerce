// components/SearchModal.js
'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchModal({ closeModal }) {
  const [searchTerm, setSearchTerm] = useState('')
  const modalRef = useRef(null)
  const inputRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    // Focus the input when the modal opens
    if (inputRef.current) {
      inputRef.current.focus()
    }

    // Close modal when clicking outside
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal()
      }
    }

    // Close modal when pressing ESC key
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscKey)

    // Fix body scroll
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscKey)
      document.body.style.overflow = 'auto'
    }
  }, [closeModal])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
      closeModal()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-20 z-50">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl transform transition-all"
      >
        <form onSubmit={handleSearch} className="relative">
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-4 text-lg border-0 focus:ring-0 focus:outline-none rounded-t-lg"
          />
          <button
            type="submit"
            className="absolute right-4 top-4 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            aria-label="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </form>
        
        <div className="px-4 py-3 border-t">
          <div className="font-medium text-sm text-gray-500 mb-2">Popular Searches:</div>
          <div className="flex flex-wrap gap-2">
            {['Shirts', 'Shoes', 'Electronics', 'Sale Items', 'New Arrivals'].map((term) => (
              <button
                key={term}
                onClick={() => {
                  router.push(`/search?q=${encodeURIComponent(term)}`)
                  closeModal()
                }}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}