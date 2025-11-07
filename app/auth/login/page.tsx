'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { Mail, Lock } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import Alert from '@/components/ui/Alert'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password / البريد الإلكتروني أو كلمة المرور غير صحيحة')
        return
      }

      router.push('/dashboard')
      router.refresh()
    } catch (err: any) {
      setError('An error occurred during login / حدث خطأ أثناء تسجيل الدخول')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5DC] to-white flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
            <Image src="/logo.png" alt="Youspeak" width={50} height={50} />
            <span className="text-2xl font-bold text-[#004E89]">Youspeak</span>
          </Link>
          <h1 className="text-3xl font-bold text-[#004E89] mb-2">
            Welcome Back / مرحباً بعودتك
          </h1>
          <p className="text-gray-600">
            Sign in to your account / قم بتسجيل الدخول
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
              type="email"
              label="Email / البريد الإلكتروني"
              placeholder="your.email@example.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              leftIcon={<Mail className="h-5 w-5" />}
              inputSize="lg"
            />

            <Input
              type="password"
              label="Password / كلمة المرور"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
              {loading ? 'Signing in... / جارٍ تسجيل الدخول' : 'Login / تسجيل الدخول'}
            </Button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account? / ليس لديك حساب؟{' '}
            <Link 
              href="/auth/register" 
              className="text-[#004E89] font-semibold hover:underline transition-all"
            >
              Register / سجل
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}
