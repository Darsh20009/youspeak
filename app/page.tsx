'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { Globe, CheckCircle, ArrowDown, ChevronRight } from "lucide-react";

/* ─── translations ─────────────────────────────────────── */
const T = {
  ar: {
    dir: 'rtl' as const,
    toggle: 'English',
    badge: 'منصة تعليمية احترافية',
    h1a: 'تعلم الإنجليزية',
    h1b: 'بثقة واحتراف',
    sub: 'معلمون محترفون  •  حصص مباشرة  •  متابعة يومية على واتساب',
    cta: 'اختر مستواك الآن',
    sec_levels: 'ما هو مستواك الحالي؟',
    sec_levels_sub: 'اضغط على المستوى الذي يناسبك لترى الباقات المخصصة لك',
    sec_pricing: 'باقاتنا',
    sec_pricing_sub: 'أسعار واضحة، بدون أي تعقيد',
    popular: 'الأكثر طلباً',
    subscribe: 'سجل الآن',
    trial: 'جميع الباقات تشمل حصة تجريبية مجانية',
    sec_test: 'لا تعرف مستواك؟',
    sec_test_sub: 'خذ اختبار تحديد المستوى المجاني واعرف نقطة بدايتك الصحيحة',
    test_cta: 'ابدأ الاختبار المجاني  →',
    footer: '© 2025 Be Fluent — جميع الحقوق محفوظة',
    f_month: 'جنيه / شهر',
    f_quarter: 'جنيه / 3 أشهر',
    f_semi: 'جنيه / 6 أشهر',
    f_monthly: 'شهري',
    f_quarterly: 'فصلي',
    f_semi_name: 'نصف سنوي',
    f_items: ['حصص مباشرة مع معلم', 'متابعة يومية واتساب', 'دعم 24/7', 'شهادة إتمام المستوى', 'اختبار مستوى مجاني'],
    f_pkg: [[0,1,2],[0,1,2,3],[0,1,2,3,4]],
    f_sessions: ['8 حصص', '24 حصة', '48 حصة'],
    levels: [
      { id:'a1', emoji:'🌱', name:'مبتدئ',    code:'A1 – A2', desc:'لم تتعلم الإنجليزية من قبل أو تعرف كلمات بسيطة جداً' },
      { id:'b1', emoji:'📖', name:'أساسي',    code:'B1',      desc:'تفهم الجمل البسيطة وتريد تطوير مهارات التواصل' },
      { id:'b2', emoji:'🎯', name:'متوسط',    code:'B2',      desc:'تتحدث الإنجليزية وتحتاج مزيداً من الطلاقة والثقة' },
      { id:'c1', emoji:'🏆', name:'متقدم',    code:'C1 – C2', desc:'مستواك جيد وتريد الوصول للاحتراف والأصالة التامة' },
    ],
  },
  en: {
    dir: 'ltr' as const,
    toggle: 'العربية',
    badge: 'Professional Learning Platform',
    h1a: 'Learn English',
    h1b: 'With Confidence',
    sub: 'Expert Teachers  •  Live Classes  •  Daily WhatsApp Support',
    cta: 'Choose Your Level',
    sec_levels: 'What is your current level?',
    sec_levels_sub: 'Tap your level to see the packages designed for you',
    sec_pricing: 'Our Plans',
    sec_pricing_sub: 'Clear prices — no surprises, no complexity',
    popular: 'Most Popular',
    subscribe: 'Subscribe Now',
    trial: 'All plans include a free trial session with your teacher',
    sec_test: "Don't know your level?",
    sec_test_sub: 'Take our free placement test and discover exactly where to start',
    test_cta: 'Start Free Test  →',
    footer: '© 2025 Be Fluent — All rights reserved',
    f_month: 'EGP / month',
    f_quarter: 'EGP / 3 months',
    f_semi: 'EGP / 6 months',
    f_monthly: 'Monthly',
    f_quarterly: 'Quarterly',
    f_semi_name: 'Semi-Annual',
    f_items: ['Live sessions with teacher', 'Daily WhatsApp follow-up', '24/7 support', 'Level completion certificate', 'Free placement test'],
    f_pkg: [[0,1,2],[0,1,2,3],[0,1,2,3,4]],
    f_sessions: ['8 sessions', '24 sessions', '48 sessions'],
    levels: [
      { id:'a1', emoji:'🌱', name:'Beginner',     code:'A1 – A2', desc:"You've never learned English or know very few basic words" },
      { id:'b1', emoji:'📖', name:'Elementary',   code:'B1',      desc:'You understand simple sentences and want to improve communication' },
      { id:'b2', emoji:'🎯', name:'Intermediate', code:'B2',      desc:"You speak English but need more fluency and confidence" },
      { id:'c1', emoji:'🏆', name:'Advanced',     code:'C1 – C2', desc:"Your level is high and you want complete mastery and authentic accent" },
    ],
  },
};

/* ─── level color palette ───────────────────────────────── */
const LEVEL_COLORS: Record<string, { card: string; glow: string; badge: string }> = {
  a1: { card: 'from-sky-400 to-sky-600',      glow: 'shadow-sky-200 ring-sky-400',      badge: 'bg-sky-100 text-sky-700' },
  b1: { card: 'from-teal-400 to-teal-600',    glow: 'shadow-teal-200 ring-teal-400',    badge: 'bg-teal-100 text-teal-700' },
  b2: { card: 'from-emerald-400 to-emerald-600', glow: 'shadow-emerald-200 ring-emerald-400', badge: 'bg-emerald-100 text-emerald-700' },
  c1: { card: 'from-violet-500 to-violet-700', glow: 'shadow-violet-200 ring-violet-400', badge: 'bg-violet-100 text-violet-700' },
};

export default function Home() {
  const [lang, setLang] = useState<'ar'|'en'>('ar');
  const [selected, setSelected] = useState<string|null>(null);
  const [visible, setVisible] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);
  const testRef    = useRef<HTMLDivElement>(null);

  const t = T[lang];

  /* restore lang from storage */
  useEffect(() => {
    const saved = localStorage.getItem('bf_lang') as 'ar'|'en'|null;
    if (saved) setLang(saved);
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const switchLang = () => {
    const next = lang === 'ar' ? 'en' : 'ar';
    setLang(next);
    localStorage.setItem('bf_lang', next);
  };

  const pickLevel = (id: string) => {
    setSelected(id);
    setTimeout(() => pricingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  };

  const packages = [
    { name: t.f_monthly,   price: '1500', unit: t.f_month,   sessions: t.f_sessions[0], popular: false, fi: 0 },
    { name: t.f_quarterly, price: '3500', unit: t.f_quarter, sessions: t.f_sessions[1], popular: true,  fi: 1 },
    { name: t.f_semi_name, price: '6000', unit: t.f_semi,    sessions: t.f_sessions[2], popular: false, fi: 2 },
  ];

  return (
    <div
      dir={t.dir}
      className={`min-h-screen bg-white text-[#1F2937] transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >

      {/* ══════════════════ NAVBAR ══════════════════ */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Be Fluent" width={38} height={38} className="rounded-xl" priority />
            <span className="text-xl font-black tracking-tight">Be Fluent</span>
          </Link>

          {/* Language toggle only */}
          <button
            onClick={switchLang}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold text-gray-600 hover:border-[#10B981] hover:text-[#10B981] transition-all duration-200"
          >
            <Globe className="w-4 h-4" />
            {t.toggle}
          </button>
        </div>
      </header>

      <main className="pt-16">

        {/* ══════════════════ HERO ══════════════════ */}
        <section className="min-h-[92vh] flex flex-col md:flex-row items-center max-w-6xl mx-auto px-5 py-16 gap-12">

          {/* Text side */}
          <div className="flex-1 flex flex-col items-start text-start order-2 md:order-1">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 text-sm font-bold rounded-full mb-6 border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
              {t.badge}
            </span>

            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] text-[#1F2937] mb-5">
              {t.h1a}<br />
              <span className="text-[#10B981]">{t.h1b}</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-500 mb-10 leading-relaxed max-w-lg">
              {t.sub}
            </p>

            <button
              onClick={() => document.getElementById('levels')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center gap-3 px-8 py-4 bg-[#10B981] text-white font-black text-xl rounded-2xl hover:bg-[#059669] transition-all duration-200 shadow-xl shadow-emerald-100 hover:shadow-emerald-200 hover:-translate-y-0.5"
            >
              {t.cta}
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>

          {/* Image side */}
          <div className="flex-1 order-1 md:order-2 w-full max-w-lg mx-auto">
            <div className="relative">
              {/* Decorative blob behind image */}
              <div className="absolute -inset-4 bg-gradient-to-br from-emerald-100 to-sky-100 rounded-[3rem] opacity-60 -z-10" />
              <Image
                src="/assets/hero-1.png"
                alt="Be Fluent - Learn English"
                width={600}
                height={500}
                className="w-full h-auto rounded-[2rem] shadow-2xl shadow-gray-200 object-cover"
                priority
              />
              {/* Floating stats */}
              <div className="absolute -bottom-5 start-4 bg-white rounded-2xl shadow-lg px-5 py-3 flex items-center gap-3 border border-gray-100">
                <span className="text-3xl">🎓</span>
                <div>
                  <p className="font-black text-[#1F2937] text-lg leading-none">+5,000</p>
                  <p className="text-xs text-gray-400 mt-0.5">{lang === 'ar' ? 'طالب متخرج' : 'Graduates'}</p>
                </div>
              </div>
              <div className="absolute -top-5 end-4 bg-white rounded-2xl shadow-lg px-5 py-3 flex items-center gap-3 border border-gray-100">
                <span className="text-3xl">⭐</span>
                <div>
                  <p className="font-black text-[#1F2937] text-lg leading-none">4.9 / 5</p>
                  <p className="text-xs text-gray-400 mt-0.5">{lang === 'ar' ? 'تقييم الطلاب' : 'Student Rating'}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════ LEVELS ══════════════════ */}
        <section id="levels" className="py-24 px-5 bg-[#F8FAFC]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-black text-[#1F2937] mb-3">{t.sec_levels}</h2>
              <p className="text-xl text-gray-500 max-w-xl mx-auto">{t.sec_levels_sub}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {t.levels.map(level => {
                const col = LEVEL_COLORS[level.id];
                const isSelected = selected === level.id;
                return (
                  <button
                    key={level.id}
                    onClick={() => pickLevel(level.id)}
                    className={`group relative flex flex-col items-center text-center p-7 rounded-3xl cursor-pointer transition-all duration-300 select-none
                      ${isSelected
                        ? `bg-gradient-to-b ${col.card} text-white shadow-2xl ${col.glow} ring-4 ring-offset-2 scale-[1.04]`
                        : 'bg-white text-[#1F2937] border border-gray-100 hover:shadow-xl hover:-translate-y-1 hover:border-gray-200'
                      }`}
                  >
                    <span className="text-6xl mb-4">{level.emoji}</span>
                    <p className={`text-2xl font-black mb-1 ${isSelected ? 'text-white' : 'text-[#1F2937]'}`}>
                      {level.name}
                    </p>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full mb-3 ${isSelected ? 'bg-white/20 text-white' : col.badge}`}>
                      {level.code}
                    </span>
                    <p className={`text-sm leading-snug ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                      {level.desc}
                    </p>
                    {isSelected && (
                      <span className="absolute top-3 end-3 bg-white/25 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════ PRICING ══════════════════ */}
        <section ref={pricingRef} className="py-24 px-5 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-black text-[#1F2937] mb-3">{t.sec_pricing}</h2>
              <p className="text-xl text-gray-500">{t.sec_pricing_sub}</p>
              {selected && (
                <div className="inline-flex items-center gap-2 mt-4 px-5 py-2 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 font-semibold text-sm">
                  <span>{t.levels.find(l => l.id === selected)?.emoji}</span>
                  {lang === 'ar'
                    ? `باقات مناسبة لمستوى ${t.levels.find(l => l.id === selected)?.name}`
                    : `Plans for ${t.levels.find(l => l.id === selected)?.name} level`
                  }
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {packages.map((pkg, i) => (
                <div
                  key={i}
                  className={`relative flex flex-col rounded-3xl p-8 transition-all duration-300
                    ${pkg.popular
                      ? 'bg-[#1F2937] text-white shadow-2xl shadow-gray-300 ring-4 ring-[#10B981] ring-offset-2 scale-[1.03]'
                      : 'bg-[#F8FAFC] border border-gray-100 hover:shadow-xl'
                    }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 start-1/2 -translate-x-1/2 rtl:translate-x-1/2">
                      <span className="bg-[#10B981] text-white text-sm font-black px-5 py-1.5 rounded-full shadow-md shadow-emerald-200 whitespace-nowrap">
                        ⭐ {t.popular}
                      </span>
                    </div>
                  )}

                  <p className={`text-lg font-black mb-1 ${pkg.popular ? 'text-white/70' : 'text-gray-400'}`}>
                    {pkg.sessions}
                  </p>

                  <h3 className={`text-3xl font-black mb-5 ${pkg.popular ? 'text-white' : 'text-[#1F2937]'}`}>
                    {pkg.name}
                  </h3>

                  <div className="mb-7">
                    <span className={`text-6xl font-black ${pkg.popular ? 'text-white' : 'text-[#10B981]'}`}>
                      {pkg.price}
                    </span>
                    <span className={`text-sm ms-2 ${pkg.popular ? 'text-white/50' : 'text-gray-400'}`}>
                      {pkg.unit}
                    </span>
                  </div>

                  <ul className="space-y-3 flex-1 mb-8">
                    {(t.f_pkg[pkg.fi] as number[]).map(fi => (
                      <li key={fi} className="flex items-center gap-3">
                        <CheckCircle className={`w-5 h-5 flex-shrink-0 ${pkg.popular ? 'text-[#10B981]' : 'text-[#10B981]'}`} />
                        <span className={`text-base ${pkg.popular ? 'text-white/85' : 'text-gray-600'}`}>
                          {t.f_items[fi]}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/auth/register"
                    className={`block text-center py-4 rounded-2xl font-black text-lg transition-all duration-200
                      ${pkg.popular
                        ? 'bg-[#10B981] text-white hover:bg-[#059669] shadow-lg shadow-emerald-900/20'
                        : 'bg-white border-2 border-[#10B981] text-[#10B981] hover:bg-[#10B981] hover:text-white'
                      }`}
                  >
                    {t.subscribe}
                  </Link>
                </div>
              ))}
            </div>

            <p className="text-center text-gray-400 mt-8 text-base">{t.trial}</p>
          </div>
        </section>

        {/* ══════════════════ PLACEMENT TEST ══════════════════ */}
        <section ref={testRef} className="py-20 px-5 bg-[#F8FAFC]">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-[#1F2937] to-[#374151] rounded-3xl p-12 text-center relative overflow-hidden">
              {/* bg decoration */}
              <div className="absolute top-0 end-0 w-64 h-64 bg-[#10B981]/10 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
              <div className="absolute bottom-0 start-0 w-48 h-48 bg-[#10B981]/10 rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

              <div className="relative z-10">
                <span className="text-7xl block mb-6">🎯</span>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{t.sec_test}</h2>
                <p className="text-xl text-gray-300 mb-10 max-w-xl mx-auto leading-relaxed">{t.sec_test_sub}</p>
                <Link
                  href="/placement-test"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-[#10B981] text-white font-black text-xl rounded-2xl hover:bg-[#059669] transition-all duration-200 shadow-xl shadow-emerald-900/30 hover:-translate-y-0.5"
                >
                  {t.test_cta}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════ FOOTER ══════════════════ */}
        <footer className="border-t border-gray-100 py-8 px-5">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Be Fluent" width={30} height={30} className="rounded-lg" />
              <span className="font-black text-[#1F2937]">Be Fluent</span>
            </div>
            <p className="text-gray-400 text-sm">{t.footer}</p>
            <button
              onClick={switchLang}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#10B981] transition-colors font-medium"
            >
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
