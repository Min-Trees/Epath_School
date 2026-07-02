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
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

const sidebarLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/programs', label: 'Chương trình học', icon: BookOpen },
  { href: '/admin/faqs', label: 'FAQ', icon: MessageSquare },
  { href: '/admin/testimonials', label: 'Phản hồi PH', icon: Users },
  { href: '/admin/partners', label: 'Đối tác', icon: FileText },
  { href: '/admin/settings', label: 'Cài đặt', icon: Settings },
]

// Sample FAQ data
const sampleFAQs = [
  {
    id: 1,
    question: 'Chương trình EPath phù hợp với học sinh ở độ tuổi nào?',
    answer: 'EPath cung cấp chương trình học từ Mầm non (3-5 tuổi) đến THPT (15-18 tuổi).',
    category: 'Tuyển sinh',
    order: 1,
  },
  {
    id: 2,
    question: 'Con tôi đang học trường công/tư — có học EPath song song được không?',
    answer: 'Hoàn toàn có thể! EPath được thiết kế theo mô hình Blended Learning.',
    category: 'Tuyển sinh',
    order: 2,
  },
  {
    id: 3,
    question: 'Học phí và chính sách tài chính như thế nào?',
    answer: 'Học phí tại EPath được chia theo từng gói chương trình và cấp học.',
    category: 'Học phí',
    order: 3,
  },
]

export default function AdminFAQsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [faqs, setFaqs] = useState(sampleFAQs)
  const [newFAQ, setNewFAQ] = useState({ question: '', answer: '', category: '' })
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth')
    if (!auth) {
      router.push('/admin/login')
    } else {
      setIsLoggedIn(true)
    }
  }, [router])

  const handleAddFAQ = () => {
    if (newFAQ.question && newFAQ.answer) {
      setFaqs([...faqs, { ...newFAQ, id: Date.now(), order: faqs.length + 1 }])
      setNewFAQ({ question: '', answer: '', category: '' })
      setIsAddDialogOpen(false)
    }
  }

  const handleDeleteFAQ = (id: number) => {
    setFaqs(faqs.filter(faq => faq.id !== id))
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_auth')
    router.push('/admin/login')
  }

  if (!isLoggedIn) return null

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
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#003366] rounded-full flex items-center justify-center">
              <span className="text-white font-bold">A</span>
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
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  link.href === '/admin/faqs'
                    ? 'bg-[#003366]/10 text-[#003366]'
                    : 'text-[#666] hover:bg-[#F5F7FA] hover:text-[#003366]'
                }`}
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
          <div className="mb-8 flex items-center justify-between">
            <div>
              <Link href="/admin/dashboard" className="flex items-center gap-2 text-[#666] hover:text-[#003366] mb-2">
                <ArrowLeft className="w-4 h-4" />
                Quay lại Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-[#1A1A2E]">Quản lý FAQ</h1>
              <p className="text-[#666]">Thêm, sửa, xóa câu hỏi thường gặp</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#003366] hover:bg-[#003366]/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm FAQ
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Thêm câu hỏi mới</DialogTitle>
                  <DialogDescription>
                    Điền thông tin câu hỏi và câu trả lời
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label>Câu hỏi</Label>
                    <Input
                      value={newFAQ.question}
                      onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
                      placeholder="Nhập câu hỏi..."
                    />
                  </div>
                  <div>
                    <Label>Câu trả lời</Label>
                    <textarea
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={newFAQ.answer}
                      onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
                      placeholder="Nhập câu trả lời..."
                    />
                  </div>
                  <div>
                    <Label>Danh mục</Label>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={newFAQ.category}
                      onChange={(e) => setNewFAQ({ ...newFAQ, category: e.target.value })}
                    >
                      <option value="">Chọn danh mục</option>
                      <option value="Tuyển sinh">Tuyển sinh</option>
                      <option value="Học phí">Học phí</option>
                      <option value="Chương trình">Chương trình</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Hủy
                  </Button>
                  <Button onClick={handleAddFAQ} className="bg-[#003366] hover:bg-[#003366]/90">
                    Thêm mới
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq) => (
              <Card key={faq.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-[#003366]/10 text-[#003366] px-2 py-1 rounded">
                          {faq.category}
                        </span>
                        <span className="text-xs text-[#666]">Thứ tự: {faq.order}</span>
                      </div>
                      <h3 className="font-medium text-[#1A1A2E] mb-2">{faq.question}</h3>
                      <p className="text-sm text-[#666]">{faq.answer}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteFAQ(faq.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
