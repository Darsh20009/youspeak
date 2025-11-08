'use client'

import { useState, useEffect } from 'react'
import { CreditCard, CheckCircle, Clock } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Alert from '@/components/ui/Alert'
import Button from '@/components/ui/Button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

interface Package {
  id: string
  title: string
  titleAr: string
  description: string | null
  descriptionAr: string | null
  price: number
  lessonsCount: number
  durationDays: number
}

interface Subscription {
  id: string
  paid: boolean
  receiptUrl: string | null
  startDate: string | null
  endDate: string | null
  package: Package
  createdAt: string
}

export default function PackagesTab({ isActive }: { isActive: boolean }) {
  const [packages, setPackages] = useState<Package[]>([])
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [selecting, setSelecting] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const [packagesRes, subsRes] = await Promise.all([
        fetch('/api/packages'),
        fetch('/api/subscriptions')
      ])

      if (packagesRes.ok) {
        const packagesData = await packagesRes.json()
        setPackages(packagesData)
      }

      if (subsRes.ok) {
        const subsData = await subsRes.json()
        setSubscriptions(subsData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSelectPackage(packageId: string) {
    setSelecting(true)
    try {
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageId })
      })

      if (response.ok) {
        alert('Package selected! You will be contacted via WhatsApp for payment instructions.')
        window.open('https://wa.me/201091515594', '_blank')
        await fetchData()
      }
    } catch (error) {
      console.error('Error selecting package:', error)
    } finally {
      setSelecting(false)
    }
  }

  const activeSubscription = subscriptions.find(s => 
    s.paid && s.endDate && new Date(s.endDate) >= new Date()
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-[#004E89]">
        Packages / الباقات
      </h2>

      {activeSubscription && (
        <Card variant="elevated" className="bg-green-50 border-green-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Active Package / باقة نشطة</h3>
              <p className="text-sm text-gray-700">
                {activeSubscription.package.title} - {activeSubscription.package.titleAr}
              </p>
              <p className="text-sm text-gray-600">
                Valid until: {new Date(activeSubscription.endDate!).toLocaleDateString('ar-EG')} / 
                صالحة حتى: {new Date(activeSubscription.endDate!).toLocaleDateString('ar-EG')}
              </p>
            </div>
          </div>
        </Card>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((pkg) => {
          const isRecommended = pkg.title === 'Monthly' || pkg.titleAr === 'شهري'
          return (
            <Card 
              key={pkg.id}
              variant="elevated"
              className={isRecommended ? 'ring-2 ring-[#004E89]' : ''}
            >
              {isRecommended && (
                <Badge variant="primary" className="mb-4">
                  Recommended / موصى به
                </Badge>
              )}
              <h3 className="text-xl font-bold text-[#004E89] mb-2">{pkg.title}</h3>
              <p className="text-gray-600 mb-4">{pkg.titleAr}</p>
              <p className="text-4xl font-bold text-[#004E89] mb-4">{pkg.price} SAR</p>
              <div className="mb-6 text-gray-700 space-y-1">
                <p>{pkg.lessonsCount} lessons / حصة</p>
                <p>{Math.ceil(pkg.durationDays / 30)} month(s) / شهر</p>
              </div>
              {pkg.description && (
                <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>
              )}
              <Button 
                variant={isRecommended ? 'primary' : 'outline'} 
                fullWidth
                onClick={() => handleSelectPackage(pkg.id)}
                disabled={selecting}
              >
                {selecting ? 'Processing...' : 'Select / اختر'}
              </Button>
            </Card>
          )
        })}
      </div>

      <Alert variant="info">
        <CreditCard className="h-5 w-5" />
        <div>
          <p className="font-semibold">Payment Instructions / تعليمات الدفع:</p>
          <p className="text-sm mt-1">
            After selecting a package, you will receive payment details via WhatsApp at{' '}
            <strong>+201091515594</strong>. Please send your payment receipt for verification.
          </p>
          <p className="text-sm mt-1">
            بعد اختيار الباقة، ستستلم تعليمات الدفع عبر الواتساب على{' '}
            <strong>+201091515594</strong>. الرجاء إرسال إيصال الدفع للتحقق.
          </p>
        </div>
      </Alert>

      {subscriptions.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            My Subscriptions / اشتراكاتي
          </h3>
          <div className="space-y-4">
            {subscriptions.map((sub) => (
              <Card key={sub.id} variant="elevated">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        {sub.package.title} / {sub.package.titleAr}
                      </h3>
                      {sub.paid ? (
                        <Badge variant="success">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Paid / مدفوعة
                        </Badge>
                      ) : (
                        <Badge variant="warning">
                          <Clock className="h-3 w-3 mr-1" />
                          Pending Payment / في انتظار الدفع
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      Requested on: {new Date(sub.createdAt).toLocaleDateString('ar-EG')}
                    </p>
                    {sub.paid && sub.startDate && sub.endDate && (
                      <p className="text-sm text-gray-600">
                        Active from {new Date(sub.startDate).toLocaleDateString('ar-EG')} to{' '}
                        {new Date(sub.endDate).toLocaleDateString('ar-EG')}
                      </p>
                    )}
                  </div>
                  <p className="text-lg font-bold text-[#004E89]">{sub.package.price} SAR</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
