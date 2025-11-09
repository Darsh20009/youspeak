import Image from "next/image";
import Link from "next/link";
import FloatingContactButtons from "@/components/FloatingContactButtons";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5DC] to-white">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <Image
              src="/logo.png"
              alt="Youspeak Logo"
              width={40}
              height={40}
              priority
              className="sm:w-[50px] sm:h-[50px]"
            />
            <span className="text-xl sm:text-2xl font-bold text-[#004E89]">Youspeak</span>
          </div>
          <div className="flex gap-2 sm:gap-4">
            <Link
              href="/auth/login"
              className="px-3 py-2 sm:px-6 sm:py-2 text-sm sm:text-base rounded-lg border-2 border-[#004E89] text-[#004E89] hover:bg-[#004E89] hover:text-white transition-colors"
            >
              Login / تسجيل الدخول
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-12 sm:py-16 md:py-20 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#004E89] mb-4 sm:mb-6 px-2">
            Learn English with Mister Youssef
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#004E89] mb-6 sm:mb-8 px-2" dir="rtl">
            تعلم الإنجليزية مع مستر يوسف
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-3 sm:mb-4 max-w-2xl mx-auto px-4">
            Professional online English learning platform with live interactive classes
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 sm:mb-12 max-w-2xl mx-auto px-4" dir="rtl">
            منصة تعليم اللغة الإنجليزية عبر الإنترنت مع دروس حية تفاعلية
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 max-w-md sm:max-w-none mx-auto">
            <Link
              href="/auth/register"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#004E89] text-white rounded-lg text-base sm:text-lg font-semibold hover:bg-[#003A6A] transition-colors text-center"
            >
              Join Us / انضم إلينا
            </Link>
            <a
              href="https://wa.me/201091515594"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-green-600 text-white rounded-lg text-base sm:text-lg font-semibold hover:bg-green-700 transition-colors text-center"
            >
              Contact WhatsApp / واتساب
            </a>
          </div>
        </section>

        <section className="py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <div className="bg-white p-5 sm:p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-[#004E89] mb-3 sm:mb-4">Live Classes</h3>
            <p className="text-sm sm:text-base text-gray-600">60-minute interactive sessions with professional teachers</p>
          </div>
          <div className="bg-white p-5 sm:p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-[#004E89] mb-3 sm:mb-4">Level Assessment</h3>
            <p className="text-sm sm:text-base text-gray-600">Free 20-minute placement test to determine your level</p>
          </div>
          <div className="bg-white p-5 sm:p-6 rounded-lg shadow-lg text-center sm:col-span-2 md:col-span-1">
            <h3 className="text-xl sm:text-2xl font-bold text-[#004E89] mb-3 sm:mb-4">Smart Learning</h3>
            <p className="text-sm sm:text-base text-gray-600">Personalized vocabulary tracking and homework correction</p>
          </div>
        </section>

        <section className="py-8 sm:py-12 md:py-16 bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#004E89] mb-6 sm:mb-8">Our Packages / باقاتنا</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="border-2 border-[#004E89] rounded-lg p-6 text-center hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-4">Single Level</h3>
              <p className="text-3xl font-bold text-[#004E89] mb-4">200 SAR</p>
              <p className="text-gray-600">8 lessons • 2 months</p>
            </div>
            <div className="border-2 border-[#004E89] rounded-lg p-6 text-center bg-[#004E89] text-white hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-4">Monthly</h3>
              <p className="text-3xl font-bold mb-4">360 SAR</p>
              <p className="text-white/90">12 lessons • Best Value</p>
            </div>
            <div className="border-2 border-[#004E89] rounded-lg p-6 text-center hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-4">Quarterly</h3>
              <p className="text-3xl font-bold text-[#004E89] mb-4">1000 SAR</p>
              <p className="text-gray-600">36 lessons • 3 months</p>
            </div>
            <div className="border-2 border-green-600 rounded-lg p-6 text-center bg-green-50 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-4">Premium</h3>
              <p className="text-3xl font-bold text-green-600 mb-4">1800 SAR</p>
              <p className="text-gray-600">48 lessons • 6 months</p>
            </div>
          </div>
          <div className="text-center">
            <Link
              href="/packages"
              className="inline-block px-8 py-3 bg-[#004E89] text-white rounded-lg font-semibold hover:bg-[#003A6A] transition-colors"
            >
              View All Packages / عرض جميع الباقات
            </Link>
          </div>
        </section>
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
  );
}
