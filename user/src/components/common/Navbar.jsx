'use client'
import Link from 'next/link'
import { useState } from 'react'
import CartIcon from '@/components/icons/CartIcon'
import WishlistIcon from '@/components/icons/WishlistIcon'
import MenuIcon from '@/components/icons/MenuIcon'
import SearchIcon from '@/components/icons/SearchIcon'
import { useAuth, SignInButton, UserButton } from "@clerk/nextjs"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isSignedIn } = useAuth()

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-blue-600">YourStore</Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600">Products</Link>
            <Link href="/categories" className="text-gray-700 hover:text-blue-600">Categories</Link>
            {/* <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link> */}
            {/* <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link> */}
          </nav>
          
          <div className="flex items-center space-x-4">
            <SearchIcon/>
            
            {isSignedIn ? (
              <>
                <Link href="/cart">
                  <CartIcon />
                </Link>
                <Link href="/wishlist">
                  <WishlistIcon />
                </Link>
                <div className="relative">
                  <UserButton/>
                </div>
              </>
            ) : (
              <SignInButton mode="modal">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Sign In
                </button>
              </SignInButton>
            )}
            
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MenuIcon/>
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="mt-3 md:hidden">
            <nav className="flex flex-col space-y-3">
              <Link href="/" className="text-gray-700 hover:text-blue-600 py-1">Home</Link>
              <Link href="/products" className="text-gray-700 hover:text-blue-600 py-1">Products</Link>
              <Link href="/categories" className="text-gray-700 hover:text-blue-600 py-1">Categories</Link>
              {/* <Link href="/about" className="text-gray-700 hover:text-blue-600 py-1">About</Link> */}
              {/* <Link href="/contact" className="text-gray-700 hover:text-blue-600 py-1">Contact</Link> */}
              
              {!isSignedIn && (
                <div className="py-1">
                  <SignInButton mode="modal">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                      Sign In
                    </button>
                  </SignInButton>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}