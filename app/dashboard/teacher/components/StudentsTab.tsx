'use client'

import { useState, useEffect } from 'react'
import { User, CheckCircle, XCircle, Calendar } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Alert from '@/components/ui/Alert'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

interface Student {
  id: string
  name: string
  email: string
  isActive: boolean
  phone: string | null
  studentProfile: {
    levelCurrent: string | null
    sessionsAttended: number
  }
  sessionsCount: number
  wordsCount: number
}

export default function StudentsTab({ teacherProfileId }: { teacherProfileId: string }) {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStudents()
  }, [])

  async function fetchStudents() {
    try {
      const response = await fetch('/api/teacher/students')
      if (response.ok) {
        const data = await response.json()
        setStudents(data)
      }
    } catch (error) {
      console.error('Error fetching students:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const activeStudents = students.filter(s => s.isActive)
  const inactiveStudents = students.filter(s => !s.isActive)

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-[#004E89]">
        My Students / طلابي
      </h2>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Active Students / طلاب نشطون ({activeStudents.length})
        </h3>
        {activeStudents.length === 0 ? (
          <Alert variant="info">
            <p>No active students yet.</p>
            <p>لا يوجد طلاب نشطون بعد.</p>
          </Alert>
        ) : (
          <div className="space-y-4">
            {activeStudents.map((student) => (
              <Card key={student.id} variant="elevated">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-12 h-12 bg-[#004E89] rounded-full flex items-center justify-center text-white text-lg font-bold">
                      {student.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-gray-900">{student.name}</h3>
                        <Badge variant="success">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{student.email}</p>
                      {student.phone && (
                        <p className="text-sm text-gray-600 mb-2">Phone: {student.phone}</p>
                      )}
                      <div className="flex gap-4 text-sm text-gray-700">
                        <span>
                          <strong>Level:</strong> {student.studentProfile?.levelCurrent || 'Not set'}
                        </span>
                        <span>
                          <strong>Sessions:</strong> {student.sessionsCount || 0}
                        </span>
                        <span>
                          <strong>Words:</strong> {student.wordsCount || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {inactiveStudents.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Inactive Students / طلاب غير نشطين ({inactiveStudents.length})
          </h3>
          <div className="space-y-4">
            {inactiveStudents.map((student) => (
              <Card key={student.id} variant="elevated" className="opacity-60">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-lg font-bold">
                    {student.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-700">{student.name}</h3>
                      <Badge variant="warning">
                        <XCircle className="h-3 w-3 mr-1" />
                        Pending Activation
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{student.email}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
