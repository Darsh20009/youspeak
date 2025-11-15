'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { Mail, Lock, ArrowLeft } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import Alert from '@/components/ui/Alert'
import AppHeader from '@/components/layout/AppHeader'
import LanguageToggle from '@/components/LanguageToggle'
import { useTranslation } from '@/lib/hooks/useTranslation'

export default function LoginPage() {
  const router = useRouter()
  const { t } = useTranslation()
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
          {t('register')} / سجل
        </Link>
      </AppHeader>

      <div className="flex-1 flex items-center justify-center p-3 sm:p-4 md:p-6">
        <Card className="w-full max-w-md shadow-2xl bg-[#F5F1E8] border-2 border-[#d4c9b8]">
          <Card className="w-full bg-transparent shadow-none border-none">
            <div className="flex justify-between items-center mb-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <LanguageToggle />
            </div>

            <div className="flex items-center justify-center mb-6 sm:mb-8">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl sm:rounded-3xl shadow-xl flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Youspeak Logo"
                  width={70}
                  height={70}
                  className="sm:w-[80px] sm:h-[80px]"
                />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 sm:mb-3 bg-gradient-to-r from-[#004E89] to-[#0066CC] bg-clip-text text-transparent">
              {t('welcomeBack')}
            </h1>
            <p className="text-center text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
              {t('signIn')}
            </p>
          </Card>

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

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <Input
                label={t('email')}
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                leftIcon={<Mail className="h-4 w-4 sm:h-5 sm:w-5" />}
                inputSize="md"
                labelClassName="text-black text-sm sm:text-base"
                inputClassName="bg-white text-black text-base"
              />

              <Input
                label={t('password')}
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
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
                {loading ? t('loading') : t('login')}
              </Button>

              <p className="text-center text-gray-600 mt-4 sm:mt-6 text-xs sm:text-sm">
                {t('language') === 'ar' ? 'ليس لديك حساب؟' : "Don't have an account?"}{' '}
                <Link href="/auth/register" className="text-[#004E89] hover:text-[#003A6A] font-semibold">
                  {t('register')}
                </Link>
              </p>
            </form>
          </Card>
        </Card>
        </Card>
      </div>

      <footer className="w-full py-4 sm:py-6 text-center text-sm sm:text-base text-black bg-[#F5F1E8] border-t-2 border-[#d4c9b8] mt-auto">
        <p className="px-4">{t('madeWithLove')}</p>
      </footer>
    </div>
  )
}