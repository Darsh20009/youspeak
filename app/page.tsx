import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5DC] to-white">
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Youspeak Logo"
              width={50}
              height={50}
              priority
            />
            <span className="text-2xl font-bold text-[#004E89]">Youspeak</span>
          </div>
          <div className="flex gap-4">
            <Link
              href="/auth/login"
              className="px-6 py-2 rounded-lg border-2 border-[#004E89] text-[#004E89] hover:bg-[#004E89] hover:text-white transition-colors"
            >
              Login / تسجيل الدخول
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4">
        <section className="py-20 text-center">
          <h1 className="text-5xl font-bold text-[#004E89] mb-6">
            Learn English with Mister Youssef
          </h1>
          <h2 className="text-4xl font-bold text-[#004E89] mb-8" dir="rtl">
            تعلم الإنجليزية مع مستر يوسف
          </h2>
          <p className="text-xl text-gray-700 mb-4 max-w-2xl mx-auto">
            Professional online English learning platform with live interactive classes
          </p>
          <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto" dir="rtl">
            منصة تعليم اللغة الإنجليزية عبر الإنترنت مع دروس حية تفاعلية
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/auth/register"
              className="px-8 py-4 bg-[#004E89] text-white rounded-lg text-lg font-semibold hover:bg-[#003A6A] transition-colors"
            >
              Join Us / انضم إلينا
            </Link>
            <a
              href="https://wa.me/201091515594"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Contact WhatsApp / واتساب
            </a>
          </div>
        </section>

        <section className="py-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold text-[#004E89] mb-4">Live Classes</h3>
            <p className="text-gray-600">60-minute interactive sessions with professional teachers</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold text-[#004E89] mb-4">Level Assessment</h3>
            <p className="text-gray-600">Free 20-minute placement test to determine your level</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold text-[#004E89] mb-4">Smart Learning</h3>
            <p className="text-gray-600">Personalized vocabulary tracking and homework correction</p>
          </div>
        </section>

        <section className="py-16 bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-[#004E89] mb-8">Our Packages / باقاتنا</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-2 border-[#004E89] rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold mb-4">Single Level</h3>
              <p className="text-3xl font-bold text-[#004E89] mb-4">200 SAR</p>
              <p className="text-gray-600">8 lessons • 2 months</p>
            </div>
            <div className="border-2 border-[#004E89] rounded-lg p-6 text-center bg-[#004E89] text-white">
              <h3 className="text-xl font-bold mb-4">Monthly</h3>
              <p className="text-3xl font-bold mb-4">360 SAR</p>
              <p className="text-white/90">12 lessons • Best Value</p>
            </div>
            <div className="border-2 border-[#004E89] rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold mb-4">Quarterly</h3>
              <p className="text-3xl font-bold text-[#004E89] mb-4">1000 SAR</p>
              <p className="text-gray-600">36 lessons • 3 months</p>
            </div>
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

      <div className="fixed bottom-8 right-8 flex flex-col gap-4">
        <a
          href="https://wa.me/201091515594"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:bg-green-700 transition-colors"
          title="WhatsApp"
        >
          💬
        </a>
        <a
          href="mailto:youspeak.help@gmail.com"
          className="w-14 h-14 bg-[#004E89] rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:bg-[#003A6A] transition-colors"
          title="Email"
        >
          ✉️
        </a>
      </div>
    </div>
  );
}
