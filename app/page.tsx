'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import FloatingContactButtons from "@/components/FloatingContactButtons";

/* ─────────────────── Level Data ─────────────────── */
const LEVELS = {
  ar: [
    {
      code: 'A1', name: 'مبتدئ', desc: 'تبدأ من الصفر تماماً',
      tagline: 'الأساس القوي يبدأ من هنا',
      skills: ['الحروف والنطق الصحيح', 'مفردات يومية أساسية', 'جمل تعريفية بسيطة'],
      sessions: '٤ حصص / شهر', price: '349', duration: '٣ أشهر',
      gradient: 'linear-gradient(135deg, #64748b, #475569)',
      glow: 'rgba(100,116,139,0.4)', accent: '#94a3b8',
    },
    {
      code: 'A2', name: 'أساسي', desc: 'كلمات وجمل بسيطة',
      tagline: 'تتحدث في المواقف اليومية',
      skills: ['المحادثة اليومية البسيطة', 'الأزمنة الأساسية', 'التسوق والسفر'],
      sessions: '٤ حصص / شهر', price: '399', duration: '٣ أشهر',
      gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)',
      glow: 'rgba(59,130,246,0.4)', accent: '#60a5fa',
    },
    {
      code: 'B1', name: 'متوسط', desc: 'تتواصل بسهولة',
      tagline: 'تعبّر عن أفكارك بوضوح',
      skills: ['المحادثة الطليقة', 'قواعد متقدمة', 'الكتابة الاحترافية'],
      sessions: '٨ حصص / شهر', price: '599', duration: '٤ أشهر',
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
      glow: 'rgba(16,185,129,0.4)', accent: '#34d399',
    },
    {
      code: 'B2', name: 'متقدم', desc: 'طلاقة في أغلب المواقف',
      tagline: 'تتحدث كالمحترفين',
      skills: ['الإنجليزية المهنية', 'العروض التقديمية', 'الكتابة الأكاديمية'],
      sessions: '٨ حصص / شهر', price: '699', duration: '٤ أشهر',
      gradient: 'linear-gradient(135deg, #14b8a6, #0d9488)',
      glow: 'rgba(20,184,166,0.4)', accent: '#2dd4bf',
    },
    {
      code: 'C1', name: 'احترافي', desc: 'كأهل اللغة تماماً',
      tagline: 'القمة — إتقان كامل للغة',
      skills: ['IELTS / TOEFL', 'مقابلات العمل', 'الخطابة والإقناع'],
      sessions: '١٦ حصة / شهر', price: '999', duration: '٦ أشهر',
      gradient: 'linear-gradient(135deg, #a855f7, #7c3aed)',
      glow: 'rgba(168,85,247,0.4)', accent: '#c084fc',
    },
  ],
  en: [
    {
      code: 'A1', name: 'Beginner', desc: 'Starting from zero',
      tagline: 'Build a strong foundation',
      skills: ['Letters & correct pronunciation', 'Basic daily vocabulary', 'Simple introductions'],
      sessions: '4 sessions / month', price: '349', duration: '3 months',
      gradient: 'linear-gradient(135deg, #64748b, #475569)',
      glow: 'rgba(100,116,139,0.4)', accent: '#94a3b8',
    },
    {
      code: 'A2', name: 'Elementary', desc: 'Basic words & sentences',
      tagline: 'Handle everyday situations',
      skills: ['Simple daily conversations', 'Basic tenses', 'Shopping & travel'],
      sessions: '4 sessions / month', price: '399', duration: '3 months',
      gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)',
      glow: 'rgba(59,130,246,0.4)', accent: '#60a5fa',
    },
    {
      code: 'B1', name: 'Intermediate', desc: 'Communicate with ease',
      tagline: 'Express yourself clearly',
      skills: ['Fluent conversation', 'Advanced grammar', 'Professional writing'],
      sessions: '8 sessions / month', price: '599', duration: '4 months',
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
      glow: 'rgba(16,185,129,0.4)', accent: '#34d399',
    },
    {
      code: 'B2', name: 'Advanced', desc: 'Fluent in most situations',
      tagline: 'Speak like a professional',
      skills: ['Business English', 'Presentations', 'Academic writing'],
      sessions: '8 sessions / month', price: '699', duration: '4 months',
      gradient: 'linear-gradient(135deg, #14b8a6, #0d9488)',
      glow: 'rgba(20,184,166,0.4)', accent: '#2dd4bf',
    },
    {
      code: 'C1', name: 'Mastery', desc: 'Like a native speaker',
      tagline: 'Peak — full language mastery',
      skills: ['IELTS / TOEFL', 'Job interviews', 'Public speaking'],
      sessions: '16 sessions / month', price: '999', duration: '6 months',
      gradient: 'linear-gradient(135deg, #a855f7, #7c3aed)',
      glow: 'rgba(168,85,247,0.4)', accent: '#c084fc',
    },
  ],
};

const CODES = ['A1', 'A2', 'B1', 'B2', 'C1'];

/* ─────────────────── Component ─────────────────── */
export default function HomePage() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [activeCode, setActiveCode] = useState<string | null>(null);
  const isAr = lang === 'ar';
  const levels = LEVELS[lang];
  const active = levels.find(l => l.code === activeCode) ?? null;
  const activeIdx = active ? CODES.indexOf(active.code) : -1;

  return (
    <div dir={isAr ? 'rtl' : 'ltr'} className="min-h-screen bg-white text-gray-900 font-sans">
      <FloatingContactButtons />

      {/* ══════════════ NAVBAR ══════════════ */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Be Fluent" width={36} height={36} className="rounded-xl" />
            <span className="font-black text-lg tracking-tight">Be Fluent</span>
          </Link>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setLang(isAr ? 'en' : 'ar')}
              className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition font-medium"
            >
              {isAr ? 'EN' : 'عربي'}
            </button>
            <Link href="/auth/login" className="text-sm font-semibold text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition">
              {isAr ? 'دخول' : 'Login'}
            </Link>
            <Link href="/auth/register" className="text-sm font-bold bg-[#10B981] text-white px-4 py-2 rounded-xl hover:bg-emerald-600 transition shadow-sm shadow-emerald-200">
              {isAr ? 'ابدأ مجاناً' : 'Start Free'}
            </Link>
          </div>
        </div>
      </nav>

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-emerald-50/30 to-white pt-20 pb-24">
        {/* Subtle background circles */}
        <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-teal-100/30 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-5 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-8 border border-emerald-100 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {isAr ? 'أكثر من 5,000 طالب وصلوا للطلاقة' : 'Over 5,000 students reached fluency'}
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-gray-900 leading-[1.05] tracking-tight mb-6">
            {isAr ? (
              <><span>تعلّم الإنجليزية</span><br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-teal-500">واحكم العالم</span></>
            ) : (
              <><span>Learn English,</span><br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-teal-500">Rule the World</span></>
            )}
          </h1>

          <p className="text-gray-500 text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            {isAr
              ? 'حصص خاصة مع معلمين محترفين — متابعة يومية على واتساب — دعم 24/7'
              : 'Private 1-on-1 sessions with expert teachers — Daily WhatsApp follow-up — 24/7 support'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
            <Link href="/auth/register"
              className="w-full sm:w-auto bg-[#10B981] text-white font-bold px-9 py-4 rounded-2xl hover:bg-emerald-600 transition text-base shadow-lg shadow-emerald-200/60">
              {isAr ? 'احجز حصتك التجريبية مجاناً' : 'Book Your Free Trial'}
            </Link>
            <Link href="/placement-test"
              className="w-full sm:w-auto border-2 border-gray-200 text-gray-700 font-semibold px-9 py-4 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition text-base">
              {isAr ? '🎯 اختبر مستواك' : '🎯 Test Your Level'}
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {(isAr
              ? [['5,000+','طالب متخرج'],['4.9★','تقييم الطلاب'],['+50','معلم محترف'],['24/7','دعم مستمر']]
              : [['+5,000','Graduates'],['4.9★','Rating'],['+50','Teachers'],['24/7','Support']]
            ).map(([n,l],i) => (
              <div key={i} className="bg-white rounded-2xl py-4 px-3 text-center border border-gray-100 shadow-sm">
                <div className="text-2xl font-black text-[#10B981]">{n}</div>
                <div className="text-xs text-gray-400 mt-0.5 font-medium">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FEATURES ══════════════ */}
      <section className="py-20 bg-[#0f172a]">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-4 py-1.5 rounded-full mb-4">
              {isAr ? 'لماذا نختار Be Fluent؟' : 'Why Be Fluent?'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              {isAr ? 'نظام تعليمي متكامل' : 'A Complete Learning System'}
            </h2>
            <p className="text-slate-400 text-base max-w-md mx-auto">
              {isAr ? 'مصمم ليأخذك من أي مستوى إلى الطلاقة التامة' : 'Designed to take you from any level to full fluency'}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(isAr ? [
              { icon: '🎯', t: 'حصص خاصة 1:1', d: 'جلسات فردية مباشرة مع معلمك مصممة حول أهدافك' },
              { icon: '💬', t: 'متابعة يومية واتساب', d: 'معلمك يتابعك ويصحح تمارينك كل يوم' },
              { icon: '📊', t: 'تتبع تقدمك', d: 'لوحة تحكم ذكية تُظهر مستواك في كل مهارة' },
              { icon: '🏆', t: 'شهادات معتمدة', d: 'احصل على شهادة إتمام كل مستوى لسيرتك الذاتية' },
            ] : [
              { icon: '🎯', t: '1:1 Private Sessions', d: 'Live sessions with your teacher built around your goals' },
              { icon: '💬', t: 'Daily WhatsApp', d: 'Your teacher follows up and corrects your exercises daily' },
              { icon: '📊', t: 'Track Progress', d: 'Smart dashboard showing your level in every skill' },
              { icon: '🏆', t: 'Certificates', d: 'Get a level completion certificate for your CV' },
            ]).map((f, i) => (
              <div key={i} className="rounded-2xl p-5 border border-white/5 hover:border-white/10 transition" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <div className="text-3xl mb-4">{f.icon}</div>
                <div className="font-bold text-white mb-1.5">{f.t}</div>
                <div className="text-sm text-slate-400 leading-relaxed">{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ LEVELS ══════════════ */}
      <section className="py-20 bg-[#0a0f1e]">
        <div className="max-w-6xl mx-auto px-5">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-4 py-1.5 rounded-full mb-4">
              {isAr ? 'مسارات التعلم' : 'Learning Tracks'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              {isAr ? 'اختر مستواك — اعرف سعرك' : 'Choose Your Level — See Your Price'}
            </h2>
            <p className="text-slate-400">
              {isAr ? 'اضغط على أي مستوى لتظهر لك خطتك الكاملة وسعرها' : 'Click any level to see your full plan and price'}
            </p>
          </div>

          {/* ── Level selector tabs ── */}
          <div className="flex gap-2 sm:gap-3 justify-center flex-wrap mb-10">
            {levels.map((lvl) => {
              const isActive = activeCode === lvl.code;
              return (
                <button
                  key={lvl.code}
                  onClick={() => setActiveCode(isActive ? null : lvl.code)}
                  className="relative outline-none transition-all duration-200"
                >
                  <div
                    className={`relative px-6 sm:px-8 py-4 rounded-2xl transition-all duration-300 ${
                      isActive ? 'scale-105 shadow-2xl' : 'hover:scale-102 hover:brightness-110'
                    }`}
                    style={
                      isActive
                        ? { background: lvl.gradient, boxShadow: `0 16px 48px ${lvl.glow}` }
                        : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }
                    }
                  >
                    <div className={`text-2xl font-black leading-none tracking-tighter ${isActive ? 'text-white' : 'text-slate-300'}`}>
                      {lvl.code}
                    </div>
                    <div className={`text-xs font-semibold mt-0.5 ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
                      {lvl.name}
                    </div>
                  </div>
                  {isActive && (
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full" style={{ background: lvl.accent }} />
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Detail panel ── */}
          {active ? (
            <div className="rounded-3xl overflow-hidden" style={{ border: `1px solid ${active.accent}30`, background: 'rgba(255,255,255,0.03)' }}>
              {/* Color top bar */}
              <div className="h-1" style={{ background: active.gradient }} />

              <div className="p-7 sm:p-10 grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* LEFT — Level identity (2 cols) */}
                <div className="lg:col-span-2 flex flex-col">
                  {/* Journey progress bar */}
                  <div className="mb-8">
                    <div className="flex justify-between text-[11px] text-slate-600 mb-2">
                      <span>{isAr ? 'بداية الرحلة' : 'Start'}</span>
                      <span>{isAr ? 'الإتقان التام' : 'Mastery'}</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${(activeIdx + 1) * 20}%`, background: active.gradient }}
                      />
                    </div>
                    <div className="flex mt-2">
                      {CODES.map((c, i) => (
                        <div key={c} className="flex-1 text-center text-[10px] font-bold transition-colors" style={{
                          color: i <= activeIdx ? active.accent : 'rgba(100,116,139,0.5)'
                        }}>{c}</div>
                      ))}
                    </div>
                  </div>

                  {/* Big level code (typographic element) */}
                  <div
                    className="text-[6rem] sm:text-[8rem] font-black leading-none mb-2 select-none"
                    style={{ background: active.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                  >
                    {active.code}
                  </div>
                  <div className="text-2xl font-black text-white mb-1">{active.name}</div>
                  <div className="text-slate-400 text-sm mb-6">{active.tagline}</div>

                  {/* Skills */}
                  <div className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: active.accent }}>
                    {isAr ? 'ماذا ستتعلم' : 'You will learn'}
                  </div>
                  <div className="space-y-2.5">
                    {active.skills.map((s, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: `${active.accent}20`, border: `1.5px solid ${active.accent}60` }}>
                          <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
                            <path d="M1 3.5L3 5.5L7 1.5" stroke={active.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className="text-slate-300 text-sm">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT — Price card (3 cols) */}
                <div className="lg:col-span-3 flex flex-col">
                  <div
                    className="rounded-2xl p-7 flex-1 flex flex-col"
                    style={{ background: `${active.accent}0a`, border: `1px solid ${active.accent}25` }}
                  >
                    {/* Price */}
                    <div className="mb-6 pb-6" style={{ borderBottom: `1px solid ${active.accent}20` }}>
                      <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-3">
                        {isAr ? 'السعر الشهري' : 'Monthly Price'}
                      </div>
                      <div className="flex items-end gap-2">
                        <span className="text-7xl font-black leading-none text-white">{active.price}</span>
                        <div className="pb-2">
                          <div className="text-base font-bold" style={{ color: active.accent }}>{isAr ? 'جنيه' : 'EGP'}</div>
                          <div className="text-slate-500 text-sm">{isAr ? '/ شهرياً' : '/ month'}</div>
                        </div>
                      </div>
                    </div>

                    {/* Plan stats */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <div className="text-[11px] text-slate-500 mb-1">{isAr ? 'الحصص الشهرية' : 'Monthly Sessions'}</div>
                        <div className="text-white font-black text-base">{active.sessions}</div>
                      </div>
                      <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <div className="text-[11px] text-slate-500 mb-1">{isAr ? 'المدة المتوقعة' : 'Estimated Duration'}</div>
                        <div className="text-white font-black text-base">{active.duration}</div>
                      </div>
                    </div>

                    {/* Included features */}
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-3">
                      {isAr ? 'شامل الباقة' : 'Included in plan'}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-7 flex-1">
                      {(isAr
                        ? ['متابعة يومية على واتساب','لوحة تحكم ذكية لتتبع التقدم','شهادة إتمام معتمدة','دعم فني 24/7']
                        : ['Daily WhatsApp follow-up','Smart progress tracking dashboard','Accredited completion certificate','24/7 technical support']
                      ).map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-sm text-slate-400">
                          <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: `${active.accent}15` }}>
                            <svg width="7" height="6" viewBox="0 0 7 6" fill="none">
                              <path d="M1 3L2.8 4.8L6 1" stroke={active.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          {item}
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <Link
                      href="/auth/register"
                      className="block text-center py-4 rounded-2xl font-black text-white text-base transition-all hover:opacity-90 hover:scale-[1.01]"
                      style={{ background: active.gradient, boxShadow: `0 16px 40px ${active.glow}` }}
                    >
                      {isAr ? `ابدأ مستوى ${active.code} الآن  ←` : `Start ${active.code} Now  →`}
                    </Link>

                    <Link href="/placement-test" className="block text-center mt-3 text-slate-600 text-xs hover:text-slate-400 transition">
                      {isAr ? 'لا أعرف مستواي — خذ الاختبار مجاناً' : "Not sure of my level — take the free test"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <span className="text-2xl">☝️</span>
              </div>
              <p className="text-slate-400 text-base font-medium mb-6 max-w-xs">
                {isAr ? 'اختر مستواك من فوق لتشوف خطتك الدراسية الكاملة وسعرها' : 'Select your level above to see your full study plan and price'}
              </p>
              <Link href="/placement-test" className="inline-flex items-center gap-2 bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-emerald-400 transition text-sm">
                🎯 {isAr ? 'اكتشف مستواك مجاناً' : 'Discover Your Level Free'}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════ PRICING ══════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-emerald-600 bg-emerald-50 border border-emerald-100 px-4 py-1.5 rounded-full mb-4">
              {isAr ? 'الأسعار' : 'Pricing'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
              {isAr ? 'باقة لكل هدف' : 'A Plan for Every Goal'}
            </h2>
            <p className="text-gray-400 text-base">
              {isAr ? 'جميع الباقات تشمل واتساب يومي + دعم 24/7 + شهادة إتمام' : 'All plans include daily WhatsApp + 24/7 support + certificate'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-center max-w-4xl mx-auto">
            {(isAr ? [
              { name: 'أساسية',   sub: 'للمبتدئين A1-A2', price: '349', unit: 'جنيه / شهر', popular: false, badge: null,
                features: ['٤ حصص شهرياً', 'مفردات يومية', 'متابعة واتساب', 'دعم 24/7'] },
              { name: 'متقدمة',   sub: 'B1-B2',           price: '599', unit: 'جنيه / شهر', popular: true,  badge: '⭐ الأكثر طلباً',
                features: ['٨ حصص شهرياً', 'تمارين مخصصة', 'متابعة يومية', 'تتبع التقدم', 'دعم 24/7'] },
              { name: 'احترافية', sub: 'للمحترفين C1',    price: '999', unit: 'جنيه / شهر', popular: false, badge: '🏆 الأشمل',
                features: ['١٦ حصة شهرياً', 'تحضير IELTS', 'مقابلات العمل', 'تمارين مخصصة', 'دعم 24/7'] },
            ] : [
              { name: 'Basic',    sub: 'For A1-A2',    price: '349', unit: 'EGP / month', popular: false, badge: null,
                features: ['4 sessions/month', 'Daily vocabulary', 'WhatsApp follow-up', '24/7 support'] },
              { name: 'Advanced', sub: 'For B1-B2',    price: '599', unit: 'EGP / month', popular: true,  badge: '⭐ Most Popular',
                features: ['8 sessions/month', 'Custom exercises', 'Daily follow-up', 'Progress tracking', '24/7 support'] },
              { name: 'Pro',      sub: 'For C1',       price: '999', unit: 'EGP / month', popular: false, badge: '🏆 All-Inclusive',
                features: ['16 sessions/month', 'IELTS prep', 'Interview prep', 'Custom exercises', '24/7 support'] },
            ]).map((p, i) => (
              <div key={i} className={`relative rounded-2xl flex flex-col transition-all ${
                p.popular
                  ? 'bg-[#10B981] p-7 shadow-2xl shadow-emerald-200/60 scale-105 z-10'
                  : 'bg-white p-6 border border-gray-100 shadow-sm hover:shadow-md'
              }`}>
                {p.badge && (
                  <div className={`inline-flex items-center text-xs font-bold px-3 py-1 rounded-full w-fit mb-4 ${
                    p.popular ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-700'
                  }`}>{p.badge}</div>
                )}
                <div className={`text-xs mb-3 font-semibold ${p.popular ? 'text-emerald-100' : 'text-gray-400'}`}>{p.sub}</div>
                <div className={`text-2xl font-black mb-2 ${p.popular ? 'text-white' : 'text-gray-900'}`}>{p.name}</div>
                <div className="flex items-baseline gap-1.5 mb-5">
                  <span className={`text-5xl font-black leading-none ${p.popular ? 'text-white' : 'text-[#10B981]'}`}>{p.price}</span>
                  <span className={`text-sm font-medium ${p.popular ? 'text-emerald-100' : 'text-gray-400'}`}>{p.unit}</span>
                </div>
                <div className={`h-px mb-5 ${p.popular ? 'bg-white/20' : 'bg-gray-100'}`} />
                <ul className="flex-1 space-y-3 mb-6">
                  {p.features.map((f, j) => (
                    <li key={j} className={`flex items-center gap-3 text-sm ${p.popular ? 'text-white' : 'text-gray-600'}`}>
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${p.popular ? 'bg-white/20' : 'bg-emerald-50'}`}>
                        <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
                          <path d="M1 3.5L3 5.5L7 1.5" stroke={p.popular ? '#fff' : '#10B981'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/auth/register" className={`block text-center py-3.5 rounded-xl font-black text-sm transition hover:opacity-90 ${
                  p.popular ? 'bg-white text-[#10B981]' : 'bg-[#10B981] text-white hover:bg-emerald-600'
                }`}>
                  {isAr ? 'ابدأ الآن' : 'Get Started'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ REVIEWS ══════════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
              {isAr ? 'قالوا عنّا' : 'Student Reviews'}
            </h2>
            <p className="text-gray-400">{isAr ? 'أكثر من 5,000 طالب غيّروا مستقبلهم' : 'Over 5,000 students transformed their future'}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {(isAr ? [
              { name: 'أحمد محمد', lvl: 'A1 → C1', q: 'في سنة واحدة قدرت أتكلم إنجليزي بطلاقة في الشغل. المتابعة اليومية فرقت معايا جداً ما كنتش تخيلت إن ممكن أوصل للمستوى دا.' },
              { name: 'سارة خالد', lvl: 'B1 → C1', q: 'أفضل استثمار عملته في حياتي. المعلمة كانت متاحة دايماً وتهتم بأهدافي الشخصية مش الأهداف العامة.' },
              { name: 'محمود علي', lvl: 'A2 → B2', q: 'من أول حصة حسيت بالفرق الكبير. الطريقة بسيطة ومنظمة وبتشتغل فعلاً. أنصح بيها كل واحد عايز يتقدم.' },
            ] : [
              { name: 'Ahmed Mohamed', lvl: 'A1 → C1', q: 'In one year I was speaking English fluently at work. Daily follow-up made all the difference — I never imagined reaching this level so fast.' },
              { name: 'Sara Khaled', lvl: 'B1 → C1', q: "Best investment I've ever made. My teacher was always available and focused on my personal goals, not just generic content." },
              { name: 'Mahmoud Ali', lvl: 'A2 → B2', q: 'I felt the difference from the very first session. Simple, organized, and it actually works. I recommend it to everyone.' },
            ]).map((r, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{r.q}"</p>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{r.name}</div>
                  <div className="text-xs text-[#10B981] font-semibold mt-0.5">{r.lvl}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CTA ══════════════ */}
      <section className="bg-[#0f172a] py-20">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">🚀</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            {isAr ? 'ابدأ رحلتك اليوم' : 'Start Your Journey Today'}
          </h2>
          <p className="text-slate-400 text-base mb-8">
            {isAr ? 'الحصة الأولى مجانية تماماً — بدون أي التزام' : 'First session completely free — no commitment required'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/auth/register" className="w-full sm:w-auto bg-[#10B981] text-white font-bold px-9 py-4 rounded-2xl hover:bg-emerald-400 transition shadow-lg shadow-emerald-900/30">
              {isAr ? 'احجز مجاناً الآن' : 'Book Free Now'}
            </Link>
            <a href="https://api.whatsapp.com/send/?phone=201091515594" target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto border border-white/10 text-slate-300 font-semibold px-9 py-4 rounded-2xl hover:bg-white/5 transition">
              💬 {isAr ? 'تواصل عبر واتساب' : 'WhatsApp Us'}
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <Image src="/logo.png" alt="Be Fluent" width={30} height={30} className="rounded-xl" />
                <span className="font-black text-white">Be Fluent</span>
              </div>
              <p className="text-sm leading-relaxed mb-4">
                {isAr ? 'رحلتك نحو الطلاقة تبدأ هنا' : 'Your fluency journey starts here'}
              </p>
              <a href="https://api.whatsapp.com/send/?phone=201091515594" className="text-sm text-[#10B981] hover:text-emerald-400 font-semibold transition">
                💬 {isAr ? 'واتساب مباشر' : 'WhatsApp'}
              </a>
            </div>
            <div>
              <div className="font-bold text-white mb-4 text-sm">{isAr ? 'التعلم' : 'Learn'}</div>
              <ul className="space-y-2.5 text-sm">
                {[
                  { href: '/placement-test', label: isAr ? 'اختبار المستوى' : 'Level Test' },
                  { href: '/packages', label: isAr ? 'الباقات' : 'Packages' },
                  { href: '/learning-path', label: isAr ? 'مسار التعلم' : 'Learning Path' },
                  { href: '/grammar', label: isAr ? 'قواعد اللغة' : 'Grammar' },
                ].map(l => <li key={l.href}><Link href={l.href} className="hover:text-white transition">{l.label}</Link></li>)}
              </ul>
            </div>
            <div>
              <div className="font-bold text-white mb-4 text-sm">{isAr ? 'الحساب' : 'Account'}</div>
              <ul className="space-y-2.5 text-sm">
                {[
                  { href: '/auth/login', label: isAr ? 'تسجيل الدخول' : 'Login' },
                  { href: '/auth/register', label: isAr ? 'إنشاء حساب' : 'Register' },
                  { href: '/dashboard/student', label: isAr ? 'لوحة الطالب' : 'Dashboard' },
                ].map(l => <li key={l.href}><Link href={l.href} className="hover:text-white transition">{l.label}</Link></li>)}
              </ul>
            </div>
            <div>
              <div className="font-bold text-white mb-4 text-sm">{isAr ? 'الشركة' : 'Company'}</div>
              <ul className="space-y-2.5 text-sm">
                {[
                  { href: '/contact', label: isAr ? 'تواصل معنا' : 'Contact' },
                  { href: '/contact', label: isAr ? 'سياسة الخصوصية' : 'Privacy' },
                  { href: '/contact', label: isAr ? 'الشروط والأحكام' : 'Terms' },
                ].map((l, i) => <li key={i}><Link href={l.href} className="hover:text-white transition">{l.label}</Link></li>)}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-600">
            {isAr ? '© 2025 Be Fluent Academy — جميع الحقوق محفوظة — befluent-edu.online' : '© 2025 Be Fluent Academy — All rights reserved — befluent-edu.online'}
          </div>
        </div>
      </footer>
    </div>
  );
}
