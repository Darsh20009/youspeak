import { useEffect } from 'react';
import { useRoute } from 'wouter';
import LiveSessionRoom from './LiveSessionRoom';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from 'wouter';
import { Loader2 } from 'lucide-react';

export default function LiveSession() {
  const [, params] = useRoute('/session/:roomToken');
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation('/login');
    }
  }, [isLoading, user, setLocation]);

  useEffect(() => {
    if (!isLoading && user && !params?.roomToken) {
      setLocation('/my-session');
    }
  }, [isLoading, user, params?.roomToken, setLocation]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-white animate-spin mx-auto mb-4" />
          <p className="text-white text-xl">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!user || !params?.roomToken) {
    return null;
  }

  const handleLeave = () => {
    setLocation('/my-session');
  };

  return (
    <LiveSessionRoom
      roomId={params.roomToken}
      studentId={user.role === 'student' ? user.id : ''}
      sheikhId={user.role === 'supervisor' ? user.id : ''}
      onLeave={handleLeave}
    />
  );
}
