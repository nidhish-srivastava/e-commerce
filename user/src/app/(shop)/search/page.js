// app/search/page.js
'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { mockProducts } from '@/constants/dummyData'
import ProductCard from '@/components/products/ProductCard'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSearchResults = async () => {
      setLoading(true)
      try {
        // Replace this with your actual API call
        // This is a placeholder for your actual data fetching logic
        let filteredProducts = [...mockProducts]
        await new Promise(resolve => setTimeout(resolve,500))
        if(query){
          const term = query.toLowerCase()
          filteredProducts = filteredProducts.filter((product)=>
            product.name.toLowerCase().includes(term) || product.category.toLowerCase().includes(term)
          )
        }
        setProducts(filteredProducts)
      } catch (error) {
        console.error('Error fetching search results:', error)
      } finally {
        setLoading(false)
      }
    }

    if (query) {
      getSearchResults()
    } else {
      setProducts([])
      setLoading(false)
    }
  }, [query])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Search Results</h1>
      {query && <p className="text-gray-600 mb-6">Showing results for "{query}"</p>}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-xl font-medium mb-2">No products found</h2>
          <p className="text-gray-600 mb-8">
            {query ? `We couldn't find any products matching "${query}"` : 'Please enter a search term'}
          </p>
          <div className="flex justify-center">
            <a href="/products" className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">
              Browse All Products
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}