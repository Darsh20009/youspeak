'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import FloatingContactButtons from "@/components/FloatingContactButtons";

/* ─── Level data ─── */
const LEVELS_AR = [
  {
    code: 'A1', name: 'مبتدئ', emoji: '🌱',
    desc: 'تبدأ من الصفر تماماً',
    color: 'from-slate-500 to-gray-600', light: 'from-slate-50 to-gray-50', dot: '#94a3b8', badge: '#64748b',
    tagline: 'الأساس القوي يبدأ من هنا',
    skills: ['الحروف والنطق', 'مفردات يومية أساسية', 'جمل تعريفية بسيطة'],
    sessions: '٤ حصص / شهرياً', price: '349', oldPrice: null, duration: '٣ أشهر',
  },
  {
    code: 'A2', name: 'أساسي', emoji: '🌿',
    desc: 'كلمات وجمل بسيطة',
    color: 'from-blue-500 to-cyan-600', light: 'from-blue-50 to-cyan-50', dot: '#3b82f6', badge: '#2563eb',
    tagline: 'تتحدث في المواقف اليومية',
    skills: ['المحادثة اليومية', 'الأزمنة الأساسية', 'التسوق والسفر'],
    sessions: '٤ حصص / شهرياً', price: '399', oldPrice: null, duration: '٣ أشهر',
  },
  {
    code: 'B1', name: 'متوسط', emoji: '🌳',
    desc: 'تتواصل بسهولة',
    color: 'from-emerald-500 to-teal-600', light: 'from-emerald-50 to-teal-50', dot: '#10b981', badge: '#059669',
    tagline: 'تعبّر عن أفكارك بوضوح',
    skills: ['المحادثة الطليقة', 'قواعد متقدمة', 'الكتابة الاحترافية'],
    sessions: '٨ حصص / شهرياً', price: '599', oldPrice: null, duration: '٤ أشهر',
  },
  {
    code: 'B2', name: 'متقدم', emoji: '⭐',
    desc: 'طلاقة في أغلب المواقف',
    color: 'from-teal-500 to-emerald-600', light: 'from-teal-50 to-emerald-50', dot: '#14b8a6', badge: '#0d9488',
    tagline: 'تتحدث كالمحترفين',
    skills: ['الإنجليزية المهنية', 'العروض التقديمية', 'الكتابة الأكاديمية'],
    sessions: '٨ حصص / شهرياً', price: '699', oldPrice: null, duration: '٤ أشهر',
  },
  {
    code: 'C1', name: 'احترافي', emoji: '🏆',
    desc: 'كأهل اللغة تماماً',
    color: 'from-purple-500 to-violet-600', light: 'from-purple-50 to-violet-50', dot: '#a855f7', badge: '#7c3aed',
    tagline: 'القمة — إتقان كامل للغة',
    skills: ['IELTS / TOEFL', 'مقابلات العمل', 'الخطابة والإقناع'],
    sessions: '١٦ حصة / شهرياً', price: '999', oldPrice: null, duration: '٦ أشهر',
  },
];

const LEVELS_EN = [
  {
    code: 'A1', name: 'Beginner', emoji: '🌱',
    desc: 'Starting from zero',
    color: 'from-slate-500 to-gray-600', light: 'from-slate-50 to-gray-50', dot: '#94a3b8', badge: '#64748b',
    tagline: 'Build a strong foundation',
    skills: ['Letters & pronunciation', 'Basic daily vocabulary', 'Simple introductions'],
    sessions: '4 sessions / month', price: '349', oldPrice: null, duration: '3 months',
  },
  {
    code: 'A2', name: 'Elementary', emoji: '🌿',
    desc: 'Basic words & sentences',
    color: 'from-blue-500 to-cyan-600', light: 'from-blue-50 to-cyan-50', dot: '#3b82f6', badge: '#2563eb',
    tagline: 'Handle everyday situations',
    skills: ['Daily conversations', 'Basic tenses', 'Shopping & travel'],
    sessions: '4 sessions / month', price: '399', oldPrice: null, duration: '3 months',
  },
  {
    code: 'B1', name: 'Intermediate', emoji: '🌳',
    desc: 'Communicate with ease',
    color: 'from-emerald-500 to-teal-600', light: 'from-emerald-50 to-teal-50', dot: '#10b981', badge: '#059669',
    tagline: 'Express yourself clearly',
    skills: ['Fluent conversation', 'Advanced grammar', 'Professional writing'],
    sessions: '8 sessions / month', price: '599', oldPrice: null, duration: '4 months',
  },
  {
    code: 'B2', name: 'Advanced', emoji: '⭐',
    desc: 'Fluent in most situations',
    color: 'from-teal-500 to-emerald-600', light: 'from-teal-50 to-emerald-50', dot: '#14b8a6', badge: '#0d9488',
    tagline: 'Speak like a professional',
    skills: ['Business English', 'Presentations', 'Academic writing'],
    sessions: '8 sessions / month', price: '699', oldPrice: null, duration: '4 months',
  },
  {
    code: 'C1', name: 'Mastery', emoji: '🏆',
    desc: 'Like a native speaker',
    color: 'from-purple-500 to-violet-600', light: 'from-purple-50 to-violet-50', dot: '#a855f7', badge: '#7c3aed',
    tagline: 'Peak — full language mastery',
    skills: ['IELTS / TOEFL', 'Job interviews', 'Public speaking'],
    sessions: '16 sessions / month', price: '999', oldPrice: null, duration: '6 months',
  },
];

export default function HomePage() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [activeLevel, setActiveLevel] = useState<string | null>(null);
  const isAr = lang === 'ar';
  const LEVELS = isAr ? LEVELS_AR : LEVELS_EN;
  const activeLvl = LEVELS.find(l => l.code === activeLevel) || null;

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

            {/* ── Level cards ── */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 relative z-10">
              {LEVELS.map((lvl) => {
                const isActive = activeLevel === lvl.code;
                return (
                  <button
                    key={lvl.code}
                    onClick={() => setActiveLevel(isActive ? null : lvl.code)}
                    className={`group relative rounded-2xl p-4 flex flex-col items-center text-center transition-all duration-300 cursor-pointer outline-none border-2 ${
                      isActive
                        ? `bg-gradient-to-b ${lvl.color} border-transparent shadow-2xl scale-105 text-white`
                        : 'bg-white border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-200 hover:-translate-y-1'
                    }`}
                  >
                    {/* Active glow ring */}
                    {isActive && (
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${lvl.color} opacity-20 blur-lg -z-10 scale-110`} />
                    )}

                    {/* Colored dot */}
                    <div
                      className={`w-4 h-4 rounded-full mb-3 ring-2 ring-white shadow-md transition-transform ${isActive ? 'scale-125' : ''}`}
                      style={{ background: lvl.dot }}
                    />

                    {/* Emoji */}
                    <div className={`text-3xl mb-2 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                      {lvl.emoji}
                    </div>

                    {/* Level code badge */}
                    <span
                      className={`text-[11px] font-black px-2 py-0.5 rounded-full mb-1.5 transition-all ${
                        isActive ? 'bg-white/25 text-white' : 'text-white'
                      }`}
                      style={isActive ? {} : { background: lvl.badge }}
                    >
                      {lvl.code}
                    </span>

                    {/* Name */}
                    <div className={`font-bold text-sm mb-0.5 ${isActive ? 'text-white' : 'text-gray-900'}`}>
                      {lvl.name}
                    </div>

                    {/* Desc */}
                    <div className={`text-[11px] leading-tight ${isActive ? 'text-white/80' : 'text-gray-400'}`}>
                      {lvl.desc}
                    </div>

                    {/* Click hint arrow */}
                    {!isActive && (
                      <div className="mt-2 text-[10px] text-gray-300 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        {isAr ? 'اضغط للتفاصيل ▾' : 'Click for details ▾'}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* ── Expanded detail panel ── */}
            {activeLvl && (
              <div className={`mt-6 rounded-2xl bg-gradient-to-br ${activeLvl.color} p-[2px] shadow-2xl`}>
                <div className="bg-white rounded-[14px] overflow-hidden">
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${activeLvl.color} px-8 py-6 flex items-center justify-between`}>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shadow-inner">
                        {activeLvl.emoji}
                      </div>
                      <div>
                        <div className="text-white/70 text-sm font-medium">{isAr ? 'المستوى' : 'Level'}</div>
                        <div className="text-white text-2xl font-black">{activeLvl.code} — {activeLvl.name}</div>
                        <div className="text-white/80 text-sm mt-0.5">{activeLvl.tagline}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveLevel(null)}
                      className="text-white/60 hover:text-white text-2xl font-light transition leading-none"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Body */}
                  <div className="px-8 py-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Skills */}
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                        {isAr ? 'ماذا ستتعلم؟' : 'What you will learn'}
                      </div>
                      <ul className="space-y-2">
                        {activeLvl.skills.map((s, i) => (
                          <li key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
                            <span
                              className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white"
                              style={{ background: activeLvl.dot }}
                            >✓</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Plan info */}
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                        {isAr ? 'تفاصيل الباقة' : 'Plan details'}
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <span className="text-xl">📅</span>
                          <div>
                            <div className="text-xs text-gray-400">{isAr ? 'الحصص' : 'Sessions'}</div>
                            <div className="font-bold text-gray-900 text-sm">{activeLvl.sessions}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <span className="text-xl">⏱</span>
                          <div>
                            <div className="text-xs text-gray-400">{isAr ? 'المدة المتوقعة' : 'Est. duration'}</div>
                            <div className="font-bold text-gray-900 text-sm">{activeLvl.duration}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Price + CTA */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                          {isAr ? 'السعر الشهري' : 'Monthly price'}
                        </div>
                        <div className="flex items-end gap-1 mb-1">
                          <span className="text-5xl font-black leading-none" style={{ color: activeLvl.dot }}>
                            {activeLvl.price}
                          </span>
                          <span className="text-gray-400 text-sm pb-1.5">{isAr ? 'جنيه / شهر' : 'EGP / mo'}</span>
                        </div>
                        <div className="flex gap-1.5 mt-3 flex-wrap">
                          {[isAr ? '💬 واتساب يومي' : '💬 Daily WhatsApp',
                            isAr ? '📊 لوحة تحكم' : '📊 Dashboard',
                            isAr ? '🏆 شهادة' : '🏆 Certificate'].map((tag, i) => (
                            <span key={i} className="text-[11px] bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Link
                        href="/auth/register"
                        className="mt-5 block text-center py-3 rounded-xl font-bold text-sm text-white transition hover:opacity-90 shadow-lg"
                        style={{ background: `linear-gradient(135deg, ${activeLvl.dot}, ${activeLvl.badge})` }}
                      >
                        {isAr ? `ابدأ مستوى ${activeLvl.code} الآن ←` : `Start ${activeLvl.code} Now →`}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {!activeLevel && (
            <div className="mt-8 text-center">
              <Link
                href="/placement-test"
                className="inline-flex items-center gap-2 bg-[#10B981] text-white font-bold px-7 py-3 rounded-xl hover:bg-emerald-600 transition shadow-sm shadow-emerald-200"
              >
                {isAr ? '🎯 اكتشف مستواك مجاناً' : '🎯 Discover Your Level Free'}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ─── PRICING (standalone backup) ─── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-5">
          <h2 className="text-2xl sm:text-3xl font-black text-center text-gray-900 mb-2">
            {isAr ? 'مقارنة الباقات' : 'Compare Plans'}
          </h2>
          <p className="text-center text-gray-500 mb-12">
            {isAr ? 'كل الباقات تشمل متابعة واتساب + دعم 24/7 + شهادة إتمام' : 'All plans include WhatsApp + 24/7 support + certificate'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center max-w-3xl mx-auto">
            {(isAr ? [
              { name: 'أساسية',  price: '349', unit: 'جنيه شهرياً', features: ['٤ حصص شهرياً', 'مفردات يومية', 'متابعة واتساب', 'دعم 24/7'], popular: false, badge: null },
              { name: 'متقدمة',  price: '599', unit: 'جنيه شهرياً', features: ['٨ حصص شهرياً', 'تمارين مخصصة', 'متابعة يومية', 'تتبع التقدم', 'دعم 24/7'], popular: true,  badge: '⭐ الأكثر طلباً' },
              { name: 'احترافية',price: '999', unit: 'جنيه شهرياً', features: ['١٦ حصة شهرياً', 'تحضير IELTS', 'تمارين مخصصة', 'مقابلات العمل', 'دعم 24/7'], popular: false, badge: '🏆 الأشمل' },
            ] : [
              { name: 'Basic',    price: '349', unit: 'EGP/month', features: ['4 sessions/month', 'Daily vocabulary', 'WhatsApp follow-up', '24/7 support'], popular: false, badge: null },
              { name: 'Advanced', price: '599', unit: 'EGP/month', features: ['8 sessions/month', 'Custom exercises', 'Daily follow-up', 'Progress tracking', '24/7 support'], popular: true,  badge: '⭐ Most Popular' },
              { name: 'Pro',      price: '999', unit: 'EGP/month', features: ['16 sessions/month', 'IELTS prep', 'Custom exercises', 'Interview prep', '24/7 support'], popular: false, badge: '🏆 All-Inclusive' },
            ]).map((p, i) => (
              <div
                key={i}
                className={`rounded-2xl flex flex-col transition-all ${
                  p.popular
                    ? 'bg-[#10B981] p-7 shadow-2xl shadow-emerald-200 scale-105 z-10'
                    : 'bg-white p-6 border border-gray-200 shadow-sm'
                }`}
              >
                {p.badge && (
                  <div className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full w-fit mb-4 ${
                    p.popular ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    {p.badge}
                  </div>
                )}
                <div className={`text-xl font-black mb-1 ${p.popular ? 'text-white' : 'text-gray-900'}`}>{p.name}</div>
                <div className="flex items-end gap-1 mb-1">
                  <span className={`text-4xl font-black leading-none ${p.popular ? 'text-white' : 'text-[#10B981]'}`}>{p.price}</span>
                  <span className={`text-sm pb-1 ${p.popular ? 'text-white/80' : 'text-gray-400'}`}>{p.unit}</span>
                </div>
                <div className={`h-px my-5 ${p.popular ? 'bg-white/20' : 'bg-gray-100'}`} />
                <ul className="flex-1 space-y-3 mb-6">
                  {p.features.map((f, j) => (
                    <li key={j} className={`flex items-center gap-2.5 text-sm ${p.popular ? 'text-white/90' : 'text-gray-600'}`}>
                      <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        p.popular ? 'bg-white/20 text-white' : 'bg-emerald-50 text-[#10B981]'
                      }`}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/auth/register"
                  className={`block text-center py-3 rounded-xl font-bold text-sm transition ${
                    p.popular ? 'bg-white text-[#10B981] hover:bg-gray-50' : 'bg-[#10B981] text-white hover:bg-emerald-600'
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
