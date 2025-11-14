'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Alert from '@/components/ui/Alert'

const TEST_ACCOUNTS = [
  { email: 'admin@youspeak.com', password: '123456', role: 'ADMIN', name: 'Mister Youssef' },
  { email: 'teacher@youspeak.com', password: '123456', role: 'TEACHER', name: 'Sarah Ahmed' },
  { email: 'ahmed@student.com', password: '123456', role: 'STUDENT', name: 'Ahmed Ali' },
]

export default function TestLoginPage() {
  const [results, setResults] = useState<any[]>([])
  const [testing, setTesting] = useState(false)

  const testLogin = async (account: typeof TEST_ACCOUNTS[0]) => {
    try {
      const result = await signIn('credentials', {
        email: account.email,
        password: account.password,
        redirect: false,
      })

      return {
        ...account,
        success: !result?.error,
        error: result?.error,
      }
    } catch (err: any) {
      return {
        ...account,
        success: false,
        error: err.message,
      }
    }
  }

  const runTests = async () => {
    setTesting(true)
    setResults([])
    
    const testResults = []
    for (const account of TEST_ACCOUNTS) {
      const result = await testLogin(account)
      testResults.push(result)
      setResults([...testResults])
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    
    setTesting(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5DC] to-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#004E89] mb-6">
          Login Test Page / صفحة اختبار تسجيل الدخول
        </h1>
        
        <Card variant="elevated" padding="lg" className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Accounts / حسابات الاختبار</h2>
          <div className="space-y-4">
            {TEST_ACCOUNTS.map((account, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold text-[#004E89]">{account.role} - {account.name}</p>
                <p className="text-sm text-gray-600">Email: {account.email}</p>
                <p className="text-sm text-gray-600">Password: {account.password}</p>
              </div>
            ))}
          </div>
          
          <Button
            onClick={runTests}
            disabled={testing}
            variant="primary"
            size="lg"
            className="mt-6"
            fullWidth
          >
            {testing ? 'Testing... / جارٍ الاختبار...' : 'Test All Accounts / اختبار جميع الحسابات'}
          </Button>
        </Card>

        {results.length > 0 && (
          <Card variant="elevated" padding="lg">
            <h2 className="text-xl font-semibold mb-4">Test Results / نتائج الاختبار</h2>
            <div className="space-y-3">
              {results.map((result, idx) => (
                <Alert
                  key={idx}
                  variant={result.success ? 'success' : 'error'}
                  dismissible={false}
                >
                  <div>
                    <p className="font-semibold">{result.role} - {result.name}</p>
                    <p className="text-sm">{result.email}</p>
                    {result.success ? (
                      <p className="text-sm mt-1">✅ Login successful / تسجيل الدخول نجح</p>
                    ) : (
                      <p className="text-sm mt-1">❌ Login failed: {result.error}</p>
                    )}
                  </div>
                </Alert>
              ))}
            </div>
            
            {results.every(r => r.success) && (
              <Alert variant="success" className="mt-4" dismissible={false}>
                <p className="font-bold">🎉 All tests passed! / جميع الاختبارات نجحت!</p>
                <p className="text-sm mt-1">All user roles can login successfully</p>
              </Alert>
            )}
          </Card>
        )}
      </div>
    </div>
  )
}
