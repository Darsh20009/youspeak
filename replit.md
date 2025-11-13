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

## Recent Changes (November 13, 2024)
-   **Database Migration:** Successfully migrated from filess.io to AWS PostgreSQL database
-   **API Enhancements:** Added complete CRUD operations for all resources:
    -   Sessions: Added PUT and DELETE endpoints for teachers (`/api/teacher/sessions/[id]`)
    -   Assignments: Added GET, PUT, DELETE endpoints for teachers (`/api/teacher/assignments/[id]`)
    -   Packages: Added POST (create), PUT, DELETE endpoints for admins (`/api/admin/packages`, `/api/admin/packages/[id]`)
    -   Subscriptions: Added GET, PUT, DELETE endpoints for admins (`/api/admin/subscriptions/[id]`)
    -   Chat: Added DELETE endpoint for messages (`/api/chat/messages/[id]`)
-   **Authorization Helpers:** Created `lib/auth-helpers.ts` with reusable functions (`requireTeacher`, `requireAdmin`, `requireStudent`, `parseJsonBody`) to standardize authentication and authorization across endpoints
-   **Security Fixes:** Resolved authentication issues by properly configuring NEXTAUTH_SECRET
-   **Code Quality:** Refactored endpoints to use shared authorization helpers, improving maintainability and consistency