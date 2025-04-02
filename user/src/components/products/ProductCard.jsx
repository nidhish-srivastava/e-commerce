"use client"
import { addToCart } from '@/store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '@/store/slices/wishlistSlice';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

export default function ProductCard({ product }) {
  const dispatch = useDispatch()
  const wishlistItems = useSelector((state) => state.wishlist.items)
  const isInWishlist = wishlistItems.some(item => item.id === product.id)
  
  const handleAddToCart = () => {
    dispatch(addToCart({product, quantity: 1}))
  };
  
  const handleToggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id))
    } else {
      dispatch(addToWishlist(product))
    }
  };
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
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
        {product.discountPercentage > 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discountPercentage}% OFF
          </span>
        )}
      </Link>
      
      <div className="p-4">
        <Link href={`/products/${product.id}`} className="block">
          <h3 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h3>
        </Link>
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        
        <div className="flex items-center justify-between">
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
          
          <div className="flex gap-2">
            <button
              onClick={handleToggleWishlist}
              className={`p-2 rounded-full ${isInWishlist ? 'bg-red-100 text-red-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
              aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              {isInWishlist ? '❤️' : '♡'}
            </button>
            <button
              onClick={handleAddToCart}
              className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
              aria-label="Add to cart"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}