import { CartContextProvider } from '@/contexts/CartContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
  <CartContextProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </CartContextProvider> )
}
