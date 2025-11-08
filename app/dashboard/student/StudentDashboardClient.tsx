'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { 
  Home, BookOpen, Calendar, MessageCircle, Trophy, 
  CreditCard, LogOut, CheckCircle, XCircle, Bell 
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Alert from '@/components/ui/Alert'
import Badge from '@/components/ui/Badge'
import HomeTab from './components/HomeTab'
import MyLearnTab from './components/MyLearnTab'
import SessionsTab from './components/SessionsTab'
import HomeworkTab from './components/HomeworkTab'
import PackagesTab from './components/PackagesTab'

interface StudentDashboardClientProps {
  user: {
    name: string
    email: string
    isActive: boolean
  }
}

export default function StudentDashboardClient({ user }: StudentDashboardClientProps) {
  const [activeTab, setActiveTab] = useState('home')
  const isActive = user.isActive

  const menuItems = [
    { id: 'home', label: 'Home / الرئيسية', icon: Home },
    { id: 'mylearn', label: 'MyLearn / كلماتي', icon: BookOpen },
    { id: 'sessions', label: 'Sessions / الحصص', icon: Calendar },
    { id: 'homework', label: 'Homework / الواجبات', icon: Trophy },
    { id: 'packages', label: 'Packages / الباقات', icon: CreditCard },
    { id: 'chat', label: 'Chat / الدردشة', icon: MessageCircle, disabled: !isActive },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5DC] to-white">
      {/* Header */}
      <header className="bg-[#004E89] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">Youspeak</h1>
              <Badge variant={isActive ? 'success' : 'warning'}>
                {isActive ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Active / نشط
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 mr-1" />
                    Pending Activation / قيد التفعيل
                  </>
                )}
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">{user.name}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut({ callbackUrl: '/' })}
                className="text-white border-white hover:bg-white hover:text-[#004E89]"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout / خروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Warning for inactive accounts */}
      {!isActive && (
        <div className="container mx-auto px-4 py-4">
          <Alert variant="warning">
            <Bell className="h-5 w-5" />
            <div>
              <p className="font-semibold">Account Pending Activation / الحساب قيد التفعيل</p>
              <p className="text-sm mt-1">
                Your account is being reviewed. You will be contacted via WhatsApp at{' '}
                <strong>+201091515594</strong> for payment confirmation and activation.
              </p>
              <p className="text-sm mt-1">
                حسابك قيد المراجعة. سيتم التواصل معك عبر الواتساب على{' '}
                <strong>+201091515594</strong> لتأكيد الدفع والتفعيل.
              </p>
            </div>
          </Alert>
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <Card variant="elevated" padding="none">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#004E89] rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">Student / طالب</p>
                  </div>
                </div>
              </div>
              <nav className="p-2">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  const isDisabled = item.disabled
                  return (
                    <button
                      key={item.id}
                      onClick={() => !isDisabled && setActiveTab(item.id)}
                      disabled={isDisabled}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-1 ${
                        activeTab === item.id
                          ? 'bg-[#004E89] text-white'
                          : isDisabled
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  )
                })}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {activeTab === 'home' && <HomeTab isActive={isActive} />}
            {activeTab === 'mylearn' && <MyLearnTab isActive={isActive} />}
            {activeTab === 'sessions' && <SessionsTab isActive={isActive} />}
            {activeTab === 'homework' && <HomeworkTab isActive={isActive} />}
            {activeTab === 'packages' && <PackagesTab isActive={isActive} />}
            {activeTab === 'chat' && isActive && <ChatTab />}
          </div>
        </div>
      </div>
    </div>
  )
}

function ChatTab() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-[#004E89] mb-6">
        Chat / الدردشة
      </h2>
      <Card variant="elevated" className="h-[600px] flex flex-col">
        <div className="flex-1 p-4 bg-gray-50 overflow-y-auto">
          <Alert variant="info">
            <p>Real-time chat feature coming soon!</p>
            <p>ميزة الدردشة المباشرة قريباً!</p>
          </Alert>
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message... / اكتب رسالة"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004E89]"
              disabled
            />
            <Button variant="primary" disabled>
              Send / إرسال
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
