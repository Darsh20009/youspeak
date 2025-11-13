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
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 dark:border-primary-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600 dark:text-neutral-400">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-3">
            <MessageCircle className="w-8 h-8 text-primary-600 dark:text-primary-300" />
            الرسائل
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2">تواصل مع المدرسين والطلاب</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className="lg:col-span-1 bg-white dark:bg-neutral-800 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-500 dark:to-primary-600 p-4 text-white">
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
              <div className="h-full bg-white dark:bg-neutral-800 rounded-lg shadow-lg flex flex-col items-center justify-center text-neutral-400 dark:text-neutral-500">
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
