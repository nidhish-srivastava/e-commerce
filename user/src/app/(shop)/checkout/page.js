'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { clearCart } from '@/store/slices/cartSlice';
import { useAuth } from '@clerk/nextjs';

// Simple OrderSummary component
const OrderSummary = ({ items, totalAmount }) => (
  <div className="bg-gray-50 p-6 rounded-lg">
    <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
    {items.map((item) => (
      <div key={item.id} className="flex justify-between mb-2">
        <span>{item.name} × {item.quantity}</span>
        <span>₹{(item.discountedPrice || item.price) * item.quantity}</span>
      </div>
    ))}
    <div className="border-t border-gray-300 my-3 pt-3">
      <div className="flex justify-between font-medium">
        <span>Subtotal</span>
        <span>₹{totalAmount}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-600 mt-1">
        <span>Shipping</span>
        <span>Free</span>
      </div>
      <div className="flex justify-between font-semibold text-lg mt-3">
        <span>Total</span>
        <span>₹{totalAmount}</span>
      </div>
    </div>
  </div>
);

export default function CheckoutPage() {
  const { isSignedIn, user } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state) => state.cart);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Prefill the form with user data if available
  useEffect(() => {
    if (isSignedIn && user) {
      setFormData(prev => ({
        ...prev,
        name: user.fullName || '',
        email: user.primaryEmailAddress?.emailAddress || '',
      }));
    }
  }, [isSignedIn, user]);

  useEffect(() => {
    // Redirect to cart if there are no items
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    // Simple validation
    if (!formData.name || !formData.email || !formData.phone || 
        !formData.address || !formData.city || !formData.state || !formData.pincode) {
      setError('All fields are required');
      return false;
    }
    
    if (!/^\d{10}$/.test(formData.phone)) {
      setError('Please enter a valid 10-digit phone number');
      return false;
    }
    
    if (!/^\d{6}$/.test(formData.pincode)) {
      setError('Please enter a valid 6-digit pincode');
      return false;
    }
    
    setError('');
    return true;
  };

  const initiatePayment = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      // Create an order object with all necessary information
    //   const orderData = {
    //     items: items.map(item => ({
    //       id: item.id,
    //       name: item.name,
    //       price: item.discountedPrice || item.price,
    //       quantity: item.quantity
    //     })),
    //     amount: totalAmount,
    //     customer: formData,
    //     timestamp: new Date().toISOString()
    //   };

      // Call your API to create a Razorpay order
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify(orderData)
        body: JSON.stringify({amount : totalAmount})
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create order');
      }

      // Load the Razorpay SDK dynamically if not already loaded
      if (!window.Razorpay) {
        await loadRazorpayScript();
      }
      
      // Initialize Razorpay
      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: 'YourStore',
        description: 'Purchase from YourStore',
        order_id: data.id,
        handler: function(response) {
            // Handle the 
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#3B82F6',
        }
      };
      
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      
    } catch (error) {
      console.error('Payment initiation failed:', error);
      setError('Payment initiation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

//   const handlePaymentSuccess = async (paymentResponse) => {
//     try {
//       // Verify the payment on your server
//       const response = await fetch('/api/verify-payment', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ 
//           razorpay_payment_id: paymentResponse.razorpay_payment_id,
//           razorpay_order_id: paymentResponse.razorpay_order_id,
//           razorpay_signature: paymentResponse.razorpay_signature,
//           orderDetails: {
//             items,
//             amount: totalAmount,
//             customer: formData
//           }
//         })
//       });
      
//       const data = await response.json();
      
//       if (response.ok) {
//         // Clear cart after successful payment
//         dispatch(clearCart());
        
//         // Redirect to success page
//         router.push(`/order-success?orderId=${data.orderId}`);
//       } else {
//         setError(data.message || 'Payment verification failed');
//       }
//     } catch (error) {
//       console.error('Payment verification failed:', error);
//       setError('Payment verification failed. Please contact support.');
//     }
//   };

  // Function to load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = resolve;
      script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
      document.body.appendChild(script);
    });
  };

  if (items.length === 0) {
    return <div className="container mx-auto py-10 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Information */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                rows={3}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
            </div>
          </div>
          
          <button
            onClick={initiatePayment}
            disabled={isLoading}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isLoading ? 'Processing...' : `Pay ₹${totalAmount}`}
          </button>
        </div>
        
        {/* Order Summary */}
        <div>
          <OrderSummary items={items} totalAmount={totalAmount} />
        </div>
      </div>
    </div>
  );
}