'use client'

import { useState, useEffect } from 'react'
import { FileText, Plus, CheckCircle, Clock, Send } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Alert from '@/components/ui/Alert'
import Button from '@/components/ui/Button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import GrammarErrorHighlighter from '@/components/GrammarErrorHighlighter'

interface Assignment {
  id: string
  title: string
  description: string | null
  dueDate: string | null
  session: {
    title: string
  } | null
  submissions: Array<{
    id: string
    student: {
      name: string
    }
    textAnswer: string
    grade: number | null
    feedback: string | null
    grammarErrors: string | null
    submittedAt: string
  }>
}

interface Session {
  id: string
  title: string
}

export default function AssignmentsTab({ teacherProfileId }: { teacherProfileId: string }) {
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState<Assignment['submissions'][0] | null>(null)
  const [gradeData, setGradeData] = useState({ grade: '', feedback: '', grammarErrors: [] as Array<{text: string, correction: string, explanation: string}> })
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    sessionId: '',
    dueDate: ''
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const [assignmentsRes, sessionsRes] = await Promise.all([
        fetch('/api/teacher/assignments'),
        fetch('/api/teacher/sessions')
      ])

      if (assignmentsRes.ok) {
        const data = await assignmentsRes.json()
        setAssignments(data)
      }

      if (sessionsRes.ok) {
        const data = await sessionsRes.json()
        setSessions(data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateAssignment() {
    if (!newAssignment.title) {
      alert('Please enter a title')
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('/api/teacher/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAssignment)
      })

      if (response.ok) {
        await fetchData()
        setNewAssignment({ title: '', description: '', sessionId: '', dueDate: '' })
        setShowCreateForm(false)
        alert('Assignment created successfully!')
      } else {
        alert('Failed to create assignment')
      }
    } catch (error) {
      console.error('Error creating assignment:', error)
      alert('Error creating assignment')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleGradeSubmission() {
    if (!selectedSubmission || !gradeData.grade) {
      alert('Please enter a grade')
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch(`/api/teacher/assignments/${selectedSubmission.id}/grade`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grade: parseFloat(gradeData.grade),
          feedback: gradeData.feedback,
          grammarErrors: JSON.stringify(gradeData.grammarErrors)
        })
      })

      if (response.ok) {
        await fetchData()
        setSelectedSubmission(null)
        setGradeData({ grade: '', feedback: '', grammarErrors: [] })
        alert('Submission graded successfully!')
      } else {
        alert('Failed to grade submission')
      }
    } catch (error) {
      console.error('Error grading submission:', error)
      alert('Error grading submission')
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

  const pendingGrading = assignments.flatMap(a => 
    a.submissions.filter(s => s.grade === null)
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-[#004E89]">
          Assignments / الواجبات
        </h2>
        <Button
          variant="primary"
          onClick={() => setShowCreateForm(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Assignment / إنشاء واجب
        </Button>
      </div>

      {pendingGrading.length > 0 && (
        <Card variant="elevated" className="bg-orange-50 border-orange-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Pending Grading</h3>
              <p className="text-sm text-gray-700">
                {pendingGrading.length} submission(s) waiting for your review
              </p>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        {assignments.length === 0 ? (
          <Alert variant="info">
            <p>No assignments created yet. Create your first assignment!</p>
            <p>لم يتم إنشاء واجبات بعد. قم بإنشاء أول واجب!</p>
          </Alert>
        ) : (
          assignments.map((assignment) => (
            <Card key={assignment.id} variant="elevated">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-[#004E89]" />
                  <h3 className="text-lg font-bold text-[#004E89]">{assignment.title}</h3>
                  {assignment.submissions.length > 0 && (
                    <Badge variant="info">
                      {assignment.submissions.length} submission(s)
                    </Badge>
                  )}
                </div>
                {assignment.description && (
                  <p className="text-gray-700 mb-2">{assignment.description}</p>
                )}
                {assignment.session && (
                  <p className="text-sm text-gray-600">Session: {assignment.session.title}</p>
                )}
                {assignment.dueDate && (
                  <p className="text-sm text-gray-600">
                    Due: {new Date(assignment.dueDate).toLocaleDateString('ar-EG')}
                  </p>
                )}
              </div>

              {assignment.submissions.length > 0 && (
                <div className="space-y-3 mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900">Submissions:</h4>
                  {assignment.submissions.map((submission) => (
                    <div key={submission.id} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{submission.student.name}</p>
                          <p className="text-sm text-gray-600">
                            Submitted: {new Date(submission.submittedAt).toLocaleString('ar-EG')}
                          </p>
                        </div>
                        {submission.grade !== null ? (
                          <Badge variant="success">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Graded: {submission.grade}/100
                          </Badge>
                        ) : (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => {
                              setSelectedSubmission(submission)
                              const existingErrors = submission.grammarErrors 
                                ? JSON.parse(submission.grammarErrors) 
                                : []
                              setGradeData({ 
                                grade: submission.grade?.toString() || '', 
                                feedback: submission.feedback || '', 
                                grammarErrors: existingErrors 
                              })
                            }}
                          >
                            <Send className="h-3 w-3 mr-1" />
                            Grade
                          </Button>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Answer:</strong> {submission.textAnswer}
                      </p>
                      {submission.feedback && (
                        <p className="text-sm text-blue-700">
                          <strong>Your Feedback:</strong> {submission.feedback}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))
        )}
      </div>

      {showCreateForm && (
        <Modal
          isOpen={true}
          onClose={() => setShowCreateForm(false)}
          title="Create New Assignment / إنشاء واجب جديد"
        >
          <div className="space-y-4">
            <Input
              label="Assignment Title / عنوان الواجب"
              value={newAssignment.title}
              onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
              placeholder="e.g., Essay on Environmental Protection"
            />
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Description / الوصف
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004E89]"
                value={newAssignment.description}
                onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                placeholder="Assignment instructions..."
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Linked Session (Optional) / الحصة المرتبطة (اختياري)
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004E89]"
                value={newAssignment.sessionId}
                onChange={(e) => setNewAssignment({ ...newAssignment, sessionId: e.target.value })}
              >
                <option value="">No session</option>
                {sessions.map((session) => (
                  <option key={session.id} value={session.id}>
                    {session.title}
                  </option>
                ))}
              </select>
            </div>
            <Input
              label="Due Date (Optional) / تاريخ التسليم (اختياري)"
              type="datetime-local"
              value={newAssignment.dueDate}
              onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
            />
            <div className="flex gap-2">
              <Button
                variant="primary"
                fullWidth
                onClick={handleCreateAssignment}
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

      {selectedSubmission && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedSubmission(null)}
          title={`Grade: ${selectedSubmission.student.name}`}
        >
          <div className="space-y-4 max-h-[80vh] overflow-y-auto">
            <GrammarErrorHighlighter
              studentAnswer={selectedSubmission.textAnswer}
              errors={gradeData.grammarErrors}
              onErrorsChange={(errors) => setGradeData({ ...gradeData, grammarErrors: errors })}
            />
            
            <Input
              label="Grade (0-100) / الدرجة"
              type="number"
              min="0"
              max="100"
              value={gradeData.grade}
              onChange={(e) => setGradeData({ ...gradeData, grade: e.target.value })}
              placeholder="e.g., 85"
            />
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                General Feedback (Optional) / التعليق العام (اختياري)
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004E89] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value={gradeData.feedback}
                onChange={(e) => setGradeData({ ...gradeData, feedback: e.target.value })}
                placeholder="Provide general feedback to the student..."
                rows={4}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="primary"
                fullWidth
                onClick={handleGradeSubmission}
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Submit Grade / تسليم'}
              </Button>
              <Button
                variant="outline"
                fullWidth
                onClick={() => setSelectedSubmission(null)}
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
