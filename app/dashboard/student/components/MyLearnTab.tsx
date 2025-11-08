'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Check, X } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Alert from '@/components/ui/Alert'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import Badge from '@/components/ui/Badge'

interface Word {
  id: string
  englishWord: string
  arabicMeaning: string
  exampleSentence: string | null
  known: boolean
  reviewCount: number
  createdAt: string
}

export default function MyLearnTab({ isActive }: { isActive: boolean }) {
  const [words, setWords] = useState<Word[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newWord, setNewWord] = useState({
    englishWord: '',
    arabicMeaning: '',
    exampleSentence: ''
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (isActive) {
      fetchWords()
    }
  }, [isActive])

  async function fetchWords() {
    try {
      const response = await fetch('/api/words')
      if (response.ok) {
        const data = await response.json()
        setWords(data)
      }
    } catch (error) {
      console.error('Error fetching words:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleAddWord() {
    if (!newWord.englishWord || !newWord.arabicMeaning) {
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('/api/words', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWord)
      })

      if (response.ok) {
        const word = await response.json()
        setWords([word, ...words])
        setNewWord({ englishWord: '', arabicMeaning: '', exampleSentence: '' })
        setShowAddForm(false)
      }
    } catch (error) {
      console.error('Error adding word:', error)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleToggleKnown(wordId: string, currentKnown: boolean) {
    try {
      const response = await fetch(`/api/words/${wordId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ known: !currentKnown })
      })

      if (response.ok) {
        setWords(words.map(w => 
          w.id === wordId ? { ...w, known: !currentKnown } : w
        ))
      }
    } catch (error) {
      console.error('Error updating word:', error)
    }
  }

  async function handleDeleteWord(wordId: string) {
    if (!confirm('Are you sure you want to delete this word?')) {
      return
    }

    try {
      const response = await fetch(`/api/words/${wordId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setWords(words.filter(w => w.id !== wordId))
      }
    } catch (error) {
      console.error('Error deleting word:', error)
    }
  }

  if (!isActive) {
    return (
      <div>
        <h2 className="text-3xl font-bold text-[#004E89] mb-6">
          MyLearn - My Words / كلماتي
        </h2>
        <Alert variant="warning">
          <p>Activate your account to access this feature / قم بتفعيل حسابك للوصول لهذه الميزة</p>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-[#004E89]">
          MyLearn - My Words / كلماتي
        </h2>
        <Button
          variant="primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Word / أضف كلمة
        </Button>
      </div>

      {showAddForm && (
        <Card variant="elevated">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Word / أضف كلمة جديدة</h3>
          <div className="space-y-4">
            <Input
              label="English Word / الكلمة بالإنجليزية"
              value={newWord.englishWord}
              onChange={(e) => setNewWord({ ...newWord, englishWord: e.target.value })}
              placeholder="e.g., Hello"
            />
            <Input
              label="Arabic Meaning / المعنى بالعربية"
              value={newWord.arabicMeaning}
              onChange={(e) => setNewWord({ ...newWord, arabicMeaning: e.target.value })}
              placeholder="مثال: مرحباً"
            />
            <Input
              label="Example Sentence (Optional) / جملة توضيحية (اختياري)"
              value={newWord.exampleSentence}
              onChange={(e) => setNewWord({ ...newWord, exampleSentence: e.target.value })}
              placeholder="e.g., Hello, how are you?"
            />
            <div className="flex gap-2">
              <Button
                variant="primary"
                onClick={handleAddWord}
                disabled={submitting || !newWord.englishWord || !newWord.arabicMeaning}
              >
                {submitting ? 'Adding...' : 'Add / إضافة'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddForm(false)}
              >
                Cancel / إلغاء
              </Button>
            </div>
          </div>
        </Card>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      ) : words.length === 0 ? (
        <Alert variant="info">
          <p>No words saved yet. Start adding words to build your vocabulary!</p>
          <p>لم تقم بحفظ أي كلمات بعد. ابدأ بإضافة كلمات لبناء مفرداتك!</p>
        </Alert>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {words.map((word) => (
            <Card key={word.id} variant="elevated">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-[#004E89]">{word.englishWord}</h3>
                    {word.known && (
                      <Badge variant="success" size="sm">
                        <Check className="h-3 w-3 mr-1" />
                        Known
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-700 mb-2">{word.arabicMeaning}</p>
                  {word.exampleSentence && (
                    <p className="text-sm text-gray-600 italic">{word.exampleSentence}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  variant={word.known ? 'outline' : 'primary'}
                  size="sm"
                  fullWidth
                  onClick={() => handleToggleKnown(word.id, word.known)}
                >
                  {word.known ? (
                    <>
                      <X className="h-4 w-4 mr-1" />
                      Mark Unknown / غير محفوظة
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Mark Known / محفوظة
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteWord(word.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="text-center text-gray-600">
        <p className="text-lg font-semibold">
          Total Words: {words.length} | Known: {words.filter(w => w.known).length}
        </p>
        <p className="text-sm">
          إجمالي الكلمات: {words.length} | محفوظة: {words.filter(w => w.known).length}
        </p>
      </div>
    </div>
  )
}
