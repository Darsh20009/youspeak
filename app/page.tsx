'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { Menu, X, CheckCircle, Tag } from "lucide-react";

const LEVELS = [
  {
    id: 'a1',
    emoji: '🌱',
    ar: 'مبتدئ',
    en: 'A1 – A2',
    desc: 'لم تتعلم الإنجليزية من قبل أو تعرف كلمات قليلة',
    pill: 'bg-sky-100 text-sky-700',
    ring: 'ring-sky-400 bg-sky-50',
    dot: 'bg-sky-500',
  },
  {
    id: 'b1',
    emoji: '📖',
    ar: 'أساسي',
    en: 'B1',
    desc: 'تفهم الجمل البسيطة وتريد تحسين محادثتك',
    pill: 'bg-emerald-100 text-emerald-700',
    ring: 'ring-emerald-400 bg-emerald-50',
    dot: 'bg-emerald-500',
  },
  {
    id: 'b2',
    emoji: '🚀',
    ar: 'متوسط',
    en: 'B2',
    desc: 'تتحدث الإنجليزية وتريد أن تصبح أكثر طلاقة',
    pill: 'bg-amber-100 text-amber-700',
    ring: 'ring-amber-400 bg-amber-50',
    dot: 'bg-amber-500',
  },
  {
    id: 'c1',
    emoji: '⭐',
    ar: 'متقدم',
    en: 'C1 – C2',
    desc: 'مستواك جيد وتريد الوصول للاحتراف التام',
    pill: 'bg-violet-100 text-violet-700',
    ring: 'ring-violet-400 bg-violet-50',
    dot: 'bg-violet-500',
  },
];

const PACKAGES = [
  {
    name: 'شهري',
    price: '1500',
    unit: 'جنيه / شهر',
    features: ['8 حصص مباشرة', 'متابعة يومية', 'دعم على واتساب'],
    popular: false,
    href: '/packages',
  },
  {
    name: 'فصلي',
    price: '3500',
    unit: 'جنيه / 3 أشهر',
    features: ['24 حصة مباشرة', 'متابعة يومية', 'دعم على واتساب', 'شهادة إتمام'],
    popular: true,
    href: '/packages',
  },
  {
    name: 'نصف سنوي',
    price: '6000',
    unit: 'جنيه / 6 أشهر',
    features: ['48 حصة مباشرة', 'متابعة يومية', 'دعم على واتساب', 'شهادة إتمام', 'اختبار مستوى مجاني'],
    popular: false,
    href: '/packages',
  },
];

const HOW = [
  { n: '١', title: 'اختر مستواك', desc: 'حدد مستواك الحالي في الإنجليزية' },
  { n: '٢', title: 'ابدأ حصتك التجريبية', desc: 'حصة مجانية مع معلم محترف' },
  { n: '٣', title: 'تعلم واستمتع', desc: 'حصص حية يومية ومتابعة مستمرة' },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [activeCoupons, setActiveCoupons] = useState<any[]>([]);
  const pricingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    fetch('/api/coupons/active')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setActiveCoupons(d); })
      .catch(() => {});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLevelClick = (id: string) => {
    setSelectedLevel(id);
    setTimeout(() => pricingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  };

  const selectedLevelData = LEVELS.find(l => l.id === selectedLevel);

  return (
    <div className="min-h-screen bg-white text-[#1F2937]" dir="rtl">

      {/* ════════════════════════ NAVBAR ════════════════════════ */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${scrolled ? 'bg-white border-b border-gray-100 shadow-sm' : 'bg-white/80 backdrop-blur-sm'}`}>
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Be Fluent" width={36} height={36} className="rounded-xl" priority />
            <span className="text-lg font-black text-[#1F2937]">Be Fluent</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/packages" className="text-sm font-semibold text-gray-500 hover:text-[#10B981] transition-colors">الباقات</Link>
            <Link href="/grammar" className="text-sm font-semibold text-gray-500 hover:text-[#10B981] transition-colors">القواعد</Link>
            <Link href="/auth/login" className="text-sm font-semibold text-gray-600 hover:text-[#10B981] transition-colors">دخول</Link>
            <Link href="/auth/register" className="px-5 py-2.5 bg-[#10B981] text-white text-sm font-bold rounded-2xl hover:bg-[#059669] transition-colors">
              ابدأ الآن
            </Link>
          </div>

          <button onClick={() => setMenuOpen(v => !v)} className="md:hidden p-2 text-gray-600">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-5 pb-5 pt-3 flex flex-col gap-3">
            <Link href="/packages" onClick={() => setMenuOpen(false)} className="py-3 font-semibold text-gray-700 border-b border-gray-50">الباقات</Link>
            <Link href="/grammar" onClick={() => setMenuOpen(false)} className="py-3 font-semibold text-gray-700 border-b border-gray-50">القواعد</Link>
            <Link href="/auth/login" onClick={() => setMenuOpen(false)} className="py-3 font-semibold text-gray-700">دخول</Link>
            <Link href="/auth/register" onClick={() => setMenuOpen(false)} className="mt-2 py-3.5 text-center bg-[#10B981] text-white font-bold rounded-2xl">ابدأ الآن</Link>
          </div>
        )}
      </header>

      <main className="pt-16">

        {/* ════════════════════════ HERO ════════════════════════ */}
        <section className="py-20 md:py-32 px-5 text-center max-w-3xl mx-auto">

          {activeCoupons.length > 0 && (
            <div className="inline-flex items-center gap-2 mb-8 bg-amber-50 text-amber-700 border border-amber-200 px-4 py-2 rounded-full text-sm font-bold">
              <Tag className="w-4 h-4" />
              خصم {activeCoupons[0].discount}% — كود: {activeCoupons[0].code}
            </div>
          )}

          <h1 className="text-5xl md:text-7xl font-black text-[#1F2937] leading-[1.1] mb-6">
            تعلم الإنجليزية<br />
            <span className="text-[#10B981]">بكل سهولة</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-500 mb-10 leading-relaxed">
            معلمون محترفون، حصص مباشرة، ومتابعة يومية<br />حتى تتحدث بثقة تامة
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register"
              className="px-10 py-4 bg-[#10B981] text-white font-black text-lg rounded-2xl hover:bg-[#059669] transition-colors shadow-lg shadow-emerald-100">
              ابدأ رحلتك الآن
            </Link>
            <a href="https://api.whatsapp.com/send/?phone=201091515594"
              target="_blank" rel="noopener noreferrer"
              className="px-10 py-4 border-2 border-gray-200 text-gray-700 font-bold text-lg rounded-2xl hover:border-[#10B981] hover:text-[#10B981] transition-colors">
              تحدث معنا
            </a>
          </div>
        </section>

        {/* Hero image strip */}
        <section className="max-w-4xl mx-auto px-5 pb-20">
          <div className="rounded-3xl overflow-hidden bg-gray-50 border border-gray-100">
            <Image
              src="/assets/hero-1.png"
              alt="Be Fluent - تعلم الإنجليزية"
              width={1200}
              height={600}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </section>

        {/* ════════════════════════ HOW IT WORKS ════════════════════════ */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-5">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-black text-[#1F2937] mb-3">كيف يعمل؟</h2>
              <p className="text-xl text-gray-500">ثلاث خطوات بسيطة وتبدأ رحلتك</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {HOW.map((step, i) => (
                <div key={i} className="bg-white rounded-3xl p-8 text-center border border-gray-100">
                  <div className="text-6xl font-black text-[#10B981] mb-4">{step.n}</div>
                  <h3 className="text-2xl font-black text-[#1F2937] mb-3">{step.title}</h3>
                  <p className="text-gray-500 text-lg leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════ LEVEL SELECTOR ════════════════════════ */}
        <section className="py-20 px-5">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-black text-[#1F2937] mb-3">ما هو مستواك؟</h2>
              <p className="text-xl text-gray-500">اختر مستواك وسنريك ما يناسبك</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {LEVELS.map(level => (
                <button
                  key={level.id}
                  onClick={() => handleLevelClick(level.id)}
                  className={`relative p-6 rounded-3xl border-2 text-center transition-all duration-200 cursor-pointer
                    ${selectedLevel === level.id
                      ? `ring-4 ring-offset-2 ${level.ring} border-transparent scale-[1.03] shadow-lg`
                      : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-md'
                    }`}
                >
                  {selectedLevel === level.id && (
                    <div className={`absolute top-3 left-3 w-3 h-3 rounded-full ${level.dot}`} />
                  )}
                  <div className="text-5xl mb-3">{level.emoji}</div>
                  <p className="text-xl font-black text-[#1F2937] mb-1">{level.ar}</p>
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${level.pill}`}>
                    {level.en}
                  </span>
                  <p className="text-sm text-gray-500 leading-snug">{level.desc}</p>
                </button>
              ))}
            </div>

            {/* Level result message */}
            {selectedLevelData && (
              <div className={`rounded-3xl p-8 text-center border-2 transition-all duration-300 ${selectedLevelData.ring} border-transparent`}>
                <div className="text-5xl mb-4">{selectedLevelData.emoji}</div>
                <h3 className="text-3xl font-black text-[#1F2937] mb-2">
                  اخترت مستوى {selectedLevelData.ar}
                </h3>
                <p className="text-xl text-gray-600 mb-6">{selectedLevelData.desc}</p>
                <p className="text-lg text-gray-500 mb-8">
                  لديك معلمون متخصصون في هذا المستوى وخطة مخصصة تناسبك تماماً
                </p>
                <Link href="/auth/register"
                  className="inline-block px-10 py-4 bg-[#10B981] text-white font-black text-xl rounded-2xl hover:bg-[#059669] transition-colors shadow-lg shadow-emerald-100">
                  ابدأ بمستوى {selectedLevelData.ar}
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* ════════════════════════ PRICING ════════════════════════ */}
        <section ref={pricingRef} className="py-20 bg-gray-50 px-5">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-black text-[#1F2937] mb-3">اختر باقتك</h2>
              <p className="text-xl text-gray-500">أسعار واضحة — بدون تعقيد</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PACKAGES.map((pkg, i) => (
                <div
                  key={i}
                  className={`rounded-3xl p-8 flex flex-col text-center transition-all duration-200
                    ${pkg.popular
                      ? 'bg-[#1F2937] text-white ring-4 ring-[#10B981] ring-offset-2 scale-[1.02]'
                      : 'bg-white border border-gray-100 hover:shadow-lg'
                    }`}
                >
                  {pkg.popular && (
                    <div className="mb-4">
                      <span className="bg-[#10B981] text-white text-sm font-bold px-4 py-1.5 rounded-full">
                        ⭐ الأكثر طلباً
                      </span>
                    </div>
                  )}

                  <h3 className={`text-2xl font-black mb-4 ${pkg.popular ? 'text-white' : 'text-[#1F2937]'}`}>
                    {pkg.name}
                  </h3>

                  <div className="mb-6">
                    <span className={`text-6xl font-black ${pkg.popular ? 'text-white' : 'text-[#10B981]'}`}>
                      {pkg.price}
                    </span>
                    <p className={`text-sm mt-1 ${pkg.popular ? 'text-white/60' : 'text-gray-400'}`}>{pkg.unit}</p>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1 text-right">
                    {pkg.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-3">
                        <CheckCircle className={`w-5 h-5 flex-shrink-0 ${pkg.popular ? 'text-[#10B981]' : 'text-[#10B981]'}`} />
                        <span className={`text-base ${pkg.popular ? 'text-white/90' : 'text-gray-600'}`}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/auth/register"
                    className={`block py-4 rounded-2xl font-black text-lg transition-colors
                      ${pkg.popular
                        ? 'bg-[#10B981] text-white hover:bg-[#059669]'
                        : 'bg-gray-100 text-[#1F2937] hover:bg-[#10B981] hover:text-white'
                      }`}>
                    اشترك الآن
                  </Link>
                </div>
              ))}
            </div>

            <p className="text-center text-gray-400 mt-8 text-base">
              جميع الباقات تشمل حصة تجريبية مجانية مع المعلم
            </p>
          </div>
        </section>

        {/* ════════════════════════ SIMPLE TRUST ════════════════════════ */}
        <section className="py-20 px-5">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-black text-[#1F2937] mb-3">لماذا Be Fluent؟</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { emoji: '👨‍🏫', title: 'معلمون محترفون', desc: 'معلمون مدربون ومتخصصون في تعليم الإنجليزية لجميع الأعمار' },
                { emoji: '📱', title: 'حصص مباشرة أونلاين', desc: 'تعلم من منزلك بدون تنقل، في أي وقت يناسبك' },
                { emoji: '💬', title: 'متابعة يومية على واتساب', desc: 'معلمك معك كل يوم للإجابة على أسئلتك ومتابعة تقدمك' },
                { emoji: '🏆', title: 'شهادات معتمدة', desc: 'احصل على شهادة إتمام المستوى عند انتهاء الباقة' },
              ].map((item, i) => (
                <div key={i} className="flex gap-5 items-start p-7 bg-gray-50 rounded-3xl">
                  <div className="text-5xl flex-shrink-0">{item.emoji}</div>
                  <div>
                    <h3 className="text-2xl font-black text-[#1F2937] mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-lg leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════ FINAL CTA ════════════════════════ */}
        <section className="py-20 px-5">
          <div className="max-w-2xl mx-auto text-center bg-[#10B981] rounded-3xl p-14">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              جاهز تبدأ؟
            </h2>
            <p className="text-white/80 text-xl mb-8">
              انضم لآلاف الطلاب الذين تعلموا الإنجليزية مع Be Fluent
            </p>
            <Link href="/auth/register"
              className="inline-block px-12 py-5 bg-white text-[#10B981] font-black text-xl rounded-2xl hover:bg-gray-100 transition-colors shadow-xl">
              ابدأ الآن مجاناً
            </Link>
          </div>
        </section>

        {/* ════════════════════════ FOOTER ════════════════════════ */}
        <footer className="border-t border-gray-100 py-10 px-5">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Be Fluent" width={32} height={32} className="rounded-lg" />
              <span className="font-black text-lg text-[#1F2937]">Be Fluent</span>
            </div>
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              {[
                { label: 'الباقات', href: '/packages' },
                { label: 'القواعد', href: '/grammar' },
                { label: 'الاستماع', href: '/listening' },
                { label: 'تسجيل الدخول', href: '/auth/login' },
              ].map((l, i) => (
                <Link key={i} href={l.href} className="text-gray-400 hover:text-[#10B981] font-medium transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
            <p className="text-gray-400 text-sm">© 2025 Be Fluent</p>
          </div>
        </footer>

      </main>

      <FloatingContactButtons />
    </div>
  );
}
