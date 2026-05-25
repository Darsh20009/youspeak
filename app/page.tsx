'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { Menu, X, ArrowLeft, Play, CheckCircle, ChevronDown, ChevronLeft, ChevronRight, Tag, Star } from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCoupons, setActiveCoupons] = useState<any[]>([]);
  const [siteSettings, setSiteSettings] = useState<any>(null);
  const [pageContent, setPageContent] = useState<Record<string, string>>({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [cmsHeroImages, setCmsHeroImages] = useState<{ src: string; alt: string }[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const defaultHeroImages = [
    { src: "/assets/hero-1.png", alt: "Be Fluent" },
    { src: "/assets/hero-2.png", alt: "Be Fluent" },
    { src: "/assets/hero-3.png", alt: "Be Fluent" },
    { src: "/assets/hero-4.png", alt: "Be Fluent" },
  ];

  const cms = (section: string, field: string, fallback: string): string =>
    pageContent[`${section}.${field}`] || fallback;

  useEffect(() => {
    setIsVisible(true);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });

    fetch('/api/coupons/active').then(r => r.json()).then(d => { if (Array.isArray(d)) setActiveCoupons(d); }).catch(() => {});
    fetch('/api/admin/settings').then(r => r.json()).then(d => { if (!d.error) setSiteSettings(d); }).catch(() => {});
    fetch('/api/admin/page-content?page=homepage').then(r => r.json()).then(items => {
      if (Array.isArray(items)) {
        const map: Record<string, string> = {};
        items.forEach((item: any) => { map[`${item.section}.${item.field}`] = item.value; });
        setPageContent(map);
        let imgs: { src: string; alt: string }[] = [];
        let i = 1;
        while (map[`hero_images.img${i}_src`]) {
          imgs.push({ src: map[`hero_images.img${i}_src`], alt: map[`hero_images.img${i}_alt`] || '' });
          i++;
        }
        if (imgs.length > 0) setCmsHeroImages(imgs);
      }
    }).catch(() => {});

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const heroImages = cmsHeroImages.length > 0 ? cmsHeroImages : defaultHeroImages;
  const totalSlides = heroImages.length + activeCoupons.length;

  const nextSlide = useCallback(() => setCurrentSlide(p => (p + 1) % totalSlides), [totalSlides]);
  const prevSlide = useCallback(() => setCurrentSlide(p => (p - 1 + totalSlides) % totalSlides), [totalSlides]);

  useEffect(() => {
    if (!isAutoPlaying || totalSlides === 0) return;
    const iv = setInterval(nextSlide, 5000);
    return () => clearInterval(iv);
  }, [isAutoPlaying, nextSlide, totalSlides]);

  const navLinks = [
    { label: "الرئيسية", href: "/" },
    { label: "باقاتنا", href: "/packages" },
    { label: "القواعد", href: "/grammar" },
    { label: "اعرف طريقك", href: "/about-path" },
  ];

  const features = [
    { en: "Live Sessions", ar: "حصص تفاعلية مباشرة", desc: "تعلم مع معلمين محترفين في بيئة حية.", num: "01" },
    { en: "Exclusive Content", ar: "محتوى تعليمي حصري", desc: "دروس وفيديوهات مصممة خصيصاً لك.", num: "02" },
    { en: "Smart Tests", ar: "اختبارات ذكية", desc: "قياس مستمر لضمان تقدمك الحقيقي.", num: "03" },
    { en: "Community", ar: "مجتمع داعم", desc: "آلاف الطلاب يتعلمون معك.", num: "04" },
    { en: "Certificates", ar: "شهادات معتمدة", desc: "شهادات تؤهلك للعمل والدراسة.", num: "05" },
    { en: "24/7 Support", ar: "دعم مستمر", desc: "نحن هنا معك في كل وقت.", num: "06" },
  ];

  const steps = [
    { ar: "تحديد الهدف", desc: "نحلل مستواك ونحدد أهدافك بدقة.", n: 1 },
    { ar: "الحصة التجريبية", desc: "تجربة حية مع معلم لتقييم مهاراتك.", n: 2 },
    { ar: "خطة مخصصة", desc: "منهج خاص يناسب وقتك وإيقاعك.", n: 3 },
    { ar: "نظام المعلمين المزدوج", desc: "معلم أساسي ومعلم متابع.", n: 4 },
    { ar: "قياس مستمر", desc: "اختبارات دورية تضمن تقدمك.", n: 5 },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#1F2937]" dir="rtl">

      {/* ── NAVBAR ─────────────────────────────────────────── */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl overflow-hidden">
              <Image src="/logo.png" alt="Be Fluent" width={36} height={36} className="object-contain w-full h-full" priority />
            </div>
            <div className="leading-none">
              <p className="font-black text-base text-[#1F2937]">Be Fluent</p>
              <p className="text-[9px] font-semibold text-[#10B981] tracking-widest uppercase">Fluency Comes First</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l, i) => (
              <Link key={i} href={l.href} className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-[#10B981] rounded-lg hover:bg-emerald-50 transition-all">{l.label}</Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/auth/login" className="text-sm font-semibold text-gray-600 hover:text-[#10B981] transition-colors px-3 py-2">دخول</Link>
            <Link href="/auth/register" className="px-5 py-2.5 bg-[#10B981] text-white text-sm font-bold rounded-xl hover:bg-[#059669] transition-colors shadow-md shadow-emerald-200/60">
              ابدأ الآن
            </Link>
          </div>

          {/* Mobile burger */}
          <button onClick={() => setMobileMenuOpen(v => !v)} className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-xl px-5 pb-6 pt-4 flex flex-col gap-2">
            {navLinks.map((l, i) => (
              <Link key={i} href={l.href} onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-4 text-base font-semibold text-gray-700 hover:text-[#10B981] rounded-xl hover:bg-emerald-50 transition-all">{l.label}</Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 pt-3 border-t border-gray-100">
              <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}
                className="py-3 text-center font-bold text-gray-700 bg-gray-100 rounded-xl">دخول</Link>
              <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}
                className="py-3 text-center font-bold text-white bg-[#10B981] rounded-xl shadow-md">ابدأ الآن</Link>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO — VIDEO BANNER ─────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] pt-16">

        {/* Video Background — replace src when video is ready */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          autoPlay muted loop playsInline
          poster="/assets/hero-1.png"
        >
          {/* <source src="/assets/hero-video.mp4" type="video/mp4" /> */}
        </video>

        {/* Dark overlay + green tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#10B981]/10 via-transparent to-transparent"></div>

        {/* Coupon badge (if active) */}
        {activeCoupons.length > 0 && (
          <div className="absolute top-20 right-5 z-20 flex items-center gap-2 bg-[#10B981] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
            <Tag className="w-4 h-4" />
            خصم {activeCoupons[0].discount}% — كود: {activeCoupons[0].code}
          </div>
        )}

        {/* Hero Content */}
        <div className={`relative z-10 text-center text-white px-5 max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          <p className="inline-block mb-6 text-xs font-bold tracking-[0.25em] uppercase text-[#10B981] border border-[#10B981]/40 px-4 py-1.5 rounded-full bg-[#10B981]/10">
            مستقبلك يبدأ هنا
          </p>

          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black leading-[1.05] mb-6 tracking-tight">
            {cms('hero', 'title_ar', 'تعلم الإنجليزية')}
            <br />
            <span className="text-[#10B981]">{cms('hero', 'title_en', 'Be Fluent')}</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/70 max-w-xl mx-auto mb-10 leading-relaxed font-medium">
            {cms('hero', 'subtitle_en', 'المنصة المتكاملة لتعلم اللغة الإنجليزية بأسلوب احترافي ومبتكر مع معلمين محترفين')}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link href="/auth/register"
              className="px-8 py-4 bg-[#10B981] text-white font-bold text-base rounded-2xl shadow-lg shadow-emerald-500/30 hover:bg-[#059669] transition-all hover:scale-[1.02] active:scale-[0.98]">
              {cms('hero', 'cta_text', 'ابدأ رحلتك الآن')}
            </Link>
            <a href={`https://api.whatsapp.com/send/?phone=${cms('contact', 'whatsapp', '201091515594')}`}
              target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 bg-white/10 border border-white/25 text-white font-bold text-base rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-all">
              تواصل معنا
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/40 animate-bounce">
          <span className="text-xs font-medium tracking-wide">اكتشف</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────── */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-5 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "+500", label: "طالب نشط" },
            { num: "+1000", label: "حصة مكتملة" },
            { num: "4", label: "مستويات تعليمية" },
            { num: "24/7", label: "دعم مستمر" },
          ].map((s, i) => (
            <div key={i}>
              <p className="text-3xl lg:text-4xl font-black text-[#10B981]">{s.num}</p>
              <p className="text-sm text-gray-500 font-medium mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES GRID ──────────────────────────────────── */}
      <section className="py-24 bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto px-5 lg:px-10">
          <div className="mb-16 text-center">
            <p className="text-sm font-bold text-[#10B981] tracking-widest uppercase mb-3">لماذا نحن؟</p>
            <h2 className="text-3xl md:text-5xl font-black text-[#1F2937] leading-tight">
              كل ما تحتاجه<br />
              <span className="text-[#10B981]">في مكان واحد</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => {
              const n = i + 1;
              const ar = cms('features', `feat${n}_title_ar`, f.ar);
              const desc = cms('features', `feat${n}_desc_ar`, f.desc);
              return (
                <div key={i} className="group bg-white rounded-3xl p-8 border border-gray-100 hover:border-[#10B981]/30 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-400 cursor-default">
                  <p className="text-5xl font-black text-gray-100 group-hover:text-[#10B981]/20 transition-colors mb-4 leading-none">{f.num}</p>
                  <h3 className="text-xs font-bold text-[#10B981] tracking-widest uppercase mb-1">{f.en}</h3>
                  <h4 className="text-xl font-black text-[#1F2937] mb-3">{ar}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── LEARNING PATH ──────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-16 items-start">

            {/* Left text */}
            <div className="lg:w-5/12">
              <p className="text-sm font-bold text-[#10B981] tracking-widest uppercase mb-4">رحلتك</p>
              <h2 className="text-3xl md:text-4xl font-black text-[#1F2937] leading-tight mb-6">
                نصمم لك<br />
                <span className="text-[#10B981]">طريقاً للنجاح</span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                لا نعلمك الإنجليزية فحسب — نحن نبني معك منهجاً كاملاً من الصفر حتى الاحتراف.
              </p>
              <Link href="/learning-path"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#10B981] text-white font-bold rounded-xl hover:bg-[#059669] transition-colors text-sm">
                استكشف الخريطة
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>

            {/* Right steps */}
            <div className="lg:w-7/12 space-y-4">
              {steps.map((s, i) => {
                const titleAr = cms('learning_path', `step${s.n}_title_ar`, s.ar);
                const desc = cms('learning_path', `step${s.n}_desc`, s.desc);
                return (
                  <div key={i} className="flex gap-5 items-start p-5 rounded-2xl border border-gray-100 hover:border-[#10B981]/30 hover:bg-emerald-50/30 transition-all group">
                    <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-[#10B981]/10 group-hover:bg-[#10B981] text-[#10B981] group-hover:text-white flex items-center justify-center font-black text-base transition-all">
                      {s.n}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1F2937] text-base mb-1">{titleAr}</h3>
                      <p className="text-gray-500 text-sm">{desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── IMAGE GALLERY ──────────────────────────────────── */}
      <section className="py-24 bg-[#0f172a] text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-sm font-bold text-[#10B981] tracking-widest uppercase mb-3">من داخل المنصة</p>
            <h2 className="text-3xl md:text-5xl font-black leading-tight">
              تجربة لا تُنسى<br />
              <span className="text-[#10B981]">في كل حصة</span>
            </h2>
          </div>

          {/* Carousel */}
          <div className="relative rounded-3xl overflow-hidden aspect-[16/9] max-w-3xl mx-auto bg-black/30 border border-white/10">
            {heroImages.map((img, idx) => (
              <div key={idx} className={`absolute inset-0 transition-opacity duration-700 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width:768px) 100vw, 768px"
                  priority={idx === 0}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  quality={85}
                />
              </div>
            ))}
            {activeCoupons.map((coupon, idx) => {
              const si = heroImages.length + idx;
              return (
                <div key={coupon.id} className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-600 to-teal-600 transition-opacity duration-700 ${si === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                  <Tag className="w-10 h-10 mb-4 text-white/70" />
                  <h3 className="text-2xl font-black mb-2">عرض خاص!</h3>
                  <div className="bg-white text-emerald-600 px-6 py-2 rounded-xl text-3xl font-black mb-3">{coupon.code}</div>
                  <p className="text-amber-300 font-bold text-xl">خصم {coupon.discount}%</p>
                </div>
              );
            })}

            {/* Controls */}
            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-[#10B981] transition-colors">
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-[#10B981] transition-colors">
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button key={idx} onClick={() => setCurrentSlide(idx)}
                  className={`rounded-full transition-all ${idx === currentSlide ? 'w-6 h-2 bg-[#10B981]' : 'w-2 h-2 bg-white/30 hover:bg-white/60'}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PACKAGES ───────────────────────────────────────── */}
      <section className="py-24 bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-[#10B981] tracking-widest uppercase mb-3">استثمر في مستقبلك</p>
            <h2 className="text-3xl md:text-5xl font-black text-[#1F2937]">اختر خطتك</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { n: 1, name: "الشهرية", price: "1500", lessons: "8", duration: "شهر", popular: false },
              { n: 2, name: "الفصلية", price: "3500", lessons: "24", duration: "3 أشهر", popular: true },
              { n: 3, name: "النصف سنوية", price: "6000", lessons: "48", duration: "6 أشهر", popular: false },
            ].map((pkg) => {
              const name = cms('packages', `pkg${pkg.n}_name`, pkg.name);
              const price = cms('packages', `pkg${pkg.n}_price`, pkg.price);
              const lessons = cms('packages', `pkg${pkg.n}_lessons`, pkg.lessons);
              const duration = cms('packages', `pkg${pkg.n}_duration`, pkg.duration);
              const popularStr = cms('packages', `pkg${pkg.n}_popular`, '');
              const isPopular = popularStr === 'true' || (popularStr === '' && pkg.popular);
              return (
                <div key={pkg.n} className={`relative rounded-3xl p-8 flex flex-col transition-all duration-300 ${isPopular
                  ? 'bg-[#1F2937] text-white shadow-2xl scale-[1.02] ring-2 ring-[#10B981]'
                  : 'bg-white text-[#1F2937] border border-gray-100 hover:border-[#10B981]/30 hover:shadow-xl'}`}>
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#10B981] text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" /> الأكثر طلباً
                    </div>
                  )}
                  <h3 className={`text-xl font-black mb-6 ${isPopular ? 'text-white' : 'text-[#1F2937]'}`}>{name}</h3>
                  <div className="mb-8">
                    <span className={`text-5xl font-black ${isPopular ? 'text-white' : 'text-[#10B981]'}`}>{price}</span>
                    <span className={`text-base font-medium mr-1 ${isPopular ? 'text-white/60' : 'text-gray-400'}`}> جنيه</span>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {[`${lessons} حصة`, duration, "دعم فني كامل"].map((f, fi) => (
                      <li key={fi} className="flex items-center gap-2 text-sm font-medium">
                        <CheckCircle className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                        <span className={isPopular ? 'text-white/80' : 'text-gray-600'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/packages"
                    className={`text-center py-3.5 rounded-xl font-bold text-sm transition-all ${isPopular
                      ? 'bg-[#10B981] text-white hover:bg-[#059669]'
                      : 'bg-[#10B981]/10 text-[#10B981] hover:bg-[#10B981] hover:text-white'}`}>
                    اشترك الآن
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ────────────────────────────────────── */}
      <section className="py-24 bg-[#10B981] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-white blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-5 text-center text-white">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-5">
            {cms('cta', 'title', 'جاهز لبدء رحلتك؟')}
          </h2>
          <p className="text-white/80 text-lg mb-10 leading-relaxed">
            {cms('cta', 'subtitle', 'انضم لآلاف الطلاب الذين غيروا حياتهم مع Be Fluent')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register"
              className="px-10 py-4 bg-white text-[#10B981] font-black rounded-2xl hover:bg-gray-100 transition-colors shadow-lg text-base">
              {cms('cta', 'button_text', 'سجل مجاناً الآن')}
            </Link>
            <Link href="/packages"
              className="px-10 py-4 bg-white/15 border border-white/30 text-white font-bold rounded-2xl hover:bg-white/25 transition-colors text-base">
              تصفح الباقات
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="bg-[#0f172a] text-white py-14">
        <div className="max-w-6xl mx-auto px-5 lg:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-10">

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden border border-[#10B981]/30">
                <Image src="/logo.png" alt="Be Fluent" width={48} height={48} className="object-contain" loading="lazy" />
              </div>
              <div>
                <p className="text-xl font-black">Be Fluent</p>
                <p className="text-xs text-gray-500">Fluency Comes First</p>
              </div>
            </div>

            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              {[
                { label: "الباقات", href: "/packages" },
                { label: "القواعد", href: "/grammar" },
                { label: "الاستماع", href: "/listening" },
                { label: "فيسبوك", href: cms('contact', 'facebook', '#'), external: true },
                { label: "إنستغرام", href: cms('contact', 'instagram', '#'), external: true },
                { label: "تسجيل الدخول", href: "/auth/login" },
              ].map((l, i) =>
                l.external ? (
                  <a key={i} href={l.href} target="_blank" rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#10B981] transition-colors text-sm font-medium">{l.label}</a>
                ) : (
                  <Link key={i} href={l.href}
                    className="text-gray-400 hover:text-[#10B981] transition-colors text-sm font-medium">{l.label}</Link>
                )
              )}
            </nav>
          </div>

          <div className="border-t border-white/5 pt-8 text-center text-gray-600 text-sm">
            © 2025 Be Fluent. جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>

      <FloatingContactButtons />
    </div>
  );
}
