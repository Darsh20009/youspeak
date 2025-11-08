import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import TeacherDashboardClient from './TeacherDashboardClient'

export default async function TeacherDashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  if (session.user.role !== 'TEACHER') {
    redirect('/dashboard')
  }

  const teacherProfile = await prisma.teacherProfile.findUnique({
    where: { userId: session.user.id }
  })

  if (!teacherProfile) {
    return <div>Error: Teacher profile not found</div>
  }

  return (
    <TeacherDashboardClient
      user={{
        name: session.user.name,
        email: session.user.email,
        teacherProfileId: teacherProfile.id
      }}
    />
  )
}
