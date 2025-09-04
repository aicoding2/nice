import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'

export default function Gallery(){
  const [images, setImages] = useState([])
  useEffect(()=>{
    axios.get(`${API_BASE}/products`).then(res=>{
      const imgs = res.data.filter(p=> p.imageUrl).map(p=> ({url: p.imageUrl, title: p.name}))
      setImages(imgs)
    })
  },[])

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">설치모습 (시공사례)</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {images.map((img, idx)=> (
          <figure key={idx} className="overflow-hidden rounded-lg border">
            <img src={img.url} alt={img.title} className="w-full h-36 object-cover hover:scale-105 transition-transform" />
            <figcaption className="text-xs p-2 text-gray-600">{img.title}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}


