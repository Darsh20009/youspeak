import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  pgSchema,
  timestamp,
  varchar,
  text,
  integer,
  boolean,
  decimal,
  date,
  unique,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

const bustanSchema = pgSchema("bustan");

// Session storage table (required for Replit Auth)
export const sessions = bustanSchema.table(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table (required for Replit Auth)
export const users = bustanSchema.table("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  // Additional fields for Islamic education platform
  role: varchar("role").default("student"), // student, supervisor, admin
  passwordHash: varchar("password_hash"), // Secure password storage for all roles
  phoneNumber: varchar("phone_number"),
  age: integer("age"),
  educationLevel: varchar("education_level"),
  quranExperience: varchar("quran_experience"),
  memorization_level: varchar("memorization_level"), // مستوى الحفظ: لم أبدأ، أقل من جزء، جزء واحد، أكثر من جزء، إلخ
  learningGoals: text("learning_goals"),
  preferredTime: varchar("preferred_time"),
  whatsappNumber: varchar("whatsapp_number"),
  emailVerified: boolean("email_verified").default(false), // للتحقق من البريد الإلكتروني
  passwordResetToken: varchar("password_reset_token"), // رمز إعادة تعيين كلمة المرور
  passwordResetExpiry: timestamp("password_reset_expiry"), // تاريخ انتهاء الرمز
  isActive: boolean("is_active").default(true),
  registrationCompleted: boolean("registration_completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Courses table
export const courses = bustanSchema.table("courses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  titleAr: varchar("title_ar").notNull(),
  titleEn: varchar("title_en"),
  descriptionAr: text("description_ar"),
  descriptionEn: text("description_en"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  instructorId: varchar("instructor_id").references(() => instructors.id),
  createdBy: varchar("created_by").references(() => users.id), // Sheikh who created the course
  level: varchar("level").notNull(), // beginner, intermediate, advanced
  category: varchar("category").notNull(), // quran, fiqh, ramadan
  maxStudents: integer("max_students").default(50),
  currentStudents: integer("current_students").default(0),
  price: integer("price").default(0), // in cents
  isPaid: boolean("is_paid").default(false), // whether course requires payment
  thumbnailUrl: varchar("thumbnail_url"), // course thumbnail image
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Instructors table
export const instructors = bustanSchema.table("instructors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  nameAr: varchar("name_ar").notNull(),
  nameEn: varchar("name_en"),
  titleAr: varchar("title_ar"),
  titleEn: varchar("title_en"),
  bioAr: text("bio_ar"),
  bioEn: text("bio_en"),
  profileImageUrl: varchar("profile_image_url"),
  qualifications: text("qualifications"),
  experience: text("experience"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Course Enrollments table
export const courseEnrollments = bustanSchema.table("course_enrollments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  courseId: varchar("course_id").references(() => courses.id).notNull(),
  enrollmentDate: timestamp("enrollment_date").defaultNow(),
  status: varchar("status").default("enrolled"), // enrolled, completed, dropped
  progress: integer("progress").default(0), // percentage
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Contact messages table
export const contactMessages = bustanSchema.table("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  phone: varchar("phone"),
  subject: varchar("subject").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Students table for detailed student management
export const students = bustanSchema.table("students", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  sheikhId: varchar("sheikh_id").references(() => users.id), // Sheikh assigned to this student
  studentName: varchar("student_name").notNull(),
  passwordHash: varchar("password_hash").notNull(), // Hashed password for security
  phoneNumber: varchar("phone_number"), // رقم الهاتف
  dateOfBirth: date("date_of_birth"),
  grade: varchar("grade"), // الصف الدراسي
  monthlySessionsCount: integer("monthly_sessions_count").default(0),
  monthlyPrice: decimal("monthly_price", { precision: 10, scale: 2 }).default("0"),
  isPaid: boolean("is_paid").default(false),
  isActive: boolean("is_active").default(true),
  memorizedSurahs: text("memorized_surahs"), // JSON string of memorized surahs
  currentLevel: varchar("current_level").default("beginner"), // beginner, intermediate, advanced
  notes: text("notes"), // ملاحظات عامة
  whatsappContact: varchar("whatsapp_contact").default("+966532441566"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Student sessions/classes table
export const studentSessions = bustanSchema.table("student_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").references(() => students.id).notNull(),
  sessionNumber: integer("session_number").notNull(),
  sessionDate: date("session_date").notNull(),
  sessionTime: varchar("session_time"), // e.g., "4:00 PM"
  evaluationGrade: varchar("evaluation_grade"), // ممتاز، جيد جداً، جيد، مقبول
  nextSessionDate: date("next_session_date"),
  newMaterial: text("new_material"), // الجديد
  reviewMaterial: text("review_material"), // المراجعة
  notes: text("notes"),
  attended: boolean("attended").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Student recitation errors table - enhanced with Sheikh notes
export const studentErrors = bustanSchema.table("student_errors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").references(() => students.id).notNull(),
  sheikhId: varchar("sheikh_id").references(() => users.id),
  surahNumber: integer("surah_number").notNull(),
  surahName: varchar("surah_name").notNull(),
  ayahNumber: integer("ayah_number").notNull(),
  wordIndex: integer("word_index"), // specific word if applicable
  errorType: varchar("error_type").default("recitation"), // recitation, memorization, tajweed
  errorDescription: text("error_description"),
  sheikhNote: text("sheikh_note"), // Sheikh's detailed feedback
  severity: varchar("severity").default("medium"), // low, medium, high
  isResolved: boolean("is_resolved").default(false),
  resolvedDate: date("resolved_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("student_errors_student_idx").on(table.studentId),
  index("student_errors_surah_ayah_idx").on(table.surahNumber, table.ayahNumber),
]);

// Student payments and subscriptions
export const studentPayments = bustanSchema.table("student_payments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").references(() => students.id).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency").default("SAR"),
  paymentDate: timestamp("payment_date").defaultNow(),
  paymentMethod: varchar("payment_method").default("whatsapp"), // whatsapp, bank, cash
  subscriptionPeriod: varchar("subscription_period").default("monthly"), // monthly, quarterly, yearly
  sessionsIncluded: integer("sessions_included").notNull(),
  sessionsRemaining: integer("sessions_remaining").notNull(),
  expiryDate: date("expiry_date"),
  status: varchar("status").default("active"), // active, expired, pending
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Class schedules
export const classSchedules = bustanSchema.table("class_schedules", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").references(() => students.id).notNull(),
  dayOfWeek: integer("day_of_week").notNull(), // 0-6 (Sunday=0)
  startTime: varchar("start_time").notNull(), // HH:MM format
  endTime: varchar("end_time").notNull(), // HH:MM format
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Quizzes/Exams table for courses
export const quizzes = bustanSchema.table("quizzes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  courseId: varchar("course_id").references(() => courses.id).notNull(),
  titleAr: varchar("title_ar").notNull(),
  titleEn: varchar("title_en"),
  passingScore: integer("passing_score").default(75), // percentage
  timeLimit: integer("time_limit"), // minutes
  questions: text("questions"), // JSON string
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Quiz attempts table
export const quizAttempts = bustanSchema.table("quiz_attempts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  quizId: varchar("quiz_id").references(() => quizzes.id).notNull(),
  studentId: varchar("student_id").references(() => students.id).notNull(),
  score: integer("score").notNull(), // percentage
  answers: text("answers"), // JSON string
  passed: boolean("passed").default(false),
  attemptDate: timestamp("attempt_date").defaultNow(),
  completedAt: timestamp("completed_at"),
  antiCheatLog: text("anti_cheat_log"), // JSON string for monitoring
});

// Session access control table
export const sessionAccess = bustanSchema.table("session_access", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").references(() => students.id).notNull(),
  scheduleId: varchar("schedule_id").references(() => classSchedules.id).notNull(),
  sessionDate: date("session_date").notNull(),
  startTime: varchar("start_time").notNull(),
  endTime: varchar("end_time").notNull(),
  zoomLink: varchar("zoom_link"), // Nullable zoom link for online sessions
  isEnabled: boolean("is_enabled").default(false),
  enabledBy: varchar("enabled_by").references(() => users.id),
  enabledAt: timestamp("enabled_at"),
});

// Student daily assignments table
export const dailyAssignments = bustanSchema.table("daily_assignments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").references(() => students.id).notNull(),
  assignmentDate: date("assignment_date").notNull(),
  memorization: text("memorization"), // New verses to memorize
  review: text("review"), // Verses to review
  mistakes: text("mistakes"), // JSON string of today's mistakes
  notes: text("notes"),
  assignedBy: varchar("assigned_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Educational trips table
export const trips = bustanSchema.table("trips", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  titleAr: varchar("title_ar").notNull(),
  titleEn: varchar("title_en"),
  descriptionAr: text("description_ar"),
  descriptionEn: text("description_en"),
  tripDate: date("trip_date").notNull(),
  location: varchar("location").notNull(),
  capacity: integer("capacity").default(50),
  currentEnrollments: integer("current_enrollments").default(0),
  price: integer("price").default(0), // in halalas (smallest SAR unit)
  imageUrl: varchar("image_url"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Trip enrollments table
export const tripEnrollments = bustanSchema.table("trip_enrollments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  tripId: varchar("trip_id").references(() => trips.id).notNull(),
  enrollmentDate: timestamp("enrollment_date").defaultNow(),
  status: varchar("status").default("enrolled"), // enrolled, completed, cancelled
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  unique("trip_enrollments_user_trip_unique").on(table.userId, table.tripId),
]);

// Student personal Quran notes table - for students to save their own notes on verses
export const quranNotes = bustanSchema.table("quran_notes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").references(() => users.id).notNull(),
  sheikhId: varchar("sheikh_id").references(() => users.id), // null if student's own note
  surahNumber: integer("surah_number").notNull(),
  ayahNumber: integer("ayah_number").notNull(),
  note: text("note"),
  noteText: text("note_text"), // alternate field name for compatibility
  noteType: varchar("note_type").default("student"), // student, sheikh_general, sheikh_error, sheikh_improvement
  tags: text("tags"), // JSON string of tags
  isVisible: boolean("is_visible").default(true), // visible to student
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("quran_notes_student_idx").on(table.studentId),
  index("quran_notes_sheikh_idx").on(table.sheikhId),
  index("quran_notes_surah_ayah_idx").on(table.surahNumber, table.ayahNumber),
]);

// Quran progress table - to track reading progress
export const quranProgress = bustanSchema.table("quran_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").references(() => users.id).notNull(),
  lastSurah: integer("last_surah").default(1),
  lastAyah: integer("last_ayah").default(1),
  bookmarkedVerses: text("bookmarked_verses"), // JSON string of bookmarked verses
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  unique("quran_progress_student_unique").on(table.studentId),
]);

// Supervisors table - for supervisor management
export const supervisors = bustanSchema.table("supervisors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  name: varchar("name").notNull(),
  whatsappNumber: varchar("whatsapp_number").notNull(),
  specialization: varchar("specialization"), // Quran, Fiqh, General
  experience: text("experience"),
  qualifications: text("qualifications"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Student notes table - for supervisor notes on students
export const studentNotes = bustanSchema.table("student_notes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").references(() => students.id).notNull(),
  authorId: varchar("author_id").references(() => users.id).notNull(), // Who wrote the note
  note: text("note").notNull(),
  noteType: varchar("note_type").default("general"), // general, behavioral, academic, attendance
  isPrivate: boolean("is_private").default(false), // Visible to parents or not
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Course modules/content table
export const courseModules = bustanSchema.table("course_modules", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  courseId: varchar("course_id").references(() => courses.id).notNull(),
  titleAr: varchar("title_ar").notNull(),
  titleEn: varchar("title_en"),
  descriptionAr: text("description_ar"),
  descriptionEn: text("description_en"),
  contentAr: text("content_ar"), // Module content in Arabic
  contentEn: text("content_en"), // Module content in English
  orderIndex: integer("order_index").notNull().default(0), // Module order in course
  videoUrl: varchar("video_url"), // Optional video link
  documentUrl: varchar("document_url"), // Optional document link
  duration: integer("duration"), // Duration in minutes
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Course stages/lessons - for organizing course into stages
export const courseStages = bustanSchema.table("course_stages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  moduleId: varchar("module_id").references(() => courseModules.id).notNull(),
  titleAr: varchar("title_ar").notNull(),
  titleEn: varchar("title_en"),
  descriptionAr: text("description_ar"),
  descriptionEn: text("description_en"),
  orderIndex: integer("order_index").notNull().default(0),
  isLocked: boolean("is_locked").default(false), // locked until previous stage is completed
  passingScore: integer("passing_score").default(75), // minimum score to pass this stage
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Course uploads - for multimedia content (videos, images, documents)
export const courseUploads = bustanSchema.table("course_uploads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  courseId: varchar("course_id").references(() => courses.id).notNull(),
  stageId: varchar("stage_id").references(() => courseStages.id), // optional - link to specific stage
  uploadedBy: varchar("uploaded_by").references(() => users.id).notNull(), // Sheikh who uploaded
  fileUrl: varchar("file_url").notNull(),
  fileName: varchar("file_name").notNull(),
  fileType: varchar("file_type").notNull(), // video, image, pdf, document
  fileSize: integer("file_size"), // in bytes
  titleAr: varchar("title_ar"),
  titleEn: varchar("title_en"),
  descriptionAr: text("description_ar"),
  descriptionEn: text("description_en"),
  orderIndex: integer("order_index").notNull().default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Exam questions table
export const examQuestions = bustanSchema.table("exam_questions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  courseId: varchar("course_id").references(() => courses.id).notNull(),
  questionAr: text("question_ar").notNull(),
  questionEn: text("question_en"),
  optionsAr: text("options_ar").notNull(), // JSON array of options in Arabic
  optionsEn: text("options_en"), // JSON array of options in English
  correctAnswer: integer("correct_answer").notNull(), // Index of correct option (0-based)
  explanation: text("explanation"), // Explanation for the correct answer
  points: integer("points").default(1), // Points for this question
  orderIndex: integer("order_index").notNull().default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Student exam attempts table
export const examAttempts = bustanSchema.table("exam_attempts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").references(() => users.id).notNull(),
  courseId: varchar("course_id").references(() => courses.id).notNull(),
  answers: text("answers").notNull(), // JSON object mapping question ID to answer index
  score: integer("score").notNull(), // Total score achieved
  totalPoints: integer("total_points").notNull(), // Total possible points
  percentage: decimal("percentage", { precision: 5, scale: 2 }).notNull(), // Percentage score
  passed: boolean("passed").notNull().default(false), // true if >= 75%
  startTime: timestamp("start_time").notNull(),
  submitTime: timestamp("submit_time").notNull(),
  timeTaken: integer("time_taken"), // Time taken in seconds
  certificateIssued: boolean("certificate_issued").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Live session rooms - for built-in live classes (replaces Zoom)
export const liveRooms = bustanSchema.table("live_rooms", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").references(() => students.id).notNull(),
  sheikhId: varchar("sheikh_id").references(() => users.id).notNull(),
  sessionDate: timestamp("session_date").notNull(),
  sessionTime: varchar("session_time").notNull(),
  roomToken: varchar("room_token").unique().notNull().default(sql`gen_random_uuid()`),
  status: varchar("status").default("scheduled"), // scheduled, active, completed, cancelled
  startedAt: timestamp("started_at"),
  endedAt: timestamp("ended_at"),
  duration: integer("duration"), // in minutes
  isEnabled: boolean("is_enabled").default(false),
  enabledAt: timestamp("enabled_at"),
  notes: text("notes"),
  password: varchar("password"), // Optional password for session
  allowedStudentIds: varchar("allowed_student_ids").array(), // Array of student IDs allowed to join
  entryAccessWindowMinutes: integer("entry_access_window_minutes").default(15), // Minutes before/after start time to allow entry
  cancellationReason: text("cancellation_reason"), // Reason if cancelled
  cancelledBy: varchar("cancelled_by").references(() => users.id), // Who cancelled the session
  cancelledAt: timestamp("cancelled_at"), // When it was cancelled
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("live_rooms_student_idx").on(table.studentId),
  index("live_rooms_sheikh_idx").on(table.sheikhId),
  index("live_rooms_token_idx").on(table.roomToken),
]);

// Live session participants - tracks who's in each live session
export const roomParticipants = bustanSchema.table("room_participants", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  roomId: varchar("room_id").references(() => liveRooms.id).notNull(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  role: varchar("role").notNull(), // sheikh, student
  joinedAt: timestamp("joined_at").defaultNow(),
  leftAt: timestamp("left_at"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Live annotations - Sheikh's real-time annotations on student's Quran
export const liveAnnotations = bustanSchema.table("live_annotations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  roomId: varchar("room_id").references(() => liveRooms.id).notNull(),
  sheikhId: varchar("sheikh_id").references(() => users.id).notNull(),
  studentId: varchar("student_id").references(() => students.id).notNull(),
  surahNumber: integer("surah_number").notNull(),
  ayahNumber: integer("ayah_number").notNull(),
  wordIndex: integer("word_index"), // null for full ayah annotation
  annotationType: varchar("annotation_type").notNull(), // highlight, note, error, correction
  highlightColor: varchar("highlight_color"), // for highlights
  noteText: text("note_text"), // for notes
  isPermanent: boolean("is_permanent").default(true), // keep after session ends
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  index("live_annotations_room_idx").on(table.roomId),
  index("live_annotations_student_idx").on(table.studentId),
  index("live_annotations_surah_ayah_idx").on(table.surahNumber, table.ayahNumber),
]);

// Session access control - controls when students can access session links
export const sessionAccessControl = bustanSchema.table("session_access_control", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").references(() => students.id).notNull(),
  sessionDate: date("session_date").notNull(),
  sessionTime: varchar("session_time").notNull(), // e.g., "4:00 PM"
  isEnabled: boolean("is_enabled").default(false), // Sheikh controls this
  enabledAt: timestamp("enabled_at"), // When sheikh enabled access
  enabledBy: varchar("enabled_by").references(() => users.id), // Sheikh who enabled
  expiresAt: timestamp("expires_at"), // Optional expiry time
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Messages table - for real-time chat between teacher and students
export const messages = bustanSchema.table("messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  senderId: varchar("sender_id").references(() => users.id).notNull(),
  receiverId: varchar("receiver_id").references(() => users.id), // null for group messages
  content: text("content").notNull(),
  messageType: varchar("message_type").default("text"), // text, image, file
  isRead: boolean("is_read").default(false),
  readAt: timestamp("read_at"),
  isGroupMessage: boolean("is_group_message").default(false), // For broadcasting to all students
  roomId: varchar("room_id"), // للربط بغرفة محادثة محددة
  createdAt: timestamp("created_at").defaultNow(),
});

// Notifications table - for student notifications
export const notifications = bustanSchema.table("notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  titleAr: varchar("title_ar").notNull(),
  titleEn: varchar("title_en"),
  messageAr: text("message_ar").notNull(),
  messageEn: text("message_en"),
  type: varchar("type").notNull(), // lesson, assignment, announcement, system
  isRead: boolean("is_read").default(false),
  readAt: timestamp("read_at"),
  actionUrl: varchar("action_url"), // URL to navigate when clicked
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  index("notifications_user_idx").on(table.userId),
  index("notifications_read_idx").on(table.isRead),
]);

// Quran word highlights table - for highlighting and annotating individual words
export const quranWordHighlights = bustanSchema.table("quran_word_highlights", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").references(() => users.id).notNull(),
  surahNumber: integer("surah_number").notNull(),
  ayahNumber: integer("ayah_number").notNull(),
  wordIndex: integer("word_index").notNull(), // Position of word in ayah (0-based)
  wordText: varchar("word_text").notNull(), // The actual word text for reference
  highlightColor: varchar("highlight_color").default("red"), // red, yellow, blue, green
  note: text("note"), // Optional note for this word
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Quran memorization tracking table - tracks which ayahs are being memorized and review progress
export const quranMemorization = bustanSchema.table("quran_memorization", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").references(() => users.id).notNull(),
  surahNumber: integer("surah_number").notNull(),
  fromAyah: integer("from_ayah").notNull(),
  toAyah: integer("to_ayah").notNull(),
  status: varchar("status").default("in_progress"), // in_progress, completed, reviewing
  masteryLevel: integer("mastery_level").default(0), // 0-100
  lastReviewed: timestamp("last_reviewed"),
  nextReviewDate: timestamp("next_review_date"), // Calculated next review date based on spaced repetition
  reviewCount: integer("review_count").default(0),
  lastDifficulty: varchar("last_difficulty"), // easy, medium, hard - last review difficulty rating
  mistakes: text("mistakes"), // JSON string of common mistakes
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Quran reading statistics table - tracks daily reading and progress
export const quranReadingStats = bustanSchema.table("quran_reading_stats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").references(() => users.id).notNull(),
  readingDate: date("reading_date").notNull(),
  ayahsRead: integer("ayahs_read").default(0),
  pagesRead: integer("pages_read").default(0),
  minutesSpent: integer("minutes_spent").default(0),
  surahsCompleted: text("surahs_completed"), // JSON array of surah numbers completed today
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  unique("quran_reading_stats_student_date_unique").on(table.studentId, table.readingDate),
]);

// Quran ayah markers table - for marking individual ayahs for memorization or review
export const quranAyahMarkers = bustanSchema.table("quran_ayah_markers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").references(() => users.id).notNull(),
  surahNumber: integer("surah_number").notNull(),
  ayahNumber: integer("ayah_number").notNull(),
  markerType: varchar("marker_type", { enum: ['memorization', 'review', 'bookmark', 'completed'] }).notNull(),
  markerColor: varchar("marker_color", { enum: ['blue', 'green', 'yellow', 'red', 'orange'] }).default("blue"),
  isActive: boolean("is_active").default(true),
  priority: integer("priority").default(0), // for ordering markers
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("quran_ayah_markers_student_idx").on(table.studentId),
  index("quran_ayah_markers_surah_ayah_idx").on(table.surahNumber, table.ayahNumber),
  unique("quran_ayah_markers_unique").on(table.studentId, table.surahNumber, table.ayahNumber, table.markerType),
]);

// Quran recitation attempts table - tracks recitation practice and corrections
export const quranRecitationAttempts = bustanSchema.table("quran_recitation_attempts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").references(() => users.id).notNull(),
  surahNumber: integer("surah_number").notNull(),
  fromAyah: integer("from_ayah").notNull(),
  toAyah: integer("to_ayah").notNull(),
  attemptDate: timestamp("attempt_date").defaultNow(),
  totalAyahs: integer("total_ayahs").notNull(),
  correctAyahs: integer("correct_ayahs").default(0),
  mistakes: text("mistakes"), // JSON array of mistakes {ayahNumber, type, description}
  score: integer("score"), // percentage score 0-100
  duration: integer("duration"), // duration in seconds
  isCompleted: boolean("is_completed").default(false),
  mode: varchar("mode", { enum: ['practice', 'test', 'review'] }).default("practice"),
  feedback: text("feedback"),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  index("quran_recitation_attempts_student_idx").on(table.studentId),
  index("quran_recitation_attempts_date_idx").on(table.attemptDate),
  index("quran_recitation_attempts_student_surah_date_idx").on(table.studentId, table.surahNumber, table.attemptDate),
]);

// Certificates table - for course completion and achievements
export const certificates = bustanSchema.table("certificates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").references(() => users.id).notNull(),
  courseId: varchar("course_id").references(() => courses.id),
  examAttemptId: varchar("exam_attempt_id").references(() => examAttempts.id), // Link to exam attempt
  titleAr: varchar("title_ar").notNull(),
  titleEn: varchar("title_en"),
  descriptionAr: text("description_ar"),
  descriptionEn: text("description_en"),
  issuedAt: timestamp("issued_at").defaultNow(),
  issuedBy: varchar("issued_by").references(() => users.id), // Supervisor who issued
  code: varchar("code").unique().notNull().default(sql`gen_random_uuid()`), // UUID for QR verification
  certificateNumber: varchar("certificate_number").unique().notNull().default(sql`gen_random_uuid()`), // Unique certificate number
  grade: varchar("grade"), // ممتاز، جيد جداً، جيد
  score: integer("score"), // Exam score if from exam
  teacherName: varchar("teacher_name"),
  qrImageDataUrl: text("qr_image_data_url"), // Base64 QR code image
  verificationToken: varchar("verification_token").unique().notNull().default(sql`gen_random_uuid()`), // For QR verification
  status: varchar("status").default("valid"), // valid, revoked, expired
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  index("certificates_code_idx").on(table.code),
  index("certificates_verification_token_idx").on(table.verificationToken),
  index("certificates_number_idx").on(table.certificateNumber),
]);

// Create insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true,
  phoneNumber: true,
  age: true,
  educationLevel: true,
  quranExperience: true,
  learningGoals: true,
  preferredTime: true,
  whatsappNumber: true,
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertInstructorSchema = createInsertSchema(instructors).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertEnrollmentSchema = createInsertSchema(courseEnrollments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

export const insertStudentSchema = createInsertSchema(students).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const studentUpdateSchema = insertStudentSchema.partial().extend({
  phoneNumber: z.string().optional(),
  monthlyPrice: z.string().or(z.number()).optional(),
  monthlySessionsCount: z.number().optional(),
});

export const insertStudentSessionSchema = createInsertSchema(studentSessions).omit({
  id: true,
  createdAt: true,
});

export const insertStudentErrorSchema = createInsertSchema(studentErrors).omit({
  id: true,
  createdAt: true,
});

export const insertStudentPaymentSchema = createInsertSchema(studentPayments).omit({
  id: true,
  createdAt: true,
});

export const insertClassScheduleSchema = createInsertSchema(classSchedules).omit({
  id: true,
  createdAt: true,
});

export const insertSessionAccessSchema = createInsertSchema(sessionAccess).omit({
  id: true,
  enabledAt: true,
});

export const insertDailyAssignmentSchema = createInsertSchema(dailyAssignments).omit({
  id: true,
  createdAt: true,
});

export const insertTripSchema = createInsertSchema(trips).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTripEnrollmentSchema = createInsertSchema(tripEnrollments).omit({
  id: true,
  createdAt: true,
});

export const insertQuranNoteSchema = createInsertSchema(quranNotes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertQuranProgressSchema = createInsertSchema(quranProgress).omit({
  id: true,
  updatedAt: true,
});

export const insertSupervisorSchema = createInsertSchema(supervisors).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertStudentNoteSchema = createInsertSchema(studentNotes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCourseModuleSchema = createInsertSchema(courseModules).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCourseStageSchema = createInsertSchema(courseStages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCourseUploadSchema = createInsertSchema(courseUploads).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertExamQuestionSchema = createInsertSchema(examQuestions).omit({
  id: true,
  createdAt: true,
});

export const insertExamAttemptSchema = createInsertSchema(examAttempts).omit({
  id: true,
  createdAt: true,
});

export const insertSessionAccessControlSchema = createInsertSchema(sessionAccessControl).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCertificateSchema = createInsertSchema(certificates).omit({
  id: true,
  createdAt: true,
  code: true, // Auto-generated UUID
  verificationToken: true, // Auto-generated UUID
  certificateNumber: true, // Auto-generated UUID
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  createdAt: true,
});

export const insertLiveAnnotationSchema = createInsertSchema(liveAnnotations).omit({
  id: true,
  createdAt: true,
});

export const insertLiveRoomSchema = createInsertSchema(liveRooms).omit({
  id: true,
  roomToken: true,
  createdAt: true,
  updatedAt: true,
});

export const insertRoomParticipantSchema = createInsertSchema(roomParticipants).omit({
  id: true,
  createdAt: true,
});

export const insertQuranWordHighlightSchema = createInsertSchema(quranWordHighlights).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertQuranMemorizationSchema = createInsertSchema(quranMemorization).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertQuranReadingStatsSchema = createInsertSchema(quranReadingStats).omit({
  id: true,
  createdAt: true,
});

export const ayahMarkerTypeEnum = z.enum(['memorization', 'review', 'bookmark', 'completed']);
export const ayahMarkerColorEnum = z.enum(['blue', 'green', 'yellow', 'red', 'orange']);
export const recitationModeEnum = z.enum(['practice', 'test', 'review']);

export const insertQuranAyahMarkerSchema = createInsertSchema(quranAyahMarkers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  markerType: ayahMarkerTypeEnum,
  markerColor: ayahMarkerColorEnum.optional(),
});

export const insertQuranRecitationAttemptSchema = createInsertSchema(quranRecitationAttempts).omit({
  id: true,
  createdAt: true,
}).extend({
  mode: recitationModeEnum.optional(),
});

// Export types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Instructor = typeof instructors.$inferSelect;
export type InsertInstructor = z.infer<typeof insertInstructorSchema>;
export type CourseEnrollment = typeof courseEnrollments.$inferSelect;
export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

export type Student = typeof students.$inferSelect;
export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type StudentSession = typeof studentSessions.$inferSelect;
export type InsertStudentSession = z.infer<typeof insertStudentSessionSchema>;
export type StudentError = typeof studentErrors.$inferSelect;
export type InsertStudentError = z.infer<typeof insertStudentErrorSchema>;
export type StudentPayment = typeof studentPayments.$inferSelect;
export type InsertStudentPayment = z.infer<typeof insertStudentPaymentSchema>;
export type ClassSchedule = typeof classSchedules.$inferSelect;
export type InsertClassSchedule = z.infer<typeof insertClassScheduleSchema>;
export type SessionAccess = typeof sessionAccess.$inferSelect;
export type InsertSessionAccess = z.infer<typeof insertSessionAccessSchema>;
export type DailyAssignment = typeof dailyAssignments.$inferSelect;
export type InsertDailyAssignment = z.infer<typeof insertDailyAssignmentSchema>;

export type Trip = typeof trips.$inferSelect;
export type InsertTrip = z.infer<typeof insertTripSchema>;
export type TripEnrollment = typeof tripEnrollments.$inferSelect;
export type InsertTripEnrollment = z.infer<typeof insertTripEnrollmentSchema>;
export type QuranNote = typeof quranNotes.$inferSelect;
export type InsertQuranNote = z.infer<typeof insertQuranNoteSchema>;
export type QuranProgress = typeof quranProgress.$inferSelect;
export type InsertQuranProgress = z.infer<typeof insertQuranProgressSchema>;
export type Supervisor = typeof supervisors.$inferSelect;
export type InsertSupervisor = z.infer<typeof insertSupervisorSchema>;
export type StudentNote = typeof studentNotes.$inferSelect;
export type InsertStudentNote = z.infer<typeof insertStudentNoteSchema>;
export type CourseModule = typeof courseModules.$inferSelect;
export type InsertCourseModule = z.infer<typeof insertCourseModuleSchema>;
export type CourseStage = typeof courseStages.$inferSelect;
export type InsertCourseStage = z.infer<typeof insertCourseStageSchema>;
export type CourseUpload = typeof courseUploads.$inferSelect;
export type InsertCourseUpload = z.infer<typeof insertCourseUploadSchema>;
export type ExamQuestion = typeof examQuestions.$inferSelect;
export type InsertExamQuestion = z.infer<typeof insertExamQuestionSchema>;
export type ExamAttempt = typeof examAttempts.$inferSelect;
export type InsertExamAttempt = z.infer<typeof insertExamAttemptSchema>;
export type SessionAccessControl = typeof sessionAccessControl.$inferSelect;
export type InsertSessionAccessControl = z.infer<typeof insertSessionAccessControlSchema>;
export type Certificate = typeof certificates.$inferSelect;
export type InsertCertificate = z.infer<typeof insertCertificateSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type LiveAnnotation = typeof liveAnnotations.$inferSelect;
export type InsertLiveAnnotation = z.infer<typeof insertLiveAnnotationSchema>;
export type LiveRoom = typeof liveRooms.$inferSelect;
export type InsertLiveRoom = z.infer<typeof insertLiveRoomSchema>;
export type RoomParticipant = typeof roomParticipants.$inferSelect;
export type InsertRoomParticipant = z.infer<typeof insertRoomParticipantSchema>;
export type QuranWordHighlight = typeof quranWordHighlights.$inferSelect;
export type InsertQuranWordHighlight = z.infer<typeof insertQuranWordHighlightSchema>;
export type QuranMemorization = typeof quranMemorization.$inferSelect;
export type InsertQuranMemorization = z.infer<typeof insertQuranMemorizationSchema>;
export type QuranReadingStats = typeof quranReadingStats.$inferSelect;
export type InsertQuranReadingStats = z.infer<typeof insertQuranReadingStatsSchema>;
export type QuranAyahMarker = typeof quranAyahMarkers.$inferSelect;
export type InsertQuranAyahMarker = z.infer<typeof insertQuranAyahMarkerSchema>;
export type QuranRecitationAttempt = typeof quranRecitationAttempts.$inferSelect;
export type InsertQuranRecitationAttempt = z.infer<typeof insertQuranRecitationAttemptSchema>;

// Draw command schema for whiteboard validation
export const drawCommandSchema = z.object({
  type: z.enum(['start', 'draw', 'end', 'clear', 'erase', 'shape', 'text', 'undo', 'redo']),
  x: z.number().min(0).max(10000).default(0),
  y: z.number().min(0).max(10000).default(0),
  x2: z.number().min(0).max(10000).optional(),
  y2: z.number().min(0).max(10000).optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  lineWidth: z.number().min(1).max(50).optional(),
  id: z.string().optional(),
  userId: z.string().optional(),
  commandId: z.string().optional(),
  clientId: z.string().optional(),
  shape: z.enum(['rectangle', 'circle', 'line', 'arrow']).optional(),
  text: z.string().max(500).optional(),
  filled: z.boolean().optional(),
});

export type DrawCommand = z.infer<typeof drawCommandSchema>;

// Extended types for Sheikh session view (joins session with student and room data)
export interface SheikhSessionView extends SessionAccess {
  studentName: string;
  studentPhone: string | null;
  roomToken?: string | null;
  roomId?: string | null;
  roomStatus?: string | null;
}

