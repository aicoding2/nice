import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'

export default function BoardList(){
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    axios.get(`${API_BASE}/posts`).then(res=> setPosts(res.data)).finally(()=> setLoading(false))
  }

  useEffect(()=>{ load() },[])

  const onDelete = async (id) => {
    if(!confirm('삭제하시겠습니까?')) return
    await axios.delete(`${API_BASE}/posts/${id}`, { headers: { 'x-admin-key': localStorage.getItem('ADMIN_KEY') || '' } })
    load()
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">문의/게시판</h2>
        <Link to="/board/new" className="px-4 py-2 bg-brand text-white rounded">글쓰기</Link>
      </div>
      {loading ? <div>불러오는 중...</div> : (
        <div className="border rounded">
          {posts.length === 0 && <div className="p-4 text-sm text-gray-500">게시글이 없습니다.</div>}
          {posts.map(p=> (
            <div key={p.id} className="p-4 border-b last:border-b-0">
              <div className="font-semibold">{p.title}</div>
              <div className="text-sm text-gray-600 whitespace-pre-line">{p.content}</div>
              <div className="flex gap-2 text-xs text-gray-500 mt-2">
                <Link to={`/board/${p.id}/edit`} className="underline">수정</Link>
                <button className="underline" onClick={()=> onDelete(p.id)}>삭제</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


