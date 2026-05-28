'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import FloatingContactButtons from "@/components/FloatingContactButtons";

/* ─────────────── Types ─────────────── */
type RegStep = 'name' | 'contact' | 'password' | 'details' | 'package' | 'payment' | 'done';
const REG_STEPS: RegStep[] = ['name','contact','password','details','package','payment','done'];

/* ─────────────── Level Data ─────────────── */
const LEVELS = {
  ar: [
    { code:'A1', name:'مبتدئ', tagline:'تبدأ من الصفر بثقة',
      desc:'ما تعرفش أي كلمة إنجليزي؟ هنبدأ معاك من الحرف الأول حتى تتكلم في المواقف اليومية البسيطة.',
      skills:['النطق الصحيح للحروف','200+ مفردة يومية','جمل التعارف والتحية','الأرقام والتواريخ'],
      sessions:'٤ حصص / شهر', price:'349', duration:'٣ أشهر',
      gradient:'linear-gradient(135deg,#64748b,#475569)', glow:'rgba(100,116,139,0.4)', accent:'#94a3b8',
      result:'بعد ٣ أشهر تقدر تعرّف بنفسك وتتكلم في الأماكن العامة' },
    { code:'A2', name:'أساسي', tagline:'تفهم وتتفاهم يومياً',
      desc:'بتعرف شوية كلمات بس مش قادر تكمّل جملة؟ هنبني ثقتك وتتكلم في التسوق والسفر.',
      skills:['المحادثة اليومية بثقة','الأزمنة الأساسية','التسوق والسفر','500+ مفردة عملية'],
      sessions:'٤ حصص / شهر', price:'399', duration:'٣ أشهر',
      gradient:'linear-gradient(135deg,#3b82f6,#2563eb)', glow:'rgba(59,130,246,0.4)', accent:'#60a5fa',
      result:'بعد ٣ أشهر تتكلم مع الأجانب في المواقف اليومية' },
    { code:'B1', name:'متوسط', tagline:'تعبّر عن أفكارك بطلاقة',
      desc:'بتتكلم بس بتوقف كتير وبتلخبط؟ المستوى ده هيخليك تعبر عن أفكارك كاملة بدون توقف.',
      skills:['محادثة طليقة بدون توقف','القواعد المتقدمة','الكتابة الاحترافية','التعبير عن الرأي'],
      sessions:'٨ حصص / شهر', price:'599', duration:'٤ أشهر',
      gradient:'linear-gradient(135deg,#10b981,#059669)', glow:'rgba(16,185,129,0.4)', accent:'#34d399',
      result:'بعد ٤ أشهر تتكلم في الاجتماعات وتكتب إيميلات احترافية' },
    { code:'B2', name:'متقدم', tagline:'تتكلم في بيئة العمل',
      desc:'بتتكلم كويس بس عايز تتقدم في شغلك؟ هنرفع مستواك للإنجليزية المهنية والأكاديمية.',
      skills:['الإنجليزية المهنية','العروض والاجتماعات','الكتابة الأكاديمية','مصطلحات التخصص'],
      sessions:'٨ حصص / شهر', price:'699', duration:'٤ أشهر',
      gradient:'linear-gradient(135deg,#14b8a6,#0d9488)', glow:'rgba(20,184,166,0.4)', accent:'#2dd4bf',
      result:'بعد ٤ أشهر تشتغل في بيئة إنجليزية بكل سهولة' },
    { code:'C1', name:'احترافي', tagline:'إتقان كامل — زي أهل اللغة',
      desc:'هدفك IELTS أو شركة دولية أو دراسة بره؟ المستوى ده القمة — هتتكلم وتفكر بالإنجليزية.',
      skills:['تحضير IELTS/TOEFL','مقابلات العمل والـ CV','الخطابة والتفاوض','اللكنة الطبيعية'],
      sessions:'١٦ حصة / شهر', price:'999', duration:'٦ أشهر',
      gradient:'linear-gradient(135deg,#a855f7,#7c3aed)', glow:'rgba(168,85,247,0.4)', accent:'#c084fc',
      result:'بعد ٦ أشهر تحصل على IELTS 7+ أو تشتغل في أي شركة دولية' },
  ],
  en: [
    { code:'A1', name:'Beginner', tagline:'Start from zero with confidence',
      desc:"Don't know any English? We start from the first letter until you can speak in simple daily situations.",
      skills:['Correct pronunciation','200+ basic vocabulary','Introductions & greetings','Numbers & dates'],
      sessions:'4 sessions/month', price:'349', duration:'3 months',
      gradient:'linear-gradient(135deg,#64748b,#475569)', glow:'rgba(100,116,139,0.4)', accent:'#94a3b8',
      result:'After 3 months you can introduce yourself and speak in public' },
    { code:'A2', name:'Elementary', tagline:'Understand & communicate daily',
      desc:"Know a few words but can't form full sentences? We'll build your confidence to speak while shopping & traveling.",
      skills:['Daily conversation','Basic tenses','Shopping & travel','500+ vocabulary'],
      sessions:'4 sessions/month', price:'399', duration:'3 months',
      gradient:'linear-gradient(135deg,#3b82f6,#2563eb)', glow:'rgba(59,130,246,0.4)', accent:'#60a5fa',
      result:'After 3 months you can talk with foreigners in daily situations' },
    { code:'B1', name:'Intermediate', tagline:'Express your thoughts fluently',
      desc:"You speak but stop a lot? This level makes you express complete thoughts without pausing.",
      skills:['Fluent conversation','Advanced grammar','Professional writing','Expressing opinions'],
      sessions:'8 sessions/month', price:'599', duration:'4 months',
      gradient:'linear-gradient(135deg,#10b981,#059669)', glow:'rgba(16,185,129,0.4)', accent:'#34d399',
      result:'After 4 months you speak in meetings and write professional emails' },
    { code:'B2', name:'Advanced', tagline:'Perform in professional settings',
      desc:"You speak well but want to advance your career? We'll take your English to a professional level.",
      skills:['Business English','Presentations & meetings','Academic writing','Field terminology'],
      sessions:'8 sessions/month', price:'699', duration:'4 months',
      gradient:'linear-gradient(135deg,#14b8a6,#0d9488)', glow:'rgba(20,184,166,0.4)', accent:'#2dd4bf',
      result:'After 4 months you work in an English environment with ease' },
    { code:'C1', name:'Mastery', tagline:'Full mastery — like a native',
      desc:"Targeting IELTS, a multinational, or studying abroad? This is the peak — you'll speak and think in English.",
      skills:['IELTS/TOEFL prep','Job interviews & CV','Public speaking','Natural accent'],
      sessions:'16 sessions/month', price:'999', duration:'6 months',
      gradient:'linear-gradient(135deg,#a855f7,#7c3aed)', glow:'rgba(168,85,247,0.4)', accent:'#c084fc',
      result:'After 6 months you score IELTS 7+ or work at any international company' },
  ],
};
const CODES = ['A1','A2','B1','B2','C1'];

/* ─────────────── Registration Modal ─────────────── */
function RegisterModal({ onClose, isAr }: { onClose: () => void; isAr: boolean }) {
  const router = useRouter();
  const [step, setStep] = useState<RegStep>('name');
  const [packages, setPackages] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name:'', email:'', phone:'', password:'', confirmPassword:'',
    age:'', goal:'', preferredTime:'', packageId:'', receiptUrl:'',
  });

  useEffect(() => {
    fetch('/api/packages').then(r=>r.json()).then(d=>setPackages(Array.isArray(d)?d:[])).catch(()=>{});
  }, []);

  const stepIdx = REG_STEPS.indexOf(step);
  const progress = (stepIdx / (REG_STEPS.length - 1)) * 100;

  const set = (k: keyof typeof form, v: string) => setForm(f => ({...f, [k]: v}));

  const validate = (): boolean => {
    setError('');
    if (step === 'name') {
      if (form.name.trim().length < 2) { setError(isAr ? 'أدخل اسمك الكامل' : 'Enter your full name'); return false; }
    }
    if (step === 'contact') {
      if (!form.email.trim() && !form.phone.trim()) { setError(isAr ? 'أدخل البريد الإلكتروني أو رقم الواتساب' : 'Enter email or WhatsApp number'); return false; }
      if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setError(isAr ? 'البريد الإلكتروني غير صحيح' : 'Invalid email'); return false; }
    }
    if (step === 'password') {
      if (form.password.length < 6) { setError(isAr ? 'كلمة المرور 6 أحرف على الأقل' : 'Password must be at least 6 characters'); return false; }
      if (form.password !== form.confirmPassword) { setError(isAr ? 'كلمتا المرور غير متطابقتان' : "Passwords don't match"); return false; }
    }
    if (step === 'details') {
      if (!form.age || parseInt(form.age) < 5) { setError(isAr ? 'أدخل عمرك' : 'Enter your age'); return false; }
      if (!form.goal.trim()) { setError(isAr ? 'أدخل هدفك من تعلم الإنجليزية' : 'Enter your goal'); return false; }
      if (!form.preferredTime) { setError(isAr ? 'اختر وقت الدراسة المفضل' : 'Choose preferred study time'); return false; }
    }
    if (step === 'package') {
      if (!form.packageId) { setError(isAr ? 'اختر باقة' : 'Choose a package'); return false; }
    }
    if (step === 'payment') {
      if (!form.receiptUrl) { setError(isAr ? 'ارفع صورة إيصال الدفع' : 'Upload payment receipt'); return false; }
    }
    return true;
  };

  const handleNext = async () => {
    if (!validate()) return;
    if (step === 'payment') { await handleSubmit(); return; }
    const next = REG_STEPS[stepIdx + 1];
    if (next) setStep(next);
  };

  const handleSubmit = async () => {
    setLoading(true); setError('');
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase() || undefined,
        password: form.password,
        phone: form.phone.replace(/\s/g,'') || undefined,
        age: parseInt(form.age),
        goal: form.goal.trim(),
        preferredTime: form.preferredTime,
        packageId: form.packageId,
        receiptUrl: form.receiptUrl,
      };
      const res = await fetch('/api/auth/register', {
        method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      const id = form.email.trim().toLowerCase() || form.phone.replace(/\s/g,'');
      const signResult = await signIn('credentials', { emailOrPhone: id, password: form.password, redirect: false });
      if (signResult?.ok) { router.push('/dashboard/student'); } else { setStep('done'); }
    } catch (e:any) { setError(e.message); }
    finally { setLoading(false); }
  };

  const handleUpload = async (file: File) => {
    setUploading(true); setError('');
    try {
      const fd = new FormData(); fd.append('file', file);
      const res = await fetch('/api/upload/receipt', { method:'POST', body: fd });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      set('receiptUrl', data.url);
    } catch { setError(isAr ? 'فشل رفع الملف، حاول مرة أخرى' : 'Upload failed, please try again'); }
    finally { setUploading(false); }
  };

  const stepContent = () => {
    switch (step) {
      case 'name': return (
        <div className="space-y-5">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl">👋</div>
            <h3 className="text-xl font-black text-gray-900">{isAr ? 'مرحباً بك! لنبدأ' : 'Welcome! Let\'s Start'}</h3>
            <p className="text-gray-400 text-sm mt-1">{isAr ? 'أدخل اسمك الكامل' : 'Enter your full name'}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1.5">{isAr ? 'الاسم الكامل' : 'Full Name'}</label>
            <input autoFocus value={form.name} onChange={e=>set('name',e.target.value)}
              onKeyDown={e=>e.key==='Enter'&&handleNext()}
              placeholder={isAr ? 'مثال: أحمد محمد علي' : 'e.g. Ahmed Mohamed'}
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 text-base" />
          </div>
        </div>
      );

      case 'contact': return (
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-2xl">📱</div>
            <h3 className="text-xl font-black text-gray-900">{isAr ? `أهلاً ${form.name.split(' ')[0]}!` : `Hi ${form.name.split(' ')[0]}!`}</h3>
            <p className="text-gray-400 text-sm mt-1">{isAr ? 'كيف نتواصل معك؟' : 'How can we reach you?'}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1.5">{isAr ? 'البريد الإلكتروني' : 'Email'}</label>
            <input type="email" value={form.email} onChange={e=>set('email',e.target.value)}
              placeholder="example@gmail.com"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 text-base" />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-sm font-medium">{isAr ? 'أو' : 'or'}</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1.5">{isAr ? 'رقم الواتساب' : 'WhatsApp Number'}</label>
            <input type="tel" value={form.phone} onChange={e=>set('phone',e.target.value)}
              placeholder="+201xxxxxxxxx"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 text-base" />
          </div>
        </div>
      );

      case 'password': return (
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-2xl">🔐</div>
            <h3 className="text-xl font-black text-gray-900">{isAr ? 'أنشئ كلمة مرور' : 'Create a Password'}</h3>
            <p className="text-gray-400 text-sm mt-1">{isAr ? '٦ أحرف على الأقل' : 'At least 6 characters'}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1.5">{isAr ? 'كلمة المرور' : 'Password'}</label>
            <input type="password" value={form.password} onChange={e=>set('password',e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 text-base" />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1.5">{isAr ? 'تأكيد كلمة المرور' : 'Confirm Password'}</label>
            <input type="password" value={form.confirmPassword} onChange={e=>set('confirmPassword',e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 text-base" />
          </div>
        </div>
      );

      case 'details': return (
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-2xl">🎯</div>
            <h3 className="text-xl font-black text-gray-900">{isAr ? 'أخبرنا عنك' : 'Tell Us About You'}</h3>
            <p className="text-gray-400 text-sm mt-1">{isAr ? 'لتخصيص خطتك' : 'To customize your plan'}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1.5">{isAr ? 'عمرك' : 'Your Age'}</label>
            <input type="number" value={form.age} onChange={e=>set('age',e.target.value)}
              placeholder="18" min="5" max="100"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 text-base" />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1.5">{isAr ? 'هدفك من تعلم الإنجليزية' : 'Your Goal'}</label>
            <textarea value={form.goal} onChange={e=>set('goal',e.target.value)} rows={2}
              placeholder={isAr ? 'مثال: أريد تحسين إنجليزيتي للعمل...' : 'e.g. I want to improve my English for work...'}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 text-sm resize-none" />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">{isAr ? 'وقت الدراسة المفضل' : 'Preferred Study Time'}</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { v:'morning', ar:'صباحاً', en:'Morning', e:'🌅' },
                { v:'afternoon', ar:'ظهراً', en:'Afternoon', e:'☀️' },
                { v:'evening', ar:'مساءً', en:'Evening', e:'🌆' },
                { v:'flexible', ar:'مرن', en:'Flexible', e:'🔄' },
              ].map(o => (
                <button key={o.v} type="button" onClick={()=>set('preferredTime',o.v)}
                  className={`p-3 rounded-xl border-2 text-center transition-all ${form.preferredTime===o.v ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <div className="text-xl mb-1">{o.e}</div>
                  <div className={`text-xs font-bold ${form.preferredTime===o.v ? 'text-emerald-700' : 'text-gray-600'}`}>{isAr ? o.ar : o.en}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      );

      case 'package': return (
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-2xl">💎</div>
            <h3 className="text-xl font-black text-gray-900">{isAr ? 'اختر باقتك' : 'Choose Your Package'}</h3>
            <p className="text-gray-400 text-sm mt-1">{isAr ? 'كل الباقات تشمل متابعة يومية + شهادة' : 'All plans include daily follow-up + certificate'}</p>
          </div>
          {packages.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <div className="animate-spin w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto mb-2" />
              {isAr ? 'جاري التحميل...' : 'Loading...'}
            </div>
          ) : (
            <div className="space-y-2.5 max-h-64 overflow-y-auto">
              {packages.map((pkg:any) => (
                <button key={pkg.id} type="button" onClick={()=>set('packageId',pkg.id)}
                  className={`w-full p-4 rounded-xl border-2 text-start transition-all flex justify-between items-center ${form.packageId===pkg.id ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{isAr ? pkg.titleAr : pkg.title}</div>
                    {pkg.lessonsCount && <div className="text-xs text-gray-400 mt-0.5">{pkg.lessonsCount} {isAr ? 'درس' : 'lessons'}</div>}
                  </div>
                  <div className={`text-lg font-black ${form.packageId===pkg.id ? 'text-emerald-600' : 'text-gray-700'}`}>
                    {pkg.price} <span className="text-xs font-medium text-gray-400">EGP</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      );

      case 'payment': return (
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-2xl">💳</div>
            <h3 className="text-xl font-black text-gray-900">{isAr ? 'أكمل الدفع' : 'Complete Payment'}</h3>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center">
            <p className="text-emerald-800 font-bold text-sm mb-1">{isAr ? 'حوّل المبلغ على:' : 'Transfer to:'}</p>
            <p className="text-emerald-700 font-black text-lg">+20 10 91515594</p>
            <div className="flex justify-center gap-2 mt-2 flex-wrap">
              {['Vodafone Cash','Etisalat Cash','InstaPay'].map(m=>(
                <span key={m} className="text-xs bg-white text-gray-600 border border-gray-200 px-2.5 py-1 rounded-full">{m}</span>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">{isAr ? 'ارفع صورة الإيصال' : 'Upload Receipt Image'}</label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-emerald-400 transition-colors">
              <input type="file" className="hidden" accept="image/*" onChange={e=>{ const f=e.target.files?.[0]; if(f) handleUpload(f); }} />
              {uploading ? (
                <div className="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full" />
              ) : form.receiptUrl ? (
                <div className="text-center">
                  <div className="text-3xl mb-1">✅</div>
                  <p className="text-emerald-600 font-bold text-sm">{isAr ? 'تم رفع الإيصال' : 'Receipt uploaded'}</p>
                  <p className="text-xs text-gray-400">{isAr ? 'انقر للتغيير' : 'Click to change'}</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-3xl mb-2">📤</div>
                  <p className="text-gray-500 text-sm font-medium">{isAr ? 'انقر لرفع الإيصال' : 'Click to upload receipt'}</p>
                  <p className="text-xs text-gray-400 mt-1">{isAr ? 'صورة PNG أو JPG' : 'PNG or JPG image'}</p>
                </div>
              )}
            </label>
          </div>
          {loading && (
            <div className="text-center text-sm text-emerald-600 animate-pulse font-medium">
              {isAr ? '⏳ جاري معالجة طلبك...' : '⏳ Processing your request...'}
            </div>
          )}
        </div>
      );

      case 'done': return (
        <div className="text-center space-y-4 py-4">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-emerald-100 flex items-center justify-center text-4xl">🎉</div>
          <h3 className="text-2xl font-black text-gray-900">{isAr ? 'تم التسجيل بنجاح!' : 'Registration Complete!'}</h3>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
            {isAr
              ? 'شكراً لتسجيلك! نراجع إيصال دفعك الآن وهنفعّل حسابك خلال 24 ساعة ونتواصل معاك على واتساب.'
              : 'Thank you for registering! We are reviewing your payment receipt and will activate your account within 24 hours and contact you on WhatsApp.'}
          </p>
          <button onClick={onClose}
            className="w-full py-3.5 rounded-xl bg-[#10B981] text-white font-bold text-sm hover:bg-emerald-600 transition">
            {isAr ? 'حسناً، أنتظر التفعيل' : 'OK, I\'ll wait for activation'}
          </button>
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        {step !== 'done' && (
          <div className="px-6 pt-5 pb-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <button onClick={step === 'name' ? onClose : () => setStep(REG_STEPS[stepIdx-1])}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition text-gray-400 hover:text-gray-700 text-lg">
                {isAr ? '←' : '→'}
              </button>
              <div className="flex items-center gap-2">
                <Image src="/logo.png" alt="Be Fluent" width={22} height={22} className="rounded-lg" style={{ height:'auto' }} />
                <span className="font-black text-gray-900 text-sm">Be Fluent</span>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition text-gray-400 hover:text-gray-700 text-lg">×</button>
            </div>
            {/* Progress */}
            <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
              <span>{isAr ? `الخطوة ${stepIdx+1} من ${REG_STEPS.length-1}` : `Step ${stepIdx+1} of ${REG_STEPS.length-1}`}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#10B981] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-start gap-2">
              <span className="flex-shrink-0">⚠️</span> {error}
            </div>
          )}
          {stepContent()}
        </div>

        {/* Footer */}
        {step !== 'done' && (
          <div className="px-6 pb-5 pt-3 border-t border-gray-100">
            <button onClick={handleNext} disabled={loading || uploading}
              className="w-full py-3.5 rounded-xl bg-[#10B981] text-white font-black text-base hover:bg-emerald-600 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {loading ? (
                <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>{isAr ? 'التالي' : 'Next'} {isAr ? '←' : '→'}</>
              )}
            </button>
            <p className="text-center text-xs text-gray-400 mt-3">
              {isAr ? 'لديك حساب؟ ' : 'Have an account? '}
              <Link href="/auth/login" onClick={onClose} className="text-[#10B981] font-bold hover:underline">
                {isAr ? 'سجّل دخولك' : 'Sign in'}
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────── Main Page ─────────────── */
export default function HomePage() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [activeCode, setActiveCode] = useState<string | null>('B1');
  const [showReg, setShowReg] = useState(false);
  const isAr = lang === 'ar';
  const levels = LEVELS[lang];
  const active = levels.find(l => l.code === activeCode) ?? null;
  const activeIdx = active ? CODES.indexOf(active.code) : -1;

  // Prevent body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = showReg ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showReg]);

  const openReg = useCallback(() => setShowReg(true), []);

  return (
    <div dir={isAr ? 'rtl' : 'ltr'} className="min-h-screen bg-white text-gray-900 font-sans">
      <FloatingContactButtons />
      {showReg && <RegisterModal onClose={() => setShowReg(false)} isAr={isAr} />}

      {/* ════ NAVBAR ════ */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Be Fluent" width={36} height={36} className="rounded-xl" style={{ height:'auto' }} />
            <span className="font-black text-lg tracking-tight">Be Fluent</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={() => setLang(isAr ? 'en' : 'ar')}
              className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition font-medium">
              {isAr ? 'EN' : 'عربي'}
            </button>
            <Link href="/auth/login" className="text-sm font-semibold text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition">
              {isAr ? 'دخول' : 'Login'}
            </Link>
            <button onClick={openReg}
              className="text-sm font-bold bg-[#10B981] text-white px-4 py-2 rounded-xl hover:bg-emerald-600 transition shadow-sm shadow-emerald-200">
              {isAr ? 'ابدأ مجاناً' : 'Start Free'}
            </button>
          </div>
        </div>
      </nav>

      {/* ════ HERO ════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-emerald-50/30 to-white pt-16 pb-20">
        <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-teal-100/30 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {isAr ? '✅ أكثر من 5,000 طالب وصلوا للطلاقة' : '✅ 5,000+ students reached fluency'}
              </div>

              <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight mb-5">
                {isAr ? (
                  <>من <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-teal-500">المبتدئ</span> إلى<br />الطلاقة التامة<br /><span className="text-2xl sm:text-3xl font-bold text-gray-500">مع معلم خاص يتابعك يومياً</span></>
                ) : (
                  <>From <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-teal-500">Beginner</span> to<br />Full Fluency<br /><span className="text-2xl sm:text-3xl font-bold text-gray-500">with a personal teacher following you daily</span></>
                )}
              </h1>

              <p className="text-gray-500 text-base leading-relaxed mb-8">
                {isAr
                  ? 'Be Fluent مش مجرد كورس — هو نظام تعليمي كامل. حصص خاصة ١:١ + متابعة يومية على واتساب + خطة مخصصة لهدفك.'
                  : "Be Fluent isn't just a course — it's a complete learning system. 1:1 private sessions + daily WhatsApp follow-up + a custom plan for your goal."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                {(isAr
                  ? ['حصص خاصة 1:1 مع معلمك','متابعة يومية على واتساب','تمارين وواجبات مخصصة','لوحة تحكم تتبع تقدمك','شهادة إتمام معتمدة','دعم فني 24/7']
                  : ['1:1 private sessions','Daily WhatsApp follow-up','Custom exercises & homework','Progress tracking dashboard','Accredited certificate','24/7 support']
                ).map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                      <svg width="8" height="7" viewBox="0 0 8 7" fill="none"><path d="M1 3.5L3 5.5L7 1.5" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={openReg}
                  className="w-full sm:w-auto text-center bg-[#10B981] text-white font-bold px-8 py-4 rounded-2xl hover:bg-emerald-600 transition shadow-lg shadow-emerald-200/60 text-base">
                  {isAr ? 'احجز حصتك التجريبية مجاناً' : 'Book Your Free Trial'}
                </button>
                <Link href="/placement-test"
                  className="w-full sm:w-auto text-center border-2 border-gray-200 text-gray-700 font-semibold px-8 py-4 rounded-2xl hover:bg-gray-50 transition text-base">
                  🎯 {isAr ? 'اختبر مستواك مجاناً' : 'Test Your Level Free'}
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {(isAr
                  ? [{ n:'5,000+', l:'طالب تخرّج بنجاح' },{ n:'4.9 ⭐', l:'تقييم الطلاب على Google' }]
                  : [{ n:'5,000+', l:'Graduates' },{ n:'4.9 ⭐', l:'Student rating on Google' }]
                ).map((s,i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
                    <div className="text-3xl font-black text-gray-900">{s.n}</div>
                    <div className="text-xs text-gray-400 mt-1 leading-tight">{s.l}</div>
                  </div>
                ))}
              </div>
              {(isAr
                ? [
                    { name:'أحمد', from:'A1', to:'C1', q:'في سنة واحدة بقيت أتكلم إنجليزي في الشغل بطلاقة. المتابعة اليومية هي السر.' },
                    { name:'سارة', from:'B1', to:'IELTS 7.5', q:'جبت 7.5 في IELTS بعد ٦ أشهر مع Be Fluent. أنصح كل واحد.' },
                  ]
                : [
                    { name:'Ahmed', from:'A1', to:'C1', q:'In one year I was speaking English fluently at work. Daily follow-up is the key.' },
                    { name:'Sara', from:'B1', to:'IELTS 7.5', q:'Got 7.5 in IELTS after 6 months with Be Fluent. Highly recommended.' },
                  ]
              ).map((r,i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex mb-2">
                    {[...Array(5)].map((_,j)=>(
                      <svg key={j} className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm mb-3">"{r.q}"</p>
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

      {/* ════ HOW IT WORKS ════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#10B981] bg-emerald-50 border border-emerald-100 px-4 py-1.5 rounded-full mb-4">
              {isAr ? 'كيف يشتغل Be Fluent؟' : 'How Be Fluent Works'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
              {isAr ? '٣ خطوات توصّلك للطلاقة' : '3 Steps to Fluency'}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {(isAr ? [
              { n:'١', icon:'🎯', title:'اعرف مستواك', desc:'خذ اختبار المستوى المجاني — في ١٥ دقيقة يحدد بدقة إنت عند إيه وإيه اللي تبدأ بيه.', tag:'مجاني تماماً' },
              { n:'٢', icon:'👨‍🏫', title:'ابدأ مع معلمك الخاص', desc:'بنربطك بمعلم متخصص. مش كلاس جماعي — حصة خاصة ١:١ معلمك وإنت بس.', tag:'حصة تجريبية مجانية' },
              { n:'٣', icon:'📈', title:'متابعة يومية', desc:'معلمك بيبعتلك تمارين على واتساب كل يوم ويصحح ويجاوب على أسئلتك.', tag:'واتساب يومي' },
            ] : [
              { n:'1', icon:'🎯', title:'Discover Your Level', desc:'Take the free level test — in 15 minutes it accurately tells you where you are and what to start with.', tag:'Completely Free' },
              { n:'2', icon:'👨‍🏫', title:'Start with Your Teacher', desc:"We match you with a specialist teacher. Not a group class — a 1:1 private session just you and your teacher.", tag:'Free Trial Session' },
              { n:'3', icon:'📈', title:'Daily Follow-up', desc:'Your teacher sends you exercises on WhatsApp every day, corrects your work, and answers your questions.', tag:'Daily WhatsApp' },
            ]).map((s,i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative">
                <div className="absolute -top-3.5 right-6 rtl:right-auto rtl:left-6 w-8 h-8 rounded-full bg-[#10B981] text-white text-sm font-black flex items-center justify-center shadow-md shadow-emerald-200">
                  {s.n}
                </div>
                <div className="text-4xl mb-4 mt-2">{s.icon}</div>
                <div className="font-black text-gray-900 text-lg mb-2">{s.title}</div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-100">{s.tag}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button onClick={openReg}
              className="inline-flex items-center gap-2 bg-[#10B981] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-emerald-600 transition shadow-md shadow-emerald-200/50">
              🚀 {isAr ? 'ابدأ رحلتك الآن — مجاناً' : 'Start Your Journey Now — Free'}
            </button>
          </div>
        </div>
      </section>

      {/* ════ LEVELS ════ */}
      <section className="py-20 bg-[#0a0f1e]">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-4 py-1.5 rounded-full mb-4">
              {isAr ? 'مسارات التعلم' : 'Learning Tracks'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              {isAr ? 'إيه مستواك؟ اضغط وشوف خطتك وسعرها' : 'What is your level? Click to see your plan'}
            </h2>
          </div>

          <div className="flex gap-2 sm:gap-3 justify-center flex-wrap mb-10">
            {levels.map(lvl => {
              const isActive = activeCode === lvl.code;
              return (
                <button key={lvl.code} onClick={() => setActiveCode(isActive ? null : lvl.code)} className="outline-none">
                  <div className={`px-6 sm:px-8 py-4 rounded-2xl transition-all duration-300 ${isActive ? 'scale-105 shadow-2xl' : ''}`}
                    style={isActive
                      ? { background: lvl.gradient, boxShadow: `0 16px 48px ${lvl.glow}` }
                      : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className={`text-2xl font-black leading-none ${isActive ? 'text-white' : 'text-slate-300'}`}>{lvl.code}</div>
                    <div className={`text-xs font-semibold mt-0.5 ${isActive ? 'text-white/80' : 'text-slate-500'}`}>{lvl.name}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {active ? (
            <div className="rounded-3xl overflow-hidden" style={{ border: `1px solid ${active.accent}30`, background: 'rgba(255,255,255,0.03)' }}>
              <div className="h-1" style={{ background: active.gradient }} />
              <div className="p-7 sm:p-10 grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3">
                  <div className="mb-8">
                    <div className="flex justify-between text-[11px] text-slate-600 mb-2">
                      <span>{isAr ? 'بداية الرحلة' : 'Start'}</span>
                      <span>{isAr ? 'الإتقان التام' : 'Mastery'}</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                      <div className="h-full rounded-full transition-all duration-700" style={{ width:`${(activeIdx+1)*20}%`, background: active.gradient }} />
                    </div>
                    <div className="flex mt-2">
                      {CODES.map((c,i) => (
                        <div key={c} className="flex-1 text-center text-[10px] font-bold"
                          style={{ color: i<=activeIdx ? active.accent : 'rgba(100,116,139,0.4)' }}>{c}</div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-end gap-4 mb-5">
                    <div className="text-[6rem] sm:text-[7rem] font-black leading-none"
                      style={{ background: active.gradient, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                      {active.code}
                    </div>
                    <div className="pb-4">
                      <div className="text-white text-2xl font-black">{active.name}</div>
                      <div className="text-sm font-semibold mt-1" style={{ color: active.accent }}>{active.tagline}</div>
                    </div>
                  </div>
                  <p className="text-slate-400 text-base leading-relaxed mb-6 p-4 rounded-xl"
                    style={{ background:'rgba(255,255,255,0.04)', borderLeft:`3px solid ${active.accent}` }}>
                    {active.desc}
                  </p>
                  <div className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: active.accent }}>
                    {isAr ? 'ماذا ستتعلم' : 'You will learn'}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
                    {active.skills.map((s,i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ background:`${active.accent}20`, border:`1.5px solid ${active.accent}60` }}>
                          <svg width="8" height="7" viewBox="0 0 8 7" fill="none"><path d="M1 3.5L3 5.5L7 1.5" stroke={active.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        <span className="text-slate-300 text-sm">{s}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 rounded-2xl flex items-start gap-3" style={{ background:`${active.accent}12`, border:`1px solid ${active.accent}25` }}>
                    <span className="text-2xl flex-shrink-0">🎯</span>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: active.accent }}>
                        {isAr ? 'نتيجة مضمونة' : 'Expected Result'}
                      </div>
                      <div className="text-slate-300 text-sm">{active.result}</div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 flex flex-col">
                  <div className="rounded-2xl p-6 flex-1 flex flex-col"
                    style={{ background:`${active.accent}0a`, border:`1px solid ${active.accent}25` }}>
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">
                      {isAr ? 'السعر الشهري' : 'Monthly Price'}
                    </div>
                    <div className="flex items-end gap-2 mb-6 pb-6" style={{ borderBottom:`1px solid ${active.accent}20` }}>
                      <span className="text-6xl font-black leading-none text-white">{active.price}</span>
                      <div className="pb-1">
                        <div className="text-base font-bold" style={{ color: active.accent }}>{isAr ? 'جنيه' : 'EGP'}</div>
                        <div className="text-slate-500 text-sm">{isAr ? '/ شهرياً' : '/ month'}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5 mb-5">
                      <div className="rounded-xl p-3" style={{ background:'rgba(255,255,255,0.05)' }}>
                        <div className="text-[10px] text-slate-500 mb-1">{isAr ? 'الحصص' : 'Sessions'}</div>
                        <div className="text-white font-black text-sm">{active.sessions}</div>
                      </div>
                      <div className="rounded-xl p-3" style={{ background:'rgba(255,255,255,0.05)' }}>
                        <div className="text-[10px] text-slate-500 mb-1">{isAr ? 'المدة' : 'Duration'}</div>
                        <div className="text-white font-black text-sm">{active.duration}</div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-6 flex-1">
                      {(isAr
                        ? ['متابعة يومية على واتساب','لوحة تحكم ذكية','شهادة إتمام معتمدة','دعم فني 24/7']
                        : ['Daily WhatsApp follow-up','Smart progress dashboard','Accredited certificate','24/7 technical support']
                      ).map((item,i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                          <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background:`${active.accent}15` }}>
                            <svg width="7" height="6" viewBox="0 0 7 6" fill="none"><path d="M1 3L2.8 4.8L6 1" stroke={active.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </div>
                          {item}
                        </div>
                      ))}
                    </div>
                    <button onClick={openReg}
                      className="block w-full text-center py-4 rounded-2xl font-black text-white text-base transition-all hover:opacity-90"
                      style={{ background: active.gradient, boxShadow:`0 12px 32px ${active.glow}` }}>
                      {isAr ? `اشترك في ${active.code} الآن  ←` : `Join ${active.code} Now  →`}
                    </button>
                    <Link href="/placement-test" className="block text-center mt-3 text-slate-600 text-xs hover:text-slate-400 transition">
                      {isAr ? 'مش متأكد من مستواي — خذ الاختبار مجاناً' : "Not sure of my level — free test"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center py-16 text-center">
              <p className="text-slate-400 text-base mb-5">{isAr ? 'اختر مستواك من فوق' : 'Select your level above'}</p>
              <button onClick={openReg} className="inline-flex items-center gap-2 bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-emerald-400 transition text-sm">
                🚀 {isAr ? 'ابدأ الآن' : 'Start Now'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ════ FEATURES ════ */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
              {isAr ? 'مش بس درس — نظام تعليمي متكامل' : "Not just lessons — a complete learning system"}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(isAr ? [
              { icon:'🎯', title:'حصص خاصة ١:١', desc:'مش كلاس جماعي — حصة خاصة بينك وبين معلمك بس. المعلم مركّز عليك وعلى أهدافك تحديداً.' },
              { icon:'💬', title:'واتساب يومي مع معلمك', desc:'بعد كل حصة معلمك بيبعتلك تمارين ومراجعات على واتساب كل يوم ويصحح ويجاوب على أسئلتك.' },
              { icon:'🤖', title:'اختبار AI لتحديد مستواك', desc:'اختبارنا المجاني بالذكاء الاصطناعي في ١٥ دقيقة يحدد مستواك بدقة ويوصي بالخطة المناسبة.' },
              { icon:'📊', title:'تتبع تقدمك بشكل مرئي', desc:'لوحة تحكم ذكية تبيّن لك مستواك في كل مهارة: التحدث، الاستماع، القراءة، الكتابة.' },
              { icon:'📚', title:'مناهج مخصصة لهدفك', desc:'بناءً على هدفك (شغل، IELTS، سفر، دراسة) معلمك بيصمم لك خطة مخصصة تحقق هدفك أسرع.' },
              { icon:'🏆', title:'شهادة إتمام معتمدة', desc:'بعد ما تخلص كل مستوى بتاخد شهادة رسمية تقدر تحطها في سيرتك الذاتية.' },
            ] : [
              { icon:'🎯', title:'1:1 Private Sessions', desc:"Not a group class — a private session between you and your teacher only. Fully focused on your specific goals." },
              { icon:'💬', title:'Daily WhatsApp', desc:"After each session your teacher sends exercises daily on WhatsApp, corrects your work, and answers your questions." },
              { icon:'🤖', title:'AI Level Test', desc:"Our free AI-powered test in 15 minutes accurately determines your level and recommends the right plan." },
              { icon:'📊', title:'Visual Progress Tracking', desc:'Smart dashboard showing your level in every skill: speaking, listening, reading, writing.' },
              { icon:'📚', title:'Custom Curriculum', desc:"Based on your goal (work, IELTS, travel, study) your teacher designs a custom plan to reach your goal faster." },
              { icon:'🏆', title:'Accredited Certificate', desc:'After completing each level you get an official certificate you can add to your CV.' },
            ]).map((f,i) => (
              <div key={i} className="p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-md transition">
                <div className="text-3xl mb-4">{f.icon}</div>
                <div className="font-black text-gray-900 text-lg mb-2">{f.title}</div>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ PRICING ════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
              {isAr ? 'باقة تناسب كل هدف وميزانية' : 'A Plan for Every Goal & Budget'}
            </h2>
            <p className="text-gray-400 text-base">
              {isAr ? 'جميع الباقات تشمل: واتساب يومي + دعم 24/7 + شهادة + لوحة تحكم' : 'All plans include: Daily WhatsApp + 24/7 + Certificate + Dashboard'}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-center max-w-4xl mx-auto">
            {(isAr ? [
              { name:'أساسية', sub:'المبتدئين A1-A2', price:'349', unit:'جنيه/شهر', desc:'مناسبة لمن يبدأ أو يعيد أساسياته', features:['٤ حصص خاصة شهرياً','مفردات يومية','متابعة واتساب','دعم 24/7'], popular:false },
              { name:'متقدمة', sub:'المتوسط B1-B2', price:'599', unit:'جنيه/شهر', desc:'للأهداف المهنية وتطوير الكلام', features:['٨ حصص خاصة شهرياً','تمارين مخصصة','متابعة يومية','تتبع التقدم','دعم 24/7'], popular:true },
              { name:'احترافية', sub:'الاحترافي C1', price:'999', unit:'جنيه/شهر', desc:'للـ IELTS والشركات الدولية', features:['١٦ حصة خاصة شهرياً','تحضير IELTS/TOEFL','مقابلات العمل','تمارين مخصصة','دعم 24/7'], popular:false },
            ] : [
              { name:'Basic', sub:'For A1-A2', price:'349', unit:'EGP/month', desc:'Perfect for beginners', features:['4 private sessions/month','Daily vocabulary','WhatsApp follow-up','24/7 support'], popular:false },
              { name:'Advanced', sub:'For B1-B2', price:'599', unit:'EGP/month', desc:'For professional goals', features:['8 private sessions/month','Custom exercises','Daily follow-up','Progress tracking','24/7 support'], popular:true },
              { name:'Pro', sub:'For C1', price:'999', unit:'EGP/month', desc:'For IELTS & international work', features:['16 private sessions/month','IELTS/TOEFL prep','Interview prep','Custom exercises','24/7 support'], popular:false },
            ]).map((p,i) => (
              <div key={i} className={`relative rounded-2xl flex flex-col transition-all ${
                p.popular ? 'bg-[#10B981] p-7 shadow-2xl shadow-emerald-200/60 scale-105 z-10' : 'bg-white p-6 border border-gray-100 shadow-sm'
              }`}>
                {p.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-black px-4 py-1 rounded-full whitespace-nowrap">
                    ⭐ {isAr ? 'الأكثر طلباً' : 'Most Popular'}
                  </div>
                )}
                <div className={`text-xs mb-1 font-semibold ${p.popular ? 'text-emerald-100' : 'text-gray-400'}`}>{p.sub}</div>
                <div className={`text-2xl font-black mb-1 ${p.popular ? 'text-white' : 'text-gray-900'}`}>{p.name}</div>
                <div className={`text-sm mb-3 ${p.popular ? 'text-emerald-100' : 'text-gray-500'}`}>{p.desc}</div>
                <div className="flex items-baseline gap-1.5 mb-5">
                  <span className={`text-5xl font-black leading-none ${p.popular ? 'text-white' : 'text-[#10B981]'}`}>{p.price}</span>
                  <span className={`text-sm ${p.popular ? 'text-emerald-100' : 'text-gray-400'}`}>{p.unit}</span>
                </div>
                <div className={`h-px mb-4 ${p.popular ? 'bg-white/20' : 'bg-gray-100'}`} />
                <ul className="flex-1 space-y-2.5 mb-6">
                  {p.features.map((f,j) => (
                    <li key={j} className={`flex items-center gap-3 text-sm ${p.popular ? 'text-white' : 'text-gray-600'}`}>
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${p.popular ? 'bg-white/20' : 'bg-emerald-50'}`}>
                        <svg width="8" height="7" viewBox="0 0 8 7" fill="none"><path d="M1 3.5L3 5.5L7 1.5" stroke={p.popular?'#fff':'#10B981'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={openReg} className={`block w-full text-center py-3.5 rounded-xl font-black text-sm transition hover:opacity-90 ${
                  p.popular ? 'bg-white text-[#10B981]' : 'bg-[#10B981] text-white hover:bg-emerald-600'
                }`}>
                  {isAr ? 'ابدأ الآن' : 'Get Started'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ REVIEWS ════ */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-2">{isAr ? 'طلاب غيّروا مستقبلهم' : 'Students Who Changed Their Future'}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {(isAr ? [
              { name:'أحمد محمد', from:'A1', to:'C1', months:'١٢ شهر', result:'بيتكلم في الاجتماعات الدولية', q:'كنت مش قادر أكمّل جملة. دلوقتي بتكلم في اجتماعات مع أجانب. المتابعة اليومية على واتساب كانت السر الأساسي.' },
              { name:'سارة خالد', from:'B1', to:'IELTS 7.5', months:'٦ أشهر', result:'قبلت في ماجستير في إنجلترا', q:'كنت محتاجة 7 في IELTS. المعلمة صممت خطة تركز على نقاط ضعفي. جبت 7.5 في أول محاولة.' },
              { name:'محمود علي', from:'A2', to:'B2', months:'٩ أشهر', result:'حصل على ترقية في شركته', q:'الترقية كانت موقوفة على مستوى الإنجليزي. بعد ٩ أشهر عملت مقابلة بالإنجليزي وحصلت على المنصب.' },
            ] : [
              { name:'Ahmed Mohamed', from:'A1', to:'C1', months:'12 months', result:'Now speaks in international meetings', q:"I couldn't complete a sentence. Now I speak in meetings with foreigners. Daily WhatsApp follow-up was the key." },
              { name:'Sara Khaled', from:'B1', to:'IELTS 7.5', months:'6 months', result:"Accepted into a Master's in the UK", q:'I needed 7 in IELTS. My teacher focused on my weak points. Got 7.5 on my first attempt.' },
              { name:'Mahmoud Ali', from:'A2', to:'B2', months:'9 months', result:'Got promoted at his company', q:'The promotion was dependent on my English. After 9 months I had an English interview and got the position.' },
            ]).map((r,i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_,j)=>(
                      <svg key={j} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">{r.months}</span>
                </div>
                <div className="text-xs font-bold text-[#10B981] bg-emerald-50 px-3 py-1 rounded-full w-fit mb-3">✅ {r.result}</div>
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

      {/* ════ FAQ ════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900">{isAr ? 'أسئلة شائعة' : 'Frequently Asked Questions'}</h2>
          </div>
          <div className="space-y-3">
            {(isAr ? [
              { q:'إيه الفرق بين Be Fluent وأي كورس تاني؟', a:'الفرق الأساسي إن Be Fluent مش كورس مسجل — هو نظام تعليمي كامل فيه معلم خاص يتابعك يومياً على واتساب وحصص ١:١ وخطة مخصصة لهدفك.' },
              { q:'أنا مبتدئ تماماً — هينفع معايا؟', a:'طبعاً! عندنا مستوى A1 مصمم لمن لا يعرف أي كلمة. هنبدأ معاك من الحرف الأول بأسلوب بسيط.' },
              { q:'إمتى هشوف نتيجة؟', a:'معظم طلابنا يحسوا بفرق واضح بعد أول شهر. النتيجة الكاملة بتظهر حسب مستواك — المتوسط ٣-٦ أشهر لعبور مستوى كامل.' },
              { q:'ممكن أجرب قبل ما أدفع؟', a:'آه! الحصة الأولى مجانية تماماً وبدون أي التزام. كمان ممكن تاخد اختبار المستوى المجاني قبل التسجيل.' },
            ] : [
              { q:"What's the difference vs any other course?", a:"The core difference is Be Fluent isn't a recorded course — it's a complete system with a personal teacher following up daily on WhatsApp, 1:1 sessions, and a plan for your specific goal." },
              { q:"I'm a complete beginner — will this work?", a:"Absolutely! We have A1 level designed for those with zero English. We start from the very first letter in a simple way." },
              { q:'When will I see results?', a:'Most students feel a clear difference after the first month. Full results take 3-6 months to complete a full level.' },
              { q:'Can I try before paying?', a:"Yes! The first session is completely free with no commitment. You can also take the free AI level test before registering." },
            ]).map((item,i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-gray-100">
                <div className="font-bold text-gray-900 mb-2 flex items-start gap-2">
                  <span className="text-[#10B981] font-black flex-shrink-0">Q</span>{item.q}
                </div>
                <div className="text-gray-500 text-sm leading-relaxed flex gap-2">
                  <span className="text-gray-300 font-black flex-shrink-0">A</span>{item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ CTA ════ */}
      <section className="bg-[#0f172a] py-20">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6 text-2xl">🚀</div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            {isAr ? 'جاهز تبدأ رحلتك؟' : 'Ready to Start?'}
          </h2>
          <p className="text-slate-400 text-base mb-8">
            {isAr ? 'الحصة الأولى مجانية — بدون أي التزام' : 'First session free — no commitment'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button onClick={openReg}
              className="w-full sm:w-auto bg-[#10B981] text-white font-bold px-9 py-4 rounded-2xl hover:bg-emerald-400 transition shadow-lg shadow-emerald-900/30">
              {isAr ? 'احجز حصتي المجانية الآن' : 'Book My Free Session Now'}
            </button>
            <Link href="/placement-test"
              className="w-full sm:w-auto border border-white/10 text-slate-300 font-semibold px-9 py-4 rounded-2xl hover:bg-white/5 transition">
              🎯 {isAr ? 'اختبار المستوى المجاني' : 'Free Level Test'}
            </Link>
          </div>
        </div>
      </section>

      {/* ════ FOOTER ════ */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <Image src="/logo.png" alt="Be Fluent" width={30} height={30} className="rounded-xl" style={{ height:'auto' }} />
                <span className="font-black text-white">Be Fluent</span>
              </div>
              <p className="text-sm leading-relaxed mb-4">{isAr ? 'رحلتك من المبتدئ إلى الطلاقة تبدأ هنا' : 'Your journey from beginner to fluency starts here'}</p>
              <a href="https://api.whatsapp.com/send/?phone=201091515594" className="text-sm text-[#10B981] hover:text-emerald-400 font-semibold transition">
                💬 {isAr ? 'تكلم معنا على واتساب' : 'Chat on WhatsApp'}
              </a>
            </div>
            <div>
              <div className="font-bold text-white mb-4 text-sm">{isAr ? 'التعلم' : 'Learn'}</div>
              <ul className="space-y-2.5 text-sm">
                {[
                  { href:'/placement-test', label: isAr ? 'اختبار المستوى المجاني' : 'Free Level Test' },
                  { href:'/packages', label: isAr ? 'الباقات والأسعار' : 'Plans & Pricing' },
                ].map(l=><li key={l.href}><Link href={l.href} className="hover:text-white transition">{l.label}</Link></li>)}
              </ul>
            </div>
            <div>
              <div className="font-bold text-white mb-4 text-sm">{isAr ? 'الحساب' : 'Account'}</div>
              <ul className="space-y-2.5 text-sm">
                {[
                  { href:'/auth/login', label: isAr ? 'تسجيل الدخول' : 'Login' },
                  { href:'/dashboard/student', label: isAr ? 'لوحة تحكم الطالب' : 'Dashboard' },
                ].map(l=><li key={l.href}><Link href={l.href} className="hover:text-white transition">{l.label}</Link></li>)}
              </ul>
            </div>
            <div>
              <div className="font-bold text-white mb-4 text-sm">{isAr ? 'الشركة' : 'Company'}</div>
              <ul className="space-y-2.5 text-sm">
                {[
                  { href:'/contact', label: isAr ? 'تواصل معنا' : 'Contact Us' },
                  { href:'/contact', label: isAr ? 'سياسة الخصوصية' : 'Privacy Policy' },
                ].map((l,i)=><li key={i}><Link href={l.href} className="hover:text-white transition">{l.label}</Link></li>)}
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
