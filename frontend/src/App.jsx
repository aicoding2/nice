import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Sales from './pages/Sales'
import Gallery from './pages/Gallery'
import BoardList from './pages/board/BoardList'
import BoardForm from './pages/board/BoardForm'
import Admin from './pages/admin/Admin'

const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b">
    <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="text-xl font-semibold">OK시스템 에어컨 설치</span>
        <span className="text-sm text-gray-500">| 문의 010-8867-1020</span>
      </div>
      <nav className="hidden md:flex gap-4 text-sm">
        <NavLink to="/" className={({isActive})=> isActive? 'text-brand font-medium':'hover:text-brand'}>홈</NavLink>
        <NavLink to="/about" className={({isActive})=> isActive? 'text-brand font-medium':'hover:text-brand'}>회사소개</NavLink>
        <NavLink to="/products" className={({isActive})=> isActive? 'text-brand font-medium':'hover:text-brand'}>제품안내</NavLink>
        <NavLink to="/sales" className={({isActive})=> isActive? 'text-brand font-medium':'hover:text-brand'}>판매</NavLink>
        <NavLink to="/gallery" className={({isActive})=> isActive? 'text-brand font-medium':'hover:text-brand'}>설치모습</NavLink>
        <NavLink to="/board" className={({isActive})=> isActive? 'text-brand font-medium':'hover:text-brand'}>문의/게시판</NavLink>
        <NavLink to="/admin" className={({isActive})=> isActive? 'text-brand font-medium':'hover:text-brand'}>관리자</NavLink>
      </nav>
    </div>
  </header>
)

const Footer = () => (
  <footer className="border-t mt-20">
    <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-gray-500">
      <div>© {new Date().getFullYear()} OK시스템 에어컨 설치</div>
      <div>문의: 010-8867-1020</div>
    </div>
  </footer>
)

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>OK시스템 에어컨 설치 | 에어컨 설치/판매</title>
        <meta name="description" content="에어컨 설치 전문 OK시스템 - 제품 안내, 시공사례, 문의 게시판" />
      </Helmet>
      <Header />
      <main className="flex-1 pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/board" element={<BoardList />} />
          <Route path="/board/new" element={<BoardForm />} />
          <Route path="/board/:id/edit" element={<BoardForm />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}


