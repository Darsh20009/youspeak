import type { Express, Request, Response } from "express";
import { storage } from "./storage";
import { requireAuth, type AuthenticatedRequest } from "./authMiddleware";

export function setupStudentSessionRoutes(app: Express) {
  // Get student's sessions
  app.get('/api/student/sessions', requireAuth, async (req: Request, res: Response) => {
    try {
      const userId = (req as AuthenticatedRequest).user!.id;
      
      // Get all students and find by userId to avoid password column issue
      const allStudents = await storage.getAllStudents();
      const student = allStudents.find(s => s.userId === userId);
      
      if (!student) {
        return res.status(404).json({ message: "سجل الطالب غير موجود" });
      }
      
      const sessions = await storage.getAllSessionAccess(student.id);
      const liveRooms = await storage.getLiveRoomsByStudent(student.id);
      
      // Merge roomToken into sessions
      const sessionsWithRoomToken = sessions.map(session => {
        const room = liveRooms.find(r => 
          r.sessionDate.toISOString().split('T')[0] === session.sessionDate
        );
        return {
          ...session,
          roomToken: room?.roomToken,
          roomId: room?.id,
        };
      });
      
      res.json(sessionsWithRoomToken);
    } catch (error) {
      console.error("Error fetching student sessions:", error);
      res.status(500).json({ message: "خطأ في جلب الحصص" });
    }
  });

  // Get today's assignment
  app.get('/api/student/assignment/today', requireAuth, async (req: Request, res: Response) => {
    try {
      const userId = (req as AuthenticatedRequest).user!.id;
      
      // Get student record from userId
      const students = await storage.getAllStudents();
      const student = students.find(s => s.userId === userId);
      
      if (!student) {
        return res.status(404).json({ message: "سجل الطالب غير موجود" });
      }
      
      const today = new Date().toISOString().split('T')[0];
      const assignment = await storage.getDailyAssignment(student.id, today);
      
      if (!assignment) {
        return res.status(404).json({ message: "لا يوجد تكليف اليوم" });
      }
      
      res.json(assignment);
    } catch (error) {
      console.error("Error fetching today's assignment:", error);
      res.status(500).json({ message: "خطأ في جلب التكليف" });
    }
  });

  // Get all assignments
  app.get('/api/student/assignments', requireAuth, async (req: Request, res: Response) => {
    try {
      const userId = (req as AuthenticatedRequest).user!.id;
      
      // Get student record from userId
      const students = await storage.getAllStudents();
      const student = students.find(s => s.userId === userId);
      
      if (!student) {
        return res.status(404).json({ message: "سجل الطالب غير موجود" });
      }
      
      const assignments = await storage.getDailyAssignments(student.id);
      res.json(assignments);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      res.status(500).json({ message: "خطأ في جلب التكاليف" });
    }
  });
}
