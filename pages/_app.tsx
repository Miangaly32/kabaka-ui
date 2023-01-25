import { useEffect } from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Router from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (localStorage.getItem('TOKEN') === null) {
      Router.push('/login')
    }
  }, [])
  return (
    <Component {...pageProps} />
  )
}
