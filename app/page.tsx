'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import FloatingContactButtons from "@/components/FloatingContactButtons";

/* ─────────────────── Level Data ─────────────────── */
const LEVELS = {
  ar: [
    {
      code: 'A1', name: 'مبتدئ', tagline: 'تبدأ من الصفر بثقة كاملة',
      desc: 'ما تعرفش أي كلمة إنجليزي؟ كويس! هنبدأ معاك من الحرف الأول حتى تقدر تعرّف بنفسك وتتكلم في المواقف اليومية البسيطة.',
      skills: ['النطق الصحيح للحروف والكلمات','200+ مفردة يومية أساسية','جمل التعارف والتحية','الأرقام والألوان والتواريخ'],
      sessions: '٤ حصص / شهر', price: '349', duration: '٣ أشهر',
      gradient: 'linear-gradient(135deg, #64748b, #475569)',
      glow: 'rgba(100,116,139,0.4)', accent: '#94a3b8', result: 'بعد ٣ أشهر تقدر تعرّف بنفسك وتتكلم في الأماكن العامة',
    },
    {
      code: 'A2', name: 'أساسي', tagline: 'تفهم وتتفاهم في الحياة اليومية',
      desc: 'بتعرف شوية كلمات بس مش قادر تكمّل جملة؟ هنبني ثقتك وتقدر تتكلم في التسوق والسفر والعمل البسيط.',
      skills: ['المحادثة اليومية بثقة','الأزمنة الأساسية (Past/Present/Future)','التسوق والسفر والاتجاهات','500+ مفردة عملية'],
      sessions: '٤ حصص / شهر', price: '399', duration: '٣ أشهر',
      gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)',
      glow: 'rgba(59,130,246,0.4)', accent: '#60a5fa', result: 'بعد ٣ أشهر تتكلم مع الأجانب في المواقف اليومية',
    },
    {
      code: 'B1', name: 'متوسط', tagline: 'تعبّر عن أفكارك بوضوح وطلاقة',
      desc: 'بتتكلم بس بتوقف كتير وبتلخبط؟ المستوى ده هيخليك تتكلم بثقة وتعبر عن أفكارك كاملة بدون توقف.',
      skills: ['محادثة طليقة بدون توقف','القواعد المتقدمة والاستثناءات','الكتابة الاحترافية والإيميلات','التعبير عن الرأي والجدال'],
      sessions: '٨ حصص / شهر', price: '599', duration: '٤ أشهر',
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
      glow: 'rgba(16,185,129,0.4)', accent: '#34d399', result: 'بعد ٤ أشهر تتكلم في الاجتماعات وتكتب إيميلات احترافية',
    },
    {
      code: 'B2', name: 'متقدم', tagline: 'تتكلم في بيئة العمل والأكاديمية',
      desc: 'بتتكلم كويس بس عايز تتقدم في شغلك أو تدرس بره؟ هنرفع مستواك للإنجليزية المهنية والأكاديمية.',
      skills: ['الإنجليزية المهنية للشركات','العروض التقديمية والاجتماعات','الكتابة الأكاديمية والتقارير','مصطلحات المجال التخصصي'],
      sessions: '٨ حصص / شهر', price: '699', duration: '٤ أشهر',
      gradient: 'linear-gradient(135deg, #14b8a6, #0d9488)',
      glow: 'rgba(20,184,166,0.4)', accent: '#2dd4bf', result: 'بعد ٤ أشهر تشتغل في بيئة إنجليزية بكل سهولة',
    },
    {
      code: 'C1', name: 'احترافي', tagline: 'إتقان كامل — زي أهل اللغة تماماً',
      desc: 'الهدف: IELTS أو وظيفة في شركة متعددة الجنسيات أو دراسة بره؟ المستوى ده هو القمة — هتتكلم وتفكر بالإنجليزية.',
      skills: ['تحضير IELTS/TOEFL/OET','مقابلات العمل والـ CV الاحترافي','الخطابة والإقناع والتفاوض','اللكنة والنبر الطبيعي'],
      sessions: '١٦ حصة / شهر', price: '999', duration: '٦ أشهر',
      gradient: 'linear-gradient(135deg, #a855f7, #7c3aed)',
      glow: 'rgba(168,85,247,0.4)', accent: '#c084fc', result: 'بعد ٦ أشهر تحصل على IELTS 7+ أو تشتغل في أي شركة دولية',
    },
  ],
  en: [
    {
      code: 'A1', name: 'Beginner', tagline: 'Start from zero with full confidence',
      desc: "Don't know any English? Perfect! We start from the very first letter until you can introduce yourself and handle simple daily situations.",
      skills: ['Correct letter & word pronunciation','200+ basic daily vocabulary','Introduction & greeting phrases','Numbers, colors & dates'],
      sessions: '4 sessions / month', price: '349', duration: '3 months',
      gradient: 'linear-gradient(135deg, #64748b, #475569)',
      glow: 'rgba(100,116,139,0.4)', accent: '#94a3b8', result: 'After 3 months you can introduce yourself and speak in public',
    },
    {
      code: 'A2', name: 'Elementary', tagline: 'Understand & communicate in daily life',
      desc: "Know a few words but can't form full sentences? We'll build your confidence to speak while shopping, traveling, and at basic work situations.",
      skills: ['Daily conversation with confidence','Basic tenses (Past/Present/Future)','Shopping, travel & directions','500+ practical vocabulary'],
      sessions: '4 sessions / month', price: '399', duration: '3 months',
      gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)',
      glow: 'rgba(59,130,246,0.4)', accent: '#60a5fa', result: 'After 3 months you can talk with foreigners in daily situations',
    },
    {
      code: 'B1', name: 'Intermediate', tagline: 'Express your thoughts clearly & fluently',
      desc: "You speak but stop a lot and get confused? This level will make you speak confidently and express complete thoughts without pausing.",
      skills: ['Fluent conversation without pausing','Advanced grammar & exceptions','Professional writing & emails','Expressing opinions & debating'],
      sessions: '8 sessions / month', price: '599', duration: '4 months',
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
      glow: 'rgba(16,185,129,0.4)', accent: '#34d399', result: 'After 4 months you speak in meetings and write professional emails',
    },
    {
      code: 'B2', name: 'Advanced', tagline: 'Perform in professional & academic settings',
      desc: "You speak well but want to advance your career or study abroad? We'll take your level to professional and academic English.",
      skills: ['Business English for corporations','Presentations & meetings','Academic writing & reports','Field-specific terminology'],
      sessions: '8 sessions / month', price: '699', duration: '4 months',
      gradient: 'linear-gradient(135deg, #14b8a6, #0d9488)',
      glow: 'rgba(20,184,166,0.4)', accent: '#2dd4bf', result: 'After 4 months you work in an English environment with ease',
    },
    {
      code: 'C1', name: 'Mastery', tagline: 'Full mastery — just like a native speaker',
      desc: "Targeting IELTS, a multinational company, or studying abroad? This is the peak level — you'll speak and think in English.",
      skills: ['IELTS/TOEFL/OET preparation','Job interviews & professional CV','Public speaking, persuasion & negotiation','Natural accent & intonation'],
      sessions: '16 sessions / month', price: '999', duration: '6 months',
      gradient: 'linear-gradient(135deg, #a855f7, #7c3aed)',
      glow: 'rgba(168,85,247,0.4)', accent: '#c084fc', result: 'After 6 months you score IELTS 7+ or work at any international company',
    },
  ],
};

const CODES = ['A1', 'A2', 'B1', 'B2', 'C1'];

export default function HomePage() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [activeCode, setActiveCode] = useState<string | null>('B1');
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
            <Image src="/logo.png" alt="Be Fluent" width={36} height={36} className="rounded-xl" style={{ height: 'auto' }} />
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
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-emerald-50/30 to-white pt-16 pb-20">
        <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-teal-100/30 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {isAr ? '✅ أكثر من 5,000 طالب وصلوا للطلاقة' : '✅ 5,000+ students reached fluency'}
              </div>

              <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight mb-5">
                {isAr ? (
                  <>من <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-teal-500">المبتدئ</span> إلى<br /> الطلاقة التامة<br /><span className="text-2xl sm:text-3xl font-bold text-gray-500">مع معلم خاص يتابعك يومياً</span></>
                ) : (
                  <>From <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-teal-500">Beginner</span> to<br /> Full Fluency<br /><span className="text-2xl sm:text-3xl font-bold text-gray-500">with a personal teacher following you daily</span></>
                )}
              </h1>

              <p className="text-gray-500 text-base leading-relaxed mb-8">
                {isAr
                  ? 'Be Fluent مش مجرد كورس — هو نظام تعليمي كامل. بتحجز حصة مع معلمك، بتذاكر، وبتتابع يومياً على واتساب حتى توصل لهدفك.'
                  : "Be Fluent isn't just a course — it's a complete learning system. You book a session with your teacher, study, and get followed up daily on WhatsApp until you reach your goal."}
              </p>

              {/* What you get checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                {(isAr ? [
                  'حصص خاصة 1:1 مع معلمك',
                  'متابعة يومية على واتساب',
                  'تمارين وواجبات مخصصة',
                  'لوحة تحكم تتبع تقدمك',
                  'شهادة إتمام معتمدة',
                  'دعم فني 24/7',
                ] : [
                  '1:1 private sessions with your teacher',
                  'Daily WhatsApp follow-up',
                  'Personalized exercises & homework',
                  'Progress tracking dashboard',
                  'Accredited completion certificate',
                  '24/7 technical support',
                ]).map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                      <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
                        <path d="M1 3.5L3 5.5L7 1.5" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/auth/register"
                  className="w-full sm:w-auto text-center bg-[#10B981] text-white font-bold px-8 py-4 rounded-2xl hover:bg-emerald-600 transition shadow-lg shadow-emerald-200/60 text-base">
                  {isAr ? 'احجز حصتك التجريبية مجاناً' : 'Book Your Free Trial'}
                </Link>
                <Link href="/placement-test"
                  className="w-full sm:w-auto text-center border-2 border-gray-200 text-gray-700 font-semibold px-8 py-4 rounded-2xl hover:bg-gray-50 transition text-base">
                  🎯 {isAr ? 'اختبر مستواك مجاناً' : 'Test Your Level Free'}
                </Link>
              </div>
            </div>

            {/* Right — Stats + trust */}
            <div className="space-y-4">
              {/* Big stat cards */}
              <div className="grid grid-cols-2 gap-4">
                {(isAr ? [
                  { n: '5,000+', l: 'طالب تخرّج بنجاح', icon: '🎓' },
                  { n: '4.9 ⭐', l: 'تقييم الطلاب على Google', icon: '⭐' },
                ] : [
                  { n: '5,000+', l: 'Graduates', icon: '🎓' },
                  { n: '4.9 ⭐', l: 'Student rating on Google', icon: '⭐' },
                ]).map((s, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
                    <div className="text-3xl font-black text-gray-900">{s.n}</div>
                    <div className="text-xs text-gray-400 mt-1 leading-tight">{s.l}</div>
                  </div>
                ))}
              </div>

              {/* Mini testimonial cards */}
              {(isAr ? [
                { name: 'أحمد', from: 'A1', to: 'C1', q: 'في سنة واحدة بقيت أتكلم إنجليزي في الشغل بطلاقة. المتابعة اليومية هي السر.' },
                { name: 'سارة', from: 'B1', to: 'IELTS 7.5', q: 'جبت 7.5 في IELTS بعد ٦ أشهر مع Be Fluent. أنصح كل واحد.' },
              ] : [
                { name: 'Ahmed', from: 'A1', to: 'C1', q: 'In one year I was speaking English fluently at work. Daily follow-up is the secret.' },
                { name: 'Sara', from: 'B1', to: 'IELTS 7.5', q: 'Got 7.5 in IELTS after 6 months with Be Fluent. Highly recommended.' },
              ]).map((r, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">"{r.q}"</p>
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-gray-900 text-sm">{r.name}</div>
                    <div className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full">{r.from} → {r.to}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ HOW IT WORKS ══════════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#10B981] bg-emerald-50 border border-emerald-100 px-4 py-1.5 rounded-full mb-4">
              {isAr ? 'كيف يشتغل Be Fluent؟' : 'How Be Fluent Works'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
              {isAr ? '٣ خطوات بسيطة توصّلك للطلاقة' : '3 Simple Steps to Fluency'}
            </h2>
            <p className="text-gray-400 text-base max-w-lg mx-auto">
              {isAr ? 'مش محتاج تكون عارف حاجة — كل اللي محتاجه وقت وإرادة' : "You don't need to know anything — all you need is time and willpower"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {(isAr ? [
              {
                n: '١', icon: '🎯',
                title: 'اعرف مستواك الحالي',
                desc: 'خذ اختبار المستوى المجاني بالذكاء الاصطناعي — في ١٥ دقيقة هيعرفك بدقة إنت عند إيه، وإيه اللي محتاج تبدأ بيه.',
                tag: 'مجاني تماماً',
              },
              {
                n: '٢', icon: '👨‍🏫',
                title: 'ابدأ مع معلمك الخاص',
                desc: 'بنربطك بمعلم متخصص في مستواك ويشتغل على أهدافك تحديداً. مش كلاس جماعي — حصة خاصة ١:١ معلمك وإنت بس.',
                tag: 'حصة تجريبية مجانية',
              },
              {
                n: '٣', icon: '📈',
                title: 'تابعك معاك كل يوم',
                desc: 'مش بس حصة أسبوعية — معلمك بيبعتلك تمارين ومراجعات على واتساب كل يوم وبيصحح ويجاوب على أسئلتك.',
                tag: 'متابعة يومية',
              },
            ] : [
              {
                n: '1', icon: '🎯',
                title: 'Discover Your Level',
                desc: 'Take the free AI-powered level test — in 15 minutes it will accurately tell you where you are and what you need to start with.',
                tag: 'Completely Free',
              },
              {
                n: '2', icon: '👨‍🏫',
                title: 'Start with Your Personal Teacher',
                desc: "We match you with a teacher specialized in your level who works on your specific goals. Not a group class — a 1:1 private session, just you and your teacher.",
                tag: 'Free Trial Session',
              },
              {
                n: '3', icon: '📈',
                title: 'Followed Up Daily',
                desc: "Not just a weekly session — your teacher sends you exercises and reviews on WhatsApp every day and corrects your work and answers your questions.",
                tag: 'Daily Follow-up',
              },
            ]).map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative">
                {/* Number */}
                <div className="absolute -top-3.5 right-6 rtl:right-auto rtl:left-6 w-8 h-8 rounded-full bg-[#10B981] text-white text-sm font-black flex items-center justify-center shadow-md shadow-emerald-200">
                  {s.n}
                </div>
                <div className="text-4xl mb-4 mt-2">{s.icon}</div>
                <div className="font-black text-gray-900 text-lg mb-2">{s.title}</div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-100">
                  {s.tag}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/placement-test" className="inline-flex items-center gap-2 bg-[#10B981] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-emerald-600 transition shadow-md shadow-emerald-200/50">
              {isAr ? '🎯 ابدأ بخطوة ١ — اعرف مستواك مجاناً' : '🎯 Start with Step 1 — Discover Your Level Free'}
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════ LEVELS ══════════════ */}
      <section className="py-20 bg-[#0a0f1e]">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-4 py-1.5 rounded-full mb-4">
              {isAr ? 'مسارات التعلم' : 'Learning Tracks'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              {isAr ? 'إيه مستواك؟ اضغط وشوف خطتك وسعرها' : 'What is your level? Click and see your plan'}
            </h2>
            <p className="text-slate-400 text-base">
              {isAr ? 'كل مستوى له خطة دراسية مختلفة وسعر مختلف — اختار مستواك الحالي' : 'Each level has a different study plan and price — choose your current level'}
            </p>
          </div>

          {/* Level Tabs */}
          <div className="flex gap-2 sm:gap-3 justify-center flex-wrap mb-10">
            {levels.map((lvl) => {
              const isActive = activeCode === lvl.code;
              return (
                <button
                  key={lvl.code}
                  onClick={() => setActiveCode(isActive ? null : lvl.code)}
                  className="outline-none transition-all duration-200"
                >
                  <div
                    className={`px-6 sm:px-8 py-4 rounded-2xl transition-all duration-300 ${isActive ? 'scale-105 shadow-2xl' : 'hover:brightness-110'}`}
                    style={
                      isActive
                        ? { background: lvl.gradient, boxShadow: `0 16px 48px ${lvl.glow}` }
                        : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }
                    }
                  >
                    <div className={`text-2xl font-black leading-none tracking-tighter ${isActive ? 'text-white' : 'text-slate-300'}`}>{lvl.code}</div>
                    <div className={`text-xs font-semibold mt-0.5 ${isActive ? 'text-white/80' : 'text-slate-500'}`}>{lvl.name}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail Panel */}
          {active ? (
            <div className="rounded-3xl overflow-hidden" style={{ border: `1px solid ${active.accent}30`, background: 'rgba(255,255,255,0.03)' }}>
              <div className="h-1" style={{ background: active.gradient }} />

              <div className="p-7 sm:p-10 grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Left */}
                <div className="lg:col-span-3 flex flex-col">
                  {/* Journey progress */}
                  <div className="mb-8">
                    <div className="flex justify-between text-[11px] text-slate-600 mb-2">
                      <span>{isAr ? 'بداية الرحلة' : 'Start'}</span>
                      <span>{isAr ? 'الإتقان التام' : 'Mastery'}</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${(activeIdx + 1) * 20}%`, background: active.gradient }} />
                    </div>
                    <div className="flex mt-2">
                      {CODES.map((c, i) => (
                        <div key={c} className="flex-1 text-center text-[10px] font-bold"
                          style={{ color: i <= activeIdx ? active.accent : 'rgba(100,116,139,0.4)' }}>{c}</div>
                      ))}
                    </div>
                  </div>

                  {/* Big level code */}
                  <div className="flex items-end gap-4 mb-5">
                    <div
                      className="text-[6rem] sm:text-[7rem] font-black leading-none"
                      style={{ background: active.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                    >
                      {active.code}
                    </div>
                    <div className="pb-4">
                      <div className="text-white text-2xl font-black">{active.name}</div>
                      <div style={{ color: active.accent }} className="text-sm font-semibold mt-1">{active.tagline}</div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-400 text-base leading-relaxed mb-6 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', borderLeft: `3px solid ${active.accent}` }}>
                    {active.desc}
                  </p>

                  {/* Skills */}
                  <div className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: active.accent }}>
                    {isAr ? 'ماذا ستتعلم في هذا المستوى' : 'What you will learn at this level'}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {active.skills.map((s, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ background: `${active.accent}20`, border: `1.5px solid ${active.accent}60` }}>
                          <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
                            <path d="M1 3.5L3 5.5L7 1.5" stroke={active.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className="text-slate-300 text-sm">{s}</span>
                      </div>
                    ))}
                  </div>

                  {/* Result promise */}
                  <div className="mt-6 p-4 rounded-2xl flex items-start gap-3" style={{ background: `${active.accent}12`, border: `1px solid ${active.accent}25` }}>
                    <span className="text-2xl flex-shrink-0">🎯</span>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: active.accent }}>
                        {isAr ? 'نتيجة مضمونة' : 'Expected Result'}
                      </div>
                      <div className="text-slate-300 text-sm">{active.result}</div>
                    </div>
                  </div>
                </div>

                {/* Right — Price */}
                <div className="lg:col-span-2 flex flex-col">
                  <div className="rounded-2xl p-6 flex-1 flex flex-col"
                    style={{ background: `${active.accent}0a`, border: `1px solid ${active.accent}25` }}>
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">
                      {isAr ? 'السعر الشهري' : 'Monthly Price'}
                    </div>

                    <div className="flex items-end gap-2 mb-6 pb-6" style={{ borderBottom: `1px solid ${active.accent}20` }}>
                      <span className="text-6xl font-black leading-none text-white">{active.price}</span>
                      <div className="pb-1">
                        <div className="text-base font-bold" style={{ color: active.accent }}>{isAr ? 'جنيه' : 'EGP'}</div>
                        <div className="text-slate-500 text-sm">{isAr ? '/ شهرياً' : '/ month'}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 mb-5">
                      <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <div className="text-[10px] text-slate-500 mb-1">{isAr ? 'الحصص الشهرية' : 'Monthly Sessions'}</div>
                        <div className="text-white font-black text-sm">{active.sessions}</div>
                      </div>
                      <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <div className="text-[10px] text-slate-500 mb-1">{isAr ? 'المدة المتوقعة' : 'Duration'}</div>
                        <div className="text-white font-black text-sm">{active.duration}</div>
                      </div>
                    </div>

                    <div className="text-slate-600 text-xs font-bold uppercase tracking-widest mb-3">
                      {isAr ? 'كل الباقات تشمل' : 'All plans include'}
                    </div>
                    <div className="space-y-2 mb-6 flex-1">
                      {(isAr
                        ? ['متابعة يومية على واتساب','لوحة تحكم ذكية','شهادة إتمام معتمدة','دعم فني 24/7']
                        : ['Daily WhatsApp follow-up','Smart progress dashboard','Accredited certificate','24/7 technical support']
                      ).map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                          <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
                            style={{ background: `${active.accent}15` }}>
                            <svg width="7" height="6" viewBox="0 0 7 6" fill="none">
                              <path d="M1 3L2.8 4.8L6 1" stroke={active.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          {item}
                        </div>
                      ))}
                    </div>

                    <Link href="/auth/register"
                      className="block text-center py-4 rounded-2xl font-black text-white text-base transition-all hover:opacity-90"
                      style={{ background: active.gradient, boxShadow: `0 12px 32px ${active.glow}` }}>
                      {isAr ? `اشترك في ${active.code} الآن  ←` : `Join ${active.code} Now  →`}
                    </Link>

                    <Link href="/placement-test" className="block text-center mt-3 text-slate-600 text-xs hover:text-slate-400 transition">
                      {isAr ? 'مش متأكد من مستواي — خذ الاختبار مجاناً' : "Not sure of my level — take the free test"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center py-20 text-center">
              <p className="text-slate-400 text-base mb-6">{isAr ? 'اختر مستواك من فوق' : 'Select your level above'}</p>
              <Link href="/placement-test" className="inline-flex items-center gap-2 bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-emerald-400 transition text-sm">
                🎯 {isAr ? 'اكتشف مستواك مجاناً' : 'Discover Your Level Free'}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════ FEATURES ══════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-emerald-600 bg-emerald-50 border border-emerald-100 px-4 py-1.5 rounded-full mb-4">
              {isAr ? 'لماذا Be Fluent؟' : 'Why Be Fluent?'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
              {isAr ? 'مش بس درس — نظام تعليمي متكامل' : "Not just lessons — a complete learning system"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(isAr ? [
              {
                icon: '🎯',
                title: 'حصص خاصة ١:١',
                desc: 'مش كلاس جماعي فيه ٢٠ طالب — حصة خاصة بينك وبين معلمك بس. المعلم مركّز عليك وعلى أهدافك اللي إنت محتاجها.',
              },
              {
                icon: '💬',
                title: 'واتساب يومي مع معلمك',
                desc: 'بعد كل حصة معلمك مش بيختفي — بيتابعك كل يوم، بيبعتلك تمارين، بيصحح أخطاؤك، وبيجاوب على أسئلتك على واتساب.',
              },
              {
                icon: '🤖',
                title: 'اختبار ذكاء اصطناعي لتحديد مستواك',
                desc: 'بدل ما تخمّن مستواك، تقدر تاخد اختبارنا المجاني بالذكاء الاصطناعي في ١٥ دقيقة ويحدد مستواك بدقة ويوصي بالخطة المناسبة.',
              },
              {
                icon: '📊',
                title: 'تتبع تقدمك بشكل مرئي',
                desc: 'لوحة تحكم ذكية تبيّن لك مستواك في كل مهارة: التحدث، الاستماع، القراءة، الكتابة. وتتابع تطورك أسبوعاً بأسبوع.',
              },
              {
                icon: '📚',
                title: 'مناهج مخصصة لهدفك',
                desc: 'مش منهج واحد للكل — بناءً على هدفك (شغل، IELTS، سفر، دراسة) معلمك بيصمم لك خطة مخصصة تحقق هدفك أسرع.',
              },
              {
                icon: '🏆',
                title: 'شهادة إتمام معتمدة',
                desc: 'بعد ما تخلص كل مستوى بتاخد شهادة إتمام رسمية تقدر تحطها في سيرتك الذاتية وتثبت مستواك أمام أصحاب العمل.',
              },
            ] : [
              {
                icon: '🎯',
                title: '1:1 Private Sessions',
                desc: "Not a group class with 20 students — a private session between you and your teacher only. The teacher is fully focused on you and your specific goals.",
              },
              {
                icon: '💬',
                title: 'Daily WhatsApp with Your Teacher',
                desc: "After each session your teacher doesn't disappear — they follow up daily, send exercises, correct your mistakes, and answer your questions on WhatsApp.",
              },
              {
                icon: '🤖',
                title: 'AI-Powered Level Test',
                desc: "Instead of guessing your level, take our free AI-powered test in 15 minutes. It accurately determines your level and recommends the right plan.",
              },
              {
                icon: '📊',
                title: 'Visual Progress Tracking',
                desc: 'Smart dashboard showing your level in every skill: speaking, listening, reading, writing. Track your growth week by week.',
              },
              {
                icon: '📚',
                title: 'Curriculum Tailored to Your Goal',
                desc: "Not one-size-fits-all — based on your goal (work, IELTS, travel, study) your teacher designs a custom plan to reach your goal faster.",
              },
              {
                icon: '🏆',
                title: 'Accredited Completion Certificate',
                desc: 'After completing each level you receive an official completion certificate you can add to your CV and prove your level to employers.',
              },
            ]).map((f, i) => (
              <div key={i} className="p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-md transition">
                <div className="text-3xl mb-4">{f.icon}</div>
                <div className="font-black text-gray-900 text-lg mb-2">{f.title}</div>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ PRICING ══════════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-emerald-600 bg-emerald-50 border border-emerald-100 px-4 py-1.5 rounded-full mb-4">
              {isAr ? 'الأسعار' : 'Pricing'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
              {isAr ? 'باقة تناسب كل هدف وميزانية' : 'A Plan for Every Goal & Budget'}
            </h2>
            <p className="text-gray-400 text-base">
              {isAr ? 'جميع الباقات تشمل: واتساب يومي + دعم 24/7 + شهادة إتمام + لوحة تحكم' : 'All plans include: Daily WhatsApp + 24/7 support + Certificate + Dashboard'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-center max-w-4xl mx-auto">
            {(isAr ? [
              {
                name: 'أساسية', sub: 'المبتدئين A1-A2', price: '349', unit: 'جنيه / شهر',
                desc: 'مناسبة لمن يبدأ أو يعيد ترتيب أساسياته',
                features: ['٤ حصص خاصة شهرياً', 'مفردات يومية', 'متابعة واتساب', 'دعم 24/7'],
                popular: false, badge: null,
              },
              {
                name: 'متقدمة', sub: 'المتوسط B1-B2', price: '599', unit: 'جنيه / شهر',
                desc: 'للأهداف المهنية وتطوير الكلام والكتابة',
                features: ['٨ حصص خاصة شهرياً', 'تمارين مخصصة', 'متابعة يومية', 'تتبع التقدم', 'دعم 24/7'],
                popular: true, badge: '⭐ الأكثر طلباً',
              },
              {
                name: 'احترافية', sub: 'الاحترافي C1', price: '999', unit: 'جنيه / شهر',
                desc: 'للـ IELTS والشركات الدولية والدراسة بره',
                features: ['١٦ حصة خاصة شهرياً', 'تحضير IELTS/TOEFL', 'مقابلات العمل', 'تمارين مخصصة', 'دعم 24/7'],
                popular: false, badge: '🏆 الأشمل',
              },
            ] : [
              {
                name: 'Basic', sub: 'For A1-A2', price: '349', unit: 'EGP / month',
                desc: 'Perfect for beginners or rebuilding foundations',
                features: ['4 private sessions/month', 'Daily vocabulary', 'WhatsApp follow-up', '24/7 support'],
                popular: false, badge: null,
              },
              {
                name: 'Advanced', sub: 'For B1-B2', price: '599', unit: 'EGP / month',
                desc: 'For professional goals and improving speaking & writing',
                features: ['8 private sessions/month', 'Custom exercises', 'Daily follow-up', 'Progress tracking', '24/7 support'],
                popular: true, badge: '⭐ Most Popular',
              },
              {
                name: 'Pro', sub: 'For C1', price: '999', unit: 'EGP / month',
                desc: 'For IELTS, international companies & studying abroad',
                features: ['16 private sessions/month', 'IELTS/TOEFL prep', 'Interview prep', 'Custom exercises', '24/7 support'],
                popular: false, badge: '🏆 All-Inclusive',
              },
            ]).map((p, i) => (
              <div key={i} className={`relative rounded-2xl flex flex-col transition-all ${
                p.popular ? 'bg-[#10B981] p-7 shadow-2xl shadow-emerald-200/60 scale-105 z-10' : 'bg-white p-6 border border-gray-100 shadow-sm'
              }`}>
                {p.badge && (
                  <div className={`inline-flex items-center text-xs font-bold px-3 py-1 rounded-full w-fit mb-3 ${
                    p.popular ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-700'
                  }`}>{p.badge}</div>
                )}
                <div className={`text-xs mb-1 font-semibold ${p.popular ? 'text-emerald-100' : 'text-gray-400'}`}>{p.sub}</div>
                <div className={`text-2xl font-black mb-1 ${p.popular ? 'text-white' : 'text-gray-900'}`}>{p.name}</div>
                <div className={`text-sm mb-3 leading-relaxed ${p.popular ? 'text-emerald-100' : 'text-gray-500'}`}>{p.desc}</div>
                <div className="flex items-baseline gap-1.5 mb-5">
                  <span className={`text-5xl font-black leading-none ${p.popular ? 'text-white' : 'text-[#10B981]'}`}>{p.price}</span>
                  <span className={`text-sm font-medium ${p.popular ? 'text-emerald-100' : 'text-gray-400'}`}>{p.unit}</span>
                </div>
                <div className={`h-px mb-4 ${p.popular ? 'bg-white/20' : 'bg-gray-100'}`} />
                <ul className="flex-1 space-y-2.5 mb-6">
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
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
              {isAr ? 'طلاب غيّروا مستقبلهم مع Be Fluent' : 'Students Who Changed Their Future'}
            </h2>
            <p className="text-gray-400">{isAr ? 'نتائج حقيقية من طلاب حقيقيين' : 'Real results from real students'}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {(isAr ? [
              {
                name: 'أحمد محمد', from: 'A1', to: 'C1', months: '١٢ شهر',
                result: 'بقى يتكلم في الاجتماعات الدولية',
                q: 'كنت مش قادر أكمّل جملة. دلوقتي بتكلم في اجتماعات مع أجانب وبقدر أعبر عن أفكاري بشكل احترافي. المتابعة اليومية على واتساب كانت السر الأساسي.',
              },
              {
                name: 'سارة خالد', from: 'B1', to: 'IELTS 7.5', months: '٦ أشهر',
                result: 'قبلت في ماجستير في إنجلترا',
                q: 'كنت محتاجة 7 في IELTS للقبول في الجامعة. المعلمة فهمت ضغطي وصممت خطة تركز على نقاط ضعفي. جبت 7.5 في أول محاولة.',
              },
              {
                name: 'محمود علي', from: 'A2', to: 'B2', months: '٩ أشهر',
                result: 'حصل على ترقية في شركته',
                q: 'الترقية كانت موقوفة على مستوى الإنجليزي. بعد ٩ أشهر مع Be Fluent عملت مقابلة بالإنجليزي وحصلت على المنصب اللي كنت بحلم بيه.',
              },
            ] : [
              {
                name: 'Ahmed Mohamed', from: 'A1', to: 'C1', months: '12 months',
                result: 'Now speaks in international meetings',
                q: "I couldn't complete a sentence. Now I speak in meetings with foreigners and express my ideas professionally. The daily WhatsApp follow-up was the key.",
              },
              {
                name: 'Sara Khaled', from: 'B1', to: 'IELTS 7.5', months: '6 months',
                result: 'Accepted into a Master\'s program in the UK',
                q: 'I needed 7 in IELTS for university acceptance. My teacher understood my pressure and designed a plan targeting my weak points. Got 7.5 on my first attempt.',
              },
              {
                name: 'Mahmoud Ali', from: 'A2', to: 'B2', months: '9 months',
                result: 'Got promoted at his company',
                q: "The promotion was dependent on my English level. After 9 months with Be Fluent, I had an English interview and got the position I'd been dreaming of.",
              },
            ]).map((r, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-400 font-medium">{r.months}</span>
                </div>
                <div className="text-xs font-bold text-[#10B981] bg-emerald-50 px-3 py-1 rounded-full w-fit mb-3">
                  ✅ {r.result}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{r.q}"</p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="font-bold text-gray-900 text-sm">{r.name}</div>
                  <div className="text-xs bg-gray-100 text-gray-600 font-bold px-2.5 py-1 rounded-full">{r.from} → {r.to}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-2">
              {isAr ? 'أسئلة شائعة' : 'Frequently Asked Questions'}
            </h2>
          </div>
          <div className="space-y-3">
            {(isAr ? [
              {
                q: 'إيه الفرق بين Be Fluent وأي كورس تاني؟',
                a: 'الفرق الأساسي إن Be Fluent مش كورس مسجل تتفرج عليه — ده نظام تعليمي كامل فيه معلم خاص بيتابعك يومياً على واتساب، وحصص ١:١، وخطة مخصصة لهدفك إنت تحديداً.',
              },
              {
                q: 'أنا مبتدئ تماماً — هينفع معايا؟',
                a: 'طبعاً! عندنا مستوى A1 مصمم لمن لا يعرف أي كلمة إنجليزي. هنبدأ معاك من الحرف الأول بأسلوب بسيط وممتع.',
              },
              {
                q: 'إمتى هشوف نتيجة؟',
                a: 'معظم طلابنا بيحسوا بفرق واضح بعد أول شهر. النتيجة الكاملة بتظهر حسب مستواك الحالي — المتوسط ٣-٦ أشهر عشان تعدي مستوى كامل.',
              },
              {
                q: 'ممكن أجرب قبل ما أدفع؟',
                a: 'آه! الحصة الأولى مجانية تماماً وبدون أي التزام. كمان ممكن تاخد اختبار المستوى المجاني بالذكاء الاصطناعي قبل ما تتكلم مع أي حد.',
              },
            ] : [
              {
                q: "What's the difference between Be Fluent and any other course?",
                a: "The core difference is that Be Fluent isn't a recorded course you watch — it's a complete learning system with a personal teacher following up daily on WhatsApp, 1:1 sessions, and a custom plan for your specific goal.",
              },
              {
                q: "I'm a complete beginner — will this work for me?",
                a: "Absolutely! We have the A1 level designed for those who don't know any English. We start with the very first letter in a simple and enjoyable way.",
              },
              {
                q: 'When will I see results?',
                a: 'Most of our students feel a clear difference after the first month. Full results show based on your current level — the average is 3-6 months to complete a full level.',
              },
              {
                q: 'Can I try before paying?',
                a: "Yes! The first session is completely free with no commitment. You can also take the free AI-powered level test before talking to anyone.",
              },
            ]).map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-gray-100">
                <div className="font-bold text-gray-900 mb-2 flex items-start gap-2">
                  <span className="text-[#10B981] flex-shrink-0 font-black">Q</span>
                  {item.q}
                </div>
                <div className="text-gray-500 text-sm leading-relaxed flex gap-2">
                  <span className="text-gray-300 flex-shrink-0 font-black">A</span>
                  {item.a}
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
            {isAr ? 'جاهز تبدأ رحلتك؟' : 'Ready to Start?'}
          </h2>
          <p className="text-slate-400 text-base mb-3">
            {isAr ? 'الحصة الأولى مجانية — بدون أي التزام — بدون بيانات بنك' : 'First session free — no commitment — no credit card'}
          </p>
          <p className="text-slate-500 text-sm mb-8">
            {isAr ? 'أو ابدأ باختبار مستواك المجاني وخليه يوصيلك بالخطة المناسبة' : 'Or start with the free level test and let it recommend the right plan'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/auth/register" className="w-full sm:w-auto bg-[#10B981] text-white font-bold px-9 py-4 rounded-2xl hover:bg-emerald-400 transition shadow-lg shadow-emerald-900/30">
              {isAr ? 'احجز حصتي المجانية الآن' : 'Book My Free Session Now'}
            </Link>
            <Link href="/placement-test" className="w-full sm:w-auto border border-white/10 text-slate-300 font-semibold px-9 py-4 rounded-2xl hover:bg-white/5 transition">
              {isAr ? '🎯 اختبار المستوى المجاني' : '🎯 Free Level Test'}
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <Image src="/logo.png" alt="Be Fluent" width={30} height={30} className="rounded-xl" style={{ height: 'auto' }} />
                <span className="font-black text-white">Be Fluent</span>
              </div>
              <p className="text-sm leading-relaxed mb-4">
                {isAr ? 'رحلتك من المبتدئ إلى الطلاقة تبدأ هنا' : 'Your journey from beginner to fluency starts here'}
              </p>
              <a href="https://api.whatsapp.com/send/?phone=201091515594" className="text-sm text-[#10B981] hover:text-emerald-400 font-semibold transition">
                💬 {isAr ? 'تكلم معنا على واتساب' : 'Chat on WhatsApp'}
              </a>
            </div>
            <div>
              <div className="font-bold text-white mb-4 text-sm">{isAr ? 'التعلم' : 'Learn'}</div>
              <ul className="space-y-2.5 text-sm">
                {[
                  { href: '/placement-test', label: isAr ? 'اختبار المستوى المجاني' : 'Free Level Test' },
                  { href: '/packages', label: isAr ? 'الباقات والأسعار' : 'Plans & Pricing' },
                  { href: '/learning-path', label: isAr ? 'مسار التعلم' : 'Learning Path' },
                ].map(l => <li key={l.href}><Link href={l.href} className="hover:text-white transition">{l.label}</Link></li>)}
              </ul>
            </div>
            <div>
              <div className="font-bold text-white mb-4 text-sm">{isAr ? 'الحساب' : 'Account'}</div>
              <ul className="space-y-2.5 text-sm">
                {[
                  { href: '/auth/login', label: isAr ? 'تسجيل الدخول' : 'Login' },
                  { href: '/auth/register', label: isAr ? 'إنشاء حساب جديد' : 'Create Account' },
                  { href: '/dashboard/student', label: isAr ? 'لوحة تحكم الطالب' : 'Student Dashboard' },
                ].map(l => <li key={l.href}><Link href={l.href} className="hover:text-white transition">{l.label}</Link></li>)}
              </ul>
            </div>
            <div>
              <div className="font-bold text-white mb-4 text-sm">{isAr ? 'الشركة' : 'Company'}</div>
              <ul className="space-y-2.5 text-sm">
                {[
                  { href: '/contact', label: isAr ? 'تواصل معنا' : 'Contact Us' },
                  { href: '/contact', label: isAr ? 'سياسة الخصوصية' : 'Privacy Policy' },
                  { href: '/contact', label: isAr ? 'الشروط والأحكام' : 'Terms of Service' },
                ].map((l, i) => <li key={i}><Link href={l.href} className="hover:text-white transition">{l.label}</Link></li>)}
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
