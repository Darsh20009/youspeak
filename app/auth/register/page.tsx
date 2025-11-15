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
      setError('Passwords do not match / كلمات المرور غير متطابقة')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters / كلمة المرور يجب أن تكون 6 أحرف على الأقل')
      return
    }

    const phoneRegex = /^\+?[0-9]{10,15}$/
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      setError('Please enter a valid phone number / يرجى إدخال رقم هاتف صحيح')
      return
    }

    const age = parseInt(formData.age)
    if (isNaN(age) || age < 5 || age > 100) {
      setError('Please enter a valid age (5-100) / يرجى إدخال عمر صحيح (5-100)')
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
    <div className="min-h-screen bg-[#F5F1E8] flex flex-col items-center justify-center p-3 sm:p-4 md:p-6">
      <Card className="w-full max-w-md shadow-2xl bg-[#F5F1E8] border-2 border-[#d4c9b8] mb-4">
        <div className="text-center mb-6 sm:mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-3 sm:mb-4 hover:opacity-80 transition-opacity">
            <Image src="/logo.png" alt="Youspeak" width={40} height={40} className="sm:w-[50px] sm:h-[50px]" />
            <span className="text-xl sm:text-2xl font-bold text-black">Youspeak</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-black">
            Create Account / إنشاء حساب
          </h1>
          <p className="text-sm sm:text-base text-center text-black mb-4 sm:mb-8">
            Join us today / انضم إلينا اليوم
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
            label="Full Name / الاسم الكامل *"
            placeholder="John Doe"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            leftIcon={<User className="h-4 w-4 sm:h-5 sm:w-5" />}
            inputSize="md"
          />

          <Input
            type="email"
            label="Email / البريد الإلكتروني *"
            placeholder="your.email@example.com"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            leftIcon={<Mail className="h-4 w-4 sm:h-5 sm:w-5" />}
            inputSize="md"
          />

          <Input
            type="tel"
            label="WhatsApp Number / رقم الواتساب *"
            placeholder="+966... or +20..."
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            leftIcon={<Phone className="h-4 w-4 sm:h-5 sm:w-5" />}
            inputSize="md"
            hint="Required for account activation / مطلوب لتفعيل الحساب"
          />

          <Input
            type="number"
            label="Age / العمر *"
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
              Current English Level / مستواك الحالي *
            </label>
            <select
              required
              value={formData.levelInitial}
              onChange={(e) => setFormData({ ...formData, levelInitial: e.target.value })}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004E89] focus:border-transparent text-sm sm:text-base"
            >
              <option value="">Select your level / اختر مستواك</option>
              <option value="A1">A1 - Beginner / مبتدئ</option>
              <option value="A2">A2 - Elementary / ابتدائي</option>
              <option value="B1">B1 - Intermediate / متوسط</option>
              <option value="B2">B2 - Upper Intermediate / فوق المتوسط</option>
            </select>
            <p className="mt-1 text-xs text-gray-500">
              Don't know your level? You'll take a 20-minute assessment / لا تعرف مستواك؟ ستأخذ اختبار 20 دقيقة
            </p>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-black mb-2" htmlFor="goal">
              Learning Goal / الهدف من التعلم *
            </label>
            <textarea
              id="goal"
              required
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
              placeholder="e.g., Travel, Work, Study abroad / مثال: السفر، العمل، الدراسة في الخارج"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004E89] focus:border-transparent text-sm sm:text-base resize-none"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-black mb-2">
              Preferred Class Time / الوقت المفضل للحصص *
            </label>
            <select
              required
              value={formData.preferredTime}
              onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004E89] focus:border-transparent text-sm sm:text-base"
            >
              <option value="">Select preferred time / اختر الوقت المفضل</option>
              <option value="morning">Morning (8 AM - 12 PM) / صباحاً (8 - 12 ظهراً)</option>
              <option value="afternoon">Afternoon (12 PM - 5 PM) / بعد الظهر (12 - 5 مساءً)</option>
              <option value="evening">Evening (5 PM - 10 PM) / مساءً (5 - 10 مساءً)</option>
              <option value="flexible">Flexible / مرن</option>
            </select>
          </div>

          <Input
            type="password"
            label="Password / كلمة المرور *"
            placeholder="••••••••"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            leftIcon={<Lock className="h-4 w-4 sm:h-5 sm:w-5" />}
            inputSize="md"
            hint="At least 6 characters / 6 أحرف على الأقل"
          />

          <Input
            type="password"
            label="Confirm Password / تأكيد كلمة المرور *"
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
            {loading ? 'Creating Account... / جارٍ إنشاء الحساب' : 'Register / سجل'}
          </Button>
        </form>

        <p className="mt-4 sm:mt-6 text-center text-black text-xs sm:text-sm">
          Already have an account? / لديك حساب بالفعل؟{' '}
          <Link href="/auth/login" className="text-[#004E89] hover:text-[#003A6B] font-semibold">
            Login / تسجيل الدخول
          </Link>
        </p>

        <Alert variant="info" className="mt-4 sm:mt-6">
          <p className="text-xs sm:text-sm text-black">
            <strong>Note / ملاحظة:</strong> After registration, your account will be reviewed.
            You'll be contacted via WhatsApp at <strong className="text-[#004E89]">+201091515594</strong> for payment and activation.
          </p>
          <p className="text-xs sm:text-sm mt-2 text-black">
            بعد التسجيل، سيتم مراجعة حسابك. سيتم التواصل معك عبر الواتساب على <strong className="text-[#004E89]">+201091515594</strong> للدفع والتفعيل.
          </p>
        </Alert>
      </Card>

      <footer className="mt-4 sm:mt-8 text-center text-xs sm:text-sm text-black px-4">
        Made with ❤️ by MA3K Company
      </footer>
    </div>
  )
}