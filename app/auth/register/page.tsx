'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { User, Mail, Phone, Lock, Calendar, Target, Clock } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import Alert from '@/components/ui/Alert'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match / كلمات المرور غير متطابقة')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters / كلمة المرور يجب أن تكون 6 أحرف على الأقل')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed / فشل التسجيل')
      }

      router.push('/auth/login?registered=true')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5DC] to-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
            <Image src="/logo.png" alt="Youspeak" width={50} height={50} />
            <span className="text-2xl font-bold text-[#004E89]">Youspeak</span>
          </Link>
          <h1 className="text-3xl font-bold text-[#004E89] mb-2">
            Join Us / انضم إلينا
          </h1>
          <p className="text-gray-600">
            Create your account to start learning / أنشئ حسابك لبدء التعلم
          </p>
        </div>

        <Card variant="elevated" padding="lg">
          {error && (
            <Alert 
              variant="error" 
              dismissible 
              onDismiss={() => setError('')}
              className="mb-6"
            >
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              type="text"
              label="Full Name / الاسم الكامل *"
              placeholder="John Doe"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              leftIcon={<User className="h-5 w-5" />}
              inputSize="lg"
            />

            <Input
              type="email"
              label="Email / البريد الإلكتروني *"
              placeholder="your.email@example.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              leftIcon={<Mail className="h-5 w-5" />}
              inputSize="lg"
            />

            <Input
              type="tel"
              label="WhatsApp Number / رقم الواتساب"
              placeholder="+966..."
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              leftIcon={<Phone className="h-5 w-5" />}
              inputSize="lg"
              hint="Optional: For account activation / اختياري: لتفعيل الحساب"
            />

            <Input
              type="password"
              label="Password / كلمة المرور *"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              leftIcon={<Lock className="h-5 w-5" />}
              inputSize="lg"
              hint="At least 6 characters / 6 أحرف على الأقل"
            />

            <Input
              type="password"
              label="Confirm Password / تأكيد كلمة المرور *"
              placeholder="••••••••"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              leftIcon={<Lock className="h-5 w-5" />}
              inputSize="lg"
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
            >
              {loading ? 'Creating Account... / جارٍ إنشاء الحساب' : 'Register / سجل'}
            </Button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account? / لديك حساب بالفعل؟{' '}
            <Link 
              href="/auth/login" 
              className="text-[#004E89] font-semibold hover:underline transition-all"
            >
              Login / تسجيل الدخول
            </Link>
          </p>
        </Card>

        <Alert variant="info" className="mt-6">
          <p className="text-sm">
            <strong>Note / ملاحظة:</strong> After registration, your account will be reviewed. 
            You'll be contacted via WhatsApp at <strong className="text-[#004E89]">+201091515594</strong> for payment and activation.
          </p>
          <p className="text-sm mt-2">
            بعد التسجيل، سيتم مراجعة حسابك. سيتم التواصل معك عبر الواتساب على <strong className="text-[#004E89]">+201091515594</strong> للدفع والتفعيل.
          </p>
        </Alert>
      </div>
    </div>
  )
}
