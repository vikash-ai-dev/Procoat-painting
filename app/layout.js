import './globals.css'
import { Toaster } from '@/components/ui/sonner'

export const metadata = {
  title: 'ProCoat Painting Co. — Professional Painting Contractors | Residential, Commercial & Industrial',
  description: 'Trusted painting contractors with 15+ years of experience. We paint homes, apartments, offices, shops, schools and buildings. Get a free instant quote today.',
  keywords: 'painting contractor, house painters, commercial painting, industrial painting, interior painting, exterior painting, apartment painting, office painting, painting services near me',
  openGraph: {
    title: 'ProCoat Painting Co. — Painting Contractors You Can Trust',
    description: 'Residential, commercial & industrial painting. Free instant quotes. 15+ years of experience. Licensed & insured.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-white text-slate-900">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
