'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import ChatBox from '@/components/ChatBox'
import ConversationsList from '@/components/ConversationsList'
import { MessageCircle } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default function ChatPage() {
  const { data: session, status } = useSession()
  const [selectedUser, setSelectedUser] = useState<any>(null)

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#004E89] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <MessageCircle className="w-8 h-8 text-[#004E89]" />
            الرسائل
          </h1>
          <p className="text-gray-600 mt-2">تواصل مع المدرسين والطلاب</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-[#004E89] to-[#1A5F7A] p-4 text-white">
              <h2 className="font-bold text-lg">المحادثات</h2>
            </div>
            <div className="overflow-y-auto h-[calc(100%-60px)]">
              <ConversationsList 
                onSelectConversation={setSelectedUser}
                selectedUserId={selectedUser?.id}
              />
            </div>
          </div>

          {/* Chat Box */}
          <div className="lg:col-span-2">
            {selectedUser ? (
              <ChatBox 
                otherUser={selectedUser}
                onClose={() => setSelectedUser(null)}
              />
            ) : (
              <div className="h-full bg-white rounded-lg shadow-lg flex flex-col items-center justify-center text-gray-400">
                <MessageCircle className="w-24 h-24 mb-4" />
                <p className="text-xl font-medium">اختر محادثة للبدء</p>
                <p className="text-sm mt-2">حدد محادثة من القائمة على اليسار</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
