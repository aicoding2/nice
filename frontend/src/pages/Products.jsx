import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'

export default function Products(){
  const [products, setProducts] = useState([])
  useEffect(()=>{
    axios.get(`${API_BASE}/products`).then(res=> setProducts(res.data))
  },[])

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">제품안내</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {products.map(p=> (
          <div key={p.id} className="border rounded-lg overflow-hidden">
            {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="w-full h-48 object-cover" />}
            <div className="p-4">
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm text-gray-600 mb-2">{p.description}</div>
              <div className="font-bold">{Number(p.price).toLocaleString()}원</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


