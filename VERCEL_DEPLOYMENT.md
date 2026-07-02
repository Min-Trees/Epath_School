# EPath Website - Vercel Deployment Guide

Hướng dẫn triển khai website EPath trên Vercel.

## Prerequisites

- Tài khoản Vercel (vercel.com)
- Git repository đã được kết nối với Vercel
- Dự án Firebase đã được tạo

## Các bước triển khai

### 1. Kết nối Repository với Vercel

1. Truy cập [vercel.com](https://vercel.com)
2. Click "New Project"
3. Chọn repository chứa code EPath
4. Import project

### 2. Cấu hình Environment Variables

Trong Vercel Dashboard > Project > Settings > Environment Variables:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API Key | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase Project ID | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase App ID | Production, Preview, Development |

**Lưu ý:** Các biến này phải bắt đầu với `NEXT_PUBLIC_` để có thể truy cập từ client-side.

### 3. Cấu hình Domain (tùy chọn)

1. Vào Project Settings > Domains
2. Thêm domain tùy chỉnh (ví dụ: `epath.edu.vn`)
3. Cập nhật DNS records theo hướng dẫn của Vercel

### 4. Cấu hình Build Settings

Vercel sẽ tự động nhận diện Next.js project. Kiểm tra:

- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

### 5. Deploy

1. Click "Deploy" hoặc push code lên branch đã kết nối
2. Vercel sẽ tự động build và deploy

## Cấu hình i18n (next-intl)

### Root Layout

Đảm bảo file `app/[locale]/layout.tsx` có cấu hình đúng:

```tsx
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'vi' }]
}

export default async function LocaleLayout({ children, params: { locale } }: LocaleLayoutProps) {
  if (!['en', 'vi'].includes(locale)) notFound()

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
```

### Middleware

File `middleware.ts` đã được cấu hình sẵn cho i18n routing.

## Cấu hình Firebase

### 1. Tạo Firebase Project

1. Truy cập [Firebase Console](https://console.firebase.google.com)
2. Tạo project mới
3. Thêm Web App trong Project Settings
4. Copy các Firebase config values

### 2. Cấu hình Firebase trong Code

File `lib/firebase.ts`:

```typescript
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
export const db = getFirestore(app)
export const auth = getAuth(app)
```

## Troubleshooting

### Build Fails

1. Kiểm tra Node.js version (yêu cầu: 18.x+)
2. Chạy `npm install` local để xem có lỗi dependencies không
3. Kiểm tra log trong Vercel Dashboard

### Environment Variables không hoạt động

1. Đảm bảo biến đã được thêm đúng trong Vercel Settings
2. Redeploy sau khi thêm biến mới
3. Kiểm tra prefix `NEXT_PUBLIC_` cho biến client-side

### i18n Routing lỗi

1. Kiểm tra `middleware.ts` có export `createMiddleware` đúng
2. Đảm bảo locale routes khớp với cấu hình

### Firebase lỗi

1. Kiểm tra Firebase project đã được kích hoạt đúng services
2. Xác nhận API key và project ID đúng
3. Kiểm tra Firebase Console > Authentication > Sign-in methods

## CI/CD

### Automatic Deployments

Vercel tự động deploy khi:

- Push lên branch `main` hoặc `master` → Production
- Push lên các branch khác → Preview deployment

### Preview Deployments

Mỗi pull request sẽ tạo một preview deployment với URL riêng.

### Production Deployment

Chỉ deploy lên production khi merge vào main branch.

## Performance Optimization

### Image Optimization

Sử dụng `next/image` cho tất cả images:

```tsx
import Image from 'next/image'

<Image
  src="/images/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority
/>
```

### Static Generation

Các trang không thay đổi nên được generate tĩnh:

```tsx
export const dynamic = 'force-static'
```

### Caching

Vercel tự động cache:
- Static assets: 1 year
- ISR pages: theo cấu hình `revalidate`

## Security

### Environment Variables

- KHÔNG bao giờ commit `.env.local` vào git
- Sử dụng Vercel Secrets cho production keys
- Chỉ dùng `NEXT_PUBLIC_` prefix cho biến cần public

### Headers

File `vercel.json` đã cấu hình security headers:
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Referrer-Policy

## Monitoring

### Vercel Analytics

Bật Vercel Analytics trong Project Settings để theo dõi performance.

### Error Tracking

Sử dụng Sentry hoặc Vercel Error Tracking để monitor runtime errors.

## Quick Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Support

Nếu gặp vấn đề:
1. Kiểm tra Vercel deployment logs
2. Xem Next.js documentation
3. Liên hệ dev team
