'use client';

import Link from "next/link";
import Image from "next/image";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import AppHeader from "@/components/layout/AppHeader";
import { BookOpen, Video, Users, Award, Globe, Sparkles, MessageCircle, Target, ArrowRight, CheckCircle, Star, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1E8] via-[#E8DCC8] to-[#F5F1E8] text-black">
      <AppHeader variant="marketing">
        <Link
          href="/auth/login"
          className="px-6 py-3 text-base rounded-xl bg-[#004E89] text-white hover:bg-[#003A6B] transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
        >
          Login
        </Link>
      </AppHeader>

      <main>
        {/* Hero Section - More Professional */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Elegant Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#004E89] rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FF6B35] rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-[#004E89] rounded-full blur-3xl"></div>
          </div>

          {/* Geometric Decorations */}
          <div className="absolute top-32 right-20 w-20 h-20 border-4 border-[#004E89]/20 rounded-lg rotate-12 hidden lg:block"></div>
          <div className="absolute bottom-40 left-16 w-16 h-16 border-4 border-[#FF6B35]/20 rounded-full hidden lg:block"></div>
          <div className="absolute top-1/3 left-1/4 w-12 h-12 bg-gradient-to-br from-[#004E89]/10 to-transparent rounded-lg rotate-45 hidden lg:block"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-5xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-[#004E89]/20 px-6 py-3 rounded-full mb-8 shadow-lg">
                <Star className="w-5 h-5 text-[#FFD700] fill-[#FFD700]" />
                <span className="text-sm font-bold text-[#004E89] tracking-wide">
                  PROFESSIONAL ENGLISH LEARNING PLATFORM
                </span>
                <Star className="w-5 h-5 text-[#FFD700] fill-[#FFD700]" />
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight">
                <span className="block text-[#1a1a1a] mb-3">
                  Master English
                </span>
                <span className="block bg-gradient-to-r from-[#004E89] via-[#0066CC] to-[#004E89] bg-clip-text text-transparent">
                  with Excellence
                </span>
              </h1>

              {/* Subtitle */}
              <div className="max-w-3xl mx-auto mb-12 space-y-4">
                <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed">
                  Transform your future with interactive live classes led by expert instructors
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto mb-16">
                <Link
                  href="/auth/register"
                  className="group relative w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-[#004E89] to-[#0066CC] text-white rounded-2xl text-lg font-bold transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 text-center overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <Zap className="w-6 h-6" />
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
                </Link>
                <a
                  href="https://wa.me/201091515594"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full sm:w-auto px-10 py-5 bg-white border-2 border-[#25D366] text-[#25D366] rounded-2xl text-lg font-bold hover:bg-[#25D366] hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 text-center"
                >
                  <span className="flex items-center justify-center gap-3">
                    <MessageCircle className="w-6 h-6" />
                    Contact Us
                  </span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { number: "500+", label: "Students" },
                  { number: "50+", label: "Teachers" },
                  { number: "1000+", label: "Classes" },
                  { number: "98%", label: "Satisfaction" }
                ].map((stat, index) => (
                  <div key={index} className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-[#004E89]/10">
                    <div className="text-4xl font-extrabold text-[#004E89] mb-2">{stat.number}</div>
                    <div className="text-sm font-semibold text-gray-700">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Premium Design */}
        <section className="py-20 bg-gradient-to-b from-white/40 to-transparent">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-[#1a1a1a]">Why Choose </span>
                <span className="text-[#004E89]">Youspeak</span>
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-transparent via-[#004E89] to-transparent mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Video className="w-10 h-10" />,
                  gradient: "from-blue-500 to-blue-700",
                  title: "Live Interactive Classes",
                  description: "Engage in real-time 60-minute sessions with professional teachers"
                },
                {
                  icon: <Target className="w-10 h-10" />,
                  gradient: "from-orange-500 to-red-600",
                  title: "Personalized Assessment",
                  description: "Free 20-minute placement test to identify your level"
                },
                {
                  icon: <BookOpen className="w-10 h-10" />,
                  gradient: "from-green-500 to-emerald-700",
                  title: "Smart Learning System",
                  description: "AI-powered vocabulary tracking and progress monitoring"
                },
                {
                  icon: <Users className="w-10 h-10" />,
                  gradient: "from-purple-500 to-purple-700",
                  title: "Expert Instructors",
                  description: "Certified professionals with years of teaching experience"
                },
                {
                  icon: <MessageCircle className="w-10 h-10" />,
                  gradient: "from-pink-500 to-rose-700",
                  title: "24/7 Support",
                  description: "Round-the-clock assistance for your learning journey"
                },
                {
                  icon: <Award className="w-10 h-10" />,
                  gradient: "from-yellow-500 to-orange-600",
                  title: "Recognized Certificates",
                  description: "Industry-recognized completion certificates"
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 overflow-hidden"
                >
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#004E89]/5 to-transparent rounded-bl-3xl"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages Section - Elegant Design */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-white/80 via-white/60 to-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-16 border border-white/50">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#004E89]/10 to-[#0066CC]/10 border border-[#004E89]/30 px-8 py-3 rounded-full mb-6 shadow-lg">
                  <Globe className="w-6 h-6 text-[#004E89]" />
                  <span className="text-base font-bold text-[#004E89] tracking-wide">
                    INVESTMENT IN YOUR FUTURE
                  </span>
                  <Globe className="w-6 h-6 text-[#004E89]" />
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                  <span className="text-[#1a1a1a]">Choose Your </span>
                  <span className="text-[#004E89]">Package</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Premium learning experiences at competitive prices
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {[
                  { name: "Single Level", price: "200", lessons: "8", duration: "2 months", gradient: "from-blue-500 to-blue-600", popular: false },
                  { name: "Monthly", price: "360", lessons: "12", duration: "1 month", gradient: "from-orange-500 to-red-600", popular: true },
                  { name: "Quarterly", price: "1000", lessons: "36", duration: "3 months", gradient: "from-purple-500 to-purple-600", popular: false },
                  { name: "Premium", price: "1800", lessons: "48", duration: "6 months", gradient: "from-yellow-500 to-orange-600", popular: false }
                ].map((pkg, index) => (
                  <div
                    key={index}
                    className={`relative rounded-3xl p-8 text-center transform transition-all duration-500 ${
                      pkg.popular
                        ? 'bg-gradient-to-br from-[#004E89] to-[#0066CC] text-white shadow-2xl scale-105 lg:scale-110'
                        : 'bg-white border-2 border-gray-200 shadow-xl hover:shadow-2xl hover:scale-105 text-black'
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full text-sm font-black shadow-xl flex items-center gap-2">
                          <Star className="w-4 h-4 fill-black" />
                          BEST VALUE
                          <Star className="w-4 h-4 fill-black" />
                        </div>
                      </div>
                    )}

                    <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${pkg.gradient} rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-lg ${pkg.popular ? 'bg-white/20' : ''}`}>
                      {index + 1}
                    </div>

                    <h3 className={`text-2xl font-extrabold mb-6 ${pkg.popular ? 'text-white' : 'text-[#1a1a1a]'}`}>
                      {pkg.name}
                    </h3>

                    <div className="mb-6">
                      <div className="flex items-end justify-center gap-2">
                        <span className={`text-5xl font-black ${pkg.popular ? 'text-white' : 'text-[#004E89]'}`}>
                          {pkg.price}
                        </span>
                        <span className={`text-2xl font-bold pb-1 ${pkg.popular ? 'text-white/80' : 'text-gray-600'}`}>
                          SAR
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className={`flex items-center justify-center gap-2 ${pkg.popular ? 'text-white' : 'text-gray-700'}`}>
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">{pkg.lessons} lessons</span>
                      </div>
                      <div className={`flex items-center justify-center gap-2 ${pkg.popular ? 'text-white' : 'text-gray-700'}`}>
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">{pkg.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="/packages"
                  className="inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-[#004E89] to-[#0066CC] text-white rounded-2xl text-lg font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <BookOpen className="w-6 h-6" />
                  <span>View All Packages</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Professional */}
      <footer className="relative bg-gradient-to-b from-white/60 to-white/80 backdrop-blur-md border-t-2 border-[#004E89]/10 text-black py-16 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#004E89] to-[#0066CC] rounded-2xl flex items-center justify-center shadow-xl">
                <Image
                  src="/logo.png"
                  alt="Youspeak Logo"
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
              </div>
              <span className="text-4xl font-extrabold bg-gradient-to-r from-[#004E89] to-[#0066CC] bg-clip-text text-transparent">
                Youspeak
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
              <a href="mailto:youspeak.help@gmail.com" className="flex items-center justify-center gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-4 hover:shadow-lg transition-all duration-300 border border-gray-200">
                <div className="w-10 h-10 bg-[#004E89] rounded-lg flex items-center justify-center text-white">
                  📧
                </div>
                <span className="font-semibold text-gray-700">youspeak.help@gmail.com</span>
              </a>
              <a href="tel:+201091515594" className="flex items-center justify-center gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-4 hover:shadow-lg transition-all duration-300 border border-gray-200">
                <div className="w-10 h-10 bg-[#25D366] rounded-lg flex items-center justify-center text-white">
                  📱
                </div>
                <span className="font-semibold text-gray-700">+201091515594</span>
              </a>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#004E89]/30 to-transparent mb-8"></div>

            <p className="text-base font-semibold text-gray-700">
              © 2024 Youspeak - All Rights Reserved
            </p>
          </div>
        </div>

        {/* Bottom Credit */}
        <div className="mt-8 pt-6 border-t border-[#004E89]/10">
          <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
            Crafted with <span className="text-red-500">❤️</span> by MA3K Company
          </p>
        </div>
      </footer>

      <FloatingContactButtons />
    </div>
  );
}