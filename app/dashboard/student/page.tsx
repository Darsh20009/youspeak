'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { 
  Home, BookOpen, Calendar, MessageCircle, Trophy, 
  CreditCard, LogOut, User, CheckCircle, XCircle, Bell 
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Alert from '@/components/ui/Alert'
import Badge from '@/components/ui/Badge'

export default function StudentDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('home')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    }
  }, [status, router])

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

  const isActive = session.user.isActive

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
              <span className="text-sm">
                {session.user.name}
              </span>
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
                    {session.user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{session.user.name}</p>
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

function HomeTab({ isActive }: { isActive: boolean }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-[#004E89]">
        Dashboard / لوحة التحكم
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        <Card variant="elevated">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-[#004E89]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Next Session</h3>
            <p className="text-sm text-gray-600">No upcoming sessions</p>
            <p className="text-sm text-gray-600">لا توجد حصص قادمة</p>
          </div>
        </Card>

        <Card variant="elevated">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Words Learned</h3>
            <p className="text-2xl font-bold text-[#004E89]">0</p>
            <p className="text-sm text-gray-600">كلمة محفوظة</p>
          </div>
        </Card>

        <Card variant="elevated">
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Assignments</h3>
            <p className="text-2xl font-bold text-[#004E89]">0</p>
            <p className="text-sm text-gray-600">واجب مطلوب</p>
          </div>
        </Card>
      </div>

      <Card variant="elevated">
        <h3 className="text-xl font-bold text-[#004E89] mb-4">
          Quick Actions / إجراءات سريعة
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="https://wa.me/201091515594" target="_blank">
            <Button variant="outline" fullWidth>
              Contact Support / تواصل مع الدعم
            </Button>
          </Link>
          {isActive && (
            <Button variant="primary" fullWidth>
              Schedule Assessment / احجز اختبار تحديد المستوى
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}

function MyLearnTab({ isActive }: { isActive: boolean }) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-[#004E89] mb-6">
        MyLearn - My Words / كلماتي
      </h2>
      <Alert variant="info">
        <p>This feature allows you to save and review English words with Arabic translations.</p>
        <p>هذه الميزة تسمح لك بحفظ ومراجعة الكلمات الإنجليزية مع الترجمة العربية.</p>
      </Alert>
      {!isActive && (
        <Alert variant="warning" className="mt-4">
          <p>Activate your account to access this feature / قم بتفعيل حسابك للوصول لهذه الميزة</p>
        </Alert>
      )}
    </div>
  )
}

function SessionsTab({ isActive }: { isActive: boolean }) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-[#004E89] mb-6">
        My Sessions / حصصي
      </h2>
      <Alert variant="info">
        <p>View your scheduled sessions and join live classes here.</p>
        <p>شاهد حصصك المجدولة وانضم للحصص المباشرة هنا.</p>
      </Alert>
      {!isActive && (
        <Alert variant="warning" className="mt-4">
          <p>Activate your account to book sessions / قم بتفعيل حسابك لحجز الحصص</p>
        </Alert>
      )}
    </div>
  )
}

function HomeworkTab({ isActive }: { isActive: boolean }) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-[#004E89] mb-6">
        My Homework / واجباتي
      </h2>
      <Alert variant="info">
        <p>Submit your assignments and view feedback from your teacher.</p>
        <p>قم بتسليم واجباتك واطلع على تعليقات المدرس.</p>
      </Alert>
      {!isActive && (
        <Alert variant="warning" className="mt-4">
          <p>Activate your account to access homework / قم بتفعيل حسابك للوصول للواجبات</p>
        </Alert>
      )}
    </div>
  )
}

function PackagesTab({ isActive }: { isActive: boolean }) {
  const packages = [
    {
      title: 'Single Level',
      titleAr: 'مستوى واحد',
      price: 200,
      lessons: 8,
      duration: '2 months / شهرين',
    },
    {
      title: 'Monthly',
      titleAr: 'شهري',
      price: 360,
      lessons: 12,
      duration: '1 month / شهر واحد',
      recommended: true,
    },
    {
      title: 'Quarterly',
      titleAr: 'ربع سنوي',
      price: 1000,
      lessons: 36,
      duration: '3 months / ٣ أشهر',
    },
  ]

  return (
    <div>
      <h2 className="text-3xl font-bold text-[#004E89] mb-6">
        Packages / الباقات
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card 
            key={pkg.title}
            variant="elevated"
            className={pkg.recommended ? 'ring-2 ring-[#004E89]' : ''}
          >
            {pkg.recommended && (
              <Badge variant="primary" className="mb-4">
                Recommended / موصى به
              </Badge>
            )}
            <h3 className="text-xl font-bold text-[#004E89] mb-2">{pkg.title}</h3>
            <p className="text-gray-600 mb-4">{pkg.titleAr}</p>
            <p className="text-4xl font-bold text-[#004E89] mb-4">{pkg.price} SAR</p>
            <p className="text-gray-700 mb-2">{pkg.lessons} lessons / حصة</p>
            <p className="text-gray-600 mb-6">{pkg.duration}</p>
            <Button variant={pkg.recommended ? 'primary' : 'outline'} fullWidth>
              Select / اختر
            </Button>
          </Card>
        ))}
      </div>
      <Alert variant="info" className="mt-6">
        <p>
          <strong>Payment Instructions / تعليمات الدفع:</strong><br />
          After selecting a package, you will receive payment details via WhatsApp at{' '}
          <strong>+201091515594</strong>
        </p>
        <p className="mt-2">
          بعد اختيار الباقة، ستستلم تعليمات الدفع عبر الواتساب على{' '}
          <strong>+201091515594</strong>
        </p>
      </Alert>
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
