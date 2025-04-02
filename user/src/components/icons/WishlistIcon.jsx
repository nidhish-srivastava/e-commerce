// components/WishlistIcon.js
'use client'
import { useSelector } from 'react-redux'
import Link from 'next/link'

export default function WishlistIcon() {
  const wishlistItems = useSelector((state) => state.wishlist.items)
  const itemCount = wishlistItems.length

  return (
    <Link href="/wishlist" className="relative">
      <div className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {itemCount}
          </span>
        )}
      </div>
    </Link>
  )
}