import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div>
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">OK시스템 에어컨 설치</h1>
          <p className="text-gray-600 mb-8">전문가의 꼼꼼한 시공과 합리적인 가격으로 믿을 수 있는 에어컨 설치</p>
          <div className="flex justify-center gap-3">
            <Link className="px-5 py-3 rounded bg-brand text-white" to="/products">제품안내</Link>
            <Link className="px-5 py-3 rounded border" to="/board">문의하기</Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-6">
        {["스탠드형", "벽걸이형", "천장형"].map((t, idx)=> (
          <div key={idx} className="border rounded-lg p-6">
            <h3 className="font-semibold mb-2">{t} 에어컨</h3>
            <p className="text-sm text-gray-600">시공 경험이 풍부한 전문팀이 안전하고 깔끔하게 설치합니다.</p>
          </div>
        ))}
      </section>
    </div>
  )
}


