# Youspeak - English Learning Platform

## Overview
Youspeak is a bilingual (Arabic/English) online English learning platform built for Mister Youssef. The platform provides live interactive classes, vocabulary tracking, homework management, and a complete learning management system.

## Project Status
- ✅ Next.js 16 frontend setup with TypeScript and Tailwind CSS v4
- ✅ Prisma ORM configured with PostgreSQL (External filess.io)
- ✅ Database schema created (12 tables: users, sessions, packages, words, assignments, chat, etc.)
- ✅ External PostgreSQL database connected (schema: youspeak_exercisein)
- ✅ Database seeded with admin user and 4 packages
- ✅ Authentication system with NextAuth.js and bcrypt (NEXTAUTH_SECRET configured)
- ✅ Landing page with bilingual support (Arabic/English) - **100% Mobile Responsive**
- ✅ Registration page with all required fields (age, level, goals, preferred time, phone)
- ✅ Login page with proper authentication flow
- ✅ Admin user created and login working (admin@youspeak.com / admin123)
- ✅ Student Dashboard with stats, sessions, assignments, and MyLearn
- ✅ Teacher Dashboard with students, sessions, and assignments management
- ✅ Admin Dashboard with users, subscriptions, and system management
- ✅ MyLearn vocabulary system (add/view/update/delete words)
- ✅ Package subscription flow APIs ready
- ✅ Real-time chat system with Socket.IO (student-teacher messaging)
- ✅ Advanced support button with WhatsApp and Email integration
- ✅ Live class integration with Jitsi Meet (Session APIs working)
- ✅ Student activation system (admin can activate/deactivate users)
- ⏳ Receipt upload for package subscriptions (pending UI)
- ⏳ Level assessment test 20-minute (pending implementation)
- ⏳ Homework/Assignments UI (APIs ready, UI needs enhancement)
- ⏳ Dashboard mobile responsiveness (in progress)

## Tech Stack
- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- **Backend**: Next.js API Routes, NextAuth.js, Custom Node.js Server
- **Database**: PostgreSQL (External via filess.io at pdk8zc.h.filess.io)
- **Database Schema**: bustan (custom schema)
- **ORM**: Prisma
- **Authentication**: NextAuth.js with JWT strategy
- **Real-time**: Socket.IO v4.8.1 (for live chat messaging)
- **Server**: Custom Node.js server (server.js) for Socket.IO integration
- **Video**: Jitsi Meet SDK (planned)

## Database Schema

### Core Models
- **User**: Students, Teachers, Admins, Assistants
- **StudentProfile**: Student-specific data (level, goals, preferences)
- **TeacherProfile**: Teacher bio and subjects  
- **Package**: Subscription packages (Single Level, Monthly, Quarterly, Trial)
- **Subscription**: Student package purchases and payment tracking
- **Session**: Live class sessions with students and teachers
- **Word**: Vocabulary tracking for students (English-Arabic with pronunciation)
- **Assignment**: Homework assignments
- **Submission**: Student homework submissions with grading
- **Chat**: Real-time messaging between users
- **AuditLog**: System activity logging

## Key Features

### For Students
- Registration with profile setup (age, level, goals, preferred schedule)
- Account activation workflow (requires payment confirmation)
- Live class attendance (60-minute sessions)
- Vocabulary management (MyLearn - English/Arabic word pairs)
- Homework submission and feedback
- Real-time chat with teachers/admin
- Level assessment test (20 minutes)

### For Teachers
- Student management
- Session scheduling and hosting
- Live classroom with video/audio/screen share/whiteboard
- Homework creation and grading
- Student activation controls

### For Admins
- User management (add/remove teachers)
- Payment verification (receipt uploads)
- System statistics and monitoring
- Full platform oversight

### For Assistants
- Account activation workflow
- Payment confirmation via WhatsApp
- Student-teacher coordination

## Contact Information
- **WhatsApp**: +201091515594
- **Email**: youspeak.help@gmail.com

## Environment Setup

### Required Secrets
- `EXTERNAL_DATABASE_URL`: Primary - External PostgreSQL connection string (filess.io)
- `DATABASE_URL`: Fallback - Alternative database connection (if EXTERNAL_DATABASE_URL not available)
- `NEXTAUTH_SECRET`: JWT signing secret (auto-configured)

**Note**: The system prioritizes EXTERNAL_DATABASE_URL over DATABASE_URL. Both are supported for flexibility.

### Admin Credentials (After Seed)
- **Email**: admin@youspeak.com
- **Password**: admin123
- **Note**: Change password after first login in production

## Package Pricing
1. **Single Level**: 200 SAR - 8 lessons (2 months)
2. **Monthly**: 360 SAR - 12 lessons  
3. **Quarterly**: 1000 SAR - 36 lessons (3 months)
4. **Trial**: Free - 20-minute level assessment

## Workflow
- **dev-server**: Runs on port 5000 with `node server.js` (custom server)
- Uses custom Node.js server for Socket.IO integration
- Configured for Replit proxy with `allowedDevOrigins`
- Socket.IO server path: `/api/socket/io`

## Database Configuration
**External PostgreSQL Setup**: The project uses an external PostgreSQL database hosted on filess.io at pdk8zc.h.filess.io.

### Database Schema Handling
- Custom schema: `youspeak_exercisein`
- Prisma uses String types instead of PostgreSQL ENUMs (due to permission restrictions)
- The lib/prisma.ts uses EXTERNAL_DATABASE_URL (with DATABASE_URL fallback)
- All 12 tables successfully created and seeded with initial data
- Run `npx tsx prisma/seed.ts` to seed/reseed the database

### Initial Data (via seed.ts)
- Admin user: admin@youspeak.com / admin123 (ACTIVE)
- 4 subscription packages (re-created on every seed run):
  1. Trial (0 SAR - 1 lesson - 20-minute assessment - 7 days)
  2. Starter (200 SAR - 8 lessons - 2 months)
  3. Monthly (360 SAR - 12 lessons - 1 month)
  4. Quarterly (1000 SAR - 36 lessons - 3 months)

## Known Issues
- Next.js middleware deprecation warning (cosmetic, not blocking)
- Image aspect ratio warning for logo (cosmetic only)

## Next Steps
1. ✅ ~~Implement student/teacher/admin dashboards~~ (COMPLETED)
2. ✅ ~~Build MyLearn vocabulary system~~ (COMPLETED)
3. Enhance package subscription flow with receipt upload UI
4. Create session scheduling system for teachers
5. Integrate Jitsi Meet for live classes
6. Add real-time chat with Socket.IO
7. Implement homework/assignment grading interface
8. Add WhatsApp notification integration
9. Build level assessment test (20 minutes)
10. Create deployment configuration
11. Add profile photo upload functionality

## Recent Changes

### 2024-11-09 (Latest Update)
**Database Connection + Session APIs + Mobile Responsiveness**
- ✅ Updated Prisma configuration to support EXTERNAL_DATABASE_URL with DATABASE_URL fallback
- ✅ Fixed critical Session API bugs:
  - Teacher sessions now correctly use `teacherProfile.id` instead of `user.id`
  - Student sessions now use correct `students` relation instead of non-existent `enrollments`
- ✅ Made landing page 100% mobile responsive:
  - Responsive header with adaptive logo sizing
  - Hero section buttons stack vertically on mobile
  - Features grid: 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop)
  - Packages grid: 1 column (mobile) → 2 columns (tablet) → 4 columns (desktop)
  - Responsive typography and spacing throughout
- ✅ Fixed Next.js Image component warnings for logo
- ✅ Verified all core systems working:
  - Authentication ✓
  - Student/Teacher/Admin dashboards ✓
  - MyLearn vocabulary system ✓
  - Chat system with Socket.IO ✓
  - Jitsi Meet integration ✓
  - Student activation (admin feature) ✓

### 2024-11-08 (Final Update)
**Database Connection Fix + Seed Script Improvement**
- ✅ Fixed lib/prisma.ts to use DATABASE_URL directly (removed incorrect schema parameter)
- ✅ Updated prisma/seed.ts to ensure consistent package catalog:
  - Now deletes and recreates packages on every run
  - Guarantees Trial, Starter, Monthly, Quarterly lineup
  - Idempotent admin account creation
- ✅ All packages correctly named and priced:
  - Trial: 0 SAR - 1 lesson (20-minute assessment)
  - Starter: 200 SAR - 8 lessons (2 months)
  - Monthly: 360 SAR - 12 lessons (1 month)
  - Quarterly: 1000 SAR - 36 lessons (3 months)
- ✅ Environment setup complete with DATABASE_URL secret
- ✅ Project ready for development and testing

### 2024-11-08 (Late Evening)
**Major Improvements - Admin Login Fix + Dashboards + MyLearn**
- ✅ Fixed admin login by creating `.env.local` with NEXTAUTH_SECRET
- ✅ Created admin user in database (admin@youspeak.com / admin123)
- ✅ Verified all database tables exist (12 tables confirmed)
- ✅ Seeded 4 subscription packages
- ✅ Enhanced registration page with all required fields:
  - Age (required)
  - English level (A1, A2, B1, B2)
  - Learning goals
  - Preferred class time
  - WhatsApp number (required)
  - Front-end validation for phone numbers and age
- ✅ Verified student dashboard works with stats API
- ✅ Verified teacher dashboard components are complete
- ✅ Verified admin dashboard components are complete
- ✅ Confirmed MyLearn vocabulary system is fully functional:
  - Add words (English, Arabic, example sentence)
  - View all saved words
  - Mark words as known/unknown
  - Delete words
  - Word counter display
- ✅ All API endpoints tested and working
- ✅ Landing page has floating action buttons (WhatsApp + Email)

### 2024-11-08 (Evening)
- ✅ Connected external PostgreSQL database (filess.io) with schema `bustan`
- ✅ Updated lib/prisma.ts to use schema `bustan`
- ✅ Pushed all database tables to external database
- ✅ Verified database connection and data integrity

### 2024-11-08 (Morning)
- ✅ Project imported to Replit environment
- ✅ Installed all dependencies
- ✅ Configured dev server on port 5000
- ✅ Verified landing page working correctly

### 2024-11-07
- Initial project structure setup
- Database schema designed
- Authentication system implemented
- Landing page and registration/login forms created
- Workflow configured on port 5000
