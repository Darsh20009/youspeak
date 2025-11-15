'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { User, Mail, Phone, Lock, Calendar, Target, Clock, ArrowLeft } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import Alert from '@/components/ui/Alert'
import LanguageToggle from '@/components/LanguageToggle'
import { useTranslation } from '@/lib/hooks/useTranslation'

export default function RegisterPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    age: '',
    levelInitial: '',
    goal: '',
    preferredTime: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError(t('passwordsDoNotMatch'))
      return
    }

    if (formData.password.length < 6) {
      setError(t('passwordTooShort'))
      return
    }

    const phoneRegex = /^\+?[0-9]{10,15}$/
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      setError(t('invalidPhoneNumber'))
      return
    }

    const age = parseInt(formData.age)
    if (isNaN(age) || age < 5 || age > 100) {
      setError(t('invalidAge'))
      return
    }

    setLoading(true)

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        phone: formData.phone.replace(/\s/g, ''),
        age: parseInt(formData.age),
        levelInitial: formData.levelInitial,
        goal: formData.goal.trim(),
        preferredTime: formData.preferredTime,
      }

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || t('registrationFailed'))
      }

      router.push('/auth/login?registered=true')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F1E8] via-[#E8DCC8] to-[#F5F1E8] flex flex-col items-center justify-center px-4 py-8 sm:py-12">
      <Card className="w-full max-w-md p-6 sm:p-8 bg-white/90 backdrop-blur-sm shadow-2xl border-2 border-[#d4c9b8]">
        <div className="flex justify-between items-center mb-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <LanguageToggle />
        </div>

        <div className="text-center mb-6 sm:mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-3 sm:mb-4 hover:opacity-80 transition-opacity">
            <Image src="/logo.png" alt="Youspeak" width={40} height={40} className="sm:w-[50px] sm:h-[50px]" />
            <span className="text-xl sm:text-2xl font-bold text-black">Youspeak</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-black">
            Create Your Account
          </h1>
          <p className="text-sm sm:text-base text-center text-black mb-4 sm:mb-8">
            Join us today to start learning
          </p>
        </div>

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

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <Input
            type="text"
            label={t('fullName')}
            placeholder="John Doe"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            leftIcon={<User className="h-4 w-4 sm:h-5 sm:w-5" />}
            inputSize="md"
          />

          <Input
            type="email"
            label={t('email')}
            placeholder="your.email@example.com"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            leftIcon={<Mail className="h-4 w-4 sm:h-5 sm:w-5" />}
            inputSize="md"
          />

          <Input
            type="tel"
            label={t('whatsappNumber')}
            placeholder="+966... or +20..."
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            leftIcon={<Phone className="h-4 w-4 sm:h-5 sm:w-5" />}
            inputSize="md"
            hint={t('phoneHint')}
          />

          <Input
            type="number"
            label={t('age')}
            placeholder="18"
            required
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            leftIcon={<Calendar className="h-4 w-4 sm:h-5 sm:w-5" />}
            inputSize="md"
            min="5"
            max="100"
          />

          <div>
            <label className="block text-xs sm:text-sm font-medium text-black mb-2">
              {t('currentLevel')} *
            </label>
            <select
              required
              value={formData.levelInitial}
              onChange={(e) => setFormData({ ...formData, levelInitial: e.target.value })}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004E89] focus:border-transparent text-sm sm:text-base"
            >
              <option value="">{t('selectLevel')}</option>
              <option value="A1">A1 - Beginner</option>
              <option value="A2">A2 - Elementary</option>
              <option value="B1">B1 - Intermediate</option>
              <option value="B2">B2 - Upper Intermediate</option>
            </select>
            <p className="mt-1 text-xs text-gray-500">
              {t('dontKnowLevelHint')}
            </p>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-black mb-2" htmlFor="goal">
              {t('learningGoal')} *
            </label>
            <textarea
              id="goal"
              required
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
              placeholder={t('goalPlaceholder')}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004E89] focus:border-transparent text-sm sm:text-base resize-none"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-black mb-2">
              {t('preferredTime')} *
            </label>
            <select
              required
              value={formData.preferredTime}
              onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004E89] focus:border-transparent text-sm sm:text-base"
            >
              <option value="">{t('selectTime')}</option>
              <option value="morning">{t('morning')}</option>
              <option value="afternoon">{t('afternoon')}</option>
              <option value="evening">{t('evening')}</option>
              <option value="flexible">{t('flexible')}</option>
            </select>
          </div>

          <Input
            type="password"
            label={t('password')}
            placeholder="••••••••"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            leftIcon={<Lock className="h-4 w-4 sm:h-5 sm:w-5" />}
            inputSize="md"
            hint={t('passwordHint')}
          />

          <Input
            type="password"
            label={t('confirmPassword')}
            placeholder="••••••••"
            required
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            leftIcon={<Lock className="h-4 w-4 sm:h-5 sm:w-5" />}
            inputSize="md"
          />

          <Button
            type="submit"
            fullWidth
            size="lg"
            loading={loading}
            className="font-semibold bg-[#004E89] hover:bg-[#003A6B] text-white text-base sm:text-lg py-3 sm:py-4"
          >
            {loading ? t('creatingAccount') : t('register')}
          </Button>
        </form>

        <p className="mt-4 sm:mt-6 text-center text-black text-xs sm:text-sm">
          {t('alreadyHaveAccount')} {' '}
          <Link href="/auth/login" className="text-[#004E89] hover:text-[#003A6B] font-semibold">
            {t('login')}
          </Link>
        </p>

        <Alert variant="info" className="mt-4 sm:mt-6">
          <p className="text-xs sm:text-sm text-black">
            <strong>{t('note')}:</strong> {t('accountReview')}
            <strong className="text-[#004E89]">{t('contactNumber')}</strong> {t('forPaymentActivation')}
          </p>
        </Alert>
      </Card>

      <footer className="w-full py-4 sm:py-6 text-center text-sm sm:text-base text-black bg-[#F5F1E8] border-t-2 border-[#d4c9b8] mt-4 sm:mt-8">
        <p className="px-4">Made with ❤️ by MA3K Company</p>
      </footer>
    </div>
  )
}