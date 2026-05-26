'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Phone, Mail, RefreshCw, Trash2, MessageCircle,
  ChevronLeft, ChevronRight, SlidersHorizontal, Search,
  TrendingUp, UserPlus, CheckCircle2, XCircle, Clock, Users
} from 'lucide-react'

interface Lead {
  id: string
  name: string
  phone: string
  email: string | null
  fromLevel: string
  toLevel: string
  plan: string
  price: number | null
  status: string
  notes: string | null
  createdAt: string
  updatedAt: string
}

interface Stats { NEW?: number; CONTACTED?: number; CONVERTED?: number; REJECTED?: number }

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  NEW:       { label: 'جديد',      color: 'text-blue-700',   bg: 'bg-blue-50 border-blue-200',   icon: UserPlus    },
  CONTACTED: { label: 'تم التواصل', color: 'text-amber-700',  bg: 'bg-amber-50 border-amber-200',  icon: Clock       },
  CONVERTED: { label: 'تحويل',     color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200', icon: CheckCircle2 },
  REJECTED:  { label: 'مرفوض',    color: 'text-red-700',    bg: 'bg-red-50 border-red-200',     icon: XCircle     },
}

const LEVEL_COLORS: Record<string, string> = {
  a1:'bg-gray-100 text-gray-600', a2:'bg-sky-100 text-sky-700',
  b1:'bg-teal-100 text-teal-700', b2:'bg-amber-100 text-amber-700',
  c1:'bg-violet-100 text-violet-700',
}

export default function LeadsTab() {
  const [leads,    setLeads]    = useState<Lead[]>([])
  const [stats,    setStats]    = useState<Stats>({})
  const [loading,  setLoading]  = useState(true)
  const [filter,   setFilter]   = useState('all')
  const [search,   setSearch]   = useState('')
  const [page,     setPage]     = useState(1)
  const [pages,    setPages]    = useState(1)
  const [total,    setTotal]    = useState(0)
  const [editId,   setEditId]   = useState<string|null>(null)
  const [editNote, setEditNote] = useState('')
  const [saving,   setSaving]   = useState(false)

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/leads?status=${filter}&page=${page}`)
      if (res.ok) {
        const data = await res.json()
        setLeads(data.bookings)
        setStats(data.stats)
        setTotal(data.total)
        setPages(data.pages)
      }
    } finally { setLoading(false) }
  }, [filter, page])

  useEffect(() => { fetchLeads() }, [fetchLeads])

  const updateStatus = async (id: string, status: string) => {
    setSaving(true)
    await fetch('/api/admin/leads', {
      method:'PATCH', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ id, status }),
    })
    setSaving(false)
    fetchLeads()
  }

  const saveNote = async (id: string) => {
    setSaving(true)
    await fetch('/api/admin/leads', {
      method:'PATCH', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ id, notes: editNote }),
    })
    setSaving(false)
    setEditId(null)
    fetchLeads()
  }

  const deleteLead = async (id: string) => {
    if (!confirm('هل تريد حذف هذا الطلب؟')) return
    await fetch('/api/admin/leads', {
      method:'DELETE', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ id }),
    })
    fetchLeads()
  }

  const filtered = search
    ? leads.filter(l =>
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.phone.includes(search) ||
        (l.email||'').toLowerCase().includes(search.toLowerCase())
      )
    : leads

  const waLink = (l: Lead) =>
    `https://api.whatsapp.com/send/?phone=${l.phone.replace(/[^0-9]/g,'')}&text=${encodeURIComponent(
      `مرحباً ${l.name}، شكراً لاهتمامك بـ Be Fluent. يسعدنا الترحيب بك في رحلتك لتعلم الإنجليزية! 🎓`
    )}`

  const statCards = [
    { label: 'إجمالي الطلبات', value: total, icon: Users, color: 'text-slate-600', bg: 'bg-slate-50' },
    { label: 'طلبات جديدة',   value: stats.NEW || 0, icon: UserPlus,    color: 'text-blue-600',    bg: 'bg-blue-50'    },
    { label: 'تم التواصل',    value: stats.CONTACTED || 0, icon: Clock, color: 'text-amber-600',   bg: 'bg-amber-50'   },
    { label: 'تم التحويل',    value: stats.CONVERTED || 0, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ]

  return (
    <div className="space-y-6">

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((s, i) => {
          const Icon = s.icon
          return (
            <div key={i} className={`${s.bg} rounded-2xl p-5 border border-white/50`}>
              <div className="flex items-center justify-between mb-3">
                <Icon className={`w-5 h-5 ${s.color}`} />
                <span className={`text-3xl font-black ${s.color}`}>{s.value}</span>
              </div>
              <p className="text-sm font-bold text-slate-500">{s.label}</p>
            </div>
          )
        })}
      </div>

      {/* Filters + Search */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {[
              { id:'all',       label:'الكل'       },
              { id:'NEW',       label:'جديد'       },
              { id:'CONTACTED', label:'تم التواصل' },
              { id:'CONVERTED', label:'تم التحويل' },
              { id:'REJECTED',  label:'مرفوض'      },
            ].map(f => (
              <button key={f.id} onClick={() => { setFilter(f.id); setPage(1) }}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors
                  ${filter===f.id ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>
                {f.label}
                {f.id !== 'all' && stats[f.id as keyof Stats] ? (
                  <span className={`ms-1.5 text-xs px-1.5 py-0.5 rounded-full ${filter===f.id ? 'bg-white/30' : 'bg-slate-200'}`}>
                    {stats[f.id as keyof Stats]}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute top-1/2 -translate-y-1/2 start-3 w-4 h-4 text-slate-400" />
            <input value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="ابحث بالاسم أو الهاتف..."
              className="w-full ps-9 pe-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400" />
          </div>
          <button onClick={fetchLeads} className="p-2.5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
            <RefreshCw className={`w-4 h-4 text-slate-500 ${loading?'animate-spin':''}`} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="py-20 text-center">
            <RefreshCw className="w-8 h-8 text-slate-300 animate-spin mx-auto mb-3" />
            <p className="text-slate-400 font-medium">جاري التحميل...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-slate-400 font-bold text-lg">لا توجد طلبات حتى الآن</p>
            <p className="text-slate-300 text-sm mt-1">الطلبات الجديدة ستظهر هنا عند تسجيل الطلاب في الصفحة الرئيسية</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="text-right py-4 px-5 text-xs font-black text-slate-400 uppercase tracking-wider">الطالب</th>
                    <th className="text-right py-4 px-5 text-xs font-black text-slate-400 uppercase tracking-wider">التواصل</th>
                    <th className="text-right py-4 px-5 text-xs font-black text-slate-400 uppercase tracking-wider">المستوى</th>
                    <th className="text-right py-4 px-5 text-xs font-black text-slate-400 uppercase tracking-wider">الباقة</th>
                    <th className="text-right py-4 px-5 text-xs font-black text-slate-400 uppercase tracking-wider">الحالة</th>
                    <th className="text-right py-4 px-5 text-xs font-black text-slate-400 uppercase tracking-wider">التاريخ</th>
                    <th className="text-right py-4 px-5 text-xs font-black text-slate-400 uppercase tracking-wider">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map(lead => {
                    const statusCfg = STATUS_CONFIG[lead.status] || STATUS_CONFIG.NEW
                    const StatusIcon = statusCfg.icon
                    return (
                      <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group">
                        {/* Name */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-black text-sm flex-shrink-0">
                              {lead.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 text-sm">{lead.name}</p>
                              {lead.email && <p className="text-xs text-slate-400">{lead.email}</p>}
                            </div>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-2">
                            <a href={waLink(lead)} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366]/10 text-[#25D366] rounded-lg text-xs font-bold hover:bg-[#25D366]/20 transition-colors">
                              <MessageCircle className="w-3.5 h-3.5" />
                              {lead.phone}
                            </a>
                          </div>
                        </td>

                        {/* Level */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-1.5">
                            <span className={`px-2 py-1 rounded-lg text-xs font-black uppercase ${LEVEL_COLORS[lead.fromLevel] || 'bg-gray-100 text-gray-500'}`}>
                              {lead.fromLevel.toUpperCase()}
                            </span>
                            <span className="text-slate-300 text-xs">→</span>
                            <span className={`px-2 py-1 rounded-lg text-xs font-black uppercase ${LEVEL_COLORS[lead.toLevel] || 'bg-gray-100 text-gray-500'}`}>
                              {lead.toLevel.toUpperCase()}
                            </span>
                          </div>
                        </td>

                        {/* Plan + Price */}
                        <td className="py-4 px-5">
                          <div>
                            <p className="text-xs font-bold text-slate-600">{lead.plan === 'bundle' ? '⚡ باقة' : 'شهري'}</p>
                            {lead.price && (
                              <p className="text-xs text-slate-400">{lead.price.toLocaleString()} جنيه</p>
                            )}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-4 px-5">
                          <select
                            value={lead.status}
                            onChange={e => updateStatus(lead.id, e.target.value)}
                            disabled={saving}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer focus:outline-none transition-colors ${statusCfg.bg} ${statusCfg.color}`}>
                            <option value="NEW">جديد</option>
                            <option value="CONTACTED">تم التواصل</option>
                            <option value="CONVERTED">تم التحويل</option>
                            <option value="REJECTED">مرفوض</option>
                          </select>
                        </td>

                        {/* Date */}
                        <td className="py-4 px-5">
                          <p className="text-xs text-slate-400">
                            {new Date(lead.createdAt).toLocaleDateString('ar-EG', { year:'numeric', month:'short', day:'numeric' })}
                          </p>
                          <p className="text-[10px] text-slate-300">
                            {new Date(lead.createdAt).toLocaleTimeString('ar-EG', { hour:'2-digit', minute:'2-digit' })}
                          </p>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-2">
                            {editId === lead.id ? (
                              <div className="flex items-center gap-2 min-w-48">
                                <input
                                  value={editNote}
                                  onChange={e => setEditNote(e.target.value)}
                                  placeholder="أضف ملاحظة..."
                                  className="flex-1 px-2 py-1 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-400"
                                />
                                <button onClick={() => saveNote(lead.id)}
                                  className="p-1.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                </button>
                                <button onClick={() => setEditId(null)}
                                  className="p-1.5 bg-slate-100 text-slate-400 rounded-lg hover:bg-slate-200 transition-colors">
                                  <XCircle className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => { setEditId(lead.id); setEditNote(lead.notes || '') }}
                                className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                title={lead.notes || 'أضف ملاحظة'}>
                                <SlidersHorizontal className="w-3.5 h-3.5" />
                              </button>
                            )}
                            <button onClick={() => deleteLead(lead.id)}
                              className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          {lead.notes && editId !== lead.id && (
                            <p className="text-[10px] text-slate-400 mt-1 max-w-32 truncate">{lead.notes}</p>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pages > 1 && (
              <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
                <p className="text-sm text-slate-400">{total} طلب إجمالاً</p>
                <div className="flex items-center gap-2">
                  <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1}
                    className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-bold text-slate-600">{page} / {pages}</span>
                  <button onClick={() => setPage(p => Math.min(pages, p+1))} disabled={page===pages}
                    className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
