import { useQuery } from "@tanstack/react-query";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'supervisor' | 'admin';
  phoneNumber?: string;
  registrationCompleted: boolean;
  studentId?: string;
  currentLevel?: string;
  memorizedSurahs?: string;
}

export function useAuth() {
  const { data: user, isLoading, refetch, error } = useQuery<User>({
    queryKey: ["/api/auth/user"],
    queryFn: async () => {
      const response = await fetch('/api/auth/user', {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Not authenticated');
      }

      const userData = await response.json();
      console.log('[useAuth] User data received:', userData);
      return userData;
    },
    retry: false,
    staleTime: Infinity, // لا تعتبر البيانات قديمة أبداً
    gcTime: Infinity, // احتفظ بالبيانات في الذاكرة
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      // Clear query cache and refetch
      refetch();

      // Redirect to home page
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user && !error,
    isStudent: user?.role === 'student',
    isSupervisor: user?.role === 'supervisor',
    isAdmin: user?.role === 'admin',
    logout,
    refetch,
  };
}