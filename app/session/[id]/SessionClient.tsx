'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Video, VideoOff, Users, ArrowLeft } from 'lucide-react'
import Button from '@/components/ui/Button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

declare global {
  interface Window {
    JitsiMeetExternalAPI: any
  }
}

interface SessionClientProps {
  sessionId: string
  user: {
    id: string
    name: string
    email: string
    role: string
  }
}

interface SessionData {
  id: string
  title: string
  description: string | null
  startTime: string
  endTime: string
  teacherId: string
  teacher: {
    name: string
  }
}

export default function SessionClient({ sessionId, user }: SessionClientProps) {
  const router = useRouter()
  const jitsiContainer = useRef<HTMLDivElement>(null)
  const [session, setSession] = useState<SessionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [jitsiApi, setJitsiApi] = useState<any>(null)

  useEffect(() => {
    fetchSession()
  }, [sessionId])

  useEffect(() => {
    if (session && jitsiContainer.current && !jitsiApi) {
      loadJitsiScript()
    }

    return () => {
      if (jitsiApi) {
        jitsiApi.dispose()
      }
    }
  }, [session])

  async function fetchSession() {
    try {
      const endpoint = user.role === 'TEACHER' 
        ? `/api/teacher/sessions/${sessionId}`
        : `/api/student/sessions/${sessionId}`
      
      const response = await fetch(endpoint)
      if (response.ok) {
        const data = await response.json()
        setSession(data)
      } else {
        alert('Session not found or you do not have access')
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Error fetching session:', error)
      alert('Error loading session')
      router.push('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  function loadJitsiScript() {
    const script = document.createElement('script')
    script.src = 'https://meet.jit.si/external_api.js'
    script.async = true
    script.onload = () => initializeJitsi()
    document.body.appendChild(script)
  }

  function initializeJitsi() {
    if (!jitsiContainer.current || !session) return

    const domain = 'meet.jit.si'
    const options = {
      roomName: `YouSpeak_${sessionId}`,
      width: '100%',
      height: '100%',
      parentNode: jitsiContainer.current,
      userInfo: {
        displayName: user.name,
        email: user.email
      },
      configOverwrite: {
        startWithAudioMuted: true,
        startWithVideoMuted: true,
        prejoinPageEnabled: true,
        enableWelcomePage: false,
        enableClosePage: false
      },
      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
        TOOLBAR_BUTTONS: [
          'microphone',
          'camera',
          'closedcaptions',
          'desktop',
          'fullscreen',
          'fodeviceselection',
          'hangup',
          'profile',
          'chat',
          'recording',
          'livestreaming',
          'etherpad',
          'sharedvideo',
          'settings',
          'raisehand',
          'videoquality',
          'filmstrip',
          'stats',
          'shortcuts',
          'tileview',
          'download',
          'help',
          'mute-everyone'
        ]
      }
    }

    const api = new window.JitsiMeetExternalAPI(domain, options)
    setJitsiApi(api)

    api.addEventListener('videoConferenceJoined', () => {
      console.log('User joined the conference')
    })

    api.addEventListener('videoConferenceLeft', () => {
      console.log('User left the conference')
      router.push('/dashboard')
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5DC] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex flex-col">
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push('/dashboard')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back / رجوع
            </Button>
            <div>
              <h1 className="text-xl font-bold text-[#004E89]">
                {session.title}
              </h1>
              <p className="text-sm text-gray-600">
                Teacher: {session.teacher.name} | {new Date(session.startTime).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Video className="h-5 w-5 text-[#004E89]" />
            <span className="text-sm font-medium text-[#004E89]">Live Session</span>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto h-full">
          <div 
            ref={jitsiContainer} 
            className="w-full h-full bg-gray-900 rounded-lg shadow-xl overflow-hidden"
            style={{ minHeight: '600px' }}
          />
        </div>
      </div>
    </div>
  )
}
