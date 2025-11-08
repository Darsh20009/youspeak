import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import TeacherDashboardClient from './TeacherDashboardClient'

export default async function TeacherDashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  if (session.user.role !== 'TEACHER') {
    redirect('/dashboard')
  }

  return (
    <TeacherDashboardClient
      user={{
        name: session.user.name,
        email: session.user.email,
      }}
    />
  )
}
