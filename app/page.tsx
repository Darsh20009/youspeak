'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { Globe, CheckCircle, ArrowDown } from "lucide-react";

/* ─── translations ──────────────────────────────────────── */
const T = {
  ar: {
    dir: 'rtl' as const,
    toggle: 'English',
    hero_h1: 'تعلم الإنجليزية',
    hero_h2: 'واحكم العالم',
    hero_sub: 'حصص خاصة مباشرة مع معلمين محترفين ومتابعة يومية على واتساب',
    cta_calc: 'احسب استثمارك',
    cta_test: 'اختبار المستوى مجاناً',
    graduates: 'طالب متخرج',
    rating: 'تقييم الطلاب',
    calc_h: 'احسب استثمارك',
    calc_sub: 'اختر مستواك الحالي وهدفك — وسنحسب لك السعر فوراً',
    step1: 'ما هو مستواك الحالي؟',
    step2: 'إلى أين تريد أن تصل؟',
    monthly: 'شهري',
    bundle: '⚡ باقة',
    per_month: 'جنيه / شهر',
    egp: 'جنيه',
    save: 'وفّر',
    book: 'احجز حصتك التجريبية المجانية',
    hint: 'اختر مستواك الحالي ثم مستوى هدفك',
    features: ['حصص خاصة مباشرة', 'متابعة يومية على واتساب', 'دعم 24/7', 'شهادة إتمام المستوى', 'اختبار مستوى مجاني'],
    pkgFeats: [[0,1,2],[0,1,2,3],[0,1,2,3,4]],
    test_h: 'لست متأكداً من مستواك؟',
    test_sub: 'خذ اختبار تحديد المستوى المجاني واعرف نقطة بدايتك الصحيحة بدقة',
    test_btn: 'ابدأ الاختبار المجاني',
    footer: '© 2025 Be Fluent — جميع الحقوق محفوظة',
    from_levels: [
      { id:'a1', label:'A1', name:'مبتدئ',    desc:'لم أتعلم الإنجليزية من قبل أو أعرف كلمات قليلة جداً' },
      { id:'a2', label:'A2', name:'أساسي',    desc:'أعرف بعض الجمل البسيطة لكنني لا أستطيع المحادثة' },
      { id:'b1', label:'B1', name:'متوسط',    desc:'أفهم ما يقال لي لكن أجد صعوبة في التعبير عن نفسي' },
      { id:'b2', label:'B2', name:'متقدم',    desc:'أتحدث الإنجليزية لكن أجد صعوبة في المواقف المعقدة' },
    ],
    to_levels: [
      { id:'a2', label:'A2', name:'أساسي',    desc:'أريد التعامل في المواقف اليومية البسيطة' },
      { id:'b1', label:'B1', name:'متوسط',    desc:'أريد التعبير عن نفسي بسهولة في معظم المواقف' },
      { id:'b2', label:'B2', name:'متوسط متقدم', desc:'أريد التحدث بطلاقة تامة في أي موقف' },
      { id:'c1', label:'C1', name:'متقدم',    desc:'أريد إتقان اللغة وأتحدث كأهلها تماماً' },
    ],
  },
  en: {
    dir: 'ltr' as const,
    toggle: 'العربية',
    hero_h1: 'Learn English',
    hero_h2: 'Rule the World',
    hero_sub: 'Private live sessions with expert teachers and daily WhatsApp support',
    cta_calc: 'Calculate Investment',
    cta_test: 'Free Level Test',
    graduates: 'Graduates',
    rating: 'Student Rating',
    calc_h: 'Calculate Your Investment',
    calc_sub: 'Choose your current level and goal — we calculate the price instantly',
    step1: 'What is your current level?',
    step2: 'Where do you want to reach?',
    monthly: 'Monthly',
    bundle: '⚡ Bundle',
    per_month: 'EGP / month',
    egp: 'EGP',
    save: 'Save',
    book: 'Book Your Free Trial Session',
    hint: 'Choose your current level then your target level',
    features: ['Private live sessions', 'Daily WhatsApp follow-up', '24/7 support', 'Level completion certificate', 'Free placement test'],
    pkgFeats: [[0,1,2],[0,1,2,3],[0,1,2,3,4]],
    test_h: "Not sure of your level?",
    test_sub: 'Take our free placement test and find out exactly where to start',
    test_btn: 'Start Free Test',
    footer: '© 2025 Be Fluent — All rights reserved',
    from_levels: [
      { id:'a1', label:'A1', name:'Beginner',         desc:"I've never studied English or know very few words" },
      { id:'a2', label:'A2', name:'Elementary',       desc:'I know some sentences but struggle with conversation' },
      { id:'b1', label:'B1', name:'Intermediate',     desc:"I understand English but struggle to express myself" },
      { id:'b2', label:'B2', name:'Upper Int.',       desc:"I speak English but struggle in complex situations" },
    ],
    to_levels: [
      { id:'a2', label:'A2', name:'Elementary',       desc:'I want to handle basic everyday situations' },
      { id:'b1', label:'B1', name:'Intermediate',     desc:'I want to express myself easily in most situations' },
      { id:'b2', label:'B2', name:'Upper Int.',       desc:'I want to speak fluently in any situation' },
      { id:'c1', label:'C1', name:'Advanced',         desc:'I want to master the language like a native speaker' },
    ],
  },
};

/* ─── pricing ───────────────────────────────────────────── */
const ORDER  = ['a1','a2','b1','b2','c1'];
const M_BASE: Record<string,number> = { a1:1800, a2:1600, b1:1500, b2:1400 };
const DUR: Record<string,Record<string,number>> = {
  a1:{ a2:3, b1:6, b2:9,  c1:12 },
  a2:{       b1:3, b2:6,  c1:9  },
  b1:{             b2:3,  c1:6  },
  b2:{                    c1:3  },
};
const DISC: Record<string,number>  = { a2:0, b1:15, b2:25, c1:35 };
const BUNDLE_ADD = 10;

const DISC_COLOR: Record<string,{ pill:string; border:string; activeBg:string }> = {
  a2: { pill:'bg-sky-50 text-sky-600',    border:'border-sky-200 hover:border-sky-400',    activeBg:'bg-sky-500 border-sky-500 text-white' },
  b1: { pill:'bg-teal-50 text-teal-600',  border:'border-teal-200 hover:border-teal-400',  activeBg:'bg-teal-500 border-teal-500 text-white' },
  b2: { pill:'bg-amber-50 text-amber-600',border:'border-amber-200 hover:border-amber-400',activeBg:'bg-amber-500 border-amber-500 text-white' },
  c1: { pill:'bg-violet-50 text-violet-600',border:'border-violet-200 hover:border-violet-400',activeBg:'bg-violet-600 border-violet-600 text-white' },
};

export default function Home() {
  const [lang, setLang]   = useState<'ar'|'en'>('ar');
  const [from, setFrom]   = useState('a1');
  const [to, setTo]       = useState<string|null>(null);
  const [plan, setPlan]   = useState<'monthly'|'bundle'>('bundle');
  const [ready, setReady] = useState(false);
  const calcRef = useRef<HTMLDivElement>(null);
  const t = T[lang];

  useEffect(() => {
    const s = localStorage.getItem('bf_lang') as 'ar'|'en'|null;
    if (s) setLang(s);
    setTimeout(() => setReady(true), 40);
  }, []);

  useEffect(() => {
    if (to && ORDER.indexOf(to) <= ORDER.indexOf(from)) setTo(null);
  }, [from, to]);

  const toggle = () => {
    const n = lang === 'ar' ? 'en' : 'ar';
    setLang(n); localStorage.setItem('bf_lang', n);
  };

  /* price calc */
  const base    = M_BASE[from] ?? 1500;
  const months  = to ? (DUR[from]?.[to] ?? null) : null;
  const lvlDisc = to ? (DISC[to] ?? 0) : 0;

  const monthlyRate = months ? Math.round(base * (1 - lvlDisc / 100) / 100) * 100 : base;
  const saveMo      = base - monthlyRate;
  const orig        = months ? base * months : null;
  const bundleTotal = orig ? Math.round(orig * (1 - Math.min(lvlDisc + BUNDLE_ADD, 45) / 100) / 100) * 100 : null;
  const saveBundle  = orig && bundleTotal ? orig - bundleTotal : null;

  const fromData = t.from_levels.find(l => l.id === from);
  const toData   = to ? t.to_levels.find(l => l.id === to) : null;

  const validTo = t.to_levels.filter(l => ORDER.indexOf(l.id) > ORDER.indexOf(from));

  return (
    <div dir={t.dir} className={`min-h-screen bg-white text-[#111827] transition-opacity duration-300 ${ready ? 'opacity-100' : 'opacity-0'}`}>

      {/* ─── NAVBAR ─── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Be Fluent" width={36} height={36} className="rounded-xl" priority />
            <span className="text-xl font-black">Be Fluent</span>
          </Link>
          <button onClick={toggle}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold text-gray-600 hover:border-[#10B981] hover:text-[#10B981] transition-colors">
            <Globe className="w-4 h-4" />
            {t.toggle}
          </button>
        </div>
      </header>

      <main className="pt-16">

        {/* ─── HERO ─── */}
        <section className="px-5 pt-20 pb-10 text-center max-w-3xl mx-auto">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black leading-[1.05] mb-5">
            {t.hero_h1}<br />
            <span className="text-[#10B981]">{t.hero_h2}</span>
          </h1>
          <p className="text-xl text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">{t.hero_sub}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button onClick={() => calcRef.current?.scrollIntoView({ behavior:'smooth' })}
              className="px-9 py-4 bg-[#10B981] text-white font-black text-lg rounded-2xl hover:bg-[#059669] transition-colors shadow-lg shadow-emerald-100">
              {t.cta_calc}
            </button>
            <Link href="/placement-test"
              className="px-9 py-4 border-2 border-gray-200 text-gray-700 font-semibold text-lg rounded-2xl hover:border-[#10B981] hover:text-[#10B981] transition-colors">
              {t.cta_test}
            </Link>
          </div>

          {/* hero image with floating badges */}
          <div className="relative">
            <Image src="/assets/hero-1.png" alt="Be Fluent" width={900} height={480}
              className="w-full h-auto rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 object-cover" priority />
            <div className="absolute -bottom-5 start-6 bg-white rounded-2xl shadow-lg px-4 py-3 border border-gray-100 flex items-center gap-3 text-start">
              <span className="text-3xl">🎓</span>
              <div><p className="font-black text-lg leading-none">+5,000</p><p className="text-xs text-gray-400 mt-0.5">{t.graduates}</p></div>
            </div>
            <div className="absolute -top-5 end-6 bg-white rounded-2xl shadow-lg px-4 py-3 border border-gray-100 flex items-center gap-3 text-start">
              <span className="text-3xl">⭐</span>
              <div><p className="font-black text-lg leading-none">4.9 / 5</p><p className="text-xs text-gray-400 mt-0.5">{t.rating}</p></div>
            </div>
          </div>
        </section>

        {/* ─── CALCULATOR ─── */}
        <section ref={calcRef} className="py-24 px-5 bg-gray-50">
          <div className="max-w-2xl mx-auto">

            {/* heading */}
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-black mb-3">{t.calc_h}</h2>
              <p className="text-xl text-gray-500">{t.calc_sub}</p>
            </div>

            {/* STEP 1 – current level tab bar */}
            <div className="mb-12">
              <p className="text-base font-bold text-gray-500 uppercase tracking-widest mb-5 text-center">{t.step1}</p>
              <div className="border-b-2 border-gray-200 flex">
                {t.from_levels.map(lvl => {
                  const active = from === lvl.id;
                  return (
                    <button key={lvl.id} onClick={() => setFrom(lvl.id)}
                      className={`flex-1 pb-4 text-center relative transition-all duration-200 select-none
                        ${active ? 'text-[#10B981]' : 'text-gray-400 hover:text-gray-600'}`}>
                      <p className={`text-2xl font-black mb-1 ${active ? '' : ''}`}>{lvl.label}</p>
                      <p className="text-xs">{lvl.name}</p>
                      {active && <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#10B981] rounded-full" />}
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 text-center">
                <p className="text-gray-500 text-sm leading-relaxed">{fromData?.desc}</p>
              </div>
            </div>

            {/* STEP 2 – target level cards */}
            <div className="mb-10">
              <p className="text-base font-bold text-gray-500 uppercase tracking-widest mb-5 text-center">{t.step2}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {t.to_levels.map(lvl => {
                  const valid  = ORDER.indexOf(lvl.id) > ORDER.indexOf(from);
                  const active = to === lvl.id;
                  const disc   = DISC[lvl.id];
                  const col    = DISC_COLOR[lvl.id];
                  return (
                    <button key={lvl.id}
                      onClick={() => valid && setTo(lvl.id)}
                      disabled={!valid}
                      className={`relative p-5 rounded-2xl border-2 text-center transition-all duration-200 select-none
                        ${!valid  ? 'opacity-25 cursor-not-allowed bg-white border-gray-100'
                        : active  ? col.activeBg + ' shadow-lg scale-[1.03]'
                        :           'bg-white cursor-pointer ' + col.border
                        }`}>
                      {disc > 0 && valid && (
                        <span className={`absolute -top-2.5 ${lang==='ar' ? 'left-2' : 'right-2'} text-xs font-black px-2 py-0.5 rounded-full
                          ${active ? 'bg-white/30 text-white' : col.pill}`}>
                          -{disc}%
                        </span>
                      )}
                      <p className={`text-xl font-black mb-1 ${active ? 'text-white' : 'text-[#111827]'}`}>{lvl.label}</p>
                      <p className={`text-xs leading-tight ${active ? 'text-white/80' : 'text-gray-500'}`}>{lvl.name}</p>
                    </button>
                  );
                })}
              </div>
              {to && toData && (
                <p className="mt-4 text-gray-500 text-sm text-center leading-relaxed">{toData.desc}</p>
              )}
            </div>

            {/* RESULT */}
            {to && months ? (
              <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
                {/* plan toggle */}
                <div className="flex border-b border-gray-100">
                  {(['monthly','bundle'] as const).map(p => (
                    <button key={p} onClick={() => setPlan(p)}
                      className={`flex-1 py-4 font-black text-base transition-colors
                        ${plan===p ? 'bg-[#10B981] text-white' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}>
                      {p==='monthly' ? t.monthly : t.bundle}
                    </button>
                  ))}
                </div>

                <div className="p-8">
                  {/* price */}
                  {plan==='monthly' ? (
                    <div className="mb-2 flex items-end gap-2 flex-wrap">
                      {saveMo > 0 && <span className="text-gray-300 line-through text-2xl">{base.toLocaleString()}</span>}
                      <span className="text-7xl font-black text-[#111827]">{monthlyRate.toLocaleString()}</span>
                      <span className="text-gray-400 text-lg pb-1">{t.per_month}</span>
                    </div>
                  ) : (
                    <div className="mb-2 flex items-end gap-2 flex-wrap">
                      {orig && <span className="text-gray-300 line-through text-2xl">{orig.toLocaleString()}</span>}
                      <span className="text-7xl font-black text-[#111827]">{bundleTotal?.toLocaleString()}</span>
                      <span className="text-gray-400 text-lg pb-1">{t.egp}</span>
                    </div>
                  )}

                  {/* meta */}
                  <div className="flex flex-wrap items-center gap-3 mb-8">
                    <span className="text-gray-400 text-sm">
                      {fromData?.label} → {toData?.label} · {months} {lang==='ar'?'أشهر':'months'}
                    </span>
                    {plan==='monthly' && saveMo>0 && (
                      <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                        {t.save} {saveMo.toLocaleString()} {t.egp}
                      </span>
                    )}
                    {plan==='bundle' && saveBundle && (
                      <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                        {t.save} {saveBundle.toLocaleString()} {t.egp}
                      </span>
                    )}
                  </div>

                  {/* features */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8 pb-8 border-b border-gray-100">
                    {(plan==='monthly' ? t.pkgFeats[0] : t.pkgFeats[2]).map((fi: number) => (
                      <li key={fi} className="flex items-center gap-2.5">
                        <CheckCircle className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{t.features[fi]}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link href="/auth/register"
                    className="block text-center py-4 bg-[#111827] text-white font-black text-xl rounded-2xl hover:bg-[#1F2937] transition-colors">
                    {t.book}
                  </Link>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center border-2 border-dashed border-gray-200 rounded-3xl">
                <p className="text-5xl mb-4">👆</p>
                <p className="text-gray-400 text-lg">{t.hint}</p>
              </div>
            )}
          </div>
        </section>

        {/* ─── PLACEMENT TEST ─── */}
        <section className="py-20 px-5 bg-[#F0FDF4]">
          <div className="max-w-xl mx-auto text-center">
            <span className="text-6xl block mb-6">🎯</span>
            <h2 className="text-3xl md:text-4xl font-black mb-4">{t.test_h}</h2>
            <p className="text-xl text-gray-500 mb-8 leading-relaxed">{t.test_sub}</p>
            <Link href="/placement-test"
              className="inline-block px-10 py-4 bg-[#10B981] text-white font-black text-xl rounded-2xl hover:bg-[#059669] transition-colors shadow-lg shadow-emerald-100">
              {t.test_btn}
            </Link>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="border-t border-gray-100 py-8 px-5 bg-white">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Be Fluent" width={28} height={28} className="rounded-lg" />
              <span className="font-black text-[#111827]">Be Fluent</span>
            </div>
            <p className="text-gray-400 text-sm">{t.footer}</p>
            <button onClick={toggle}
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
