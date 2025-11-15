import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

export interface DailyAssignment {
  id: string;
  studentId: string;
  assignmentDate: string;
  memorization: string | null; // JSON string of memorization ranges
  review: string | null; // JSON string of review ranges
  mistakes: string | null;
  notes: string | null;
  assignedBy: string | null;
  createdAt: string;
}

export interface VerseRange {
  surah: number;
  startVerse: number;
  endVerse: number;
}

export function useTodayAssignment() {
  const { user } = useAuth();
  const studentId = (user as any)?.studentId;

  const { data: assignment, isLoading, error } = useQuery<DailyAssignment>({
    queryKey: ['/api/student/assignment/today'],
    enabled: !!studentId && user?.role === 'student',
    retry: false, // Don't retry if no assignment today
  });

  const parseVerseRanges = (jsonString: string | null): VerseRange[] => {
    if (!jsonString) return [];
    try {
      const parsed = JSON.parse(jsonString);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const memorizationRanges = assignment ? parseVerseRanges(assignment.memorization) : [];
  const reviewRanges = assignment ? parseVerseRanges(assignment.review) : [];

  const isVerseInRange = (surahNumber: number, ayahNumber: number, ranges: VerseRange[]): boolean => {
    return ranges.some(range => 
      range.surah === surahNumber && 
      ayahNumber >= range.startVerse && 
      ayahNumber <= range.endVerse
    );
  };

  const isMemorization = (surahNumber: number, ayahNumber: number) => {
    return isVerseInRange(surahNumber, ayahNumber, memorizationRanges);
  };

  const isReview = (surahNumber: number, ayahNumber: number) => {
    return isVerseInRange(surahNumber, ayahNumber, reviewRanges);
  };

  return {
    assignment,
    isLoading,
    error,
    memorizationRanges,
    reviewRanges,
    isMemorization,
    isReview,
  };
}
