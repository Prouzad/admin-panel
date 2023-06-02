import '@/styles/globals.css'

import { ConfigProvider } from 'antd'
import locale from 'antd/locale/ru_RU'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        <ConfigProvider locale={locale}>
          <Component {...pageProps} />
        </ConfigProvider>
      </SessionProvider>
    </QueryClientProvider>
  )
}
