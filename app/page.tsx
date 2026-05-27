'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import FloatingContactButtons from "@/components/FloatingContactButtons";

export default function HomePage() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const isAr = lang === 'ar';

  return (
    <div dir={isAr ? 'rtl' : 'ltr'} className="min-h-screen bg-white text-gray-900">
      <FloatingContactButtons />

      {/* ─── NAVBAR ─── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Be Fluent" width={36} height={36} className="rounded-lg" />
            <span className="font-black text-lg text-gray-900">Be Fluent</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(isAr ? 'en' : 'ar')}
              className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition"
            >
              {isAr ? 'EN' : 'عربي'}
            </button>
            <Link href="/auth/login" className="text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition">
              {isAr ? 'دخول' : 'Login'}
            </Link>
            <Link href="/auth/register" className="text-sm font-bold bg-[#10B981] text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition">
              {isAr ? 'ابدأ مجاناً' : 'Start Free'}
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="max-w-5xl mx-auto px-5 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-8 border border-emerald-100">
          ⭐ {isAr ? 'أكثر من 5,000 طالب وصلوا للطلاقة' : 'Over 5,000 students reached fluency'}
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-5">
          {isAr ? (
            <>تعلّم الإنجليزية<br /><span className="text-[#10B981]">واحكم العالم</span></>
          ) : (
            <>Learn English,<br /><span className="text-[#10B981]">Rule the World</span></>
          )}
        </h1>

        <p className="text-gray-500 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          {isAr
            ? 'حصص خاصة مع معلمين محترفين — متابعة يومية على واتساب — دعم 24/7'
            : 'Private sessions with expert teachers — Daily WhatsApp follow-up — 24/7 support'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/auth/register"
            className="w-full sm:w-auto bg-[#10B981] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-emerald-600 transition text-base shadow-sm shadow-emerald-200"
          >
            {isAr ? 'احجز حصتك التجريبية مجاناً' : 'Book Your Free Trial'}
          </Link>
          <Link
            href="/placement-test"
            className="w-full sm:w-auto border border-gray-200 text-gray-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-gray-50 transition text-base"
          >
            {isAr ? 'اختبر مستواك' : 'Test Your Level'}
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14 max-w-2xl mx-auto">
          {(isAr
            ? [['5,000+', 'طالب متخرج'], ['4.9/5', 'تقييم الطلاب'], ['50+', 'معلم محترف'], ['24/7', 'دعم مستمر']]
            : [['+5,000', 'Graduates'], ['4.9/5', 'Rating'], ['+50', 'Teachers'], ['24/7', 'Support']]
          ).map(([n, l], i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-[#10B981]">{n}</div>
              <div className="text-xs text-gray-500 mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-5">
          <h2 className="text-2xl sm:text-3xl font-black text-center text-gray-900 mb-2">
            {isAr ? 'لماذا Be Fluent؟' : 'Why Be Fluent?'}
          </h2>
          <p className="text-center text-gray-500 mb-10">
            {isAr ? 'نظام متكامل يأخذك من أي مستوى إلى الطلاقة' : 'A complete system to take you to fluency'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(isAr ? [
              { icon: '🎯', t: 'حصص خاصة 1:1', d: 'جلسات فردية مباشرة مصممة حول أهدافك' },
              { icon: '💬', t: 'متابعة واتساب يومياً', d: 'معلمك يتابعك ويصحح لك كل يوم' },
              { icon: '📊', t: 'تتبع تقدمك', d: 'لوحة تحكم تُظهر مستواك في كل مهارة' },
              { icon: '🌙', t: 'دعم 24/7', d: 'فريقنا متاح في أي وقت لمساعدتك' },
            ] : [
              { icon: '🎯', t: '1:1 Private Sessions', d: 'Live sessions designed around your goals' },
              { icon: '💬', t: 'Daily WhatsApp', d: 'Daily practice and correction from your teacher' },
              { icon: '📊', t: 'Track Progress', d: 'Dashboard showing your skill levels' },
              { icon: '🌙', t: '24/7 Support', d: 'Our team is always here for you' },
            ]).map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100">
                <div className="text-3xl mb-3">{f.icon}</div>
                <div className="font-bold text-gray-900 mb-1">{f.t}</div>
                <div className="text-sm text-gray-500">{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-16 max-w-5xl mx-auto px-5">
        <h2 className="text-2xl sm:text-3xl font-black text-center text-gray-900 mb-2">
          {isAr ? 'كيف تبدأ؟' : 'How it works'}
        </h2>
        <p className="text-center text-gray-500 mb-10">
          {isAr ? '٣ خطوات بسيطة لتبدأ رحلتك' : '3 simple steps to start your journey'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {(isAr ? [
            { n: '١', t: 'اختبر مستواك', d: 'اختبار مجاني لتحديد نقطة انطلاقك' },
            { n: '٢', t: 'اختر باقتك', d: 'باقة تناسب هدفك وميزانيتك' },
            { n: '٣', t: 'تعلّم وتطوّر', d: 'حصص يومية ومتابعة حتى الطلاقة' },
          ] : [
            { n: '1', t: 'Test Your Level', d: 'Free test to find your starting point' },
            { n: '2', t: 'Choose a Plan', d: 'A plan that fits your goal and budget' },
            { n: '3', t: 'Learn & Grow', d: 'Daily sessions and follow-up to fluency' },
          ]).map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl border border-gray-100">
              <div className="w-12 h-12 bg-[#10B981] text-white rounded-2xl flex items-center justify-center text-xl font-black mb-4">
                {s.n}
              </div>
              <div className="font-bold text-gray-900 mb-1">{s.t}</div>
              <div className="text-sm text-gray-500">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── LEVELS ─── */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-5">
          <h2 className="text-2xl sm:text-3xl font-black text-center text-gray-900 mb-2">
            {isAr ? 'من أي مستوى تبدأ؟' : 'What is your level?'}
          </h2>
          <p className="text-center text-gray-500 mb-12">
            {isAr ? 'البرنامج مصمم لجميع المستويات — من الصفر إلى الاحترافية' : 'Designed for all levels — from zero to mastery'}
          </p>

          {/* Level path visual */}
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden sm:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-gray-200 via-[#10B981] to-emerald-300 z-0" />

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 relative z-10">
              {(isAr ? [
                { code: 'A1', name: 'مبتدئ',       emoji: '🌱', desc: 'تبدأ من الصفر', color: 'from-gray-100 to-gray-50',     dot: 'bg-gray-400',    badge: 'text-gray-600 bg-gray-100' },
                { code: 'A2', name: 'أساسي',        emoji: '🌿', desc: 'كلمات وجمل بسيطة', color: 'from-blue-50 to-white',   dot: 'bg-blue-400',    badge: 'text-blue-700 bg-blue-100' },
                { code: 'B1', name: 'متوسط',        emoji: '🌳', desc: 'تتواصل بسهولة', color: 'from-emerald-50 to-white',   dot: 'bg-emerald-500', badge: 'text-emerald-700 bg-emerald-100' },
                { code: 'B2', name: 'متقدم',        emoji: '⭐', desc: 'طلاقة في أغلب المواقف', color: 'from-teal-50 to-white', dot: 'bg-teal-500',  badge: 'text-teal-700 bg-teal-100' },
                { code: 'C1', name: 'احترافي',      emoji: '🏆', desc: 'كأهل اللغة تماماً', color: 'from-purple-50 to-white', dot: 'bg-purple-500', badge: 'text-purple-700 bg-purple-100' },
              ] : [
                { code: 'A1', name: 'Beginner',     emoji: '🌱', desc: 'Starting from zero',       color: 'from-gray-100 to-gray-50',     dot: 'bg-gray-400',    badge: 'text-gray-600 bg-gray-100' },
                { code: 'A2', name: 'Elementary',   emoji: '🌿', desc: 'Basic words & sentences',   color: 'from-blue-50 to-white',        dot: 'bg-blue-400',    badge: 'text-blue-700 bg-blue-100' },
                { code: 'B1', name: 'Intermediate', emoji: '🌳', desc: 'Communicate with ease',     color: 'from-emerald-50 to-white',     dot: 'bg-emerald-500', badge: 'text-emerald-700 bg-emerald-100' },
                { code: 'B2', name: 'Advanced',     emoji: '⭐', desc: 'Fluent in most situations', color: 'from-teal-50 to-white',        dot: 'bg-teal-500',    badge: 'text-teal-700 bg-teal-100' },
                { code: 'C1', name: 'Mastery',      emoji: '🏆', desc: 'Like a native speaker',     color: 'from-purple-50 to-white',      dot: 'bg-purple-500',  badge: 'text-purple-700 bg-purple-100' },
              ]).map((lvl, i) => (
                <div key={i} className={`bg-gradient-to-b ${lvl.color} rounded-2xl border border-gray-100 p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow`}>
                  {/* Dot connector */}
                  <div className={`w-5 h-5 rounded-full ${lvl.dot} ring-4 ring-white shadow mb-4`} />
                  {/* Emoji */}
                  <div className="text-3xl mb-2">{lvl.emoji}</div>
                  {/* Code badge */}
                  <span className={`text-xs font-black px-2.5 py-0.5 rounded-full mb-2 ${lvl.badge}`}>{lvl.code}</span>
                  {/* Name */}
                  <div className="font-bold text-gray-900 text-sm mb-1">{lvl.name}</div>
                  {/* Desc */}
                  <div className="text-xs text-gray-500 leading-relaxed">{lvl.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/placement-test"
              className="inline-flex items-center gap-2 bg-[#10B981] text-white font-bold px-7 py-3 rounded-xl hover:bg-emerald-600 transition shadow-sm shadow-emerald-200"
            >
              {isAr ? '🎯 اكتشف مستواك مجاناً' : '🎯 Discover Your Level Free'}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-5">
          <h2 className="text-2xl sm:text-3xl font-black text-center text-gray-900 mb-2">
            {isAr ? 'الباقات والأسعار' : 'Pricing Plans'}
          </h2>
          <p className="text-center text-gray-500 mb-12">
            {isAr ? 'استثمار في مستقبلك — بدء من 349 جنيه شهرياً' : 'Starting from 349 EGP/month'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center max-w-3xl mx-auto">
            {(isAr ? [
              { name: 'أساسية', price: '349', unit: 'جنيه شهرياً', features: ['٤ حصص شهرياً', 'متابعة واتساب', 'دعم 24/7'], popular: false },
              { name: 'متقدمة', price: '599', unit: 'جنيه شهرياً', features: ['٨ حصص شهرياً', 'متابعة يومية', 'تمارين مخصصة', 'دعم 24/7'], popular: true },
              { name: 'احترافية', price: '999', unit: 'جنيه شهرياً', features: ['١٦ حصة شهرياً', 'متابعة يومية', 'تمارين مخصصة', 'تحضير مقابلات', 'دعم 24/7'], popular: false },
            ] : [
              { name: 'Basic', price: '349', unit: 'EGP / month', features: ['4 sessions/month', 'WhatsApp follow-up', '24/7 support'], popular: false },
              { name: 'Advanced', price: '599', unit: 'EGP / month', features: ['8 sessions/month', 'Daily follow-up', 'Custom exercises', '24/7 support'], popular: true },
              { name: 'Pro', price: '999', unit: 'EGP / month', features: ['16 sessions/month', 'Daily follow-up', 'Custom exercises', 'Interview prep', '24/7 support'], popular: false },
            ]).map((p, i) => (
              <div
                key={i}
                className={`rounded-2xl flex flex-col transition-all ${
                  p.popular
                    ? 'bg-[#10B981] p-7 shadow-2xl shadow-emerald-200 scale-105 z-10'
                    : 'bg-white p-6 border border-gray-200 shadow-sm'
                }`}
              >
                {/* Popular badge */}
                {p.popular && (
                  <div className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">
                    ⭐ {isAr ? 'الأكثر طلباً' : 'Most Popular'}
                  </div>
                )}

                {/* Name */}
                <div className={`text-xl font-black mb-1 ${p.popular ? 'text-white' : 'text-gray-900'}`}>
                  {p.name}
                </div>

                {/* Price */}
                <div className="flex items-end gap-1 mb-1">
                  <span className={`text-4xl font-black leading-none ${p.popular ? 'text-white' : 'text-[#10B981]'}`}>
                    {p.price}
                  </span>
                  <span className={`text-sm pb-1 ${p.popular ? 'text-white/80' : 'text-gray-400'}`}>
                    {p.unit}
                  </span>
                </div>

                {/* Divider */}
                <div className={`h-px my-5 ${p.popular ? 'bg-white/20' : 'bg-gray-100'}`} />

                {/* Features */}
                <ul className="flex-1 space-y-3 mb-6">
                  {p.features.map((f, j) => (
                    <li key={j} className={`flex items-center gap-2.5 text-sm ${p.popular ? 'text-white/90' : 'text-gray-600'}`}>
                      <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                        p.popular ? 'bg-white/20 text-white' : 'bg-emerald-50 text-[#10B981]'
                      }`}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/auth/register"
                  className={`block text-center py-3 rounded-xl font-bold text-sm transition ${
                    p.popular
                      ? 'bg-white text-[#10B981] hover:bg-gray-50'
                      : 'bg-[#10B981] text-white hover:bg-emerald-600'
                  }`}
                >
                  {isAr ? 'ابدأ الآن' : 'Get Started'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section className="py-16 max-w-5xl mx-auto px-5">
        <h2 className="text-2xl sm:text-3xl font-black text-center text-gray-900 mb-10">
          {isAr ? 'قالوا عنّا' : 'Student Reviews'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {(isAr ? [
            { name: 'أحمد محمد', lvl: 'A1 ← C1', q: 'في سنة واحدة قدرت أتكلم إنجليزي بطلاقة في الشغل. المتابعة اليومية فرقت معايا جداً.' },
            { name: 'سارة خالد', lvl: 'B1 ← C1', q: 'أفضل استثمار عملته في حياتي. المعلمة كانت متاحة دايماً وتهتم بأهدافي الشخصية.' },
            { name: 'محمود علي', lvl: 'A2 ← B2', q: 'من أول حصة حسيت بالفرق. الطريقة بسيطة ومنظمة وبتشتغل فعلاً.' },
          ] : [
            { name: 'Ahmed Mohamed', lvl: 'A1 → C1', q: 'In one year I was speaking English fluently at work. Daily follow-up made all the difference.' },
            { name: 'Sara Khaled', lvl: 'B1 → C1', q: 'Best investment I\'ve ever made. My teacher was always available and focused on my personal goals.' },
            { name: 'Mahmoud Ali', lvl: 'A2 → B2', q: 'I felt the difference from the very first session. Simple, organized, and it actually works.' },
          ]).map((r, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <div className="text-yellow-400 text-sm mb-3">★★★★★</div>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">"{r.q}"</p>
              <div>
                <div className="font-bold text-gray-900 text-sm">{r.name}</div>
                <div className="text-xs text-[#10B981] font-semibold mt-0.5">{r.lvl}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-[#1F2937] py-14">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            {isAr ? 'ابدأ رحلتك اليوم' : 'Start Your Journey Today'}
          </h2>
          <p className="text-gray-400 mb-8">
            {isAr ? 'الحصة الأولى مجانية — بدون أي التزام' : 'First session free — no commitment'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/auth/register" className="w-full sm:w-auto bg-[#10B981] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-emerald-600 transition">
              {isAr ? 'احجز مجاناً الآن' : 'Book Free Now'}
            </Link>
            <a
              href="https://api.whatsapp.com/send/?phone=201091515594"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto border border-gray-600 text-gray-300 font-semibold px-8 py-3.5 rounded-xl hover:bg-gray-700 transition"
            >
              {isAr ? '💬 تواصل عبر واتساب' : '💬 WhatsApp Us'}
            </a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="max-w-5xl mx-auto px-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <Image src="/logo.png" alt="Be Fluent" width={30} height={30} className="rounded-lg" />
                <span className="font-black text-white">Be Fluent</span>
              </div>
              <p className="text-sm leading-relaxed mb-3">
                {isAr ? 'رحلتك نحو الطلاقة تبدأ هنا' : 'Your fluency journey starts here'}
              </p>
              <a href="https://api.whatsapp.com/send/?phone=201091515594" className="text-sm text-[#10B981] hover:text-emerald-400">
                💬 {isAr ? 'واتساب' : 'WhatsApp'}
              </a>
            </div>

            {/* Learn */}
            <div>
              <div className="font-bold text-white mb-3 text-sm">{isAr ? 'التعلم' : 'Learn'}</div>
              <ul className="space-y-2 text-sm">
                <li><Link href="/placement-test" className="hover:text-white transition">{isAr ? 'اختبار المستوى' : 'Level Test'}</Link></li>
                <li><Link href="/packages" className="hover:text-white transition">{isAr ? 'الباقات' : 'Packages'}</Link></li>
                <li><Link href="/learning-path" className="hover:text-white transition">{isAr ? 'مسار التعلم' : 'Learning Path'}</Link></li>
                <li><Link href="/grammar" className="hover:text-white transition">{isAr ? 'قواعد اللغة' : 'Grammar'}</Link></li>
              </ul>
            </div>

            {/* Account */}
            <div>
              <div className="font-bold text-white mb-3 text-sm">{isAr ? 'الحساب' : 'Account'}</div>
              <ul className="space-y-2 text-sm">
                <li><Link href="/auth/login" className="hover:text-white transition">{isAr ? 'تسجيل الدخول' : 'Login'}</Link></li>
                <li><Link href="/auth/register" className="hover:text-white transition">{isAr ? 'إنشاء حساب' : 'Register'}</Link></li>
                <li><Link href="/dashboard/student" className="hover:text-white transition">{isAr ? 'لوحة الطالب' : 'Dashboard'}</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <div className="font-bold text-white mb-3 text-sm">{isAr ? 'الشركة' : 'Company'}</div>
              <ul className="space-y-2 text-sm">
                <li><Link href="/contact" className="hover:text-white transition">{isAr ? 'تواصل معنا' : 'Contact'}</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">{isAr ? 'سياسة الخصوصية' : 'Privacy'}</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">{isAr ? 'الشروط والأحكام' : 'Terms'}</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-600">
            {isAr ? '© 2025 Be Fluent Academy — جميع الحقوق محفوظة' : '© 2025 Be Fluent Academy — All rights reserved'}
          </div>
        </div>
      </footer>
    </div>
  );
}
