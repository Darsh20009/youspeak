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

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000); // Splash screen duration in milliseconds

    return () => clearTimeout(timer);
  }, []);


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

  if (showSplash) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#F5F1E8]">
        <div className="text-center">
          <Image src="/logo.png" alt="Youspeak" width={100} height={100} className="mb-4 mx-auto" />
          <span className="text-4xl font-bold text-[#004E89]">Youspeak</span>
          <p className="text-lg text-black">Made with ❤️ for English learners worldwide</p>
          <p className="text-sm text-black">MA3K Company</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl bg-[#F5F1E8] border-2 border-[#d4c9b8]">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
            <Image src="/logo.png" alt="Youspeak" width={50} height={50} />
            <span className="text-2xl font-bold text-[#004E89]">Youspeak</span>
          </Link>
          <h1 className="text-3xl font-bold text-center mb-2 text-[#004E89]">
            Welcome Back / مرحباً بعودتك
          </h1>
          <p className="text-center text-black mb-8">
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
              labelClassName="text-black"
              inputClassName="bg-white text-black"
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
              labelClassName="text-black"
              inputClassName="bg-white text-black"
            />

            <Button
              type="submit"
              fullWidth
              size="lg"
              loading={loading}
              className="font-semibold bg-[#004E89] hover:bg-[#003A6B] text-white"
            >
              {loading ? 'Signing in... / جارٍ تسجيل الدخول' : 'Login / تسجيل الدخول'}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-black">
              Don't have an account? / ليس لديك حساب؟{' '}
              <Link href="/auth/register" className="text-[#004E89] hover:text-[#003A6B] font-semibold">
                Register / سجل
              </Link>
            </p>
          </div>
        </Card>
        <footer className="mt-8 text-center text-sm text-black">
          Made with ❤️ for English learners worldwide x Made with ❤️ MA3K Company
        </footer>
      </Card>
    </div>
  )
}