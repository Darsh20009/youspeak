

'use client';

import Image from "next/image";
import Link from "next/link";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { useTheme } from "@/lib/contexts/ThemeContext";
import { Moon, Sun, BookOpen, Video, Users, Award, Globe, Sparkles, MessageCircle, Target } from "lucide-react";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="min-h-screen bg-[#F5F1E8] text-black">
      {/* Header */}
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between backdrop-blur-sm bg-white/30 rounded-2xl px-6 py-4 shadow-lg border-2 border-[#d4c9b8]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-[#004E89] blur-xl opacity-20 rounded-full"></div>
              <Image
                src="/logo.png"
                alt="Youspeak Logo"
                width={50}
                height={50}
                priority
                className="relative w-12 h-12 sm:w-14 sm:h-14"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-bold text-black">
                Youspeak
              </span>
              <p className="text-xs text-gray-700">Master English Today</p>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border-2 border-[#004E89] text-[#004E89] hover:bg-[#004E89] hover:text-white transition-all duration-300 shadow-md hover:shadow-xl"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link
              href="/auth/login"
              className="px-4 py-2.5 sm:px-6 sm:py-2.5 text-sm sm:text-base rounded-xl bg-[#004E89] text-white hover:bg-[#003A6B] transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
            >
              تسجيل الدخول • Login
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 md:py-24 text-center relative">
          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 text-6xl opacity-20 animate-bounce">📚</div>
          <div className="absolute top-40 right-20 text-5xl opacity-20 animate-pulse">🎓</div>
          <div className="absolute bottom-20 left-1/4 text-7xl opacity-20">✨</div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#004E89]/10 border-2 border-[#004E89] px-6 py-2 rounded-full mb-6 backdrop-blur-sm">
              <Sparkles className="w-5 h-5 text-[#004E89]" />
              <span className="text-sm font-semibold text-black">
                Professional Online Learning Platform
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 px-2">
              <span className="text-black">
                Learn English
              </span>
              <br />
              <span className="text-[#004E89]">
                with Mister Youssef
              </span>
            </h1>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 px-2" dir="rtl">
              <span className="text-black">
                تعلم الإنجليزية
              </span>
              <span className="text-[#004E89]"> مع مستر يوسف</span>
            </h2>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-800 mb-4 max-w-3xl mx-auto px-4 leading-relaxed">
              🌟 Transform your English skills with interactive live classes
            </p>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-800 mb-10 max-w-3xl mx-auto px-4 leading-relaxed" dir="rtl">
              حوّل مهاراتك في اللغة الإنجليزية مع دروس حية تفاعلية 🌟
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 max-w-xl mx-auto">
              <Link
                href="/auth/register"
                className="group w-full sm:w-auto px-8 py-4 bg-[#004E89] text-white rounded-2xl text-lg font-bold hover:bg-[#003A6B] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 text-center relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  🚀 ابدأ الآن • Start Now
                </span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </Link>
              <a
                href="https://wa.me/201091515594"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto px-8 py-4 bg-[#25D366] text-white rounded-2xl text-lg font-bold hover:bg-[#1EAA4F] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 text-center relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  💬 WhatsApp واتساب
                </span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              icon: <Video className="w-8 h-8" />,
              emoji: "🎥",
              title: "Live Interactive Classes",
              titleAr: "دروس تفاعلية مباشرة",
              description: "60-minute sessions with professional teachers",
              descriptionAr: "جلسات 60 دقيقة مع معلمين محترفين"
            },
            {
              icon: <Target className="w-8 h-8" />,
              emoji: "🎯",
              title: "Level Assessment",
              titleAr: "تقييم المستوى",
              description: "Free 20-minute placement test",
              descriptionAr: "اختبار تحديد مستوى مجاني 20 دقيقة"
            },
            {
              icon: <BookOpen className="w-8 h-8" />,
              emoji: "📖",
              title: "Smart Learning",
              titleAr: "تعلم ذكي",
              description: "Personalized vocabulary tracking",
              descriptionAr: "تتبع المفردات الشخصي"
            },
            {
              icon: <Users className="w-8 h-8" />,
              emoji: "👥",
              title: "Expert Teachers",
              titleAr: "معلمون خبراء",
              description: "Certified and experienced instructors",
              descriptionAr: "معلمون معتمدون وذوو خبرة"
            },
            {
              icon: <MessageCircle className="w-8 h-8" />,
              emoji: "💬",
              title: "24/7 Support",
              titleAr: "دعم على مدار الساعة",
              description: "Always here to help you succeed",
              descriptionAr: "دائماً هنا لمساعدتك على النجاح"
            },
            {
              icon: <Award className="w-8 h-8" />,
              emoji: "🏆",
              title: "Certificates",
              titleAr: "شهادات",
              description: "Recognized completion certificates",
              descriptionAr: "شهادات إنجاز معترف بها"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="group bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-[#d4c9b8] hover:border-[#004E89] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 text-6xl opacity-10 transform translate-x-4 -translate-y-2">
                {feature.emoji}
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-[#004E89] text-white rounded-xl group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <span className="text-4xl">{feature.emoji}</span>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">
                  {feature.title}
                </h3>
                <h4 className="text-lg font-semibold text-gray-800 mb-3" dir="rtl">
                  {feature.titleAr}
                </h4>
                <p className="text-sm text-gray-700 mb-1">
                  {feature.description}
                </p>
                <p className="text-sm text-gray-700" dir="rtl">
                  {feature.descriptionAr}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Packages Section */}
        <section className="py-16 bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 mb-16 border-2 border-[#d4c9b8]">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#004E89]/10 border-2 border-[#004E89] px-6 py-2 rounded-full mb-4">
              <Globe className="w-5 h-5 text-[#004E89]" />
              <span className="text-sm font-semibold text-black">
                Choose Your Package
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-black">
                Our Packages
              </span>
              <span className="text-black"> • </span>
              <span className="text-black" dir="rtl">باقاتنا</span>
            </h2>
            <p className="text-lg text-gray-800">
              💎 Premium learning experiences at affordable prices
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { name: "Single Level", nameAr: "مستوى واحد", price: "200", lessons: "8", duration: "2 months", emoji: "📘", popular: false },
              { name: "Monthly", nameAr: "شهري", price: "360", lessons: "12", duration: "Best Value", emoji: "⭐", popular: true },
              { name: "Quarterly", nameAr: "ربع سنوي", price: "1000", lessons: "36", duration: "3 months", emoji: "📚", popular: false },
              { name: "Premium", nameAr: "بريميوم", price: "1800", lessons: "48", duration: "6 months", emoji: "👑", popular: false }
            ].map((pkg, index) => (
              <div
                key={index}
                className={`relative rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 ${
                  pkg.popular
                    ? 'bg-[#004E89] text-white shadow-2xl scale-105'
                    : 'bg-white/80 backdrop-blur-sm border-2 border-[#d4c9b8] shadow-lg hover:shadow-2xl text-black'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                    🔥 BEST VALUE
                  </div>
                )}
                <div className="text-5xl mb-3">{pkg.emoji}</div>
                <h3 className={`text-xl font-bold mb-2 ${pkg.popular ? 'text-white' : 'text-black'}`}>
                  {pkg.name}
                </h3>
                <p className={`text-sm mb-4 ${pkg.popular ? 'text-gray-200' : 'text-gray-800'}`} dir="rtl">
                  {pkg.nameAr}
                </p>
                <div className="mb-4">
                  <span className={`text-4xl font-bold ${pkg.popular ? 'text-white' : 'text-black'}`}>
                    {pkg.price}
                  </span>
                  <span className={`text-lg ${pkg.popular ? 'text-gray-200' : 'text-gray-700'}`}> SAR</span>
                </div>
                <p className={`text-sm ${pkg.popular ? 'text-gray-200' : 'text-gray-700'}`}>
                  {pkg.lessons} lessons • {pkg.duration}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#004E89] text-white rounded-2xl font-bold hover:bg-[#003A6B] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <BookOpen className="w-5 h-5" />
              <span>View All Packages • عرض جميع الباقات</span>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white/40 backdrop-blur-sm border-t-2 border-[#d4c9b8] text-black py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Image
              src="/logo.png"
              alt="Youspeak Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-2xl font-bold text-black">Youspeak</span>
          </div>
          <div className="space-y-2 mb-6 text-gray-800">
            <p className="flex items-center justify-center gap-2">
              📧 youspeak.help@gmail.com
            </p>
            <p className="flex items-center justify-center gap-2">
              📱 +201091515594
            </p>
          </div>
          <div className="h-px bg-[#d4c9b8] max-w-md mx-auto mb-6"></div>
          <p className="text-sm text-gray-700">
            © 2024 Youspeak - All Rights Reserved • جميع الحقوق محفوظة
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Made with ❤️ by MA3K Company
          </p>
        </div>
      </footer>

      <FloatingContactButtons />
    </div>
  );
}

