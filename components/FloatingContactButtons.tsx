'use client'

import { useState } from 'react'
import { MessageCircle, Send, Mail, X, Clock } from 'lucide-react'

export default function FloatingContactButtons() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  
  // تحديد ساعات العمل
  const isWithinWorkingHours = () => {
    const now = new Date()
    const currentHour = now.getHours()
    const currentDay = now.getDay()
    
    // ساعات العمل: الأحد-الخميس 9 صباحًا - 9 مساءً
    const isWeekday = currentDay >= 0 && currentDay <= 4
    const isWorkingHour = currentHour >= 9 && currentHour < 21
    
    return isWeekday && isWorkingHour
  }

  const handleWhatsAppSend = () => {
    const phoneNumber = '201091515594'
    const text = encodeURIComponent(message || 'مرحباً، أحتاج إلى المساعدة')
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank')
  }

  const handleEmailSend = () => {
    const email = 'youspeak.help@gmail.com'
    const subject = encodeURIComponent('استفسار - Youspeak')
    const body = encodeURIComponent(message || 'مرحباً،\n\nأحتاج إلى المساعدة في...')
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
  }

  const isAvailable = isWithinWorkingHours()

  return (
    <>
      {/* زر الدعم الفني العائم */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110"
          aria-label="الدعم الفني"
        >
          {/* أيقونة الرسالة */}
          <MessageCircle className="w-6 h-6 transition-transform group-hover:scale-110" />
          
          {/* تأثير التوهج */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* مؤشر الحالة */}
          <div className="absolute -top-1 -right-1">
            <div className={`w-4 h-4 ${isAvailable ? 'bg-emerald-500' : 'bg-amber-500'} rounded-full border-2 border-white`}>
              <div className={`w-full h-full ${isAvailable ? 'bg-emerald-500' : 'bg-amber-500'} rounded-full animate-ping opacity-75`}></div>
            </div>
          </div>
        </button>
      </div>

      {/* النافذة المنبثقة */}
      {isOpen && (
        <div className="fixed bottom-28 right-8 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* العنوان */}
          <div className="bg-gradient-to-r from-[#004E89] to-[#1A5F7A] p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-6 h-6" />
                <div>
                  <h3 className="font-bold text-lg">الدعم الفني</h3>
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <Clock className="w-3 h-3" />
                    <span>
                      {isAvailable ? 'متاح الآن ✅' : 'غير متاح حالياً 🟡'}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* المحتوى */}
          <div className="p-5">
            {/* ساعات العمل */}
            <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
              <p className="text-sm text-gray-700 font-medium mb-1">⏰ ساعات العمل:</p>
              <p className="text-xs text-gray-600">الأحد - الخميس: 9 صباحاً - 9 مساءً</p>
              <p className="text-xs text-gray-600">الجمعة - السبت: عطلة</p>
            </div>

            {/* حقل الرسالة */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                كيف يمكننا مساعدتك؟
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="اكتب رسالتك هنا..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004E89] focus:border-transparent resize-none text-right"
                rows={4}
                dir="rtl"
              />
            </div>

            {/* أزرار الإرسال */}
            <div className="space-y-2">
              {/* زر WhatsApp */}
              <button
                onClick={handleWhatsAppSend}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <Send className="w-4 h-4" />
                <span>إرسال عبر واتساب</span>
                <span className="text-lg">💬</span>
              </button>

              {/* زر البريد الإلكتروني */}
              <button
                onClick={handleEmailSend}
                className="w-full bg-gradient-to-r from-[#004E89] to-[#1A5F7A] hover:from-[#003A6A] hover:to-[#004E89] text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <Mail className="w-4 h-4" />
                <span>إرسال عبر البريد</span>
                <span className="text-lg">✉️</span>
              </button>
            </div>

            {/* ملاحظة */}
            {!isAvailable && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-xs text-amber-800 text-center">
                  نحن خارج ساعات العمل حالياً. سنرد عليك في أقرب وقت ممكن!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
