'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Users, UserCheck, Calendar, TrendingUp, LogOut, Shield } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Alert from '@/components/ui/Alert'
import Badge from '@/components/ui/Badge'

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    } else if (session && session.user.role !== 'ADMIN' && session.user.role !== 'ASSISTANT') {
      router.push('/dashboard')
    }
  }, [status, session, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#004E89] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading... / جارٍ التحميل</p>
        </div>
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5DC] to-white">
      <header className="bg-[#004E89] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Shield className="h-8 w-8" />
              <h1 className="text-2xl font-bold">Youspeak - Admin Portal</h1>
              <Badge variant="success">
                {session.user.role}
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">{session.user.name}</span>
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
          Admin Dashboard / لوحة تحكم المدير
        </h2>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card variant="elevated">
            <div className="text-center">
              <Users className="h-12 w-12 text-[#004E89] mx-auto mb-3" />
              <p className="text-2xl font-bold text-[#004E89]">0</p>
              <p className="text-sm text-gray-600">Total Users / إجمالي المستخدمين</p>
            </div>
          </Card>

          <Card variant="elevated">
            <div className="text-center">
              <UserCheck className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <p className="text-2xl font-bold text-[#004E89]">0</p>
              <p className="text-sm text-gray-600">Active Students / الطلاب النشطين</p>
            </div>
          </Card>

          <Card variant="elevated">
            <div className="text-center">
              <Calendar className="h-12 w-12 text-purple-600 mx-auto mb-3" />
              <p className="text-2xl font-bold text-[#004E89]">0</p>
              <p className="text-sm text-gray-600">Sessions This Week / حصص هذا الأسبوع</p>
            </div>
          </Card>

          <Card variant="elevated">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <p className="text-2xl font-bold text-[#004E89]">0 SAR</p>
              <p className="text-sm text-gray-600">Revenue This Month / الإيرادات هذا الشهر</p>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card variant="elevated">
            <h3 className="text-xl font-bold text-[#004E89] mb-4">
              Pending Activations / تفعيلات معلقة
            </h3>
            <Alert variant="info">
              <p>No pending activations</p>
              <p>لا توجد تفعيلات معلقة</p>
            </Alert>
          </Card>

          <Card variant="elevated">
            <h3 className="text-xl font-bold text-[#004E89] mb-4">
              Recent Activities / النشاطات الأخيرة
            </h3>
            <Alert variant="info">
              <p>No recent activities</p>
              <p>لا توجد نشاطات حديثة</p>
            </Alert>
          </Card>
        </div>

        <Alert variant="info" className="mt-6">
          <p>Admin panel features are being developed.</p>
          <p>ميزات لوحة تحكم المدير قيد التطوير.</p>
        </Alert>
      </div>
    </div>
  )
}
