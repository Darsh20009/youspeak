'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import ChatBox from '@/components/ChatBox'
import ConversationsList from '@/components/ConversationsList'
import { MessageCircle, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'

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
    <div className="min-h-screen bg-[#F5F1E8]">
      {/* Header */}
      <div className="bg-[#004E89] text-white p-4 sm:p-6 shadow-lg">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => redirect('/')} // Assuming redirecting to homepage
              className="text-white hover:bg-white/20 p-2 sm:p-2"
            >
              <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">💬 المحادثات</h1>
              <p className="text-xs sm:text-sm text-gray-200 mt-1">تواصل مع المدرسين والطلاب</p>
            </div>
          </div>
          {/* Placeholder for logout button if needed, not present in original */}
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
        <div className="mb-4 sm:mb-6 hidden"> {/* Hidden as per original structure */}
          <h1 className="text-2xl sm:text-3xl font-bold text-black flex items-center gap-2 sm:gap-3">
            <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-[#004E89]" />
            الرسائل
          </h1>
          <p className="text-sm sm:text-base text-black mt-1 sm:mt-2">تواصل مع المدرسين والطلاب</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 h-[calc(100vh-180px)] sm:h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className="lg:col-span-1 bg-[#F5F1E8] rounded-lg shadow-lg overflow-hidden border-2 border-[#d4c9b8]">
            <div className="bg-[#004E89] p-3 sm:p-4 text-white">
              <h2 className="font-bold text-base sm:text-lg">المحادثات</h2>
            </div>
            <div className="overflow-y-auto h-[calc(100%-52px)] sm:h-[calc(100%-60px)]">
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
              <div className="h-full bg-[#F5F1E8] rounded-lg shadow-lg flex flex-col items-center justify-center text-black border-2 border-[#d4c9b8] p-4">
                <MessageCircle className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-3 sm:mb-4 text-[#004E89]" />
                <p className="text-lg sm:text-xl font-medium text-center">اختر محادثة للبدء</p>
                <p className="text-xs sm:text-sm mt-1 sm:mt-2 text-center">حدد محادثة من القائمة على اليسار</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <footer className="w-full py-4 sm:py-6 text-center text-sm sm:text-base text-black bg-[#F5F1E8] border-t-2 border-[#d4c9b8] mt-4 sm:mt-6 md:mt-8">
        <p className="px-4">Made with ❤️ by MA3K Company</p>
      </footer>
    </div>
  )
}