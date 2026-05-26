'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { Globe, CheckCircle, User, Phone, Mail, Star, ArrowLeft, ArrowRight, Zap, BookOpen, MessageCircle, Award } from "lucide-react";

/* ─── translations ──────────────────────────────────────── */
const T = {
  ar: {
    dir: 'rtl' as const,
    toggle: 'English',
    trust: 'منصة رقم 1 لتعلم الإنجليزية في مصر',
    hero_h1: 'تعلم الإنجليزية',
    hero_h2: 'واحكم العالم',
    hero_sub: 'حصص خاصة مباشرة مع معلمين محترفين • متابعة يومية على واتساب • دعم 24/7',
    cta_calc: 'احسب استثمارك الآن',
    cta_test: 'اختبار المستوى مجاناً',
    stat1: '+5,000 طالب',
    stat2: '4.9/5 تقييم',
    stat3: '95% نجاح',
    stat4: '+3 سنوات',
    calc_h: 'احسب استثمارك',
    calc_sub: 'اختر مستواك وهدفك — السعر يظهر فوراً',
    step1_label: 'مستواك الحالي',
    step2_label: 'هدفك',
    monthly: 'شهري',
    bundle: '⚡ باقة كاملة',
    per_month: 'جنيه / شهر',
    egp: 'جنيه',
    save: 'وفّر',
    hint: 'اختر مستواك الحالي أولاً ثم حدد هدفك',
    hint_step2: 'الآن اختر مستواك الهدف',
    features: ['حصص خاصة مباشرة', 'متابعة يومية واتساب', 'دعم 24/7', 'شهادة إتمام المستوى', 'اختبار مستوى مجاني'],
    pkgFeats: [[0,1,2],[0,1,2,3],[0,1,2,3,4]],
    book_h: 'احجز حصتك التجريبية المجانية',
    book_sub: 'سيتواصل معك معلمك خلال ساعات على الواتساب',
    f_name: 'الاسم الكامل',
    f_name_ph: 'أدخل اسمك الكامل',
    f_phone: 'رقم الواتساب',
    f_phone_ph: '01234567890',
    f_email: 'البريد الإلكتروني (اختياري)',
    f_email_ph: 'example@email.com',
    submit: 'احجز الآن مجاناً',
    submitting: 'جاري الحجز...',
    success_h: 'تم الحجز بنجاح! 🎉',
    success_sub: 'سيتواصل معك فريقنا على واتساب قريباً جداً',
    success_cta: 'تواصل معنا على واتساب الآن',
    err: 'حدث خطأ، يرجى المحاولة مرة أخرى',
    has_account: 'لديك حساب؟',
    login: 'تسجيل الدخول',
    why_h: 'لماذا Be Fluent؟',
    why: [
      { icon: 'Zap',         title: 'تعلم سريع وفعّال',       desc: 'منهج مُصمَّم خصيصاً لتحقيق أقصى تقدم في أقل وقت ممكن' },
      { icon: 'MessageCircle', title: 'متابعة يومية واتساب',  desc: 'معلمك معك يومياً عبر واتساب للإجابة على أسئلتك' },
      { icon: 'BookOpen',    title: 'محتوى تفاعلي متكامل',    desc: 'دروس، تمارين، مفردات، وأكثر — كل شيء في مكان واحد' },
      { icon: 'Award',       title: 'شهادة معتمدة',           desc: 'احصل على شهادة إتمام المستوى بعد كل مرحلة تُكملها' },
    ],
    reviews_h: 'ماذا قال طلابنا؟',
    reviews: [
      { name: 'أحمد محمد', level: 'A1 → B1', text: 'في 6 أشهر وصلت لمستوى لم أتخيله. المعلمة متابعة يومياً وتشعر أنك الطالب الوحيد.', stars: 5 },
      { name: 'سارة خالد', level: 'B1 → C1', text: 'أفضل قرار اتخذته في حياتي. الآن أتحدث بطلاقة في العمل وأحصل على فرص أفضل.', stars: 5 },
      { name: 'محمود علي', level: 'A2 → B2', text: 'المنصة رائعة والمتابعة على واتساب فرقت معي كثيراً. أنصح كل من يريد تعلم الإنجليزية.', stars: 5 },
    ],
    test_h: 'مش عارف مستواك؟',
    test_sub: 'خذ اختبار تحديد المستوى المجاني في 10 دقائق واعرف من أين تبدأ',
    test_btn: 'ابدأ الاختبار المجاني الآن',
    footer: '© 2025 Be Fluent — جميع الحقوق محفوظة',
    from_levels: [
      { id:'a1', label:'A1', name:'مبتدئ',    desc:'لم أتعلم الإنجليزية من قبل أو أعرف كلمات قليلة جداً' },
      { id:'a2', label:'A2', name:'أساسي',    desc:'أعرف بعض الجمل البسيطة لكنني لا أستطيع المحادثة' },
      { id:'b1', label:'B1', name:'متوسط',    desc:'أفهم ما يقال لي لكن أجد صعوبة في التعبير عن نفسي' },
      { id:'b2', label:'B2', name:'متقدم',    desc:'أتحدث الإنجليزية لكن أجد صعوبة في المواقف المعقدة' },
    ],
    to_levels: [
      { id:'a2', label:'A2', name:'أساسي',       disc:0,  desc:'أريد التعامل في المواقف اليومية البسيطة' },
      { id:'b1', label:'B1', name:'متوسط',       disc:15, desc:'أريد التعبير عن نفسي بسهولة في معظم المواقف' },
      { id:'b2', label:'B2', name:'متقدم',       disc:25, desc:'أريد التحدث بطلاقة تامة في أي موقف' },
      { id:'c1', label:'C1', name:'احترافي',     disc:35, desc:'أريد إتقان اللغة وأتحدث كأهلها تماماً' },
    ],
  },
  en: {
    dir: 'ltr' as const,
    toggle: 'العربية',
    trust: '#1 English Learning Platform in Egypt',
    hero_h1: 'Learn English',
    hero_h2: 'Rule the World',
    hero_sub: 'Private live sessions • Daily WhatsApp follow-up • 24/7 support',
    cta_calc: 'Calculate Investment',
    cta_test: 'Free Level Test',
    stat1: '5,000+ Students',
    stat2: '4.9/5 Rating',
    stat3: '95% Success',
    stat4: '3+ Years',
    calc_h: 'Calculate Your Investment',
    calc_sub: 'Choose your level and goal — price shows instantly',
    step1_label: 'Current Level',
    step2_label: 'Your Goal',
    monthly: 'Monthly',
    bundle: '⚡ Full Bundle',
    per_month: 'EGP / month',
    egp: 'EGP',
    save: 'Save',
    hint: 'Choose your current level first',
    hint_step2: 'Now choose your target level',
    features: ['Private live sessions', 'Daily WhatsApp follow-up', '24/7 support', 'Level completion certificate', 'Free placement test'],
    pkgFeats: [[0,1,2],[0,1,2,3],[0,1,2,3,4]],
    book_h: 'Book Your Free Trial Session',
    book_sub: 'Your teacher will contact you within hours on WhatsApp',
    f_name: 'Full Name',
    f_name_ph: 'Enter your full name',
    f_phone: 'WhatsApp Number',
    f_phone_ph: '+201234567890',
    f_email: 'Email Address (optional)',
    f_email_ph: 'example@email.com',
    submit: 'Book Now for Free',
    submitting: 'Booking...',
    success_h: 'Booking Confirmed! 🎉',
    success_sub: 'Our team will contact you on WhatsApp very soon',
    success_cta: 'Contact Us on WhatsApp Now',
    err: 'An error occurred, please try again',
    has_account: 'Have an account?',
    login: 'Log in',
    why_h: 'Why Be Fluent?',
    why: [
      { icon: 'Zap',           title: 'Fast & Effective',     desc: 'A curriculum designed to maximize progress in the shortest time' },
      { icon: 'MessageCircle', title: 'Daily WhatsApp',       desc: 'Your teacher is with you every day on WhatsApp for questions' },
      { icon: 'BookOpen',      title: 'Full Interactive Content', desc: 'Lessons, exercises, vocabulary, and more — all in one place' },
      { icon: 'Award',         title: 'Certified',            desc: 'Get a level completion certificate after every stage you complete' },
    ],
    reviews_h: 'What our students say',
    reviews: [
      { name: 'Ahmed Mohamed', level: 'A1 → B1', text: 'In 6 months I reached a level I never imagined. The teacher follows up daily.', stars: 5 },
      { name: 'Sara Khaled',   level: 'B1 → C1', text: 'Best decision I ever made. Now I speak fluently at work.', stars: 5 },
      { name: 'Mahmoud Ali',   level: 'A2 → B2', text: 'Amazing platform. The WhatsApp support made a huge difference for me.', stars: 5 },
    ],
    test_h: "Not sure of your level?",
    test_sub: 'Take our free 10-minute placement test and know exactly where to start',
    test_btn: 'Start Free Test Now',
    footer: '© 2025 Be Fluent — All rights reserved',
    from_levels: [
      { id:'a1', label:'A1', name:'Beginner',     desc:"I've never studied English or know very few words" },
      { id:'a2', label:'A2', name:'Elementary',   desc:'I know some sentences but struggle with conversation' },
      { id:'b1', label:'B1', name:'Intermediate', desc:"I understand English but struggle to express myself" },
      { id:'b2', label:'B2', name:'Upper-Int.',   desc:"I speak English but struggle in complex situations" },
    ],
    to_levels: [
      { id:'a2', label:'A2', name:'Elementary',   disc:0,  desc:'I want to handle basic everyday situations' },
      { id:'b1', label:'B1', name:'Intermediate', disc:15, desc:'I want to express myself easily in most situations' },
      { id:'b2', label:'B2', name:'Upper-Int.',   disc:25, desc:'I want to speak fluently in any situation' },
      { id:'c1', label:'C1', name:'Advanced',     disc:35, desc:'I want to master the language like a native speaker' },
    ],
  },
};

const ORDER  = ['a1','a2','b1','b2','c1'];
const M_BASE: Record<string,number> = { a1:1800, a2:1600, b1:1500, b2:1400 };
const DUR: Record<string,Record<string,number>> = {
  a1:{ a2:3, b1:6, b2:9, c1:12 },
  a2:{       b1:3, b2:6, c1:9  },
  b1:{             b2:3, c1:6  },
  b2:{                   c1:3  },
};
const DISC: Record<string,number> = { a2:0, b1:15, b2:25, c1:35 };
const BUNDLE_ADD = 10;
const WA_NUMBER = '201091515594';

const WHY_ICONS: Record<string, React.ElementType> = { Zap, MessageCircle, BookOpen, Award };

export default function Home() {
  const [lang, setLang]   = useState<'ar'|'en'>('ar');
  const [from, setFrom]   = useState('a1');
  const [to, setTo]       = useState<string|null>(null);
  const [plan, setPlan]   = useState<'monthly'|'bundle'>('bundle');
  const [ready, setReady] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [bookName,   setBookName]   = useState('');
  const [bookPhone,  setBookPhone]  = useState('');
  const [bookEmail,  setBookEmail]  = useState('');
  const [bookStatus, setBookStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');

  const calcRef    = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const t = T[lang];

  useEffect(() => {
    const s = localStorage.getItem('bf_lang') as 'ar'|'en'|null;
    if (s) setLang(s);
    setTimeout(() => setReady(true), 40);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (to && ORDER.indexOf(to) <= ORDER.indexOf(from)) setTo(null);
  }, [from, to]);

  useEffect(() => {
    if (to) setTimeout(() => bookingRef.current?.scrollIntoView({ behavior:'smooth', block:'nearest' }), 200);
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
    ? `مرحباً، أريد حجز حصة تجريبية مجانية.\nالاسم: ${bookName}\nالمستوى: ${fromData?.label} → ${toData?.label}`
    : `Hi, I'd like to book a free trial.\nName: ${bookName}\nLevel: ${fromData?.label} → ${toData?.label}`
  );

  return (
    <div dir={t.dir} className={`min-h-screen bg-[#0A0F1C] text-white transition-opacity duration-300 ${ready?'opacity-100':'opacity-0'}`}>

      {/* ─── NAVBAR ─── */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0A0F1C]/95 backdrop-blur-md border-b border-white/10 shadow-xl' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 h-18 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Be Fluent" width={40} height={40} className="rounded-xl" priority />
            <span className="text-xl font-black text-white">Be Fluent</span>
          </Link>
          <button onClick={toggleLang}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-sm font-semibold text-white/70 hover:border-[#10B981] hover:text-[#10B981] transition-colors">
            <Globe className="w-4 h-4" />{t.toggle}
          </button>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 pt-20 pb-10 overflow-hidden">
        {/* background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#10B981]/40 to-transparent" />
          <div className="absolute top-1/4 start-1/4 w-96 h-96 bg-[#10B981]/8 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 end-1/4 w-80 h-80 bg-emerald-600/6 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.06)_0%,_transparent_70%)]" />
        </div>

        <div className="relative max-w-4xl mx-auto w-full text-center">
          {/* trust badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] text-sm font-bold mb-8">
            <Star className="w-4 h-4 fill-current" />
            {t.trust}
          </div>

          {/* heading */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[1.0] mb-6 tracking-tight">
            {t.hero_h1}<br />
            <span className="text-[#10B981]">{t.hero_h2}</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">{t.hero_sub}</p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <button onClick={() => calcRef.current?.scrollIntoView({behavior:'smooth'})}
              className="px-8 py-4 bg-[#10B981] text-white font-black text-lg rounded-2xl hover:bg-[#059669] transition-all shadow-xl shadow-emerald-900/40 hover:scale-[1.02] active:scale-[0.98]">
              {t.cta_calc}
            </button>
            <Link href="/placement-test"
              className="px-8 py-4 border-2 border-white/20 text-white font-semibold text-lg rounded-2xl hover:border-[#10B981]/60 hover:bg-white/5 transition-colors">
              {t.cta_test}
            </Link>
          </div>

          {/* stats row */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm">
            {[t.stat1, t.stat2, t.stat3, t.stat4].map((s,i) => (
              <div key={i} className="flex items-center gap-2 text-white/50">
                {i>0 && <span className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />}
                <span className="font-bold text-white/80">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* hero image */}
        <div className="relative max-w-4xl mx-auto w-full mt-16">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60">
            <Image src="/assets/hero-1.png" alt="Be Fluent" width={900} height={480}
              className="w-full h-auto object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C]/40 to-transparent" />
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 animate-bounce">
          <div className="w-5 h-8 border-2 border-white/20 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-white/40 rounded-full animate-scroll-dot" />
          </div>
        </div>
      </section>

      {/* ─── WHY BE FLUENT ─── */}
      <section className="py-24 px-6 bg-[#0D1420] border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16">{t.why_h}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.why.map((w, i) => {
              const Icon = WHY_ICONS[w.icon];
              return (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/8 hover:bg-white/8 hover:border-[#10B981]/30 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-[#10B981]/15 flex items-center justify-center mb-4 group-hover:bg-[#10B981]/25 transition-colors">
                    {Icon && <Icon className="w-6 h-6 text-[#10B981]" />}
                  </div>
                  <h3 className="font-black text-white mb-2">{w.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CALCULATOR ─── */}
      <section ref={calcRef} className="py-24 px-6 bg-white" id="calculator">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold mb-4">
              {lang==='ar' ? '💰 احسب خطتك' : '💰 Build Your Plan'}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#0A0F1C] mb-3">{t.calc_h}</h2>
            <p className="text-xl text-gray-500">{t.calc_sub}</p>
          </div>

          {/* STEP 1 */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-7 h-7 rounded-full bg-[#0A0F1C] text-white text-xs font-black flex items-center justify-center">1</div>
              <p className="font-black text-[#0A0F1C] text-base">{t.step1_label}</p>
            </div>
            <div className="border-b-2 border-gray-100 flex">
              {t.from_levels.map(lvl => {
                const active = from === lvl.id;
                return (
                  <button key={lvl.id} onClick={() => setFrom(lvl.id)}
                    className={`flex-1 pb-4 text-center relative transition-all duration-200 select-none group
                      ${active ? 'text-[#10B981]' : 'text-gray-300 hover:text-gray-500'}`}>
                    <p className="text-2xl font-black mb-1">{lvl.label}</p>
                    <p className="text-xs font-medium">{lvl.name}</p>
                    {active && <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#10B981] rounded-full" />}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-gray-400 text-sm text-center">{fromData?.desc}</p>
          </div>

          {/* STEP 2 */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div className={`w-7 h-7 rounded-full text-xs font-black flex items-center justify-center transition-colors
                ${to ? 'bg-[#10B981] text-white' : 'bg-gray-100 text-gray-400'}`}>2</div>
              <p className={`font-black text-base transition-colors ${to ? 'text-[#10B981]' : 'text-gray-400'}`}>{t.step2_label}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {t.to_levels.map(lvl => {
                const valid  = ORDER.indexOf(lvl.id) > ORDER.indexOf(from);
                const active = to === lvl.id;
                return (
                  <button key={lvl.id} onClick={() => valid && setTo(lvl.id)} disabled={!valid}
                    className={`relative p-5 rounded-2xl border-2 text-center transition-all duration-200 select-none
                      ${!valid  ? 'opacity-20 cursor-not-allowed border-gray-100 bg-white'
                      : active  ? 'bg-[#10B981] border-[#10B981] shadow-lg shadow-emerald-100 scale-[1.03]'
                      :           'bg-white border-gray-200 cursor-pointer hover:border-[#10B981]/50 hover:shadow-md'}`}>
                    {lvl.disc > 0 && valid && (
                      <span className={`absolute -top-2.5 ${lang==='ar'?'left-2':'right-2'} text-xs font-black px-2 py-0.5 rounded-full
                        ${active ? 'bg-white/30 text-white' : 'bg-emerald-50 text-emerald-600'}`}>
                        -{lvl.disc}%
                      </span>
                    )}
                    <p className={`text-xl font-black mb-1 ${active?'text-white':'text-[#0A0F1C]'}`}>{lvl.label}</p>
                    <p className={`text-xs leading-tight ${active?'text-white/80':'text-gray-400'}`}>{lvl.name}</p>
                  </button>
                );
              })}
            </div>
            {!to && (
              <p className="mt-4 text-center text-gray-300 text-sm">{t.hint_step2}</p>
            )}
            {to && toData && <p className="mt-4 text-gray-400 text-sm text-center">{toData.desc}</p>}
          </div>

          {/* PRICE CARD + BOOKING */}
          {to && months ? (
            <div className="bg-[#0A0F1C] rounded-3xl overflow-hidden shadow-2xl border border-white/8">
              {/* plan toggle */}
              <div className="flex border-b border-white/8">
                {(['monthly','bundle'] as const).map(p => (
                  <button key={p} onClick={() => setPlan(p)}
                    className={`flex-1 py-4 font-black text-base transition-colors
                      ${plan===p ? 'bg-[#10B981] text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
                    {p==='monthly' ? t.monthly : t.bundle}
                  </button>
                ))}
              </div>

              <div className="p-8">
                {/* price */}
                {plan==='monthly' ? (
                  <div className="mb-2 flex items-end gap-2 flex-wrap">
                    {saveMo>0 && <span className="text-white/25 line-through text-2xl">{base.toLocaleString()}</span>}
                    <span className="text-7xl font-black text-white">{monthlyRate.toLocaleString()}</span>
                    <span className="text-white/40 text-lg pb-1">{t.per_month}</span>
                  </div>
                ) : (
                  <div className="mb-2 flex items-end gap-2 flex-wrap">
                    {orig && <span className="text-white/25 line-through text-2xl">{orig.toLocaleString()}</span>}
                    <span className="text-7xl font-black text-white">{bundleTotal?.toLocaleString()}</span>
                    <span className="text-white/40 text-lg pb-1">{t.egp}</span>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <span className="text-white/40 text-sm">{fromData?.label} → {toData?.label} · {months} {lang==='ar'?'أشهر':'months'}</span>
                  {plan==='monthly' && saveMo>0 && (
                    <span className="bg-emerald-900/50 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-800">
                      {t.save} {saveMo.toLocaleString()} {t.egp}
                    </span>
                  )}
                  {plan==='bundle' && saveBundle && (
                    <span className="bg-emerald-900/50 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-800">
                      {t.save} {saveBundle.toLocaleString()} {t.egp}
                    </span>
                  )}
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pb-8 border-b border-white/8">
                  {(plan==='monthly' ? t.pkgFeats[0] : t.pkgFeats[2]).map((fi:number) => (
                    <li key={fi} className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                      <span className="text-white/70 text-sm">{t.features[fi]}</span>
                    </li>
                  ))}
                </ul>

                {/* ── INLINE BOOKING FORM ── */}
                <div ref={bookingRef} className="pt-8">
                  {bookStatus==='success' ? (
                    <div className="text-center py-6">
                      <div className="w-16 h-16 bg-[#10B981]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">🎉</span>
                      </div>
                      <h3 className="text-2xl font-black text-white mb-2">{t.success_h}</h3>
                      <p className="text-white/50 mb-6 leading-relaxed">{t.success_sub}</p>
                      <a href={`https://api.whatsapp.com/send/?phone=${WA_NUMBER}&text=${waMsg}`}
                        target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white font-black text-lg rounded-2xl hover:bg-[#1ebe5d] transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        {t.success_cta}
                      </a>
                    </div>
                  ) : (
                    <form onSubmit={handleBook}>
                      <h3 className="text-xl font-black text-white mb-1">{t.book_h}</h3>
                      <p className="text-white/40 text-sm mb-6">{t.book_sub}</p>
                      <div className="space-y-3 mb-5">
                        <div className="relative">
                          <User className="absolute top-1/2 -translate-y-1/2 start-4 w-4 h-4 text-white/25" />
                          <input type="text" required value={bookName} onChange={e=>setBookName(e.target.value)}
                            placeholder={t.f_name_ph}
                            className="w-full ps-11 pe-4 py-3.5 bg-white/8 border border-white/12 rounded-xl text-white placeholder-white/30 text-base focus:outline-none focus:border-[#10B981]/60 focus:bg-white/10 transition-colors" />
                        </div>
                        <div className="relative">
                          <Phone className="absolute top-1/2 -translate-y-1/2 start-4 w-4 h-4 text-white/25" />
                          <input type="tel" required value={bookPhone} onChange={e=>setBookPhone(e.target.value)}
                            placeholder={t.f_phone_ph}
                            className="w-full ps-11 pe-4 py-3.5 bg-white/8 border border-white/12 rounded-xl text-white placeholder-white/30 text-base focus:outline-none focus:border-[#10B981]/60 focus:bg-white/10 transition-colors" />
                        </div>
                        <div className="relative">
                          <Mail className="absolute top-1/2 -translate-y-1/2 start-4 w-4 h-4 text-white/25" />
                          <input type="email" value={bookEmail} onChange={e=>setBookEmail(e.target.value)}
                            placeholder={t.f_email_ph}
                            className="w-full ps-11 pe-4 py-3.5 bg-white/8 border border-white/12 rounded-xl text-white placeholder-white/30 text-base focus:outline-none focus:border-[#10B981]/60 focus:bg-white/10 transition-colors" />
                        </div>
                      </div>
                      {bookStatus==='error' && (
                        <p className="text-red-400 text-sm mb-3 text-center">{t.err}</p>
                      )}
                      <button type="submit" disabled={bookStatus==='loading'}
                        className="w-full py-4 bg-[#10B981] text-white font-black text-lg rounded-2xl hover:bg-[#059669] transition-all disabled:opacity-50 shadow-lg shadow-emerald-900/40 hover:scale-[1.01] active:scale-[0.99]">
                        {bookStatus==='loading' ? t.submitting : t.submit}
                      </button>
                      <p className="text-center text-white/30 text-sm mt-4">
                        {t.has_account}{' '}
                        <Link href="/auth/login" className="text-[#10B981] font-semibold hover:underline">{t.login}</Link>
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center border-2 border-dashed border-gray-100 rounded-3xl bg-gray-50/50">
              <div className="text-5xl mb-4">👆</div>
              <p className="text-gray-300 text-lg font-medium">{t.hint}</p>
            </div>
          )}
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section className="py-24 px-6 bg-[#0D1420] border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-14">{t.reviews_h}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.reviews.map((r, i) => (
              <div key={i} className="p-7 rounded-2xl bg-white/5 border border-white/8 hover:border-[#10B981]/30 transition-all">
                <div className="flex mb-4">
                  {Array.from({length:r.stars}).map((_,j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-5">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#10B981]/20 flex items-center justify-center text-[#10B981] font-black text-sm">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{r.name}</p>
                    <p className="text-[#10B981] text-xs font-bold">{r.level}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PLACEMENT TEST ─── */}
      <section className="py-24 px-6 bg-[#0A0F1C] border-t border-white/5">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🎯</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">{t.test_h}</h2>
          <p className="text-xl text-white/50 mb-8 leading-relaxed">{t.test_sub}</p>
          <Link href="/placement-test"
            className="inline-block px-10 py-4 bg-[#10B981] text-white font-black text-xl rounded-2xl hover:bg-[#059669] transition-all shadow-xl shadow-emerald-900/40 hover:scale-[1.02]">
            {t.test_btn}
          </Link>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/8 py-8 px-6 bg-[#060B14]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Be Fluent" width={28} height={28} className="rounded-lg" />
            <span className="font-black text-white">Be Fluent</span>
          </div>
          <p className="text-white/30 text-sm">{t.footer}</p>
          <button onClick={toggleLang} className="flex items-center gap-2 text-sm text-white/30 hover:text-[#10B981] transition-colors font-semibold">
            <Globe className="w-4 h-4" />{t.toggle}
          </button>
        </div>
      </footer>

      <FloatingContactButtons />
    </div>
  );
}
