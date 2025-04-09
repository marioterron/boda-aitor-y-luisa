# Wedding Invitation Management Platform - Product Requirements Document

## 1. Introduction
Planning a wedding involves many logistical challenges, and managing invitations is one of the most important tasks. The goal of this project is to provide a streamlined and user-friendly platform where the couple can manage RSVPs, track guest attendance, and gather dietary preferences without manually entering guest details. Guests can RSVP easily via a shared link and provide all relevant information themselves.

This platform aims to simplify the invitation process and provide clarity for both the couple and their guests.

## 2. Objectives & Goals
- **Primary Objective**: Enable the couple to efficiently manage RSVPs and guest details without prior manual data entry.
- **Goals**:
  - Reduce the time and effort required for invitation management.
  - Ensure guests can quickly RSVP via an accessible, mobile-friendly interface.
  - Provide the couple with clear insights into attendee numbers and special requirements.

## 3. Target Users & Roles
### Roles:
- **Couple (Admins)**:
  - Manage RSVPs via a secure dashboard.
  - View and filter guest data (e.g., confirmed, declined, dietary restrictions).
  - Track attendance numbers and companion details.

- **Guests**:
  - Access the event page via a shared link.
  - View essential wedding information (e.g., date, location).
  - Submit their RSVP, including any dietary restrictions and number of companions.

## 4. Core Features for MVP
### For the Couple:
1. **Secure Login**:
   - Login system for the couple to access the dashboard.
2. **Dashboard**:
   - View all RSVP submissions.
   - Filter and search guests by status (e.g., confirmed, declined).
   - View summarized statistics (e.g., total attendees, dietary requirements).

### For the Guests:
1. **Event Page**:
   - Display key wedding details (e.g., date, location, map integration).
   - Responsive design for mobile accessibility.
2. **RSVP Form**:
   - Guests provide their name, companions, dietary restrictions, and optional messages.
   - Submit RSVP directly to the system.

## 5. Future Scope
- **Email Notifications**:
  - Automatic reminders for guests who haven't RSVP'd.
- **Guest Tagging**:
  - Allow the couple to group guests (e.g., "Family", "Friends") for better organization.
- **Export Data**:
  - Enable CSV export of RSVP data for offline use.
- **Multilingual Support**:
  - Allow guests to view the platform in different languages.
- **Real-time Updates**:
  - Reflect changes on the dashboard instantly without requiring a refresh.

## 6. User Journey
### For the Couple:
1. Login to the platform.
2. Access the dashboard to:
   - View all RSVP submissions.
   - Filter and analyze guest data.
   - Check attendance summaries.

### For the Guests:
1. Access the shared event link.
2. View wedding details (date, location, schedule).
3. Submit RSVP form with required details.

## 7. Tech Stack
### Frontend:
- **Framework**: Next.js (via V0).
  - Provides SSR for dynamic pages (e.g., RSVP form).
  - Optimized for performance and SEO.
- **Styling**: Tailwind CSS.
  - Rapid design for mobile and desktop responsiveness.

### Backend:
- **Supabase**:
  - Managed PostgreSQL database for storing RSVP data.
  - Built-in authentication for secure login.
  - Serverless Edge Functions for custom logic (if needed).

### Deployment:
- **Frontend Hosting**: Vercel.
  - Optimized for Next.js with automatic deployments.
- **Backend Hosting**: Supabase.
  - Manages authentication, database, and API endpoints.

### Other Tools:
- **Version Control**: Git + GitHub for collaborative development.
- **Analytics**: Plausible Analytics for tracking guest behavior on the RSVP page.

---
This PRD provides a clear roadmap for delivering the MVP, ensuring simplicity and scalability for future iterations.

