'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { Globe, CheckCircle, ArrowDown } from "lucide-react";

/* ─── translations ─────────────────────────────────────── */
const T = {
  ar: {
    dir: 'rtl' as const,
    toggle: 'English',
    hero_kicker: 'منصة Be Fluent للغة الإنجليزية',
    hero_h1: 'تعلم الإنجليزية',
    hero_h2: 'واحكم العالم',
    hero_sub: 'معلمون محترفون  •  حصص خاصة مباشرة  •  متابعة يومية على واتساب',
    hero_cta: 'احسب استثمارك الآن',
    hero_cta2: 'ابدأ اختبار المستوى مجاناً',
    graduates: 'طالب متخرج',
    rating_label: 'تقييم الطلاب',
    calc_title: 'احسب استثمارك',
    calc_sub: 'اختر مستواك الحالي وهدفك — السعر يظهر فوراً',
    step1: 'ما هو مستواك الحالي؟',
    step2: 'إلى أين تريد أن تصل؟',
    step3: 'اختر نوع الاشتراك',
    monthly: 'شهري',
    bundle: 'باقة ⚡',
    per_month: 'جنيه / شهر',
    egp: 'جنيه',
    save: 'وفّر',
    book: 'احجز حصتك التجريبية المجانية',
    no_sel: 'اختر مستواك الحالي وهدفك لترى السعر',
    test_title: 'لست متأكداً من مستواك؟',
    test_sub: 'خذ اختبار تحديد المستوى المجاني واعرف نقطة بدايتك بدقة',
    test_cta: 'ابدأ الاختبار المجاني  →',
    footer: '© 2025 Be Fluent — جميع الحقوق محفوظة',
    features: [
      'حصص خاصة مباشرة مع معلم',
      'متابعة يومية على واتساب',
      'دعم فني على مدار الساعة',
      'شهادة إتمام المستوى',
      'اختبار مستوى مجاني',
    ],
    from_levels: [
      { id:'a1', label:'A1', name:'مبتدئ تماماً',   desc:'لم أتعلم الإنجليزية من قبل أو أعرف كلمات قليلة جداً' },
      { id:'a2', label:'A2', name:'أساسي',          desc:'أعرف بعض الجمل البسيطة لكنني لا أستطيع المحادثة' },
      { id:'b1', label:'B1', name:'متوسط',          desc:'أفهم ما يُقال لي لكن أجد صعوبة في التعبير بوضوح' },
      { id:'b2', label:'B2', name:'متوسط متقدم',   desc:'أتحدث الإنجليزية لكن أجد صعوبة في المواقف المعقدة' },
    ],
    to_levels: [
      { id:'a2', label:'A2', name:'أساسي',          desc:'أريد التعامل في المواقف اليومية البسيطة بثقة' },
      { id:'b1', label:'B1', name:'متوسط',          desc:'أريد التعبير عن نفسي بسهولة في معظم المواقف' },
      { id:'b2', label:'B2', name:'متوسط متقدم',   desc:'أريد التحدث بطلاقة تامة في أي موقف كان' },
      { id:'c1', label:'C1', name:'متقدم',          desc:'أريد إتقان اللغة وأن أتحدث كأهلها تماماً' },
    ],
    months_label: (n: number, from: string, to: string) => `${n} أشهر  •  ${from} ← ${to}`,
  },
  en: {
    dir: 'ltr' as const,
    toggle: 'العربية',
    hero_kicker: 'Be Fluent English Platform',
    hero_h1: 'Learn English',
    hero_h2: 'Rule the World',
    hero_sub: 'Expert Teachers  •  Private Live Classes  •  Daily WhatsApp Support',
    hero_cta: 'Calculate Your Investment',
    hero_cta2: 'Start Free Level Test',
    graduates: 'Graduates',
    rating_label: 'Student Rating',
    calc_title: 'Calculate Your Investment',
    calc_sub: 'Choose your current level and goal — price appears instantly',
    step1: 'What is your current level?',
    step2: 'Where do you want to reach?',
    step3: 'Choose plan type',
    monthly: 'Monthly',
    bundle: 'Bundle ⚡',
    per_month: 'EGP / month',
    egp: 'EGP',
    save: 'Save',
    book: 'Book Your Free Trial Session',
    no_sel: 'Select your current level and goal to see the price',
    test_title: "Not sure of your level?",
    test_sub: 'Take our free placement test and find out exactly where to start',
    test_cta: 'Start Free Test  →',
    footer: '© 2025 Be Fluent — All rights reserved',
    features: [
      'Private live sessions with teacher',
      'Daily WhatsApp follow-up',
      '24/7 technical support',
      'Level completion certificate',
      'Free placement test',
    ],
    from_levels: [
      { id:'a1', label:'A1', name:'Complete Beginner',   desc:"I've never studied English or know very few words" },
      { id:'a2', label:'A2', name:'Elementary',          desc:'I know some sentences but struggle with conversation' },
      { id:'b1', label:'B1', name:'Intermediate',        desc:"I understand English but struggle to express myself clearly" },
      { id:'b2', label:'B2', name:'Upper Intermediate',  desc:"I speak English but struggle in complex situations" },
    ],
    to_levels: [
      { id:'a2', label:'A2', name:'Elementary',          desc:'I want to handle basic everyday situations confidently' },
      { id:'b1', label:'B1', name:'Intermediate',        desc:'I want to express myself easily in most situations' },
      { id:'b2', label:'B2', name:'Upper Intermediate',  desc:'I want to speak fluently in any situation' },
      { id:'c1', label:'C1', name:'Advanced',            desc:'I want to master English like a native speaker' },
    ],
    months_label: (n: number, from: string, to: string) => `${n} months  •  ${from} → ${to}`,
  },
};

/* ─── pricing matrix ────────────────────────────────────── */
const ORDER = ['a1','a2','b1','b2','c1'];
const MONTHLY_PRICE: Record<string,number> = { a1:1800, a2:1600, b1:1500, b2:1400 };
const DURATION: Record<string,Record<string,number>> = {
  a1: { a2:3, b1:6, b2:9,  c1:12 },
  a2: {       b1:3, b2:6,  c1:9  },
  b1: {             b2:3,  c1:6  },
  b2: {                    c1:3  },
};
const LEVEL_DISC: Record<string,number> = { a2:0, b1:15, b2:25, c1:35 };
const BUNDLE_EXTRA = 10; // extra bundle discount on top of level discount

const TO_RING: Record<string,string> = {
  a2: 'ring-sky-400',
  b1: 'ring-teal-400',
  b2: 'ring-amber-400',
  c1: 'ring-violet-500',
};
const TO_ACTIVE_BG: Record<string,string> = {
  a2: 'bg-sky-500',
  b1: 'bg-teal-500',
  b2: 'bg-amber-500',
  c1: 'bg-violet-600',
};
const TO_BADGE: Record<string,string> = {
  a2: 'bg-sky-400/20 text-sky-300',
  b1: 'bg-teal-400/20 text-teal-300',
  b2: 'bg-amber-400/20 text-amber-300',
  c1: 'bg-violet-400/20 text-violet-300',
};

export default function Home() {
  const [lang, setLang]       = useState<'ar'|'en'>('ar');
  const [fromLvl, setFromLvl] = useState('a1');
  const [toLvl, setToLvl]     = useState<string|null>(null);
  const [plan, setPlan]       = useState<'monthly'|'bundle'>('bundle');
  const [visible, setVisible] = useState(false);
  const calcRef = useRef<HTMLDivElement>(null);
  const t = T[lang];

  useEffect(() => {
    const saved = localStorage.getItem('bf_lang') as 'ar'|'en'|null;
    if (saved) setLang(saved);
    setTimeout(() => setVisible(true), 60);
  }, []);

  // reset target if now below/equal to source
  useEffect(() => {
    if (toLvl && ORDER.indexOf(toLvl) <= ORDER.indexOf(fromLvl)) setToLvl(null);
  }, [fromLvl, toLvl]);

  const switchLang = () => {
    const next = lang === 'ar' ? 'en' : 'ar';
    setLang(next); localStorage.setItem('bf_lang', next);
  };

  // valid target levels
  const validTo = t.to_levels.filter(l => ORDER.indexOf(l.id) > ORDER.indexOf(fromLvl));

  // price calculation
  const baseMonthly = MONTHLY_PRICE[fromLvl] ?? 1500;
  const months      = toLvl ? (DURATION[fromLvl]?.[toLvl] ?? null) : null;
  const levelDisc   = toLvl ? (LEVEL_DISC[toLvl] ?? 0) : 0;

  let priceMonthly = baseMonthly;
  let priceBundle: number | null = null;
  let origBundle:  number | null = null;
  let saveBundle:  number | null = null;
  let savingMonthly = 0;

  if (months && toLvl) {
    // monthly: apply level discount to per-month rate
    priceMonthly  = Math.round(baseMonthly * (1 - levelDisc / 100) / 100) * 100;
    savingMonthly = baseMonthly - priceMonthly;

    // bundle: full duration with combined discount
    const totalDisc = Math.min(levelDisc + BUNDLE_EXTRA, 45);
    origBundle  = baseMonthly * months;
    priceBundle = Math.round(origBundle * (1 - totalDisc / 100) / 100) * 100;
    saveBundle  = origBundle - priceBundle;
  }

  const fromLabel = t.from_levels.find(l => l.id === fromLvl);
  const toLabel   = toLvl ? t.to_levels.find(l => l.id === toLvl) : null;

  return (
    <div dir={t.dir} className={`min-h-screen bg-white text-[#1F2937] transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>

      {/* ══════════ NAVBAR ══════════ */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Be Fluent" width={38} height={38} className="rounded-xl" priority />
            <span className="text-xl font-black tracking-tight">Be Fluent</span>
          </Link>
          <button onClick={switchLang}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold text-gray-600 hover:border-[#10B981] hover:text-[#10B981] transition-all">
            <Globe className="w-4 h-4" />
            {t.toggle}
          </button>
        </div>
      </header>

      <main className="pt-16">

        {/* ══════════ HERO ══════════ */}
        <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-5 py-20 relative overflow-hidden">
          {/* subtle bg radials */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-50 rounded-full -translate-y-1/2 translate-x-1/3 opacity-70" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-50 rounded-full translate-y-1/2 -translate-x-1/3 opacity-70" />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-white border border-emerald-100 text-emerald-700 text-sm font-bold rounded-full mb-8 shadow-sm shadow-emerald-50">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {t.hero_kicker}
            </span>

            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black leading-[1.0] mb-6 max-w-3xl">
              {t.hero_h1}<br />
              <span className="text-[#10B981]">{t.hero_h2}</span>
            </h1>

            <p className="text-xl text-gray-500 mb-10 max-w-xl leading-relaxed">{t.hero_sub}</p>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <button
                onClick={() => calcRef.current?.scrollIntoView({ behavior:'smooth', block:'start' })}
                className="group flex items-center gap-3 px-10 py-4 bg-[#10B981] text-white font-black text-xl rounded-2xl hover:bg-[#059669] transition-all shadow-xl shadow-emerald-100 hover:-translate-y-0.5">
                {t.hero_cta}
                <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </button>
              <Link href="/placement-test"
                className="px-10 py-4 border-2 border-gray-200 text-gray-700 font-bold text-lg rounded-2xl hover:border-[#10B981] hover:text-[#10B981] transition-all">
                {t.hero_cta2}
              </Link>
            </div>
          </div>

          {/* hero image */}
          <div className="relative z-10 mt-16 w-full max-w-3xl">
            <div className="absolute -inset-3 bg-gradient-to-br from-emerald-100 to-sky-100 rounded-[3rem] blur-2xl opacity-60 -z-10" />
            <Image
              src="/assets/hero-1.png"
              alt="Be Fluent"
              width={900}
              height={450}
              className="w-full h-auto rounded-3xl shadow-2xl object-cover"
              priority
            />
            <div className="absolute -bottom-4 start-6 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 border border-gray-100">
              <span className="text-2xl">🎓</span>
              <div className="text-start">
                <p className="font-black text-[#1F2937] leading-none">+5,000</p>
                <p className="text-xs text-gray-400 mt-0.5">{t.graduates}</p>
              </div>
            </div>
            <div className="absolute -top-4 end-6 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 border border-gray-100">
              <span className="text-2xl">⭐</span>
              <div className="text-start">
                <p className="font-black text-[#1F2937] leading-none">4.9 / 5</p>
                <p className="text-xs text-gray-400 mt-0.5">{t.rating_label}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ INVESTMENT CALCULATOR ══════════ */}
        <section ref={calcRef} className="py-28 px-5" style={{ background: '#0B1120' }}>
          <div className="max-w-2xl mx-auto">

            {/* heading */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-3">{t.calc_title}</h2>
              <p className="text-lg text-slate-400 max-w-md mx-auto">{t.calc_sub}</p>
            </div>

            {/* STEP 1: current level */}
            <div className="mb-10">
              <p className="text-white font-black text-lg mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#10B981] text-white text-sm font-black flex items-center justify-center flex-shrink-0">1</span>
                {t.step1}
              </p>
              <div className="grid grid-cols-4 gap-3">
                {t.from_levels.map(lvl => {
                  const active = fromLvl === lvl.id;
                  return (
                    <button key={lvl.id} onClick={() => setFromLvl(lvl.id)}
                      className={`rounded-2xl p-4 text-center border-2 transition-all duration-200 cursor-pointer select-none
                        ${active
                          ? 'bg-[#10B981] border-[#10B981] text-white shadow-lg shadow-emerald-900/40 scale-[1.04]'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/25'
                        }`}>
                      <p className="text-3xl font-black mb-1">{lvl.label}</p>
                      <p className="text-xs opacity-75 leading-tight">{lvl.name}</p>
                    </button>
                  );
                })}
              </div>
              {/* level progress bar */}
              <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#10B981] to-[#34d399] rounded-full transition-all duration-500"
                  style={{ width:`${(ORDER.indexOf(fromLvl) / 3) * 100}%` }} />
              </div>
              {/* current level desc */}
              <div className="mt-4 px-4 py-3 rounded-xl bg-white/5 border border-white/8">
                <p className="text-slate-300 text-sm leading-relaxed">{fromLabel?.desc}</p>
              </div>
            </div>

            {/* STEP 2: target level */}
            <div className="mb-10">
              <p className="text-white font-black text-lg mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#10B981] text-white text-sm font-black flex items-center justify-center flex-shrink-0">2</span>
                {t.step2}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {t.to_levels.map(lvl => {
                  const isValid  = ORDER.indexOf(lvl.id) > ORDER.indexOf(fromLvl);
                  const isActive = toLvl === lvl.id;
                  const disc     = LEVEL_DISC[lvl.id];
                  return (
                    <button key={lvl.id}
                      onClick={() => isValid && setToLvl(lvl.id)}
                      disabled={!isValid}
                      className={`relative rounded-2xl p-4 text-center border-2 transition-all duration-200 select-none
                        ${!isValid
                          ? 'opacity-20 cursor-not-allowed bg-white/3 border-white/5'
                          : isActive
                            ? `${TO_ACTIVE_BG[lvl.id]} border-transparent text-white shadow-xl scale-[1.04] ring-4 ring-offset-2 ring-offset-[#0B1120] ${TO_RING[lvl.id]}`
                            : `bg-white/5 border-white/15 text-slate-300 cursor-pointer hover:bg-white/10 hover:border-white/30 hover:scale-[1.02]`
                        }`}>
                      {disc > 0 && isValid && (
                        <span className={`absolute -top-2.5 ${lang==='ar'?'left-2':'right-2'} text-xs font-black px-2 py-0.5 rounded-full ${isActive ? 'bg-white/25 text-white' : TO_BADGE[lvl.id]}`}>
                          -{disc}%
                        </span>
                      )}
                      <p className="text-3xl font-black mb-1">{lvl.label}</p>
                      <p className="text-xs opacity-75 leading-tight">{lvl.name}</p>
                    </button>
                  );
                })}
              </div>
              {toLvl && (
                <div className="mt-4 px-4 py-3 rounded-xl bg-white/5 border border-white/8">
                  <p className="text-slate-300 text-sm leading-relaxed">{toLabel?.desc}</p>
                </div>
              )}
            </div>

            {/* STEP 3: price result */}
            {toLvl && months ? (
              <div>
                <p className="text-white font-black text-lg mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#10B981] text-white text-sm font-black flex items-center justify-center flex-shrink-0">3</span>
                  {t.step3}
                </p>

                {/* plan toggle */}
                <div className="flex gap-2 mb-6 bg-white/5 rounded-2xl p-1.5 border border-white/10 w-fit">
                  {(['monthly','bundle'] as const).map(p => (
                    <button key={p} onClick={() => setPlan(p)}
                      className={`px-7 py-2.5 rounded-xl font-black text-sm transition-all
                        ${plan===p ? 'bg-[#10B981] text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>
                      {p === 'monthly' ? t.monthly : t.bundle}
                    </button>
                  ))}
                </div>

                {/* price card */}
                <div className="rounded-3xl border border-white/12 bg-white/6 backdrop-blur-md p-8">
                  {/* price row */}
                  <div className="flex flex-wrap items-end gap-3 mb-3">
                    {plan === 'monthly' ? (
                      <>
                        {savingMonthly > 0 && (
                          <span className="text-slate-500 line-through text-2xl">{baseMonthly.toLocaleString()}</span>
                        )}
                        <span className="text-6xl font-black text-white">{priceMonthly.toLocaleString()}</span>
                        <span className="text-slate-400 text-lg pb-1">{t.per_month}</span>
                      </>
                    ) : (
                      <>
                        {origBundle && <span className="text-slate-500 line-through text-2xl">{origBundle.toLocaleString()}</span>}
                        <span className="text-6xl font-black text-white">{priceBundle?.toLocaleString()}</span>
                        <span className="text-slate-400 text-lg pb-1">{t.egp}</span>
                      </>
                    )}
                  </div>

                  {/* journey info & saving */}
                  <div className="flex flex-wrap items-center gap-3 mb-8">
                    <span className="text-slate-400 text-sm">
                      {t.months_label(months, fromLabel?.label ?? '', toLabel?.label ?? '')}
                    </span>
                    {plan === 'monthly' && savingMonthly > 0 && (
                      <span className="bg-[#10B981]/20 text-[#10B981] text-sm font-bold px-3 py-1 rounded-full">
                        {t.save} {savingMonthly.toLocaleString()} {t.egp}
                      </span>
                    )}
                    {plan === 'bundle' && saveBundle && (
                      <span className="bg-[#10B981]/20 text-[#10B981] text-sm font-bold px-3 py-1 rounded-full">
                        {t.save} {saveBundle.toLocaleString()} {t.egp}
                      </span>
                    )}
                  </div>

                  {/* features */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 pt-6 border-t border-white/10">
                    {t.features.map((f,i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link href="/auth/register"
                    className="block text-center py-4 px-8 bg-[#10B981] text-white font-black text-xl rounded-2xl hover:bg-[#059669] transition-all shadow-xl shadow-emerald-900/40 hover:-translate-y-0.5">
                    {t.book}
                  </Link>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-white/10 rounded-3xl p-12 text-center">
                <p className="text-5xl mb-4">👆</p>
                <p className="text-slate-500 text-lg">{t.no_sel}</p>
              </div>
            )}
          </div>
        </section>

        {/* ══════════ PLACEMENT TEST ══════════ */}
        <section className="py-20 px-5 bg-[#F8FAFC]">
          <div className="max-w-2xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl" style={{ background: '#0B1120' }}>
              <div className="absolute top-0 end-0 w-72 h-72 bg-[#10B981]/8 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
              <div className="absolute bottom-0 start-0 w-56 h-56 bg-[#10B981]/8 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />
              <div className="relative z-10 p-12 text-center">
                <span className="text-6xl block mb-5">🎯</span>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{t.test_title}</h2>
                <p className="text-lg text-slate-400 mb-8 max-w-md mx-auto leading-relaxed">{t.test_sub}</p>
                <Link href="/placement-test"
                  className="inline-block px-10 py-4 bg-[#10B981] text-white font-black text-xl rounded-2xl hover:bg-[#059669] transition-all shadow-xl hover:-translate-y-0.5">
                  {t.test_cta}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ FOOTER ══════════ */}
        <footer className="border-t border-gray-100 py-8 px-5 bg-white">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Be Fluent" width={30} height={30} className="rounded-lg" />
              <span className="font-black">Be Fluent</span>
            </div>
            <p className="text-gray-400 text-sm">{t.footer}</p>
            <button onClick={switchLang}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#10B981] transition-colors font-semibold">
              <Globe className="w-4 h-4" />
              {t.toggle}
            </button>
          </div>
        </footer>

      </main>
      <FloatingContactButtons />
    </div>
  );
}
