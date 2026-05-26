'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { Globe, CheckCircle, User, Phone, Mail, Star, ArrowDown } from "lucide-react";

/* ─── i18n ─────────────────────────────────────────────── */
const T = {
  ar: {
    dir: 'rtl' as const,
    toggle: 'English',
    nav_cta: 'احجز مجاناً',
    hero_pre: 'أكثر من 5,000 طالب وصلوا للطلاقة',
    hero_h1a: 'تعلّم الإنجليزية',
    hero_h1b: 'واحكم العالم',
    hero_sub: 'حصص خاصة مع معلمين محترفين — متابعة يومية على واتساب — دعم 24/7',
    cta_primary: 'احجز حصتك التجريبية المجانية',
    cta_secondary: 'اختبار المستوى',
    social_proof: 'انضم لـ +5,000 طالب',
    stars_label: '4.9 من 5 — تقييم الطلاب',
    logos_label: 'يثق بنا طلاب من:',
    how_h: 'كيف يعمل البرنامج؟',
    how: [
      { n:'01', t:'اختر مستواك', d:'حدد نقطة بدايتك من خلال اختبار مجاني أو الحاسبة' },
      { n:'02', t:'تعلّم مع معلمك', d:'حصص فردية مباشرة مصممة بالكامل حسب أهدافك' },
      { n:'03', t:'تقدّم كل يوم', d:'متابعة يومية على واتساب وتمارين تفاعلية على المنصة' },
      { n:'04', t:'احصل على شهادتك', d:'شهادة معتمدة عند إتمام كل مستوى' },
    ],
    calc_badge: 'احسب تكلفة رحلتك',
    calc_h: 'كم يكلفك التعلم؟',
    calc_sub: 'اختر مستواك الحالي والمستوى الذي تريد الوصول إليه',
    step1: 'مستواك الحالي',
    step2: 'مستواك المستهدف',
    monthly: 'شهري',
    bundle: '⚡ باقة كاملة',
    per_month: 'جنيه / شهر',
    egp: 'جنيه',
    save: 'وفّر',
    hint: 'اختر مستواك لتظهر الأسعار',
    hint2: 'الآن اختر مستوى هدفك',
    features: ['حصص خاصة مباشرة','متابعة يومية واتساب','دعم 24/7','شهادة إتمام المستوى','اختبار مستوى مجاني'],
    pkgFeats: [[0,1,2],[0,1,2,3],[0,1,2,3,4]],
    book_h: 'احجز حصتك التجريبية المجانية',
    book_sub: 'سيتواصل معك معلمك خلال ساعات — بدون أي التزام',
    f_name_ph: 'اسمك الكامل',
    f_phone_ph: 'رقم الواتساب',
    f_email_ph: 'البريد الإلكتروني (اختياري)',
    submit: 'احجز مجاناً الآن ←',
    submitting: 'جاري الحجز...',
    success_h: 'تم الحجز! 🎉',
    success_sub: 'سيتواصل معك فريقنا على واتساب قريباً',
    success_wa: 'تواصل معنا الآن',
    err: 'حدث خطأ، حاول مرة أخرى',
    has_account: 'لديك حساب؟',
    login: 'سجّل دخولك',
    reviews_h: 'قصص نجاح طلابنا',
    reviews: [
      { name:'أحمد محمد',  lvl:'A1 ← C1', q:'في سنة واحدة قدرت أتكلم إنجليزي بطلاقة في الشغل. المتابعة اليومية فرقت معايا جداً.', s:5 },
      { name:'سارة خالد',  lvl:'B1 ← C1', q:'أفضل استثمار عملته. المعلمة كانت متاحة دايماً وتهتم بأهدافي هي مش أهداف عامة.', s:5 },
      { name:'محمود علي',  lvl:'A2 ← B2', q:'كنت خايف أبدأ بس من أول حصة حسيت بالفرق. الطريقة بسيطة ومنظمة وفعلاً بتشتغل.', s:5 },
    ],
    test_h: 'مش عارف مستواك؟',
    test_sub: 'خذ اختبار تحديد المستوى المجاني في 10 دقائق',
    test_btn: 'ابدأ الاختبار المجاني',
    footer: '© 2025 Be Fluent — جميع الحقوق محفوظة',
    from_levels: [
      { id:'a1', label:'A1', name:'مبتدئ',  desc:'لا أعرف شيئاً أو أعرف كلمات قليلة جداً' },
      { id:'a2', label:'A2', name:'أساسي',  desc:'أعرف جملاً بسيطة لكن لا أستطيع المحادثة' },
      { id:'b1', label:'B1', name:'متوسط', desc:'أفهم لكن أجد صعوبة في التعبير عن نفسي' },
      { id:'b2', label:'B2', name:'متقدم', desc:'أتحدث لكن أجد صعوبة في المواقف المعقدة' },
    ],
    to_levels: [
      { id:'a2', label:'A2', name:'أساسي',    disc:0,  desc:'أريد التعامل في المواقف اليومية' },
      { id:'b1', label:'B1', name:'متوسط',   disc:15, desc:'أريد التعبير عن نفسي بسهولة' },
      { id:'b2', label:'B2', name:'متقدم',   disc:25, desc:'أريد التحدث بطلاقة في أي موقف' },
      { id:'c1', label:'C1', name:'احترافي', disc:35, desc:'أريد إتقان اللغة كأهلها تماماً' },
    ],
  },
  en: {
    dir: 'ltr' as const,
    toggle: 'العربية',
    nav_cta: 'Book Free',
    hero_pre: 'Over 5,000 students reached fluency',
    hero_h1a: 'Learn English',
    hero_h1b: 'Rule the World',
    hero_sub: 'Private live sessions with expert teachers — Daily WhatsApp follow-up — 24/7 support',
    cta_primary: 'Book Your Free Trial Session',
    cta_secondary: 'Level Test',
    social_proof: 'Join 5,000+ students',
    stars_label: '4.9 out of 5 — Student Rating',
    logos_label: 'Trusted by students from:',
    how_h: 'How does it work?',
    how: [
      { n:'01', t:'Choose your level', d:'Identify your starting point with a free test or our calculator' },
      { n:'02', t:'Learn with your teacher', d:'One-on-one live sessions designed entirely around your goals' },
      { n:'03', t:'Progress every day', d:'Daily WhatsApp follow-up and interactive exercises on the platform' },
      { n:'04', t:'Get your certificate', d:'An accredited certificate when you complete each level' },
    ],
    calc_badge: 'Calculate your journey',
    calc_h: 'How much does learning cost?',
    calc_sub: 'Choose your current level and the level you want to reach',
    step1: 'Your current level',
    step2: 'Your target level',
    monthly: 'Monthly',
    bundle: '⚡ Full Bundle',
    per_month: 'EGP / month',
    egp: 'EGP',
    save: 'Save',
    hint: 'Choose your level to see prices',
    hint2: 'Now choose your target level',
    features: ['Private live sessions','Daily WhatsApp follow-up','24/7 support','Level completion certificate','Free placement test'],
    pkgFeats: [[0,1,2],[0,1,2,3],[0,1,2,3,4]],
    book_h: 'Book Your Free Trial Session',
    book_sub: 'Your teacher will contact you within hours — no commitment',
    f_name_ph: 'Your full name',
    f_phone_ph: 'WhatsApp number',
    f_email_ph: 'Email (optional)',
    submit: 'Book Free Now →',
    submitting: 'Booking...',
    success_h: 'Booked! 🎉',
    success_sub: 'Our team will contact you on WhatsApp shortly',
    success_wa: 'Contact us now',
    err: 'An error occurred, please try again',
    has_account: 'Have an account?',
    login: 'Log in',
    reviews_h: 'Student Success Stories',
    reviews: [
      { name:'Ahmed Mohamed', lvl:'A1 → C1', q:'In one year I could speak English fluently at work. The daily follow-up made a huge difference.', s:5 },
      { name:'Sara Khaled',   lvl:'B1 → C1', q:'Best investment I ever made. My teacher was always available and focused on my specific goals.', s:5 },
      { name:'Mahmoud Ali',   lvl:'A2 → B2', q:'I was scared to start but from the first session I felt the difference. Simple, structured, and it really works.', s:5 },
    ],
    test_h: "Not sure of your level?",
    test_sub: 'Take the free placement test in 10 minutes',
    test_btn: 'Start Free Test',
    footer: '© 2025 Be Fluent — All rights reserved',
    from_levels: [
      { id:'a1', label:'A1', name:'Beginner',     desc:"I know nothing or very few words" },
      { id:'a2', label:'A2', name:'Elementary',   desc:'I know basic sentences but struggle to converse' },
      { id:'b1', label:'B1', name:'Intermediate', desc:'I understand but struggle to express myself' },
      { id:'b2', label:'B2', name:'Upper-Int.',   desc:'I speak but struggle in complex situations' },
    ],
    to_levels: [
      { id:'a2', label:'A2', name:'Elementary',   disc:0,  desc:'I want to handle everyday situations' },
      { id:'b1', label:'B1', name:'Intermediate', disc:15, desc:'I want to express myself easily' },
      { id:'b2', label:'B2', name:'Upper-Int.',   disc:25, desc:'I want to speak fluently in any situation' },
      { id:'c1', label:'C1', name:'Advanced',     disc:35, desc:'I want to master the language like a native' },
    ],
  },
};

const ORDER = ['a1','a2','b1','b2','c1'];
const M_BASE: Record<string,number> = { a1:1800, a2:1600, b1:1500, b2:1400 };
const DUR: Record<string,Record<string,number>> = {
  a1:{a2:3,b1:6,b2:9,c1:12}, a2:{b1:3,b2:6,c1:9}, b1:{b2:3,c1:6}, b2:{c1:3},
};
const DISC: Record<string,number> = { a2:0, b1:15, b2:25, c1:35 };
const BUNDLE_ADD = 10;
const WA = '201091515594';

export default function Home() {
  const [lang, setLang]     = useState<'ar'|'en'>('ar');
  const [from, setFrom]     = useState('a1');
  const [to, setTo]         = useState<string|null>(null);
  const [plan, setPlan]     = useState<'monthly'|'bundle'>('bundle');
  const [ready, setReady]   = useState(false);
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
    setTimeout(() => setReady(true), 30);
  }, []);

  useEffect(() => {
    if (to && ORDER.indexOf(to) <= ORDER.indexOf(from)) setTo(null);
  }, [from, to]);

  useEffect(() => {
    if (to) setTimeout(() => bookingRef.current?.scrollIntoView({ behavior:'smooth', block:'nearest' }), 300);
  }, [to, plan]);

  const toggleLang = () => { const n = lang==='ar'?'en':'ar'; setLang(n); localStorage.setItem('bf_lang',n); };

  const base        = M_BASE[from] ?? 1500;
  const months      = to ? (DUR[from]?.[to] ?? null) : null;
  const lvlDisc     = to ? (DISC[to] ?? 0) : 0;
  const monthlyRate = months ? Math.round(base*(1-lvlDisc/100)/100)*100 : base;
  const saveMo      = base - monthlyRate;
  const orig        = months ? base*months : null;
  const bundleTotal = orig ? Math.round(orig*(1-Math.min(lvlDisc+BUNDLE_ADD,45)/100)/100)*100 : null;
  const saveBundle  = orig && bundleTotal ? orig-bundleTotal : null;
  const fromData    = t.from_levels.find(l=>l.id===from);
  const toData      = to ? t.to_levels.find(l=>l.id===to) : null;

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookStatus('loading');
    try {
      await fetch('/api/book-trial', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ name:bookName, phone:bookPhone, email:bookEmail, fromLevel:from, toLevel:to, plan, price:plan==='monthly'?monthlyRate:bundleTotal }),
      });
      setBookStatus('success');
    } catch { setBookStatus('error'); }
  };

  const waMsg = encodeURIComponent(lang==='ar'
    ? `مرحباً، أريد حجز حصة تجريبية مجانية.\nالاسم: ${bookName}\nالمستوى: ${fromData?.label} ← ${toData?.label}`
    : `Hi, I'd like to book a free trial.\nName: ${bookName}\nLevel: ${fromData?.label} → ${toData?.label}`
  );

  return (
    <div dir={t.dir} className={`min-h-screen bg-white text-[#111827] font-sans transition-opacity duration-300 ${ready?'opacity-100':'opacity-0'}`}>

      {/* ═══ NAVBAR ═══ */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Be Fluent" width={34} height={34} className="rounded-xl" priority />
            <span className="font-black text-lg text-[#111827]">Be Fluent</span>
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={toggleLang} className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#10B981] transition-colors">
              <Globe className="w-4 h-4" />{t.toggle}
            </button>
            <button onClick={() => calcRef.current?.scrollIntoView({behavior:'smooth'})}
              className="px-5 py-2.5 bg-[#10B981] text-white text-sm font-bold rounded-xl hover:bg-[#059669] transition-colors">
              {t.nav_cta}
            </button>
          </div>
        </div>
      </header>

      <main className="pt-16">

        {/* ═══ HERO ═══ */}
        <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">

          {/* pre-label */}
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 mb-6">
            <span className="flex">
              {[...Array(5)].map((_,i)=><Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400"/>)}
            </span>
            {t.hero_pre}
          </div>

          {/* heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#111827] leading-[1.08] tracking-tight mb-5">
            {t.hero_h1a}<br />
            <span className="text-[#10B981]">{t.hero_h1b}</span>
          </h1>

          <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">{t.hero_sub}</p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
            <button onClick={() => calcRef.current?.scrollIntoView({behavior:'smooth'})}
              className="px-8 py-4 bg-[#111827] text-white font-bold text-base rounded-2xl hover:bg-[#1F2937] transition-colors">
              {t.cta_primary}
            </button>
            <Link href="/placement-test"
              className="px-8 py-4 border border-gray-200 text-gray-600 font-semibold text-base rounded-2xl hover:border-[#10B981] hover:text-[#10B981] transition-colors">
              {t.cta_secondary} →
            </Link>
          </div>

          {/* hero image */}
          <div className="relative">
            <Image src="/assets/hero-1.png" alt="Be Fluent" width={960} height={500}
              className="w-full h-auto rounded-3xl shadow-2xl shadow-gray-200/80 border border-gray-100" priority />
            {/* floating card — graduates */}
            <div className="absolute -bottom-4 start-6 sm:start-10 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-xl">🎓</div>
              <div className="text-start">
                <p className="font-black text-[#111827] text-sm leading-none">+5,000</p>
                <p className="text-gray-400 text-xs mt-0.5">{lang==='ar'?'طالب متخرج':'Graduates'}</p>
              </div>
            </div>
            {/* floating card — rating */}
            <div className="absolute -top-4 end-6 sm:end-10 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-xl">⭐</div>
              <div className="text-start">
                <p className="font-black text-[#111827] text-sm leading-none">4.9 / 5</p>
                <p className="text-gray-400 text-xs mt-0.5">{lang==='ar'?'تقييم الطلاب':'Student Rating'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ HOW IT WORKS ═══ */}
        <section className="py-20 px-6 bg-gray-50 border-t border-gray-100">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-14">{t.how_h}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.how.map((s,i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-4xl font-black text-gray-100 mb-3 leading-none">{s.n}</p>
                  <h3 className="font-black text-[#111827] mb-2 text-base">{s.t}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CALCULATOR + BOOKING ═══ */}
        <section ref={calcRef} className="py-20 px-6 bg-white" id="calculator">
          <div className="max-w-xl mx-auto">

            {/* header */}
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-4 border border-emerald-100">
                {t.calc_badge}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-[#111827] mb-2">{t.calc_h}</h2>
              <p className="text-gray-500">{t.calc_sub}</p>
            </div>

            {/* ── STEP 1 ── */}
            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-4">{t.step1}</p>
            <div className="border-b-2 border-gray-100 flex mb-2">
              {t.from_levels.map(lvl => {
                const active = from === lvl.id;
                return (
                  <button key={lvl.id} onClick={() => setFrom(lvl.id)}
                    className={`flex-1 pb-4 text-center relative transition-all select-none
                      ${active ? 'text-[#10B981]' : 'text-gray-300 hover:text-gray-500'}`}>
                    <p className="text-xl sm:text-2xl font-black">{lvl.label}</p>
                    <p className="text-[11px] mt-0.5">{lvl.name}</p>
                    {active && <div className="absolute bottom-0 inset-x-0 h-[2px] bg-[#10B981]" />}
                  </button>
                );
              })}
            </div>
            <p className="text-gray-400 text-sm text-center mb-10">{fromData?.desc}</p>

            {/* ── STEP 2 ── */}
            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-4">{t.step2}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-2">
              {t.to_levels.map(lvl => {
                const valid  = ORDER.indexOf(lvl.id) > ORDER.indexOf(from);
                const active = to === lvl.id;
                return (
                  <button key={lvl.id} onClick={() => valid && setTo(lvl.id)} disabled={!valid}
                    className={`relative p-4 sm:p-5 rounded-2xl border-2 text-center transition-all select-none
                      ${!valid ? 'opacity-20 cursor-not-allowed border-gray-100'
                      : active ? 'border-[#10B981] bg-[#10B981] shadow-lg shadow-emerald-100 scale-[1.03]'
                      :          'border-gray-200 bg-white hover:border-[#10B981]/40 hover:bg-emerald-50/30 cursor-pointer'}`}>
                    {lvl.disc > 0 && valid && (
                      <span className={`absolute -top-2.5 ${lang==='ar'?'left-2':'right-2'} text-[10px] font-black px-2 py-0.5 rounded-full
                        ${active ? 'bg-white/30 text-white' : 'bg-emerald-100 text-emerald-700'}`}>
                        -{lvl.disc}%
                      </span>
                    )}
                    <p className={`text-xl font-black ${active?'text-white':'text-[#111827]'}`}>{lvl.label}</p>
                    <p className={`text-[11px] mt-0.5 ${active?'text-white/80':'text-gray-400'}`}>{lvl.name}</p>
                  </button>
                );
              })}
            </div>
            {!to && <p className="text-gray-300 text-sm text-center mt-3 mb-8">{t.hint2}</p>}
            {to && toData && <p className="text-gray-400 text-sm text-center mt-3 mb-8">{toData.desc}</p>}

            {/* ── PRICE CARD ── */}
            {to && months ? (
              <div className="border border-gray-200 rounded-3xl overflow-hidden shadow-sm">

                {/* plan toggle */}
                <div className="flex border-b border-gray-100">
                  {(['monthly','bundle'] as const).map(p => (
                    <button key={p} onClick={()=>setPlan(p)}
                      className={`flex-1 py-3.5 font-black text-sm transition-colors
                        ${plan===p ? 'bg-[#111827] text-white' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`}>
                      {p==='monthly' ? t.monthly : t.bundle}
                    </button>
                  ))}
                </div>

                <div className="p-7 sm:p-8">
                  {/* price display */}
                  {plan==='monthly' ? (
                    <div className="flex items-end gap-2 flex-wrap mb-2">
                      {saveMo>0 && <span className="text-gray-300 line-through text-xl">{base.toLocaleString()}</span>}
                      <span className="text-6xl sm:text-7xl font-black text-[#111827] leading-none">{monthlyRate.toLocaleString()}</span>
                      <span className="text-gray-400 pb-1">{t.per_month}</span>
                    </div>
                  ):(
                    <div className="flex items-end gap-2 flex-wrap mb-2">
                      {orig && <span className="text-gray-300 line-through text-xl">{orig.toLocaleString()}</span>}
                      <span className="text-6xl sm:text-7xl font-black text-[#111827] leading-none">{bundleTotal?.toLocaleString()}</span>
                      <span className="text-gray-400 pb-1">{t.egp}</span>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mb-7">
                    <span className="text-gray-400 text-sm">{fromData?.label} → {toData?.label} · {months} {lang==='ar'?'أشهر':'mo'}</span>
                    {plan==='monthly' && saveMo>0 && (
                      <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">
                        {t.save} {saveMo.toLocaleString()} {t.egp}
                      </span>
                    )}
                    {plan==='bundle' && saveBundle && (
                      <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">
                        {t.save} {saveBundle.toLocaleString()} {t.egp}
                      </span>
                    )}
                  </div>

                  {/* features */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-7 border-b border-gray-100 mb-7">
                    {(plan==='monthly' ? t.pkgFeats[0] : t.pkgFeats[2]).map((fi:number) => (
                      <li key={fi} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{t.features[fi]}</span>
                      </li>
                    ))}
                  </ul>

                  {/* ── BOOKING FORM ── */}
                  <div ref={bookingRef}>
                    {bookStatus==='success' ? (
                      <div className="text-center py-6">
                        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🎉</div>
                        <h3 className="text-xl font-black text-[#111827] mb-2">{t.success_h}</h3>
                        <p className="text-gray-500 text-sm mb-5">{t.success_sub}</p>
                        <a href={`https://api.whatsapp.com/send/?phone=${WA}&text=${waMsg}`} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1ebe5d] transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                          {t.success_wa}
                        </a>
                      </div>
                    ) : (
                      <form onSubmit={handleBook} className="space-y-3">
                        <h3 className="font-black text-[#111827] text-lg mb-1">{t.book_h}</h3>
                        <p className="text-gray-400 text-sm mb-4">{t.book_sub}</p>
                        <div className="relative">
                          <User className="absolute top-1/2 -translate-y-1/2 start-3.5 w-4 h-4 text-gray-300" />
                          <input required type="text" value={bookName} onChange={e=>setBookName(e.target.value)}
                            placeholder={t.f_name_ph}
                            className="w-full ps-10 pe-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#10B981] transition-colors" />
                        </div>
                        <div className="relative">
                          <Phone className="absolute top-1/2 -translate-y-1/2 start-3.5 w-4 h-4 text-gray-300" />
                          <input required type="tel" value={bookPhone} onChange={e=>setBookPhone(e.target.value)}
                            placeholder={t.f_phone_ph}
                            className="w-full ps-10 pe-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#10B981] transition-colors" />
                        </div>
                        <div className="relative">
                          <Mail className="absolute top-1/2 -translate-y-1/2 start-3.5 w-4 h-4 text-gray-300" />
                          <input type="email" value={bookEmail} onChange={e=>setBookEmail(e.target.value)}
                            placeholder={t.f_email_ph}
                            className="w-full ps-10 pe-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#10B981] transition-colors" />
                        </div>
                        {bookStatus==='error' && <p className="text-red-500 text-xs text-center">{t.err}</p>}
                        <button type="submit" disabled={bookStatus==='loading'}
                          className="w-full py-3.5 bg-[#10B981] text-white font-black text-base rounded-xl hover:bg-[#059669] transition-colors disabled:opacity-60">
                          {bookStatus==='loading' ? t.submitting : t.submit}
                        </button>
                        <p className="text-center text-gray-400 text-xs pt-1">
                          {t.has_account}{' '}
                          <Link href="/auth/login" className="text-[#10B981] font-semibold hover:underline">{t.login}</Link>
                        </p>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-14 text-center border-2 border-dashed border-gray-100 rounded-3xl">
                <p className="text-4xl mb-3">☝️</p>
                <p className="text-gray-300 font-medium">{t.hint}</p>
              </div>
            )}
          </div>
        </section>

        {/* ═══ REVIEWS ═══ */}
        <section className="py-20 px-6 bg-gray-50 border-t border-gray-100">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-12">{t.reviews_h}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {t.reviews.map((r,i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex mb-3">
                    {[...Array(r.s)].map((_,j)=><Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400"/>)}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">"{r.q}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center font-black text-emerald-700 text-sm flex-shrink-0">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-[#111827] text-sm leading-tight">{r.name}</p>
                      <p className="text-[#10B981] text-xs font-bold">{r.lvl}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ PLACEMENT TEST CTA ═══ */}
        <section className="py-20 px-6 bg-white border-t border-gray-100">
          <div className="max-w-lg mx-auto text-center">
            <p className="text-4xl mb-5">🎯</p>
            <h2 className="text-3xl font-black mb-3">{t.test_h}</h2>
            <p className="text-gray-500 mb-8">{t.test_sub}</p>
            <Link href="/placement-test"
              className="inline-block px-8 py-4 bg-[#111827] text-white font-bold text-base rounded-2xl hover:bg-[#1F2937] transition-colors">
              {t.test_btn}
            </Link>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="border-t border-gray-100 py-8 px-6 bg-white">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Be Fluent" width={26} height={26} className="rounded-lg" />
              <span className="font-black text-[#111827] text-sm">Be Fluent</span>
            </div>
            <p className="text-gray-400 text-sm">{t.footer}</p>
            <button onClick={toggleLang} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#10B981] transition-colors font-medium">
              <Globe className="w-4 h-4" />{t.toggle}
            </button>
          </div>
        </footer>
      </main>

      <FloatingContactButtons />
    </div>
  );
}
