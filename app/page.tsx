'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { Globe, CheckCircle, ArrowDown, User, Phone, Mail } from "lucide-react";

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
    hint: 'اختر مستواك الحالي ثم مستوى هدفك',
    features: ['حصص خاصة مباشرة', 'متابعة يومية على واتساب', 'دعم 24/7', 'شهادة إتمام المستوى', 'اختبار مستوى مجاني'],
    pkgFeats: [[0,1,2],[0,1,2,3],[0,1,2,3,4]],
    // booking form
    book_h: 'احجز حصتك التجريبية المجانية',
    book_sub: 'سيتواصل معك معلمك خلال 24 ساعة على الواتساب',
    f_name: 'الاسم الكامل',
    f_name_ph: 'أدخل اسمك الكامل',
    f_phone: 'رقم الواتساب',
    f_phone_ph: '01234567890',
    f_email: 'البريد الإلكتروني (اختياري)',
    f_email_ph: 'example@email.com',
    submit: 'احجز الآن مجاناً →',
    submitting: 'جاري الحجز...',
    success_h: 'تم الحجز بنجاح! 🎉',
    success_sub: 'سيتواصل معك فريقنا على الواتساب في أقرب وقت',
    success_cta: 'تواصل معنا الآن على واتساب',
    err: 'حدث خطأ، يرجى المحاولة مجدداً',
    has_account: 'لديك حساب بالفعل؟',
    login: 'تسجيل الدخول',
    // placement test
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
      { id:'a2', label:'A2', name:'أساسي',        desc:'أريد التعامل في المواقف اليومية البسيطة' },
      { id:'b1', label:'B1', name:'متوسط',        desc:'أريد التعبير عن نفسي بسهولة في معظم المواقف' },
      { id:'b2', label:'B2', name:'متوسط متقدم', desc:'أريد التحدث بطلاقة تامة في أي موقف' },
      { id:'c1', label:'C1', name:'متقدم',        desc:'أريد إتقان اللغة وأتحدث كأهلها تماماً' },
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
    hint: 'Choose your current level then your target level',
    features: ['Private live sessions', 'Daily WhatsApp follow-up', '24/7 support', 'Level completion certificate', 'Free placement test'],
    pkgFeats: [[0,1,2],[0,1,2,3],[0,1,2,3,4]],
    book_h: 'Book Your Free Trial Session',
    book_sub: 'Your teacher will contact you within 24 hours on WhatsApp',
    f_name: 'Full Name',
    f_name_ph: 'Enter your full name',
    f_phone: 'WhatsApp Number',
    f_phone_ph: '+201234567890',
    f_email: 'Email Address (optional)',
    f_email_ph: 'example@email.com',
    submit: 'Book Now for Free →',
    submitting: 'Booking...',
    success_h: 'Booking Confirmed! 🎉',
    success_sub: 'Our team will contact you on WhatsApp as soon as possible',
    success_cta: 'Contact Us on WhatsApp Now',
    err: 'An error occurred, please try again',
    has_account: 'Already have an account?',
    login: 'Log in',
    test_h: "Not sure of your level?",
    test_sub: 'Take our free placement test and find out exactly where to start',
    test_btn: 'Start Free Test',
    footer: '© 2025 Be Fluent — All rights reserved',
    from_levels: [
      { id:'a1', label:'A1', name:'Beginner',       desc:"I've never studied English or know very few words" },
      { id:'a2', label:'A2', name:'Elementary',     desc:'I know some sentences but struggle with conversation' },
      { id:'b1', label:'B1', name:'Intermediate',   desc:"I understand English but struggle to express myself" },
      { id:'b2', label:'B2', name:'Upper Int.',     desc:"I speak English but struggle in complex situations" },
    ],
    to_levels: [
      { id:'a2', label:'A2', name:'Elementary',     desc:'I want to handle basic everyday situations' },
      { id:'b1', label:'B1', name:'Intermediate',   desc:'I want to express myself easily in most situations' },
      { id:'b2', label:'B2', name:'Upper Int.',     desc:'I want to speak fluently in any situation' },
      { id:'c1', label:'C1', name:'Advanced',       desc:'I want to master the language like a native speaker' },
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
const WA_NUMBER = '201091515594';

const DISC_COLOR: Record<string,{ pill:string; border:string; activeBg:string }> = {
  a2: { pill:'bg-sky-50 text-sky-600',     border:'border-sky-200 hover:border-sky-400',     activeBg:'bg-sky-500 border-sky-500 text-white' },
  b1: { pill:'bg-teal-50 text-teal-600',   border:'border-teal-200 hover:border-teal-400',   activeBg:'bg-teal-500 border-teal-500 text-white' },
  b2: { pill:'bg-amber-50 text-amber-600', border:'border-amber-200 hover:border-amber-400', activeBg:'bg-amber-500 border-amber-500 text-white' },
  c1: { pill:'bg-violet-50 text-violet-600',border:'border-violet-200 hover:border-violet-400',activeBg:'bg-violet-600 border-violet-600 text-white' },
};

export default function Home() {
  const [lang, setLang]   = useState<'ar'|'en'>('ar');
  const [from, setFrom]   = useState('a1');
  const [to, setTo]       = useState<string|null>(null);
  const [plan, setPlan]   = useState<'monthly'|'bundle'>('bundle');
  const [ready, setReady] = useState(false);

  // booking form state
  const [bookName,  setBookName]  = useState('');
  const [bookPhone, setBookPhone] = useState('');
  const [bookEmail, setBookEmail] = useState('');
  const [bookStatus, setBookStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');

  const calcRef    = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const t = T[lang];

  useEffect(() => {
    const s = localStorage.getItem('bf_lang') as 'ar'|'en'|null;
    if (s) setLang(s);
    setTimeout(() => setReady(true), 40);
  }, []);

  useEffect(() => {
    if (to && ORDER.indexOf(to) <= ORDER.indexOf(from)) setTo(null);
  }, [from, to]);

  // scroll to booking when price is selected
  useEffect(() => {
    if (to) {
      setTimeout(() => bookingRef.current?.scrollIntoView({ behavior:'smooth', block:'nearest' }), 150);
    }
  }, [to, plan]);

  const toggleLang = () => {
    const n = lang === 'ar' ? 'en' : 'ar';
    setLang(n); localStorage.setItem('bf_lang', n);
  };

  /* price calc */
  const base        = M_BASE[from] ?? 1500;
  const months      = to ? (DUR[from]?.[to] ?? null) : null;
  const lvlDisc     = to ? (DISC[to] ?? 0) : 0;
  const monthlyRate = months ? Math.round(base * (1 - lvlDisc / 100) / 100) * 100 : base;
  const saveMo      = base - monthlyRate;
  const orig        = months ? base * months : null;
  const bundleTotal = orig ? Math.round(orig * (1 - Math.min(lvlDisc + BUNDLE_ADD, 45) / 100) / 100) * 100 : null;
  const saveBundle  = orig && bundleTotal ? orig - bundleTotal : null;
  const fromData    = t.from_levels.find(l => l.id === from);
  const toData      = to ? t.to_levels.find(l => l.id === to) : null;

  /* booking submit */
  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookStatus('loading');
    try {
      await fetch('/api/book-trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: bookName, phone: bookPhone, email: bookEmail,
          fromLevel: from, toLevel: to, plan,
          price: plan === 'monthly' ? monthlyRate : bundleTotal,
        }),
      });
      setBookStatus('success');
    } catch {
      setBookStatus('error');
    }
  };

  const waMsg = encodeURIComponent(
    lang === 'ar'
      ? `مرحباً، أريد حجز حصة تجريبية مجانية.\nالاسم: ${bookName}\nالمستوى: ${fromData?.label} → ${toData?.label}`
      : `Hi, I'd like to book a free trial session.\nName: ${bookName}\nLevel: ${fromData?.label} → ${toData?.label}`
  );

  return (
    <div dir={t.dir} className={`min-h-screen bg-white text-[#111827] transition-opacity duration-300 ${ready ? 'opacity-100' : 'opacity-0'}`}>

      {/* ─── NAVBAR ─── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Be Fluent" width={36} height={36} className="rounded-xl" priority />
            <span className="text-xl font-black">Be Fluent</span>
          </Link>
          <button onClick={toggleLang}
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

          {/* hero image */}
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

            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-black mb-3">{t.calc_h}</h2>
              <p className="text-xl text-gray-500">{t.calc_sub}</p>
            </div>

            {/* STEP 1 – level tab bar */}
            <div className="mb-12">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5 text-center">{t.step1}</p>
              <div className="border-b-2 border-gray-200 flex">
                {t.from_levels.map(lvl => {
                  const active = from === lvl.id;
                  return (
                    <button key={lvl.id} onClick={() => setFrom(lvl.id)}
                      className={`flex-1 pb-4 text-center relative transition-all duration-200 select-none
                        ${active ? 'text-[#10B981]' : 'text-gray-400 hover:text-gray-600'}`}>
                      <p className="text-2xl font-black mb-1">{lvl.label}</p>
                      <p className="text-xs">{lvl.name}</p>
                      {active && <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#10B981] rounded-full" />}
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 text-gray-500 text-sm text-center leading-relaxed">{fromData?.desc}</p>
            </div>

            {/* STEP 2 – target cards */}
            <div className="mb-10">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5 text-center">{t.step2}</p>
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
                        :           'bg-white cursor-pointer ' + col.border}`}>
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

            {/* PRICE CARD */}
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

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pb-8 border-b border-gray-100">
                    {(plan==='monthly' ? t.pkgFeats[0] : t.pkgFeats[2]).map((fi: number) => (
                      <li key={fi} className="flex items-center gap-2.5">
                        <CheckCircle className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{t.features[fi]}</span>
                      </li>
                    ))}
                  </ul>

                  {/* ── INLINE BOOKING FORM ── */}
                  <div ref={bookingRef} className="pt-8">
                    {bookStatus === 'success' ? (
                      /* success state */
                      <div className="text-center py-8">
                        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5">
                          <span className="text-4xl">🎉</span>
                        </div>
                        <h3 className="text-2xl font-black mb-2">{t.success_h}</h3>
                        <p className="text-gray-500 mb-6 leading-relaxed">{t.success_sub}</p>
                        <a href={`https://api.whatsapp.com/send/?phone=${WA_NUMBER}&text=${waMsg}`}
                          target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white font-black text-lg rounded-2xl hover:bg-[#1ebe5d] transition-colors">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                          {t.success_cta}
                        </a>
                      </div>
                    ) : (
                      /* booking form */
                      <form onSubmit={handleBook}>
                        <h3 className="text-2xl font-black mb-1">{t.book_h}</h3>
                        <p className="text-gray-400 text-sm mb-6">{t.book_sub}</p>

                        <div className="space-y-4 mb-6">
                          {/* name */}
                          <div>
                            <label className="block text-sm font-bold text-gray-600 mb-1.5">{t.f_name}</label>
                            <div className="relative">
                              <User className="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-gray-300" />
                              <input type="text" required value={bookName} onChange={e => setBookName(e.target.value)}
                                placeholder={t.f_name_ph}
                                className="w-full ps-12 pe-4 py-3.5 border border-gray-200 rounded-xl text-base focus:outline-none focus:border-[#10B981] transition-colors" />
                            </div>
                          </div>
                          {/* phone */}
                          <div>
                            <label className="block text-sm font-bold text-gray-600 mb-1.5">{t.f_phone}</label>
                            <div className="relative">
                              <Phone className="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-gray-300" />
                              <input type="tel" required value={bookPhone} onChange={e => setBookPhone(e.target.value)}
                                placeholder={t.f_phone_ph}
                                className="w-full ps-12 pe-4 py-3.5 border border-gray-200 rounded-xl text-base focus:outline-none focus:border-[#10B981] transition-colors" />
                            </div>
                          </div>
                          {/* email optional */}
                          <div>
                            <label className="block text-sm font-bold text-gray-600 mb-1.5">{t.f_email}</label>
                            <div className="relative">
                              <Mail className="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-gray-300" />
                              <input type="email" value={bookEmail} onChange={e => setBookEmail(e.target.value)}
                                placeholder={t.f_email_ph}
                                className="w-full ps-12 pe-4 py-3.5 border border-gray-200 rounded-xl text-base focus:outline-none focus:border-[#10B981] transition-colors" />
                            </div>
                          </div>
                        </div>

                        {bookStatus === 'error' && (
                          <p className="text-red-500 text-sm mb-4 text-center">{t.err}</p>
                        )}

                        <button type="submit" disabled={bookStatus==='loading'}
                          className="w-full py-4 bg-[#10B981] text-white font-black text-xl rounded-2xl hover:bg-[#059669] transition-colors disabled:opacity-60 shadow-lg shadow-emerald-100">
                          {bookStatus==='loading' ? t.submitting : t.submit}
                        </button>

                        <p className="text-center text-gray-400 text-sm mt-5">
                          {t.has_account}{' '}
                          <Link href="/auth/login" className="text-[#10B981] font-semibold hover:underline">{t.login}</Link>
                        </p>
                      </form>
                    )}
                  </div>
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
            <button onClick={toggleLang}
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
