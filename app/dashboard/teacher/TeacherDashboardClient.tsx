'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { 
  Home, Users, Calendar, BookOpen, MessageCircle, LogOut 
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import FloatingContactButtons from '@/components/FloatingContactButtons'
import ChatBox from '@/components/ChatBox'
import ConversationsList from '@/components/ConversationsList'
import HomeTab from './components/HomeTab'
import StudentsTab from './components/StudentsTab'
import SessionsTab from './components/SessionsTab'
import AssignmentsTab from './components/AssignmentsTab'

interface TeacherDashboardClientProps {
  user: {
    name: string
    email: string
    teacherProfileId: string
  }
}

export default function TeacherDashboardClient({ user }: TeacherDashboardClientProps) {
  const [activeTab, setActiveTab] = useState('home')

  const menuItems = [
    { id: 'home', label: 'Home / الرئيسية', icon: Home },
    { id: 'students', label: 'Students / الطلاب', icon: Users },
    { id: 'sessions', label: 'Sessions / الحصص', icon: Calendar },
    { id: 'assignments', label: 'Assignments / الواجبات', icon: BookOpen },
    { id: 'chat', label: 'Chat / الدردشة', icon: MessageCircle },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5DC] to-white">
      <header className="bg-[#004E89] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">Youspeak</h1>
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Teacher Portal</span>
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

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            <Card variant="elevated" padding="none">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#004E89] rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">Teacher / مدرس</p>
                  </div>
                </div>
              </div>
              <nav className="p-2">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-1 ${
                        activeTab === item.id
                          ? 'bg-[#004E89] text-white'
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

          <div className="lg:col-span-9">
            {activeTab === 'home' && <HomeTab teacherProfileId={user.teacherProfileId} />}
            {activeTab === 'students' && <StudentsTab teacherProfileId={user.teacherProfileId} />}
            {activeTab === 'sessions' && <SessionsTab teacherProfileId={user.teacherProfileId} />}
            {activeTab === 'assignments' && <AssignmentsTab teacherProfileId={user.teacherProfileId} />}
            {activeTab === 'chat' && <ChatTab />}
          </div>
        </div>
      </div>
      <FloatingContactButtons />
    </div>
  )
}

function ChatTab() {
  const [selectedUser, setSelectedUser] = useState<any>(null)

  return (
    <div>
      <h2 className="text-3xl font-bold text-[#004E89] mb-6">
        Chat / الدردشة
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-300px)]">
        <div className="lg:col-span-1">
          <Card variant="elevated" padding="none" className="h-full overflow-hidden">
            <div className="bg-gradient-to-r from-[#004E89] to-[#1A5F7A] p-4 text-white">
              <h3 className="font-bold text-lg">المحادثات</h3>
            </div>
            <div className="overflow-y-auto h-[calc(100%-60px)]">
              <ConversationsList 
                onSelectConversation={setSelectedUser}
                selectedUserId={selectedUser?.id}
              />
            </div>
          </Card>
        </div>
        <div className="lg:col-span-2 h-full">
          {selectedUser ? (
            <ChatBox 
              otherUser={selectedUser}
              onClose={() => setSelectedUser(null)}
            />
          ) : (
            <Card variant="elevated" className="h-full flex flex-col items-center justify-center text-gray-400">
              <MessageCircle className="w-24 h-24 mb-4" />
              <p className="text-xl font-medium">اختر محادثة للبدء</p>
              <p className="text-sm mt-2">حدد محادثة من القائمة لبدء الدردشة</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
