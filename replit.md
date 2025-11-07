# Youspeak - English Learning Platform

## Overview
Youspeak is a bilingual (Arabic/English) online English learning platform built for Mister Youssef. The platform provides live interactive classes, vocabulary tracking, homework management, and a complete learning management system.

## Project Status
- ✅ Next.js 15 frontend setup with TypeScript and Tailwind CSS
- ✅ Prisma ORM configured with PostgreSQL (Replit-managed)
- ✅ Database schema created (users, sessions, packages, words, assignments, chat)
- ✅ Authentication system with NextAuth.js and bcrypt
- ✅ Landing page with bilingual support
- ✅ Registration and login pages
- ⏳ Dashboard pages (in progress)
- ⏳ Admin panel (pending)
- ⏳ Live class integration with Jitsi (pending)

## Tech Stack
- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, NextAuth.js
- **Database**: PostgreSQL (Replit-managed via Neon)
- **ORM**: Prisma
- **Authentication**: NextAuth.js with JWT strategy
- **Real-time**: Socket.IO (for chat)
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
- `DATABASE_URL`: PostgreSQL connection string (Replit-managed)
- `NEXTAUTH_SECRET`: JWT signing secret

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
- **dev-server**: Runs on port 5000 with `npm run dev`
- Configured for Replit proxy with `allowedDevOrigins`

## Database Migration Note
**IMPORTANT**: The project initially used an external filess.io PostgreSQL database, but due to permission restrictions (user lacking schema ownership), we switched to Replit's built-in PostgreSQL (Neon-backed) which provides:
- Full schema control and permissions
- Automatic backups
- Better integration with Replit platform
- Production-ready managed service

## Known Issues
- Database seeding requires manual execution after permissions are resolved
- Image aspect ratio warning for logo (cosmetic only)

## Next Steps
1. Implement student/teacher/admin dashboards
2. Build package subscription flow with receipt upload
3. Create session scheduling system
4. Integrate Jitsi Meet for live classes
5. Add real-time chat with Socket.IO
6. Build MyLearn vocabulary system
7. Implement homework/assignment features
8. Add WhatsApp notification integration
9. Create deployment configuration

## Recent Changes (2024-11-07)
- Initial project structure setup
- Database schema designed and pushed
- Authentication system implemented
- Landing page and registration/login forms created
- Workflow configured on port 5000
