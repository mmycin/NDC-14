# Changelog

## [1.0.0] - Initial Release
**Date**: 2024-12-13

### Added
- **Backend**: Go (Golang), Gin, and Mongorm (Custom MongoDB ORM)
  - No authentication, tokens, or middleware.
- **Frontend**: Bun.js as runtime with Preact for UI, and Tailwind CSS for styling.
- **Database**: MongoDB.
- **Panel**: ForestAdmin for admin panel.

---

## [2.0.0] - Current Version
**Date**: 2025-01-11

### Changed
- **Backend**:
  - Migrated to **PostgreSQL** as the primary database.
  - Integrated **JWT Authentication** for secure access and **middleware** for enhanced security.
  - Switched from **Mongorm** to **Gorm** ORM for PostgreSQL.
- **Frontend**: 
  - Replaced Bun.js with **SvelteKit** for improved scalability and flexibility.
  - Tailwind CSS remains as the styling framework for a responsive and modern UI.
- **Database**:
  - Switched to **PostgreSQL (NeonDB)** for better scalability and reliability.
- **Runtime**: 
  - **Bun.js** remains as the runtime for frontend, while **Go (Golang)** continues for backend to leverage performance.
- **Containerization**:
  - Introduced **Docker** for consistent development and production environments.
- **Admin Panel**: Built-in admin panel instead of relying on third-party services (ForestAdmin).
  
---

## [Unreleased]
**Upcoming Features**  
We’re not just sitting back and relaxing! Here’s a sneak peek of the awesome stuff we’re brewing up:

- **Optimization**: We’re turbocharging performance! Your app is going to load faster than you can say "Notice Board."  
- **Security**: We’re making sure that your data stays more secure than a secret recipe. Enhanced authentication and role management coming your way!  
- **UI/UX**: We’re rolling out the red carpet for a fresh, sleek design. New components and UI improvements that'll make your eyes do a happy dance!  
- **AI Feedback Panel**: Ever wanted to get your thoughts heard by an AI? Well, now you can! Our AI-powered feedback system will gather insights, making your suggestions the brainchild of technology itself.  
- **Chat with Captains**: Need to send a message to the group captain? We’re building a live chat feature that’ll make you feel like you’re texting your best friend, but with more responsibility.  
- **Mobile App**: We’re not just stopping at the web! A dedicated mobile app is coming to keep you connected on the go. Whether we choose **React Native** or **Ionic**, powered by **Capacitor**, your pocket just got a little smarter.  

