'use client'

import { useState, useEffect } from 'react'
import { CreditCard, CheckCircle, Clock, XCircle } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import Alert from '@/components/ui/Alert'

interface Subscription {
  id: string
  paid: boolean
  receiptUrl: string | null
  startDate: string | null
  endDate: string | null
  createdAt: string
  student: {
    name: string
    email: string
  }
  package: {
    title: string
    titleAr: string
    price: number
    lessonsCount: number
    durationDays: number
  }
}

export default function SubscriptionsTab() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  async function fetchSubscriptions() {
    try {
      const response = await fetch('/api/admin/subscriptions')
      if (response.ok) {
        const data = await response.json()
        setSubscriptions(data)
      }
    } catch (error) {
      console.error('Error fetching subscriptions:', error)
    } finally {
      setLoading(false)
    }
  }

  async function approveSubscription(subscriptionId: string) {
    if (!confirm('Are you sure you want to approve this subscription?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/subscriptions/${subscriptionId}/approve`, {
        method: 'PATCH'
      })

      if (response.ok) {
        await fetchSubscriptions()
        alert('Subscription approved successfully! Student account activated.')
      } else {
        alert('Failed to approve subscription')
      }
    } catch (error) {
      console.error('Error approving subscription:', error)
      alert('Error approving subscription')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const pendingSubscriptions = subscriptions.filter(s => !s.paid)
  const approvedSubscriptions = subscriptions.filter(s => s.paid)

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-[#004E89]">
        Subscriptions / الاشتراكات
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <Card variant="elevated">
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{pendingSubscriptions.length}</p>
            <p className="text-sm text-gray-600">Pending Approval / في انتظار الموافقة</p>
          </div>
        </Card>
        <Card variant="elevated">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{approvedSubscriptions.length}</p>
            <p className="text-sm text-gray-600">Approved / موافق عليها</p>
          </div>
        </Card>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Pending Subscriptions / اشتراكات معلقة ({pendingSubscriptions.length})
        </h3>
        {pendingSubscriptions.length === 0 ? (
          <Alert variant="success">
            <CheckCircle className="h-5 w-5" />
            <p>No pending subscriptions!</p>
            <p>لا توجد اشتراكات معلقة!</p>
          </Alert>
        ) : (
          <div className="space-y-4">
            {pendingSubscriptions.map((sub) => (
              <Card key={sub.id} variant="elevated" className="border-l-4 border-orange-500">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{sub.student.name}</h3>
                      <Badge variant="warning">
                        <Clock className="h-3 w-3 mr-1" />
                        Pending Payment
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{sub.student.email}</p>
                    <div className="bg-blue-50 p-3 rounded-lg mb-2">
                      <p className="font-medium text-gray-900">
                        {sub.package.title} / {sub.package.titleAr}
                      </p>
                      <p className="text-sm text-gray-700">
                        {sub.package.price} SAR • {sub.package.lessonsCount} lessons • {Math.ceil(sub.package.durationDays / 30)} month(s)
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">
                      Requested: {new Date(sub.createdAt).toLocaleString('ar-EG')}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => approveSubscription(sub.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve / موافقة
                    </Button>
                    {sub.receiptUrl && (
                      <a href={sub.receiptUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm" fullWidth>
                          View Receipt
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Approved Subscriptions / اشتراكات موافق عليها ({approvedSubscriptions.length})
        </h3>
        {approvedSubscriptions.length === 0 ? (
          <Alert variant="info">
            <p>No approved subscriptions yet.</p>
            <p>لا توجد اشتراكات موافق عليها بعد.</p>
          </Alert>
        ) : (
          <div className="space-y-4">
            {approvedSubscriptions.slice(0, 10).map((sub) => (
              <Card key={sub.id} variant="elevated">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{sub.student.name}</h3>
                      <Badge variant="success">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Paid
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{sub.student.email}</p>
                    <p className="font-medium text-gray-900">
                      {sub.package.title} / {sub.package.titleAr}
                    </p>
                    <p className="text-sm text-gray-600">
                      {sub.package.price} SAR
                    </p>
                    {sub.startDate && sub.endDate && (
                      <p className="text-xs text-gray-500 mt-2">
                        Active: {new Date(sub.startDate).toLocaleDateString('ar-EG')} - {new Date(sub.endDate).toLocaleDateString('ar-EG')}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
