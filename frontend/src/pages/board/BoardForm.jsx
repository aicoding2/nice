import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'

export default function BoardForm(){
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const isEdit = Boolean(id)

  useEffect(()=>{
    if(isEdit){
      axios.get(`${API_BASE}/posts/${id}`).then(res=>{
        setTitle(res.data.title)
        setContent(res.data.content)
      })
    }
  },[id])

  const onSubmit = async (e) => {
    e.preventDefault()
    if(isEdit){
      await axios.put(`${API_BASE}/posts/${id}`, { title, content }, { headers: { 'x-admin-key': localStorage.getItem('ADMIN_KEY') || '' } })
    } else {
      await axios.post(`${API_BASE}/posts`, { title, content })
    }
    navigate('/board')
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">{isEdit ? '게시글 수정' : '게시글 작성'}</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <input value={title} onChange={e=> setTitle(e.target.value)} required placeholder="제목" className="w-full border rounded px-3 py-2" />
        <textarea value={content} onChange={e=> setContent(e.target.value)} required placeholder="내용" rows={8} className="w-full border rounded px-3 py-2" />
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-brand text-white rounded" type="submit">{isEdit ? '수정' : '등록'}</button>
          <button className="px-4 py-2 border rounded" type="button" onClick={()=> navigate(-1)}>취소</button>
        </div>
      </form>
    </div>
  )
}


