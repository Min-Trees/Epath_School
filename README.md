# EPath Education Website

Website giáo dục EPath Education - Lộ trình học thuật quốc tế xuyên suốt từ Tiểu học đến THPT.

## Tech Stack

- **Frontend**: Next.js 14+ (App Router), TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Animation**: Framer Motion
- **Backend**: Firebase (Firestore, Auth, Storage, Hosting)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase account

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Copy `.env.example` to `.env.local` and fill in your Firebase credentials:

```bash
cp .env.example .env.local
```

4. Update Firebase configuration in `.env.local`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
epath-website/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   ├── programs/          # Programs page
│   ├── partners/          # Partners page
│   ├── admissions/        # Admissions page
│   ├── events/            # Events page
│   ├── contact/           # Contact page
│   └── admin/             # Admin dashboard
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Layout components (Header, Footer)
│   └── sections/          # Homepage sections
├── lib/
│   ├── firebase.ts        # Firebase configuration
│   ├── firestore.ts       # Firestore operations
│   └── utils.ts          # Utility functions
├── types/
│   └── index.ts           # TypeScript interfaces
└── public/                # Static files
```

## Features

### Homepage Sections
1. Hero Section with animations
2. 6 Core Values grid
3. Learning Pathways cards (4 levels)
4. 5-Step Model timeline
5. Statistics counters with animation
6. Testimonials slider
7. Partner logos
8. FAQ accordion
9. CTA Banner

### Pages
- `/` - Homepage
- `/about` - About EPath
- `/programs` - Programs by level
- `/partners` - International partners
- `/admissions` - Tuition & enrollment
- `/events` - Events & activities
- `/contact` - Contact form

### Admin Dashboard
- `/admin/login` - Admin login
- `/admin/dashboard` - Dashboard overview
- `/admin/programs` - Manage programs
- `/admin/faqs` - Manage FAQs
- `/admin/testimonials` - Manage testimonials
- `/admin/partners` - Manage partners
- `/admin/settings` - Site settings

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Navy Blue | #003366 | Primary brand |
| Academic Gold | #E8A020 | CTA buttons |
| Growth Green | #1A7F5A | Secondary |
| Light BG | #F5F7FA | Background |
| Dark Text | #1A1A2E | Text |

## Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore, Authentication, and Storage
3. Create a web app and copy the config
4. Set up Firestore security rules as needed

### Firestore Collections

- `programs` - Program data
- `faqs` - FAQ questions
- `testimonials` - Parent testimonials
- `partners` - Partner information
- `contacts` - Contact form submissions
- `statistics` - Statistics data

## Build

```bash
npm run build
```

## Deploy to Firebase Hosting

1. Install Firebase CLI:

```bash
npm install -g firebase-tools
```

2. Login to Firebase:

```bash
firebase login
```

3. Initialize Firebase Hosting:

```bash
firebase init hosting
```

4. Deploy:

```bash
firebase deploy
```

## License

Private - All rights reserved.
# Epath_School
