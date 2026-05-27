'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import {
  Globe, CheckCircle, User, Phone, Mail, Star, ArrowDown,
  BookOpen, Video, MessageCircle, Award, TrendingUp, Clock,
  Headphones, PenTool, Zap, Shield, ChevronDown, Play
} from "lucide-react";

/* ─── i18n ─────────────────────────────────────────────── */
const T = {
  ar: {
    dir: 'rtl' as const,
    toggle: 'English',
    nav_home: 'الرئيسية',
    nav_packages: 'الباقات',
    nav_path: 'مسار التعلم',
    nav_contact: 'تواصل معنا',
    nav_login: 'دخول',
    nav_cta: 'احجز مجاناً',
    hero_badge: '⭐ أكثر من 5,000 طالب وصلوا للطلاقة',
    hero_h1: 'تعلّم الإنجليزية',
    hero_h1b: 'واحكم العالم',
    hero_sub: 'حصص خاصة مع معلمين محترفين — متابعة يومية على واتساب — دعم 24/7',
    hero_cta1: 'احجز حصتك التجريبية مجاناً',
    hero_cta2: 'اختبر مستواك الآن',
    stats: [
      { n: '+5,000', l: 'طالب متخرج' },
      { n: '4.9/5', l: 'تقييم الطلاب' },
      { n: '+50', l: 'معلم محترف' },
      { n: '24/7', l: 'دعم مستمر' },
    ],
    features_h: 'لماذا Be Fluent؟',
    features_sub: 'نظام متكامل مصمم ليأخذك من أي مستوى إلى الطلاقة التامة',
    features: [
      { icon: '🎯', t: 'حصص خاصة 1 على 1', d: 'جلسات فردية مباشرة مع معلمك، مصممة بالكامل حول أهدافك الشخصية' },
      { icon: '💬', t: 'متابعة يومية واتساب', d: 'معلمك يتابع تقدمك يومياً على واتساب بتمارين وتصحيح فوري' },
      { icon: '🤖', t: 'تعلم ذكي تكيّفي', d: 'المنصة تتكيف مع مستواك وتقدمك لتقديم المحتوى المناسب لك' },
      { icon: '📊', t: 'تتبع التقدم', d: 'لوحة تحكم شاملة تُظهر تقدمك وإنجازاتك ومستواك في كل مهارة' },
      { icon: '🏆', t: 'شهادات معتمدة', d: 'احصل على شهادة معتمدة عند إتمام كل مستوى لتضيفها لسيرتك' },
      { icon: '🌙', t: 'دعم 24/7', d: 'فريقنا متاح على مدار الساعة للإجابة على أي سؤال أو مساعدة' },
    ],
    how_h: 'كيف تبدأ رحلتك؟',
    how_sub: 'أربع خطوات بسيطة تأخذك من البداية إلى الطلاقة',
    how: [
      { n: '١', t: 'اختبر مستواك', d: 'ابدأ باختبار مجاني لتحديد نقطة انطلاقك بدقة', link: '/placement-test' },
      { n: '٢', t: 'اختر باقتك', d: 'اختر الباقة المناسبة لمستواك وهدفك وميزانيتك', link: '/packages' },
      { n: '٣', t: 'تعلّم مع معلمك', d: 'حصص مباشرة 1×1 مع متابعة يومية على واتساب' },
      { n: '٤', t: 'احصل على شهادتك', d: 'أكمل المستوى واحصل على شهادة معتمدة تفتح لك الأبواب' },
    ],
    levels_h: 'من أي مستوى تبدأ؟',
    levels_sub: 'البرنامج مصمم لجميع المستويات — من الصفر إلى الاحترافية',
    levels: [
      { l: 'A1', n: 'مبتدئ', d: 'لا تعرف شيئاً؟ نبدأ معك من الصفر', color: 'bg-gray-100 text-gray-700' },
      { l: 'A2', n: 'أساسي', d: 'تعرف بعض الكلمات لكن لا تستطيع التحدث', color: 'bg-blue-100 text-blue-700' },
      { l: 'B1', n: 'متوسط', d: 'تفهم لكن تجد صعوبة في التعبير', color: 'bg-emerald-100 text-emerald-700' },
      { l: 'B2', n: 'متقدم', d: 'تتحدث لكن تحتاج صقل المهارات', color: 'bg-teal-100 text-teal-700' },
      { l: 'C1', n: 'احترافي', d: 'تريد إتقان اللغة كأهلها تماماً', color: 'bg-purple-100 text-purple-700' },
    ],
    reviews_h: 'قصص نجاح طلابنا',
    reviews_sub: 'أكثر من 5,000 طالب غيّروا مستقبلهم مع Be Fluent',
    reviews: [
      { name: 'أحمد محمد', lvl: 'A1 ← C1', q: 'في سنة واحدة قدرت أتكلم إنجليزي بطلاقة في الشغل. المتابعة اليومية فرقت معايا جداً ما كنتش تخيلت إن ممكن أوصل للمستوى دا بسرعة.' },
      { name: 'سارة خالد', lvl: 'B1 ← C1', q: 'أفضل استثمار عملته في حياتي. المعلمة كانت متاحة دايماً وتهتم بأهدافي الشخصية مش الأهداف العامة.' },
      { name: 'محمود علي', lvl: 'A2 ← B2', q: 'كنت خايف أبدأ بس من أول حصة حسيت بالفرق الكبير. الطريقة بسيطة ومنظمة وبتشتغل فعلاً.' },
      { name: 'نور حسين', lvl: 'B1 ← C1', q: 'الدعم 24/7 غير كل حاجة. أي وقت كان عندي سؤال لاقيت حد يرد عليّا. برنامج رائع بجد.' },
    ],
    calc_badge: 'احسب تكلفة رحلتك',
    calc_h: 'كم يكلف تعلّمك؟',
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
    features_list: ['حصص خاصة مباشرة', 'متابعة يومية واتساب', 'دعم 24/7', 'شهادة إتمام المستوى', 'اختبار مستوى مجاني'],
    pkgFeats: [[0, 1, 2], [0, 1, 2, 3], [0, 1, 2, 3, 4]],
    book_h: 'احجز حصتك التجريبية المجانية',
    book_sub: 'سيتواصل معك معلمك خلال ساعات — بدون أي التزام',
    f_name_ph: 'اسمك الكامل',
    f_phone_ph: 'رقم الواتساب',
    f_email_ph: 'البريد الإلكتروني (اختياري)',
    submit: 'احجز مجاناً الآن',
    submitting: 'جاري الحجز...',
    success_h: 'تم الحجز! 🎉',
    success_sub: 'سيتواصل معك فريقنا على واتساب قريباً',
    success_wa: 'تواصل معنا الآن',
    err: 'حدث خطأ، حاول مرة أخرى',
    has_account: 'لديك حساب؟',
    login: 'سجّل دخولك',
    test_h: 'لا تعرف مستواك؟',
    test_sub: 'خذ اختبار تحديد المستوى المجاني في 10 دقائق',
    test_btn: 'ابدأ الاختبار المجاني',
    from_levels: [
      { id: 'a1', label: 'A1', name: 'مبتدئ', desc: 'لا أعرف شيئاً أو أعرف كلمات قليلة جداً' },
      { id: 'a2', label: 'A2', name: 'أساسي', desc: 'أعرف جملاً بسيطة لكن لا أستطيع المحادثة' },
      { id: 'b1', label: 'B1', name: 'متوسط', desc: 'أفهم لكن أجد صعوبة في التعبير عن نفسي' },
      { id: 'b2', label: 'B2', name: 'متقدم', desc: 'أتحدث لكن أجد صعوبة في المواقف المعقدة' },
    ],
    to_levels: [
      { id: 'a2', label: 'A2', name: 'أساسي', disc: 0, desc: 'أريد التعامل في المواقف اليومية' },
      { id: 'b1', label: 'B1', name: 'متوسط', disc: 15, desc: 'أريد التعبير عن نفسي بسهولة' },
      { id: 'b2', label: 'B2', name: 'متقدم', disc: 25, desc: 'أريد التحدث بطلاقة في أي موقف' },
      { id: 'c1', label: 'C1', name: 'احترافي', disc: 35, desc: 'أريد إتقان اللغة كأهلها تماماً' },
    ],
    footer: {
      tagline: 'رحلتك نحو الطلاقة تبدأ هنا',
      copy: '© 2025 Be Fluent Academy — جميع الحقوق محفوظة',
      links: {
        learn: { title: 'التعلم', items: [
          { label: 'مسار التعلم', href: '/learning-path' },
          { label: 'اختبار المستوى', href: '/placement-test' },
          { label: 'الباقات والأسعار', href: '/packages' },
          { label: 'قواعد اللغة', href: '/grammar' },
          { label: 'الإنجازات', href: '/achievements' },
        ]},
        account: { title: 'الحساب', items: [
          { label: 'تسجيل الدخول', href: '/auth/login' },
          { label: 'إنشاء حساب', href: '/auth/register' },
          { label: 'لوحة الطالب', href: '/dashboard/student' },
          { label: 'الإعدادات', href: '/settings' },
          { label: 'المحادثات', href: '/chat' },
        ]},
        company: { title: 'الشركة', items: [
          { label: 'من نحن', href: '/about-path' },
          { label: 'تواصل معنا', href: '/contact' },
          { label: 'سياسة الخصوصية', href: '/contact' },
          { label: 'الشروط والأحكام', href: '/contact' },
        ]},
      },
      social: [
        { label: 'واتساب', href: 'https://api.whatsapp.com/send/?phone=201091515594', icon: '💬' },
        { label: 'فيسبوك', href: '#', icon: '📘' },
        { label: 'إنستجرام', href: '#', icon: '📸' },
        { label: 'يوتيوب', href: '#', icon: '▶️' },
      ],
    },
  },
  en: {
    dir: 'ltr' as const,
    toggle: 'العربية',
    nav_home: 'Home',
    nav_packages: 'Packages',
    nav_path: 'Learning Path',
    nav_contact: 'Contact',
    nav_login: 'Login',
    nav_cta: 'Book Free',
    hero_badge: '⭐ Over 5,000 students reached fluency',
    hero_h1: 'Learn English,',
    hero_h1b: 'Rule the World',
    hero_sub: 'Private live sessions with expert teachers — Daily WhatsApp follow-up — 24/7 support',
    hero_cta1: 'Book Your Free Trial Session',
    hero_cta2: 'Test Your Level Now',
    stats: [
      { n: '+5,000', l: 'Graduates' },
      { n: '4.9/5', l: 'Student Rating' },
      { n: '+50', l: 'Expert Teachers' },
      { n: '24/7', l: 'Support' },
    ],
    features_h: 'Why Be Fluent?',
    features_sub: 'A complete system designed to take you from any level to full fluency',
    features: [
      { icon: '🎯', t: '1-on-1 Private Sessions', d: 'Live individual sessions with your teacher, designed entirely around your personal goals' },
      { icon: '💬', t: 'Daily WhatsApp Follow-up', d: 'Your teacher follows your progress daily on WhatsApp with exercises and instant correction' },
      { icon: '🤖', t: 'Smart Adaptive Learning', d: 'The platform adapts to your level and progress to deliver the right content for you' },
      { icon: '📊', t: 'Progress Tracking', d: 'A comprehensive dashboard showing your progress, achievements, and skill levels' },
      { icon: '🏆', t: 'Accredited Certificates', d: 'Get an accredited certificate upon completing each level to add to your resume' },
      { icon: '🌙', t: '24/7 Support', d: 'Our team is available around the clock to answer any question or provide assistance' },
    ],
    how_h: 'How does it work?',
    how_sub: 'Four simple steps to take you from beginner to fluency',
    how: [
      { n: '1', t: 'Test Your Level', d: 'Start with a free test to accurately identify your starting point', link: '/placement-test' },
      { n: '2', t: 'Choose Your Package', d: 'Choose the package right for your level, goals, and budget', link: '/packages' },
      { n: '3', t: 'Learn with Your Teacher', d: 'Live 1-on-1 sessions with daily WhatsApp follow-up' },
      { n: '4', t: 'Get Your Certificate', d: 'Complete the level and earn an accredited certificate that opens doors' },
    ],
    levels_h: 'What level do you start from?',
    levels_sub: 'The program is designed for all levels — from zero to professional',
    levels: [
      { l: 'A1', n: 'Beginner', d: "Don't know anything? We start with you from scratch", color: 'bg-gray-100 text-gray-700' },
      { l: 'A2', n: 'Elementary', d: 'Know some words but can\'t hold a conversation', color: 'bg-blue-100 text-blue-700' },
      { l: 'B1', n: 'Intermediate', d: 'Understand but struggle to express yourself', color: 'bg-emerald-100 text-emerald-700' },
      { l: 'B2', n: 'Upper-Int.', d: 'Can speak but needs skill refinement', color: 'bg-teal-100 text-teal-700' },
      { l: 'C1', n: 'Advanced', d: 'Want to master the language like a native', color: 'bg-purple-100 text-purple-700' },
    ],
    reviews_h: 'Student Success Stories',
    reviews_sub: 'Over 5,000 students changed their future with Be Fluent',
    reviews: [
      { name: 'Ahmed Mohamed', lvl: 'A1 → C1', q: 'In one year I could speak English fluently at work. The daily follow-up made a huge difference — I never imagined I could reach this level so fast.' },
      { name: 'Sara Khaled', lvl: 'B1 → C1', q: 'Best investment I ever made. My teacher was always available and focused on my specific goals, not just generic topics.' },
      { name: 'Mahmoud Ali', lvl: 'A2 → B2', q: 'I was scared to start but from the first session I felt the huge difference. Simple, organized, and it really works.' },
      { name: 'Nour Hussein', lvl: 'B1 → C1', q: 'The 24/7 support changed everything. Any time I had a question there was always someone to answer. Truly amazing program.' },
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
    features_list: ['Private live sessions', 'Daily WhatsApp follow-up', '24/7 support', 'Level completion certificate', 'Free placement test'],
    pkgFeats: [[0, 1, 2], [0, 1, 2, 3], [0, 1, 2, 3, 4]],
    book_h: 'Book Your Free Trial Session',
    book_sub: 'Your teacher will contact you within hours — no commitment',
    f_name_ph: 'Your full name',
    f_phone_ph: 'WhatsApp number',
    f_email_ph: 'Email (optional)',
    submit: 'Book Free Now',
    submitting: 'Booking...',
    success_h: 'Booked! 🎉',
    success_sub: 'Our team will contact you on WhatsApp shortly',
    success_wa: 'Contact us now',
    err: 'An error occurred, please try again',
    has_account: 'Have an account?',
    login: 'Log in',
    test_h: "Not sure of your level?",
    test_sub: 'Take the free placement test in 10 minutes',
    test_btn: 'Start Free Test',
    from_levels: [
      { id: 'a1', label: 'A1', name: 'Beginner', desc: "I know nothing or very few words" },
      { id: 'a2', label: 'A2', name: 'Elementary', desc: 'I know basic sentences but struggle to converse' },
      { id: 'b1', label: 'B1', name: 'Intermediate', desc: 'I understand but struggle to express myself' },
      { id: 'b2', label: 'B2', name: 'Upper-Int.', desc: 'I speak but struggle in complex situations' },
    ],
    to_levels: [
      { id: 'a2', label: 'A2', name: 'Elementary', disc: 0, desc: 'I want to handle everyday situations' },
      { id: 'b1', label: 'B1', name: 'Intermediate', disc: 15, desc: 'I want to express myself easily' },
      { id: 'b2', label: 'B2', name: 'Upper-Int.', disc: 25, desc: 'I want to speak fluently in any situation' },
      { id: 'c1', label: 'C1', name: 'Advanced', disc: 35, desc: 'I want to master the language like a native' },
    ],
    footer: {
      tagline: 'Your journey to fluency starts here',
      copy: '© 2025 Be Fluent Academy — All rights reserved',
      links: {
        learn: { title: 'Learning', items: [
          { label: 'Learning Path', href: '/learning-path' },
          { label: 'Level Test', href: '/placement-test' },
          { label: 'Packages & Pricing', href: '/packages' },
          { label: 'Grammar Rules', href: '/grammar' },
          { label: 'Achievements', href: '/achievements' },
        ]},
        account: { title: 'Account', items: [
          { label: 'Login', href: '/auth/login' },
          { label: 'Register', href: '/auth/register' },
          { label: 'Student Dashboard', href: '/dashboard/student' },
          { label: 'Settings', href: '/settings' },
          { label: 'Chat', href: '/chat' },
        ]},
        company: { title: 'Company', items: [
          { label: 'About Us', href: '/about-path' },
          { label: 'Contact Us', href: '/contact' },
          { label: 'Privacy Policy', href: '/contact' },
          { label: 'Terms & Conditions', href: '/contact' },
        ]},
      },
      social: [
        { label: 'WhatsApp', href: 'https://api.whatsapp.com/send/?phone=201091515594', icon: '💬' },
        { label: 'Facebook', href: '#', icon: '📘' },
        { label: 'Instagram', href: '#', icon: '📸' },
        { label: 'YouTube', href: '#', icon: '▶️' },
      ],
    },
  },
};

const ORDER = ['a1', 'a2', 'b1', 'b2', 'c1'];
const M_BASE: Record<string, number> = { a1: 1800, a2: 1600, b1: 1500, b2: 1400 };
const DUR: Record<string, Record<string, number>> = {
  a1: { a2: 3, b1: 6, b2: 9, c1: 12 }, a2: { b1: 3, b2: 6, c1: 9 }, b1: { b2: 3, c1: 6 }, b2: { c1: 3 },
};
const DISC: Record<string, number> = { a2: 0, b1: 15, b2: 25, c1: 35 };
const BUNDLE_ADD = 10;
const WA = '201091515594';

export default function Home() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [from, setFrom] = useState('a1');
  const [to, setTo] = useState<string | null>(null);
  const [plan, setPlan] = useState<'monthly' | 'bundle'>('bundle');
  const [ready, setReady] = useState(false);
  const [bookName, setBookName] = useState('');
  const [bookPhone, setBookPhone] = useState('');
  const [bookEmail, setBookEmail] = useState('');
  const [bookStatus, setBookStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const calcRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const t = T[lang];

  useEffect(() => {
    const s = localStorage.getItem('bf_lang') as 'ar' | 'en' | null;
    if (s) setLang(s);
    setTimeout(() => setReady(true), 30);
  }, []);

  useEffect(() => {
    if (to && ORDER.indexOf(to) <= ORDER.indexOf(from)) setTo(null);
  }, [from, to]);

  useEffect(() => {
    if (to) setTimeout(() => bookingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 300);
  }, [to, plan]);

  const toggleLang = () => { const n = lang === 'ar' ? 'en' : 'ar'; setLang(n); localStorage.setItem('bf_lang', n); };

  const base = M_BASE[from] ?? 1500;
  const months = to ? (DUR[from]?.[to] ?? null) : null;
  const lvlDisc = to ? (DISC[to] ?? 0) : 0;
  const monthlyRate = months ? Math.round(base * (1 - lvlDisc / 100) / 100) * 100 : base;
  const saveMo = base - monthlyRate;
  const orig = months ? base * months : null;
  const bundleTotal = orig ? Math.round(orig * (1 - Math.min(lvlDisc + BUNDLE_ADD, 45) / 100) / 100) * 100 : null;
  const saveBundle = orig && bundleTotal ? orig - bundleTotal : null;
  const fromData = t.from_levels.find(l => l.id === from);
  const toData = to ? t.to_levels.find(l => l.id === to) : null;

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookStatus('loading');
    try {
      await fetch('/api/book-trial', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: bookName, phone: bookPhone, email: bookEmail, fromLevel: from, toLevel: to, plan, price: plan === 'monthly' ? monthlyRate : bundleTotal }),
      });
      setBookStatus('success');
    } catch { setBookStatus('error'); }
  };

  const waMsg = encodeURIComponent(lang === 'ar'
    ? `مرحباً، أريد حجز حصة تجريبية مجانية.\nالاسم: ${bookName}\nالمستوى: ${fromData?.label} ← ${toData?.label}`
    : `Hi, I'd like to book a free trial.\nName: ${bookName}\nLevel: ${fromData?.label} → ${toData?.label}`
  );

  return (
    <div dir={t.dir} className={`min-h-screen bg-white text-[#111827] font-sans transition-opacity duration-300 ${ready ? 'opacity-100' : 'opacity-0'}`}>

      {/* ═══ NAVBAR ═══ */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <Image src="/logo.png" alt="Be Fluent" width={36} height={36} className="rounded-xl" priority />
            <span className="font-black text-lg text-[#111827]">Be Fluent</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/learning-path" className="text-sm font-medium text-gray-500 hover:text-[#10B981] transition-colors">{t.nav_path}</Link>
            <Link href="/packages" className="text-sm font-medium text-gray-500 hover:text-[#10B981] transition-colors">{t.nav_packages}</Link>
            <Link href="/contact" className="text-sm font-medium text-gray-500 hover:text-[#10B981] transition-colors">{t.nav_contact}</Link>
            <Link href="/auth/login" className="text-sm font-medium text-gray-500 hover:text-[#10B981] transition-colors">{t.nav_login}</Link>
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={toggleLang} className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-[#10B981] transition-colors px-2 py-1.5">
              <Globe className="w-4 h-4" />{t.toggle}
            </button>
            <button
              onClick={() => calcRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="px-5 py-2.5 bg-[#10B981] text-white text-sm font-bold rounded-xl hover:bg-[#059669] transition-colors shadow-sm shadow-emerald-200">
              {t.nav_cta}
            </button>
          </div>
        </div>
      </header>

      <main className="pt-16">

        {/* ═══ HERO ═══ */}
        <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 via-white to-white">
          {/* bg decorations */}
          <div className="absolute top-0 start-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute top-20 end-0 w-80 h-80 bg-teal-100/30 rounded-full blur-3xl translate-x-1/3 pointer-events-none" />

          <div className="relative max-w-6xl mx-auto px-5 pt-16 pb-12">
            {/* Badge */}
            <div className="flex justify-center mb-7">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold">
                <span className="flex">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                </span>
                {t.hero_badge}
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-center text-5xl sm:text-6xl md:text-7xl font-black text-[#111827] leading-[1.08] tracking-tight mb-5">
              {t.hero_h1}<br />
              <span className="text-[#10B981]">{t.hero_h1b}</span>
            </h1>

            <p className="text-center text-lg text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">{t.hero_sub}</p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
              <button
                onClick={() => calcRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-[#111827] text-white font-bold text-base rounded-2xl hover:bg-[#1F2937] transition-colors shadow-lg shadow-gray-200">
                {t.hero_cta1}
              </button>
              <Link href="/placement-test"
                className="px-8 py-4 border-2 border-gray-200 text-gray-600 font-semibold text-base rounded-2xl hover:border-[#10B981] hover:text-[#10B981] transition-all flex items-center justify-center gap-2">
                {t.hero_cta2}
              </Link>
            </div>

            {/* Hero Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/80 border border-gray-100 bg-gradient-to-br from-emerald-600 to-teal-700">
              <Image
                src="/assets/hero-1.png" alt="Be Fluent Platform"
                width={1200} height={600}
                className="w-full h-auto opacity-90"
                priority
              />
              {/* Floating stat cards */}
              <div className="absolute bottom-5 start-5 sm:bottom-8 sm:start-8 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-xl">🎓</div>
                <div className="text-start">
                  <p className="font-black text-[#111827] text-sm leading-none">+5,000</p>
                  <p className="text-gray-400 text-xs mt-0.5">{lang === 'ar' ? 'طالب متخرج' : 'Graduates'}</p>
                </div>
              </div>
              <div className="absolute top-5 end-5 sm:top-8 sm:end-8 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-xl">⭐</div>
                <div className="text-start">
                  <p className="font-black text-[#111827] text-sm leading-none">4.9 / 5</p>
                  <p className="text-gray-400 text-xs mt-0.5">{lang === 'ar' ? 'تقييم الطلاب' : 'Rating'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="border-t border-gray-100 bg-white">
            <div className="max-w-6xl mx-auto px-5 py-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {t.stats.map((s, i) => (
                  <div key={i} className="text-center">
                    <p className="text-3xl sm:text-4xl font-black text-[#111827] leading-none mb-1">{s.n}</p>
                    <p className="text-sm text-gray-500 font-medium">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FEATURES ═══ */}
        <section className="py-20 px-5 bg-gray-50 border-t border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-black mb-3">{t.features_h}</h2>
              <p className="text-gray-500 max-w-xl mx-auto">{t.features_sub}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {t.features.map((f, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                  <div className="text-3xl mb-4">{f.icon}</div>
                  <h3 className="font-black text-[#111827] mb-2 text-base">{f.t}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ HOW IT WORKS ═══ */}
        <section className="py-20 px-5 bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-black mb-3">{t.how_h}</h2>
              <p className="text-gray-500">{t.how_sub}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.how.map((s, i) => (
                <div key={i} className="relative">
                  {/* connector line (hidden on last) */}
                  {i < t.how.length - 1 && (
                    <div className="hidden lg:block absolute top-8 start-full w-full h-px bg-gradient-to-r from-emerald-200 to-transparent z-0" />
                  )}
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-black text-emerald-600">{s.n}</span>
                    </div>
                    <h3 className="font-black text-[#111827] mb-2">{s.t}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-3">{s.d}</p>
                    {s.link && (
                      <Link href={s.link} className="text-[#10B981] text-sm font-bold hover:underline">
                        {lang === 'ar' ? 'ابدأ الآن ←' : 'Start Now →'}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ LEVELS ═══ */}
        <section className="py-20 px-5 bg-gray-50 border-t border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black mb-3">{t.levels_h}</h2>
              <p className="text-gray-500">{t.levels_sub}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {t.levels.map((lv, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl font-black text-lg mb-3 ${lv.color}`}>
                    {lv.l}
                  </div>
                  <p className="font-black text-[#111827] text-sm mb-1">{lv.n}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{lv.d}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/placement-test"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-50 text-emerald-700 font-bold rounded-2xl hover:bg-emerald-100 transition-colors border border-emerald-200">
                {lang === 'ar' ? '🎯 اكتشف مستواك الآن' : '🎯 Discover Your Level Now'}
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ REVIEWS ═══ */}
        <section className="py-20 px-5 bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-black mb-3">{t.reviews_h}</h2>
              <p className="text-gray-500">{t.reviews_sub}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {t.reviews.map((r, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">"{r.q}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
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

        {/* ═══ CALCULATOR + BOOKING ═══ */}
        <section ref={calcRef} className="py-20 px-5 bg-gray-50 border-t border-gray-100" id="calculator">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-4 border border-emerald-100">
                {t.calc_badge}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-[#111827] mb-2">{t.calc_h}</h2>
              <p className="text-gray-500">{t.calc_sub}</p>
            </div>

            {/* STEP 1 */}
            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-4">{t.step1}</p>
            <div className="border-b-2 border-gray-100 flex mb-2">
              {t.from_levels.map(lvl => {
                const active = from === lvl.id;
                return (
                  <button key={lvl.id} onClick={() => setFrom(lvl.id)}
                    className={`flex-1 pb-4 text-center relative transition-all select-none ${active ? 'text-[#10B981]' : 'text-gray-300 hover:text-gray-500'}`}>
                    <p className="text-xl sm:text-2xl font-black">{lvl.label}</p>
                    <p className="text-[11px] mt-0.5">{lvl.name}</p>
                    {active && <div className="absolute bottom-0 inset-x-0 h-[2px] bg-[#10B981]" />}
                  </button>
                );
              })}
            </div>
            <p className="text-gray-400 text-sm text-center mb-10">{fromData?.desc}</p>

            {/* STEP 2 */}
            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-4">{t.step2}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-2">
              {t.to_levels.map(lvl => {
                const valid = ORDER.indexOf(lvl.id) > ORDER.indexOf(from);
                const active = to === lvl.id;
                return (
                  <button key={lvl.id} onClick={() => valid && setTo(lvl.id)} disabled={!valid}
                    className={`relative p-4 sm:p-5 rounded-2xl border-2 text-center transition-all select-none
                      ${!valid ? 'opacity-20 cursor-not-allowed border-gray-100'
                        : active ? 'border-[#10B981] bg-[#10B981] shadow-lg shadow-emerald-100 scale-[1.03]'
                          : 'border-gray-200 bg-white hover:border-[#10B981]/40 hover:bg-emerald-50/30 cursor-pointer'}`}>
                    {lvl.disc > 0 && valid && (
                      <span className={`absolute -top-2.5 ${lang === 'ar' ? 'left-2' : 'right-2'} text-[10px] font-black px-2 py-0.5 rounded-full
                        ${active ? 'bg-white/30 text-white' : 'bg-emerald-100 text-emerald-700'}`}>
                        -{lvl.disc}%
                      </span>
                    )}
                    <p className={`text-xl font-black ${active ? 'text-white' : 'text-[#111827]'}`}>{lvl.label}</p>
                    <p className={`text-[11px] mt-0.5 ${active ? 'text-white/80' : 'text-gray-400'}`}>{lvl.name}</p>
                  </button>
                );
              })}
            </div>
            {!to && <p className="text-gray-300 text-sm text-center mt-3 mb-8">{t.hint2}</p>}
            {to && toData && <p className="text-gray-400 text-sm text-center mt-3 mb-8">{toData.desc}</p>}

            {/* PRICE CARD */}
            {to && months ? (
              <div className="border border-gray-200 rounded-3xl overflow-hidden shadow-sm bg-white">
                <div className="flex border-b border-gray-100">
                  {(['monthly', 'bundle'] as const).map(p => (
                    <button key={p} onClick={() => setPlan(p)}
                      className={`flex-1 py-3.5 font-black text-sm transition-colors
                        ${plan === p ? 'bg-[#111827] text-white' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`}>
                      {p === 'monthly' ? t.monthly : t.bundle}
                    </button>
                  ))}
                </div>
                <div className="p-7 sm:p-8">
                  {plan === 'monthly' ? (
                    <div className="flex items-end gap-2 flex-wrap mb-2">
                      {saveMo > 0 && <span className="text-gray-300 line-through text-xl">{base.toLocaleString()}</span>}
                      <span className="text-6xl sm:text-7xl font-black text-[#111827] leading-none">{monthlyRate.toLocaleString()}</span>
                      <span className="text-gray-400 pb-1">{t.per_month}</span>
                    </div>
                  ) : (
                    <div className="flex items-end gap-2 flex-wrap mb-2">
                      {orig && <span className="text-gray-300 line-through text-xl">{orig.toLocaleString()}</span>}
                      <span className="text-6xl sm:text-7xl font-black text-[#111827] leading-none">{bundleTotal?.toLocaleString()}</span>
                      <span className="text-gray-400 pb-1">{t.egp}</span>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mb-7">
                    <span className="text-gray-400 text-sm">{fromData?.label} → {toData?.label} · {months} {lang === 'ar' ? 'أشهر' : 'mo'}</span>
                    {plan === 'monthly' && saveMo > 0 && (
                      <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">
                        {t.save} {saveMo.toLocaleString()} {t.egp}
                      </span>
                    )}
                    {plan === 'bundle' && saveBundle && (
                      <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">
                        {t.save} {saveBundle.toLocaleString()} {t.egp}
                      </span>
                    )}
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-7 border-b border-gray-100 mb-7">
                    {(plan === 'monthly' ? t.pkgFeats[0] : t.pkgFeats[2]).map((fi: number) => (
                      <li key={fi} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{t.features_list[fi]}</span>
                      </li>
                    ))}
                  </ul>

                  {/* BOOKING FORM */}
                  <div ref={bookingRef}>
                    {bookStatus === 'success' ? (
                      <div className="text-center py-6">
                        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🎉</div>
                        <h3 className="text-xl font-black text-[#111827] mb-2">{t.success_h}</h3>
                        <p className="text-gray-500 text-sm mb-5">{t.success_sub}</p>
                        <a href={`https://api.whatsapp.com/send/?phone=${WA}&text=${waMsg}`} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1ebe5d] transition-colors">
                          💬 {t.success_wa}
                        </a>
                      </div>
                    ) : (
                      <form onSubmit={handleBook} className="space-y-3">
                        <h3 className="font-black text-[#111827] text-lg mb-1">{t.book_h}</h3>
                        <p className="text-gray-400 text-sm mb-4">{t.book_sub}</p>
                        <div className="relative">
                          <User className="absolute top-1/2 -translate-y-1/2 start-3.5 w-4 h-4 text-gray-300" />
                          <input required type="text" value={bookName} onChange={e => setBookName(e.target.value)}
                            placeholder={t.f_name_ph}
                            className="w-full ps-10 pe-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#10B981] transition-colors" />
                        </div>
                        <div className="relative">
                          <Phone className="absolute top-1/2 -translate-y-1/2 start-3.5 w-4 h-4 text-gray-300" />
                          <input required type="tel" value={bookPhone} onChange={e => setBookPhone(e.target.value)}
                            placeholder={t.f_phone_ph}
                            className="w-full ps-10 pe-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#10B981] transition-colors" />
                        </div>
                        <div className="relative">
                          <Mail className="absolute top-1/2 -translate-y-1/2 start-3.5 w-4 h-4 text-gray-300" />
                          <input type="email" value={bookEmail} onChange={e => setBookEmail(e.target.value)}
                            placeholder={t.f_email_ph}
                            className="w-full ps-10 pe-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#10B981] transition-colors" />
                        </div>
                        {bookStatus === 'error' && <p className="text-red-500 text-xs text-center">{t.err}</p>}
                        <button type="submit" disabled={bookStatus === 'loading'}
                          className="w-full py-4 bg-[#10B981] text-white font-black text-base rounded-xl hover:bg-[#059669] transition-colors disabled:opacity-60 shadow-lg shadow-emerald-100">
                          {bookStatus === 'loading' ? t.submitting : t.submit + ' ←'}
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
              <div className="py-14 text-center border-2 border-dashed border-gray-100 rounded-3xl bg-white">
                <p className="text-4xl mb-3">☝️</p>
                <p className="text-gray-300 font-medium">{t.hint}</p>
              </div>
            )}
          </div>
        </section>

        {/* ═══ PLACEMENT TEST CTA ═══ */}
        <section className="py-20 px-5 bg-[#111827]">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-10 sm:p-14 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 start-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 end-0 w-48 h-48 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
              <div className="relative">
                <p className="text-5xl mb-5">🎯</p>
                <h2 className="text-3xl sm:text-4xl font-black mb-3">{t.test_h}</h2>
                <p className="text-emerald-100 mb-8 max-w-md mx-auto">{t.test_sub}</p>
                <Link href="/placement-test"
                  className="inline-block px-10 py-4 bg-white text-emerald-700 font-black text-lg rounded-2xl hover:bg-emerald-50 transition-colors shadow-xl">
                  {t.test_btn}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="bg-[#111827] text-white pt-16 pb-8 px-5 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            {/* Top: brand + links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
              {/* Brand */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-2.5 mb-4">
                  <Image src="/logo.png" alt="Be Fluent" width={40} height={40} className="rounded-xl" />
                  <span className="font-black text-xl">Be Fluent</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{t.footer.tagline}</p>
                {/* Social */}
                <div className="flex gap-3">
                  {t.footer.social.map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#10B981] flex items-center justify-center text-base transition-colors"
                      title={s.label}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Links: Learn */}
              <div>
                <h4 className="font-black text-sm mb-4 text-white">{t.footer.links.learn.title}</h4>
                <ul className="space-y-2.5">
                  {t.footer.links.learn.items.map((item, i) => (
                    <li key={i}>
                      <Link href={item.href} className="text-gray-400 text-sm hover:text-[#10B981] transition-colors">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Links: Account */}
              <div>
                <h4 className="font-black text-sm mb-4 text-white">{t.footer.links.account.title}</h4>
                <ul className="space-y-2.5">
                  {t.footer.links.account.items.map((item, i) => (
                    <li key={i}>
                      <Link href={item.href} className="text-gray-400 text-sm hover:text-[#10B981] transition-colors">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Links: Company */}
              <div>
                <h4 className="font-black text-sm mb-4 text-white">{t.footer.links.company.title}</h4>
                <ul className="space-y-2.5">
                  {t.footer.links.company.items.map((item, i) => (
                    <li key={i}>
                      <Link href={item.href} className="text-gray-400 text-sm hover:text-[#10B981] transition-colors">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                {/* WhatsApp CTA */}
                <a href={`https://api.whatsapp.com/send/?phone=${WA}`} target="_blank" rel="noopener noreferrer"
                  className="mt-5 flex items-center gap-2 px-4 py-2.5 bg-[#25D366] text-white rounded-xl font-bold text-sm hover:bg-[#1ebe5d] transition-colors w-fit">
                  💬 {lang === 'ar' ? 'واتساب مباشر' : 'WhatsApp'}
                </a>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-gray-500 text-sm">{t.footer.copy}</p>
              <button onClick={toggleLang} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#10B981] transition-colors font-medium">
                <Globe className="w-4 h-4" />{t.toggle}
              </button>
            </div>
          </div>
        </footer>
      </main>

      <FloatingContactButtons />
    </div>
  );
}
