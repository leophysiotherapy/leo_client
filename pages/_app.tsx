import PageWithLayout from '@/layout/page.layout'
import ApolloWrapper from '@/lib/apolloWrapper'
import '@/styles/globals.scss'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import Head from 'next/head'


type AppProps = {
  Component: PageWithLayout
  pageProps: any
}
export default function App({ Component, pageProps }: AppProps) {

  const Layout = Component.layout || (({ children }: { children: React.ReactNode }) => <>{children}</>)
  //call to function
  return (
    <ApolloWrapper>
      <Head>
        <link rel="icon" type="image/x-icon" href="/faviphysio.png" />
      </Head>
      <Layout>
        <PayPalScriptProvider options={{
          clientId: process.env.PAYPAL_CLIENT_ID as string,
          currency: "USD",
        }}>
          <Component {...pageProps} />
        </PayPalScriptProvider>
      </Layout>
    </ApolloWrapper>
  )
}
