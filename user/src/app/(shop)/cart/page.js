'use client'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity } from '@/store/slices/cartSlice'
import Image from 'next/image'
import Link from 'next/link'

export default function CartPage() {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
  
  console.log(cartItems);
  
  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.discountedPrice || item.price) * item.quantity
  }, 0)
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/products" className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">
          Shop Now
        </Link>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row border-b py-4 items-start">
              <div className="sm:w-24 w-full mb-4 sm:mb-0">
                <Image 
                  src={item.imageUrl} 
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-md object-cover"
                />
              </div>
              
              <div className="flex-1 px-4">
                <Link href={`/products/${item.id}`}>
                  <h3 className="font-medium">{item.name}</h3>
                </Link>
                <p className="text-sm text-gray-500">{item.category}</p>
                
                <div className="mt-2">
                  {item.discountedPrice ? (
                    <div className="flex items-center">
                      <span className="font-bold">${item.discountedPrice}</span>
                      <span className="ml-2 text-sm text-gray-500 line-through">${item.price}</span>
                    </div>
                  ) : (
                    <span className="font-bold">${item.price}</span>
                  )}
                </div>
              </div>
              
              <div className="mt-4 sm:mt-0 flex items-center">
                <select
                  value={item.quantity}
                  onChange={(e) => dispatch(updateQuantity({
                    productId: item.id,
                    quantity: parseInt(e.target.value)
                  }))}
                  className="border rounded-md px-2 py-1 mr-4"
                >
                  {[...Array(10).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </select>
                
                <button 
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-medium mb-4">Order Summary</h2>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="border-t pt-3 mt-3 flex justify-between font-bold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          
          <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700">
            Proceed to Checkout
          </button>
          
          <div className="mt-4">
            <Link href="/products" className="text-blue-600 hover:text-blue-800 text-sm flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="mr-1"
              >
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}