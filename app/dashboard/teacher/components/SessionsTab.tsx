'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, Users, Plus, Video } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Alert from '@/components/ui/Alert'
import Button from '@/components/ui/Button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'

interface Session {
  id: string
  title: string
  startTime: string
  endTime: string
  status: string
  roomId: string | null
  students: Array<{
    id: string
    student: {
      name: string
    }
  }>
}

export default function SessionsTab({ teacherProfileId }: { teacherProfileId: string }) {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newSession, setNewSession] = useState({
    title: '',
    startTime: '',
    endTime: ''
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchSessions()
  }, [])

  async function fetchSessions() {
    try {
      const response = await fetch('/api/teacher/sessions')
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

  async function handleCreateSession() {
    if (!newSession.title || !newSession.startTime || !newSession.endTime) {
      alert('Please fill all fields')
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('/api/teacher/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSession)
      })

      if (response.ok) {
        await fetchSessions()
        setNewSession({ title: '', startTime: '', endTime: '' })
        setShowCreateForm(false)
        alert('Session created successfully!')
      } else {
        alert('Failed to create session')
      }
    } catch (error) {
      console.error('Error creating session:', error)
      alert('Error creating session')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const upcomingSessions = sessions.filter(s => 
    new Date(s.startTime) > new Date() && s.status === 'SCHEDULED'
  )
  const pastSessions = sessions.filter(s => 
    new Date(s.startTime) <= new Date() || s.status !== 'SCHEDULED'
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-[#004E89]">
          My Sessions / حصصي
        </h2>
        <Button
          variant="primary"
          onClick={() => setShowCreateForm(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Session / إنشاء حصة
        </Button>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Upcoming Sessions / الحصص القادمة ({upcomingSessions.length})
        </h3>
        {upcomingSessions.length === 0 ? (
          <Alert variant="info">
            <p>No upcoming sessions. Create a new session to get started!</p>
            <p>لا توجد حصص قادمة. قم بإنشاء حصة جديدة للبدء!</p>
          </Alert>
        ) : (
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <Card key={session.id} variant="elevated">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-[#004E89]">{session.title}</h3>
                      <Badge variant="primary">Upcoming</Badge>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(session.startTime).toLocaleDateString('ar-EG', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>
                          {new Date(session.startTime).toLocaleTimeString('ar-EG', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                          {' - '}
                          {new Date(session.endTime).toLocaleTimeString('ar-EG', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{session.students.length} student(s) enrolled</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {session.roomId && (
                      <Button variant="primary" size="sm">
                        <Video className="h-4 w-4 mr-2" />
                        Start / ابدأ
                      </Button>
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
          Past Sessions / الحصص السابقة ({pastSessions.length})
        </h3>
        {pastSessions.length === 0 ? (
          <Alert variant="info">
            <p>No past sessions yet.</p>
            <p>لا توجد حصص سابقة بعد.</p>
          </Alert>
        ) : (
          <div className="space-y-4">
            {pastSessions.slice(0, 10).map((session) => (
              <Card key={session.id} variant="elevated">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-gray-700">{session.title}</h3>
                      <Badge variant="neutral">Completed</Badge>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(session.startTime).toLocaleDateString('ar-EG')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{session.students.length} student(s)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {showCreateForm && (
        <Modal
          isOpen={true}
          onClose={() => setShowCreateForm(false)}
          title="Create New Session / إنشاء حصة جديدة"
        >
          <div className="space-y-4">
            <Input
              label="Session Title / عنوان الحصة"
              value={newSession.title}
              onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
              placeholder="e.g., English Conversation - Lesson 1"
            />
            <Input
              label="Start Time / وقت البداية"
              type="datetime-local"
              value={newSession.startTime}
              onChange={(e) => setNewSession({ ...newSession, startTime: e.target.value })}
            />
            <Input
              label="End Time / وقت النهاية"
              type="datetime-local"
              value={newSession.endTime}
              onChange={(e) => setNewSession({ ...newSession, endTime: e.target.value })}
            />
            <div className="flex gap-2">
              <Button
                variant="primary"
                fullWidth
                onClick={handleCreateSession}
                disabled={submitting}
              >
                {submitting ? 'Creating...' : 'Create / إنشاء'}
              </Button>
              <Button
                variant="outline"
                fullWidth
                onClick={() => setShowCreateForm(false)}
              >
                Cancel / إلغاء
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
