
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request) {
  // Initialize Razorpay with your live mode key_id and key_secret
  const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
  const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
  
  if (!razorpayKeyId || !razorpayKeySecret) {
    return NextResponse.json(
      { error: 'Razorpay live API keys not configured' },
      { status: 500 }
    );
  }
  
  const razorpay = new Razorpay({
    key_id: razorpayKeyId,
    key_secret: razorpayKeySecret,
  });
  
  try {
    // Parse the request body
    const requestData = await request.json();
    console.log(requestData);
        
    // Extract amount from the request or use a default
    const amount = Math.round(requestData.amount)
        
    // Generate a unique receipt ID
    const receipt = 'receipt_' + Date.now();
    
    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount*100,
      currency: 'INR',
      receipt: receipt,
      notes: {
        service: 'YourStore',
      },
    });

    
    // Return the order details needed for frontend integration
    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      key: razorpayKeyId, // Frontend needs this public key
    });
  } catch (error) {
    console.error('Razorpay order creation error:', error);
        
    // Return proper error response
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}