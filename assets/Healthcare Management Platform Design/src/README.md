# Serena | سيرينا - Healthcare Management Platform

A modern, bilingual (Arabic & English) healthcare management platform that connects patients with top hospitals and doctors across a unified ecosystem.

## 🌟 Features

### Core Functionality
- **Bilingual Support**: Full RTL/LTR support for Arabic and English
- **Theme Toggle**: Beautiful Light/Dark mode with smooth transitions
- **Responsive Design**: Works seamlessly on all devices
- **3D Animations**: Interactive canvas-based neural network visualization
- **Smart Navigation**: Quick navigation between different user experiences

### User Experiences

#### 1. Public/Patient Interface (Navbar Layout)
- Modern hero section with 3D animations
- Services showcase
- Top hospitals and doctors listings
- Patient reviews and testimonials
- About section
- Contact information

#### 2. Doctor/Hospital Admin Dashboard (Sidebar Layout)
- Analytics dashboard with charts
- Patient management
- Appointment scheduling
- Health records
- Messaging system
- Profile and settings

#### 3. Authentication
- Login page with form validation
- Registration with role selection (Patient/Doctor/Hospital Admin)
- Password visibility toggle
- Remember me functionality

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) to Emerald (#10B981) gradient
- **Light Mode**: White (#FFFFFF), Light Gray (#F8F9FA)
- **Dark Mode**: Deep Navy (#0F172A), Charcoal (#1E293B)

### Typography
- **English**: Inter font family
- **Arabic**: Cairo font family
- Clean, rounded, futuristic style

### Components
- Glassmorphism effects
- Soft shadows
- Rounded corners (rounded-2xl, rounded-3xl)
- Gradient backgrounds
- Smooth animations with Framer Motion

## 🚀 Quick Start

### Navigation
Use the floating Quick Navigation button in the bottom-right corner to switch between:
- **Home Page**: Public-facing marketing site
- **Dashboard**: Doctor/Admin interface
- **Login**: Authentication page
- **Register**: User registration

### Theme & Language
- Click the sun/moon icon to toggle between light and dark themes
- Click the globe icon to switch between English and Arabic

## 📱 Pages Overview

### Home Page (`#home`)
- Hero section with animated background
- Services grid (8 services)
- Features showcase (6 key features)
- Top hospitals carousel (3 hospitals)
- Top doctors grid (4 doctors)
- About Serena section
- Patient reviews (3 testimonials)
- Footer with links and social media

### Dashboard (`#dashboard`)
- Statistics cards (4 metrics)
- Weekly appointments chart
- Patient growth line chart
- Upcoming appointments list
- Sidebar navigation
- Header with search and notifications

### Login (`#login`)
- Email and password fields
- Remember me checkbox
- Forgot password link
- Social authentication options
- Animated background

### Register (`#register`)
- Role selection (Patient/Doctor/Hospital Admin)
- Full name, email, password fields
- Interactive role cards
- Account type descriptions

## 🛠️ Technology Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **Shadcn/ui** - Component library

## 🎯 Key Components

### Context
- `AppContext` - Global state management for theme, language, and translations

### Public Components
- `Navbar` - Main navigation with theme/language toggles
- `HeroSection` - Hero with 3D canvas animation
- `ServicesSection` - Grid of 8 healthcare services
- `FeaturesShowcase` - 6 key platform features
- `HospitalsSection` - Top hospitals showcase
- `DoctorsSection` - Featured doctors grid
- `AboutSection` - Platform information
- `ReviewsSection` - Patient testimonials
- `Footer` - Links and contact information

### Dashboard Components
- `DashboardSidebar` - Navigation sidebar
- `DashboardHeader` - Search and notifications
- `DashboardContent` - Analytics and charts

### Auth Components
- `AuthLogin` - Login form
- `AuthRegister` - Registration with role selection

### Utility Components
- `QuickNav` - Floating navigation menu
- `Hero3D` - Canvas-based particle animation

## 🌐 Internationalization

The platform supports:
- **English (LTR)**: Default language
- **Arabic (RTL)**: Full right-to-left layout support

All text content is translated through the translation system in `AppContext`.

## 🎨 Customization

### Color Theme
Users can select from multiple color themes in settings:
- Blue (default)
- Green
- Purple

### Theme Mode
- Light mode
- Dark mode
- System preference (coming soon)

## 📊 Data

Sample data is included for:
- 3 hospitals
- 4 doctors
- 3 patient reviews
- 8 services
- 6 platform features
- Dashboard analytics

## 🔒 Security & Privacy

- End-to-end encryption mentioned in features
- HIPAA compliance ready
- Secure data handling
- Privacy-first design

## 📄 License

© 2025 Serena Healthcare. All rights reserved.

---

**Note**: This is a prototype/demo platform. For production use, implement proper backend API integration, authentication, and data management.
