import Link from 'next/link'
import { Check, ArrowLeft } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import FloatingContactButtons from '@/components/FloatingContactButtons'

export default async function PackagesPage() {
  const packages = await prisma.package.findMany({
    where: { isActive: true },
    orderBy: { price: 'asc' }
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5DC] to-white">
      <header className="bg-[#004E89] text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">Youspeak</h1>
            </div>
            <div className="flex gap-4">
              <Link
                href="/"
                className="px-6 py-2 rounded-lg border-2 border-white text-white hover:bg-white hover:text-[#004E89] transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home / العودة للرئيسية
              </Link>
              <Link
                href="/auth/login"
                className="px-6 py-2 rounded-lg bg-white text-[#004E89] hover:bg-gray-100 transition-colors"
              >
                Login / تسجيل الدخول
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#004E89] mb-4">
            Our Packages / باقاتنا
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Choose the perfect learning package for your English journey
          </p>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto" dir="rtl">
            اختر الباقة المثالية لرحلتك في تعلم اللغة الإنجليزية
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
          {packages.map((pkg, index) => {
            const isRecommended = pkg.title === 'Monthly' || pkg.titleAr === 'شهري'
            const isPopular = pkg.lessonsCount === 12
            
            return (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-105 ${
                  isRecommended ? 'ring-4 ring-[#004E89]' : ''
                }`}
              >
                {isRecommended && (
                  <div className="absolute top-0 right-0 bg-[#004E89] text-white px-4 py-1 rounded-bl-lg font-semibold text-sm">
                    Recommended / موصى به
                  </div>
                )}
                
                <div className={`p-8 ${isRecommended ? 'bg-gradient-to-br from-[#004E89] to-[#1a6ba8]' : 'bg-gray-50'}`}>
                  <h3 className={`text-2xl font-bold mb-2 ${isRecommended ? 'text-white' : 'text-[#004E89]'}`}>
                    {pkg.title}
                  </h3>
                  <p className={`text-lg ${isRecommended ? 'text-white/90' : 'text-gray-600'}`}>
                    {pkg.titleAr}
                  </p>
                </div>

                <div className="p-8">
                  <div className="text-center mb-6">
                    <p className="text-5xl font-bold text-[#004E89] mb-2">
                      {pkg.price}
                      <span className="text-2xl text-gray-600"> SAR</span>
                    </p>
                    <p className="text-gray-600">
                      {Math.ceil(pkg.durationDays / 30)} month(s) / شهر
                    </p>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700">
                        {pkg.lessonsCount} live sessions / حصة مباشرة
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700">
                        60-minute interactive classes / حصص تفاعلية 60 دقيقة
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700">
                        Homework & corrections / واجبات وتصحيح
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700">
                        Vocabulary tracking / تتبع الكلمات
                      </p>
                    </div>
                    {pkg.description && (
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-700">{pkg.description}</p>
                      </div>
                    )}
                    {pkg.descriptionAr && (
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-700" dir="rtl">{pkg.descriptionAr}</p>
                      </div>
                    )}
                  </div>

                  <Link
                    href="/auth/register"
                    className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                      isRecommended
                        ? 'bg-[#004E89] text-white hover:bg-[#003A6A]'
                        : 'bg-gray-200 text-[#004E89] hover:bg-gray-300'
                    }`}
                  >
                    Get Started / ابدأ الآن
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-[#004E89] mb-6 text-center">
            How It Works / كيف يعمل
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#004E89] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Register / سجل</h4>
              <p className="text-sm text-gray-600">
                Create your account and select a package
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#004E89] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Pay / ادفع</h4>
              <p className="text-sm text-gray-600">
                Contact us via WhatsApp for payment details
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#004E89] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Learn / تعلم</h4>
              <p className="text-sm text-gray-600">
                Start attending live interactive sessions
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-700 mb-4">
              Need help choosing? Contact us on WhatsApp
            </p>
            <p className="text-gray-700 mb-4" dir="rtl">
              تحتاج مساعدة في الاختيار؟ تواصل معنا عبر الواتساب
            </p>
            <a
              href="https://wa.me/201091515594"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Contact WhatsApp / واتساب
            </a>
          </div>
        </div>
      </main>

      <footer className="bg-[#004E89] text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">Contact Us: youspeak.help@gmail.com</p>
          <p className="mb-2">WhatsApp: +201091515594</p>
          <p className="text-sm opacity-75">© 2024 Youspeak - All Rights Reserved</p>
        </div>
      </footer>

      <FloatingContactButtons />
    </div>
  )
}
