# ScheduleHub — Premium Appointment Booking & Scheduling Platform

A modern, production-quality **appointment booking and scheduling web application** built with **HTML5**, **CSS3**, and **vanilla JavaScript**. Designed with a futuristic SaaS aesthetic inspired by Calendly, Booksy, Acuity Scheduling, and Google Calendar.

![ScheduleHub](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## Project Information

**Project Name:** ScheduleHub  
**Type:** Frontend demo / portfolio booking platform  
**License:** Educational use — no personal data or real branding included

### Features

- **Appointment Scheduling** — Multi-step booking wizard with service, staff, date/time selection
- **Interactive Calendar** — Month, week, and day views with drag-and-drop rescheduling
- **Availability Management** — Weekly schedule editor, vacation mode, break schedules
- **Notifications System** — Confirmations, reminders, cancellations, payment alerts
- **User & Admin Dashboards** — Stats, charts, activity feeds, quick actions
- **Customer Management** — 250+ demo customers with profiles and booking history
- **Team Scheduling** — Staff shifts, workload analytics, travel time estimation
- **Booking Analytics** — Revenue trends, heatmaps, pie charts, staff performance
- **Payment UI** — Credit card, UPI, PayPal, wallet interfaces (frontend only)
- **Video Consultation** — Meeting room UI with chat, controls, incoming call popup
- **Reviews & Ratings** — 180+ demo reviews with star ratings
- **Premium UI** — Glassmorphism, animated gradients, dark/light themes, responsive design
- **Extra Features** — AI assistant, voice booking UI, QR check-in, waitlist, keyboard shortcuts, offline mode banner, multi-language selector

---

## Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic structure, 25+ pages |
| CSS3 | Variables, Grid, Flexbox, animations, glassmorphism |
| Vanilla JavaScript | Modular architecture, no frameworks |
| LocalStorage | Theme and preference persistence |
| Intersection Observer | Scroll reveal animations |

---

## How to Run the Project in VS Code

### Step 1: Install Visual Studio Code

1. Download VS Code from [https://code.visualstudio.com/](https://code.visualstudio.com/)
2. Run the installer and follow the setup wizard
3. Launch Visual Studio Code

### Step 2: Open the Project Folder

1. Open VS Code
2. Go to **File → Open Folder**
3. Select the `Booking System` folder (this project directory)
4. Click **Select Folder**

### Step 3: Install Live Server Extension

1. Click the **Extensions** icon in the left sidebar (or press `Ctrl+Shift+X`)
2. Search for **Live Server**
3. Install **Live Server** by Ritwick Dey
4. Reload VS Code if prompted

### Step 4: Launch the Application

1. In the Explorer panel, locate `index.html`
2. **Right-click** on `index.html`
3. Click **"Open with Live Server"**
4. Your default browser will open at `http://127.0.0.1:5500` (or similar port)

### Alternative: Open Without Live Server

You can also open `index.html` directly in a browser, but **Live Server is recommended** for correct routing and to avoid CORS issues with some features.

---

## Folder Structure

```
Booking System/
├── index.html              # Landing page
├── dashboard.html          # Main booking dashboard
├── calendar.html           # Appointment calendar
├── booking.html            # Book appointment wizard
├── analytics.html          # Analytics dashboard
├── customers.html          # Customer management
├── notifications.html      # Notifications center
├── payments.html           # Payment UI
├── settings.html           # Settings page
├── profile.html            # User profile
├── availability.html       # Availability management
├── team.html               # Team scheduling
├── services.html           # Service categories
├── history.html            # Appointment history
├── details.html            # Booking details
├── video.html              # Video consultation UI
├── meeting.html            # Meeting scheduler
├── admin.html              # Admin dashboard
├── staff.html              # Staff profiles
├── reviews.html            # Reviews & ratings
├── search.html             # Search results
├── plans.html              # Subscription plans
├── security.html           # Security center
├── reports.html            # Reports & export
├── about.html              # About platform
├── contact.html            # Contact page
├── css/
│   ├── themes.css          # CSS variables, dark/light theme
│   ├── style.css           # Base styles & components
│   ├── dashboard.css       # Dashboard & app layout
│   ├── calendar.css        # Calendar-specific styles
│   └── responsive.css      # Mobile & tablet breakpoints
├── js/
│   ├── data.js             # Demo datasets (500+ appointments, 250 customers)
│   ├── app.js              # Core app, sidebar, navigation, utilities
│   ├── calendar.js         # Calendar rendering & drag-drop
│   ├── booking.js          # Multi-step booking wizard
│   ├── analytics.js        # Charts and analytics rendering
│   ├── notifications.js    # Notification center logic
│   ├── themes.js           # Theme toggle & persistence
│   ├── customers.js        # Customer grid & pagination
│   └── scheduler.js        # Team scheduling & availability
├── assets/
│   ├── images/             # Image assets (placeholder)
│   ├── icons/              # Icon assets (placeholder)
│   └── sounds/             # Sound assets (placeholder)
└── README.md               # This file
```

---

## Usage Guide

### Navigation

- Start at **`index.html`** for the marketing landing page
- Click **"View Demo Dashboard"** or **"Sign In"** to enter the app
- Use the **sidebar** to navigate between all 25+ screens

### Booking an Appointment

1. Go to **Book Appointment** (`booking.html`)
2. Select a **service** → **staff member** → **date & time**
3. Click **Confirm Booking** to see the confirmation screen

### Calendar

- Switch between **Month**, **Week**, and **Day** views
- **Drag and drop** appointments to reschedule (demo)
- Click a day to see appointments in the sidebar

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + K` | Search |
| `Ctrl + B` | New booking |
| `Ctrl + D` | Dashboard |
| `Ctrl + C` | Calendar |

### Theme Customization

- Click the **moon/sun icon** in the header to toggle dark/light mode
- Preference is saved in **localStorage**

---

## Demo Datasets

All data is **generated programmatically** in `js/data.js`:

| Dataset | Count |
|---------|-------|
| Appointments | 500 |
| Customers | 250 |
| Notifications | 120 |
| Reviews | 180 |
| Payments | 150 |
| Activity Logs | 200 |
| Staff Members | 12 |
| Services | 15 |

No real personal information is used. Names and emails are fictional demo data.

---

## Browser Compatibility

| Browser | Supported |
|---------|-----------|
| Chrome 90+ | ✅ Recommended |
| Firefox 88+ | ✅ |
| Edge 90+ | ✅ |
| Safari 14+ | ✅ |
| Mobile browsers | ✅ Responsive |

---

## Troubleshooting

### Live Server not starting

- Ensure the Live Server extension is installed and enabled
- Try restarting VS Code
- Check if another process is using port 5500

### Sidebar or styles not loading

- Confirm you opened via **Live Server**, not `file://`
- Check that all CSS/JS paths are relative and folders exist

### Calendar appears empty

- Demo appointments span ±60 days from today
- Navigate months using **‹ ›** arrows to find populated dates

### Theme not persisting

- Enable cookies/localStorage in your browser
- Clear `schedulehub-theme` in DevTools → Application → Local Storage to reset

---

## Performance Optimization

- Efficient DOM updates with targeted `innerHTML` rendering
- CSS animations use `transform` and `opacity` for GPU acceleration
- Pagination limits table/grid renders to 20–25 items per page
- Intersection Observer for lazy scroll reveals
- Calendar view transitions use short 150ms delays to avoid jank

---

## Deployment

This is a **static site** — deploy to any static host:

- **GitHub Pages** — Push repo and enable Pages
- **Netlify / Vercel** — Drag-and-drop the folder
- **Any web server** — Serve the root directory

No build step required.

---

## Credits

Built as a portfolio-grade demo showcasing modern frontend development for appointment booking SaaS platforms.

**ScheduleHub** — Schedule smarter. Book better.
