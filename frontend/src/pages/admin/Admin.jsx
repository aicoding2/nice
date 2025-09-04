import React, { useState } from 'react'

export default function Admin(){
  const [key, setKey] = useState(localStorage.getItem('ADMIN_KEY') || '')

  const save = () => {
    localStorage.setItem('ADMIN_KEY', key)
    alert('저장되었습니다.')
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-4">관리자 페이지</h2>
      <p className="text-gray-600 mb-6">게시글 수정/삭제 시 사용할 관리자 키를 설정합니다.</p>
      <input value={key} onChange={e=> setKey(e.target.value)} placeholder="관리자 키" className="w-full border rounded px-3 py-2 mb-3" />
      <button onClick={save} className="px-4 py-2 bg-brand text-white rounded">저장</button>
    </div>
  )
}


