'use client'

export default function FloatingContactButtons() {
  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
      <a
        href="https://wa.me/201091515594"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:bg-green-700 transition-all hover:scale-110"
        title="WhatsApp"
        aria-label="Contact via WhatsApp"
      >
        💬
      </a>
      <a
        href="mailto:youspeak.help@gmail.com"
        className="w-14 h-14 bg-[#004E89] rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:bg-[#003A6A] transition-all hover:scale-110"
        title="Email"
        aria-label="Contact via Email"
      >
        ✉️
      </a>
    </div>
  )
}
