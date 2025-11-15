'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CreditCard, CheckCircle, Clock, ShoppingCart, Plus } from 'lucide-react'
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
  const router = useRouter()
  const [packages, setPackages] = useState<Package[]>([])
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [cart, setCart] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selecting, setSelecting] = useState(false)
  const [addingToCart, setAddingToCart] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const [packagesRes, subsRes, cartRes] = await Promise.all([
        fetch('/api/packages'),
        fetch('/api/subscriptions'),
        fetch('/api/cart')
      ])

      if (packagesRes.ok) {
        const packagesData = await packagesRes.json()
        setPackages(packagesData)
      }

      if (subsRes.ok) {
        const subsData = await subsRes.json()
        setSubscriptions(subsData)
      }

      if (cartRes.ok) {
        const cartData = await cartRes.json()
        setCart(cartData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleAddToCart(packageId: string) {
    setAddingToCart(packageId)
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageId })
      })

      if (response.ok) {
        await fetchData()
        alert('✓ تم إضافة الباقة للسلة!\n\nPackage added to cart!')
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to add to cart')
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      alert('حدث خطأ. الرجاء المحاولة مرة أخرى.\n\nAn error occurred. Please try again.')
    } finally {
      setAddingToCart(null)
    }
  }

  function isPackageInCart(packageId: string): boolean {
    return cart?.CartItem?.some((item: any) => item.Package.id === packageId) || false
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

  const cartItemsCount = cart?.CartItem?.length || 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-[#004E89]">
          Packages / الباقات
        </h2>
        {cartItemsCount > 0 && (
          <Button 
            variant="primary"
            onClick={() => router.push('/dashboard/student/cart')}
          >
            <ShoppingCart className="h-5 w-5 ml-2" />
            Cart ({cartItemsCount}) / السلة
          </Button>
        )}
      </div>

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
              {isPackageInCart(pkg.id) ? (
                <Button 
                  variant="outline"
                  fullWidth
                  onClick={() => router.push('/dashboard/student/cart')}
                >
                  <ShoppingCart className="h-4 w-4 ml-2" />
                  In Cart / في السلة
                </Button>
              ) : (
                <Button 
                  variant={isRecommended ? 'primary' : 'outline'} 
                  fullWidth
                  onClick={() => handleAddToCart(pkg.id)}
                  disabled={addingToCart === pkg.id}
                >
                  {addingToCart === pkg.id ? 'Adding...' : (
                    <>
                      <Plus className="h-4 w-4 ml-2" />
                      Add to Cart / أضف للسلة
                    </>
                  )}
                </Button>
              )}
            </Card>
          )
        })}
      </div>

      <Alert variant="info">
        <CreditCard className="h-5 w-5" />
        <div>
          <p className="font-semibold">How to Subscribe / كيفية الاشتراك:</p>
          <p className="text-sm mt-1">
            1. Add packages to your cart / أضف الباقات للسلة<br/>
            2. Proceed to checkout / انتقل للدفع<br/>
            3. Choose payment method (Bank Transfer or E-Wallet) / اختر طريقة الدفع<br/>
            4. Upload payment receipt for verification / ارفع إيصال الدفع للتحقق
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
