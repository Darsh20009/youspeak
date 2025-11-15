'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { Mail, Lock } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import Alert from '@/components/ui/Alert'
import AppHeader from '@/components/layout/AppHeader'

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
    <div className="min-h-screen bg-[#F5F1E8] flex flex-col">
      <AppHeader variant="marketing">
        <Link
          href="/auth/register"
          className="px-4 py-2 sm:px-6 sm:py-2 rounded-lg border-2 border-[#004E89] text-[#004E89] hover:bg-[#004E89] hover:text-white transition-colors text-sm sm:text-base"
        >
          Register / سجل
        </Link>
      </AppHeader>
      
      <div className="flex-1 flex items-center justify-center p-3 sm:p-4 md:p-6">
        <Card className="w-full max-w-md shadow-2xl bg-[#F5F1E8] border-2 border-[#d4c9b8]">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-black">
              Welcome Back / مرحباً بعودتك
            </h1>
            <p className="text-sm sm:text-base text-center text-black mb-4 sm:mb-8">
              Sign in to your account / قم بتسجيل الدخول
            </p>
          </div>

        <Card variant="elevated" padding="md">
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

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <Input
              type="email"
              label="Email / البريد الإلكتروني"
              placeholder="your.email@example.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              leftIcon={<Mail className="h-4 w-4 sm:h-5 sm:w-5" />}
              inputSize="md"
              labelClassName="text-black text-sm sm:text-base"
              inputClassName="bg-white text-black text-base"
            />

            <Input
              type="password"
              label="Password / كلمة المرور"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              leftIcon={<Lock className="h-4 w-4 sm:h-5 sm:w-5" />}
              inputSize="md"
              labelClassName="text-black text-sm sm:text-base"
              inputClassName="bg-white text-black text-base"
            />

            <Button
              type="submit"
              fullWidth
              size="lg"
              loading={loading}
              className="font-semibold bg-[#004E89] hover:bg-[#003A6B] text-white text-base sm:text-lg py-3 sm:py-4"
            >
              {loading ? 'Signing in... / جارٍ تسجيل الدخول' : 'Login / تسجيل الدخول'}
            </Button>
          </form>

          <div className="text-center mt-4 sm:mt-6">
            <p className="text-xs sm:text-sm text-black">
              Don't have an account? / ليس لديك حساب؟{' '}
              <Link href="/auth/register" className="text-[#004E89] hover:text-[#003A6B] font-semibold">
                Register / سجل
              </Link>
            </p>
          </div>
        </Card>
        </Card>
        <footer className="mt-4 sm:mt-8 text-center text-xs sm:text-sm text-black px-4">
          Made with ❤️ by MA3K Company
        </footer>
      </div>
    </div>
  )
}