'use client'

import { signOut } from 'next-auth/react'
import { Users, Calendar, BookOpen, MessageCircle, LogOut } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Alert from '@/components/ui/Alert'

interface TeacherDashboardClientProps {
  user: {
    name: string
    email: string
  }
}

export default function TeacherDashboardClient({ user }: TeacherDashboardClientProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5DC] to-white">
      <header className="bg-[#004E89] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">Youspeak - Teacher Portal</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">{user.name} (Teacher)</span>
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

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-[#004E89] mb-6">
          Teacher Dashboard / لوحة تحكم المدرس
        </h2>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card variant="elevated">
            <div className="text-center">
              <Users className="h-12 w-12 text-[#004E89] mx-auto mb-3" />
              <p className="text-2xl font-bold text-[#004E89]">0</p>
              <p className="text-sm text-gray-600">Students / طلاب</p>
            </div>
          </Card>

          <Card variant="elevated">
            <div className="text-center">
              <Calendar className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <p className="text-2xl font-bold text-[#004E89]">0</p>
              <p className="text-sm text-gray-600">Sessions / حصص</p>
            </div>
          </Card>

          <Card variant="elevated">
            <div className="text-center">
              <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-3" />
              <p className="text-2xl font-bold text-[#004E89]">0</p>
              <p className="text-sm text-gray-600">Assignments / واجبات</p>
            </div>
          </Card>

          <Card variant="elevated">
            <div className="text-center">
              <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <p className="text-2xl font-bold text-[#004E89]">0</p>
              <p className="text-sm text-gray-600">Messages / رسائل</p>
            </div>
          </Card>
        </div>

        <Alert variant="info">
          <p>Teacher dashboard features are being developed.</p>
          <p>ميزات لوحة تحكم المدرس قيد التطوير.</p>
        </Alert>
      </div>
    </div>
  )
}
