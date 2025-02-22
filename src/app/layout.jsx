import { Inter } from 'next/font/google'
import './globals.css'
import CartProvider from '@/components/context/CartProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Cart Example',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <CartProvider>{children}</CartProvider>
        </main>
      </body>
    </html>
  )
}
