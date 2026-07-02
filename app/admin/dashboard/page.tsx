'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  Users,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const sidebarLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/programs', label: 'Chương trình học', icon: BookOpen },
  { href: '/admin/faqs', label: 'FAQ', icon: MessageSquare },
  { href: '/admin/testimonials', label: 'Phản hồi PH', icon: Users },
  { href: '/admin/partners', label: 'Đối tác', icon: FileText },
  { href: '/admin/settings', label: 'Cài đặt', icon: Settings },
]

const stats = [
  { label: 'Tin nhắn mới', value: 5, color: 'bg-blue-500' },
  { label: 'Đơn đăng ký', value: 12, color: 'bg-green-500' },
  { label: 'Học sinh', value: 156, color: 'bg-purple-500' },
  { label: 'Testimonials', value: 8, color: 'bg-orange-500' },
]

export default function AdminDashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check auth state
    const auth = localStorage.getItem('admin_auth')
    if (!auth) {
      router.push('/admin/login')
    } else {
      setIsLoggedIn(true)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('admin_auth')
    router.push('/admin/login')
  }

  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 text-[#666] hover:text-[#003366]"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#003366] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="font-bold text-[#003366]">EPath Admin</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-[#666] hover:text-[#003366]">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#003366] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-medium text-sm text-[#1A1A2E]">Admin</div>
                <div className="text-xs text-[#666]">Quản trị viên</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <nav className="p-4 space-y-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 text-[#666] hover:bg-[#F5F7FA] hover:text-[#003366] rounded-lg transition-colors"
              >
                <link.icon className="w-5 h-5" />
                <span>{link.label}</span>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Đăng xuất</span>
            </button>
          </nav>
        </aside>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#1A1A2E]">Dashboard</h1>
            <p className="text-[#666]">Xem tổng quan về hệ thống</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className={`w-3 h-3 rounded-full ${stat.color}`} />
                  <span className="text-sm text-[#666]">Tuần này</span>
                </div>
                <div className="text-3xl font-bold text-[#1A1A2E]">{stat.value}</div>
                <div className="text-sm text-[#666]">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Recent Messages */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-lg font-bold text-[#1A1A2E]">Tin nhắn gần đây</h2>
            </div>
            <div className="divide-y">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 hover:bg-[#F5F7FA] transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-[#1A1A2E]">Phụ huynh {i}</span>
                    <span className="text-xs text-[#666]">2 giờ trước</span>
                  </div>
                  <p className="text-sm text-[#666] line-clamp-1">
                    Tôi muốn được tư vấn về chương trình Tiểu học cho con...
                  </p>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <Link href="/admin/messages">
                <Button variant="outline" className="w-full">
                  Xem tất cả tin nhắn
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
