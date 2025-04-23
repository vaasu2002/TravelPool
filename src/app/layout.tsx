import './globals.css'

export const metadata = {
  title: 'TravelPool',
  description: 'Find taxi pool partners for your college commute',
}

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}