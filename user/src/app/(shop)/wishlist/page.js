'use client'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromWishlist } from '@/store/slices/wishlistSlice'
import { addToCart } from '@/store/slices/cartSlice'
import Image from 'next/image'
import Link from 'next/link'

export default function WishlistPage() {
  const dispatch = useDispatch()
  const wishlistItems = useSelector((state) => state.wishlist.items)
  
  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId))
  }
  
  const handleAddToCart = (product) => {
    dispatch(addToCart({product, quantity: 1}))
  }
  
  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h1>
        <p className="mb-8">Save items you love to your wishlist and review them anytime.</p>
        <Link href="/products" className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">
          Discover Products
        </Link>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <Link href={`/products/${product.id}`} className="block relative">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="object-cover object-center w-full h-full"
                />
              </div>
            </Link>
            
            <div className="p-4">
              <Link href={`/products/${product.id}`} className="block">
                <h3 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h3>
              </Link>
              <p className="text-sm text-gray-500 mb-2">{product.category}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  {product.discountPercentage > 0 ? (
                    <>
                      <span className="text-lg font-bold text-gray-900">${product.discountedPrice}</span>
                      <span className="ml-2 text-sm text-gray-500 line-through">${product.price}</span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-gray-900">${product.price}</span>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex-1 mr-2"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleRemoveFromWishlist(product.id)}
                  className="px-4 py-2 border border-gray-300 text-gray-600 rounded hover:bg-gray-100"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}