"use client"
import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple email validation
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      return;
    }
    
    // Simulate submission
    setIsSubmitted(true);
    setErrorMessage('');
    setEmail('');
    
    // In a real implementation, you would call your API here
    console.log('Newsletter subscription for:', email);
  };

  return (
    <section className="py-16 bg-blue-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-blue-100 mb-8">
            Subscribe to our newsletter to get the latest updates on promotions, new products, and exclusive deals.
          </p>
          
          {isSubmitted ? (
            <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
              <p className="font-medium">Thank you for subscribing!</p>
              <p>We've sent a confirmation email to your inbox.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
              <div className="flex-grow">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Email address"
                />
                {errorMessage && (
                  <p className="mt-2 text-red-300 text-sm text-left">{errorMessage}</p>
                )}
              </div>
              <button 
                type="submit" 
                className="bg-white text-blue-800 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}
          
          <p className="mt-6 text-sm text-blue-200">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </div>
    </section>
  );
}