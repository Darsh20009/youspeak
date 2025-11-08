'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, User, CheckCircle, XCircle } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Alert from '@/components/ui/Alert'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import Button from '@/components/ui/Button'

interface Session {
  id: string
  sessionId: string
  attended: boolean
  session: {
    id: string
    title: string
    startTime: string
    endTime: string
    status: string
    roomId: string | null
    teacher: {
      user: {
        name: string
      }
    }
  }
}

export default function SessionsTab({ isActive }: { isActive: boolean }) {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isActive) {
      fetchSessions()
    }
  }, [isActive])

  async function fetchSessions() {
    try {
      const response = await fetch('/api/sessions/student')
      if (response.ok) {
        const data = await response.json()
        setSessions(data)
      }
    } catch (error) {
      console.error('Error fetching sessions:', error)
    } finally {
      setLoading(false)
    }
  }

  const upcomingSessions = sessions.filter(s => 
    new Date(s.session.startTime) > new Date() && s.session.status === 'SCHEDULED'
  )
  const pastSessions = sessions.filter(s => 
    new Date(s.session.startTime) <= new Date() || s.session.status !== 'SCHEDULED'
  )

  if (!isActive) {
    return (
      <div>
        <h2 className="text-3xl font-bold text-[#004E89] mb-6">
          My Sessions / حصصي
        </h2>
        <Alert variant="warning">
          <p>Activate your account to book sessions / قم بتفعيل حسابك لحجز الحصص</p>
        </Alert>
      </div>
    )
  }

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
        My Sessions / حصصي
      </h2>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Upcoming Sessions / الحصص القادمة
        </h3>
        {upcomingSessions.length === 0 ? (
          <Alert variant="info">
            <p>No upcoming sessions scheduled.</p>
            <p>لا توجد حصص مجدولة حالياً.</p>
          </Alert>
        ) : (
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <Card key={session.id} variant="elevated">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-[#004E89]">{session.session.title}</h3>
                      <Badge variant="primary">Upcoming / قادمة</Badge>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(session.session.startTime).toLocaleDateString('ar-EG', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>
                          {new Date(session.session.startTime).toLocaleTimeString('ar-EG', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                          {' - '}
                          {new Date(session.session.endTime).toLocaleTimeString('ar-EG', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>Teacher / المعلم: {session.session.teacher.user.name}</span>
                      </div>
                    </div>
                  </div>
                  {session.session.roomId && new Date(session.session.startTime) <= new Date() && (
                    <Button variant="primary" size="sm">
                      Join Session / انضم للحصة
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Past Sessions / الحصص السابقة
        </h3>
        {pastSessions.length === 0 ? (
          <Alert variant="info">
            <p>No past sessions yet.</p>
            <p>لا توجد حصص سابقة بعد.</p>
          </Alert>
        ) : (
          <div className="space-y-4">
            {pastSessions.slice(0, 5).map((session) => (
              <Card key={session.id} variant="elevated">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-gray-700">{session.session.title}</h3>
                      {session.attended ? (
                        <Badge variant="success">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Attended / حضور
                        </Badge>
                      ) : (
                        <Badge variant="warning">
                          <XCircle className="h-3 w-3 mr-1" />
                          Absent / غياب
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(session.session.startTime).toLocaleDateString('ar-EG')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{session.session.teacher.user.name}</span>
                      </div>
                    </div>
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
