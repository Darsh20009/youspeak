# Youspeak - English Learning Platform

## Overview
Youspeak is a bilingual (Arabic/English) online English learning platform designed for Mister Youssef. Its primary purpose is to provide an interactive and comprehensive environment for learning English, targeting a broad market with a focus on ease of use and effective learning methods. The platform offers live classes, vocabulary building tools, homework management, and a complete learning management system. Key capabilities include AI-powered grammar checking, interactive vocabulary discovery, and robust student/teacher/admin dashboards.

## User Preferences
I prefer simple language. I want iterative development. Ask before making major changes. I prefer detailed explanations. Do not make changes to the folder Z. Do not make changes to the file Y.

## System Architecture
The platform is built on a modern web stack featuring **Next.js 16 (App Router)** with **React 19**, **TypeScript**, and **Tailwind CSS v4** for the frontend, ensuring a mobile-responsive and visually appealing user experience with dark mode support. Backend functionalities are handled by **Next.js API Routes** and a custom **Node.js server** for real-time capabilities.

**Key Technical Implementations & Features:**
-   **Authentication:** Secured with **NextAuth.js** and JWT strategy.
-   **State Management:** Utilizes React's built-in hooks and context API.
-   **Real-time Communication:** Implemented with **Socket.IO v4.8.1** for live chat between students and teachers.
-   **Live Classes:** Integration with **Jitsi Meet SDK** for interactive video sessions.
-   **AI Integration:** Leverages **OpenAI GPT-5** for an advanced grammar checker feature, providing intelligent feedback on student assignments.
-   **Vocabulary Learning:** Features an interactive "Discover Words" system using swipe cards with framer-motion animations for an engaging learning experience.
-   **Internationalization:** Full bilingual support (Arabic/English) integrated throughout the platform, including WhatsApp notifications.
-   **Database Schema:** A robust schema with 12 core tables including Users, Sessions, Packages, Words, Assignments, and Chat, managed by Prisma ORM.
-   **Dashboards:** Dedicated and feature-rich dashboards for Students, Teachers, and Admins, providing tailored functionalities and insights.
-   **Workflow:** The development server runs on port 5000 with `node server.js` for Socket.IO integration, configured for Replit proxy.

## External Dependencies
-   **Database:** **PostgreSQL** hosted on AWS (configured via DATABASE_URL environment variable).
-   **ORM:** **Prisma**.
-   **Authentication:** **NextAuth.js** (requires NEXTAUTH_SECRET environment variable).
-   **Real-time Communication:** **Socket.IO**.
-   **Video Conferencing:** **Jitsi Meet SDK**.
-   **AI Services:** **OpenAI GPT-5** (for grammar checking).
-   **Translation Services:** **Google Translate API** (for word import and translation).
-   **Communication:** **WhatsApp API** (for notifications, subscription flows, and support).

## Recent Changes

### November 15, 2025
-   **Homepage Design Improvements:**
    -   Removed theme toggle button from marketing homepage
    -   Implemented professional beige gradient background (from-[#F5F1E8] via-[#E8DCC8] to-[#F5F1E8])
    -   Redesigned hero section with gradient text effects and modern styling
    -   Added trust indicators showing platform statistics (500+ Students, 50+ Teachers, etc.)
    -   Enhanced feature cards with individual gradient colors and hover effects
    -   Improved packages section with elegant design and BEST VALUE highlighting
    -   Restructured footer with separated contact information and bottom credit section
-   **Splash Screen Enhancements:**
    -   Fixed background to solid beige (#F5F1E8) with inline style for guaranteed opacity
    -   Changed text display to vertical layout (stacked words)
    -   Implemented typewriter effect with character-by-character animation
    -   Extended splash screen duration to 4 seconds
    -   Maintained correct word order: Your → English → Steps
    -   Added modern logo container with gradient background effect

### November 14, 2025
-   **AWS Database Connection Setup:** Successfully connected platform to AWS RDS PostgreSQL database
    -   Database Host: youspeak.czu88we8syd5.eu-north-1.rds.amazonaws.com
    -   Database Name: postgres
    -   Schema: youspeak_exercisein
    -   Port: 5432
    -   Connection managed via environment variables (AWS_DB_HOST, AWS_DB_PORT, AWS_DB_NAME, AWS_DB_USER, AWS_DB_PASSWORD)
    -   Created `start-server.js` to automatically construct DATABASE_URL from AWS credentials
    -   All 12 tables verified and working: Assignment, AuditLog, Chat, Package, Session, SessionStudent, StudentProfile, Submission, Subscription, TeacherProfile, User, Word
    -   Updated package.json to use new startup script
-   **Production Build & Login Fixes:**
    -   Fixed DATABASE_URL undefined error during production build on Render
    -   Updated `lib/prisma.ts` to handle missing DATABASE_URL gracefully with proper fallback logic
    -   Updated `start-server.js` to respect existing DATABASE_URL and only construct from AWS credentials when needed
    -   Fixed login issues by activating all users and resetting passwords to standard test password
    -   All user roles (Admin, Teacher, Student) can now login successfully
    -   Created comprehensive deployment guide (DEPLOYMENT.md) for production deployment
-   **Authentication Configuration:** 
    -   Configured NEXTAUTH_SECRET for secure session management
    -   Authentication system now fully operational
-   **Test Accounts Created:** Added test users for development and testing:
    -   Admin account: admin@youspeak.com (password: 123456)
    -   Teacher account: teacher@youspeak.com (password: 123456)
    -   Student account: student@youspeak.com (password: 123456)
-   **API Enhancements:** Added complete CRUD operations for all resources:
    -   Sessions: Added PUT and DELETE endpoints for teachers (`/api/teacher/sessions/[id]`)
    -   Assignments: Added GET, PUT, DELETE endpoints for teachers (`/api/teacher/assignments/[id]`)
    -   Packages: Added POST (create), PUT, DELETE endpoints for admins (`/api/admin/packages`, `/api/admin/packages/[id]`)
    -   Subscriptions: Added GET, PUT, DELETE endpoints for admins (`/api/admin/subscriptions/[id]`)
    -   Chat: Added DELETE endpoint for messages (`/api/chat/messages/[id]`)
-   **Authorization Helpers:** Created `lib/auth-helpers.ts` with reusable functions (`requireTeacher`, `requireAdmin`, `requireStudent`, `parseJsonBody`) to standardize authentication and authorization across endpoints
-   **Code Quality:** Refactored endpoints to use shared authorization helpers, improving maintainability and consistency