import PageWithLayout from '@/layout/page.layout'
import ApolloWrapper from '@/lib/apolloWrapper'
import '@/styles/globals.scss'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'


type AppProps = {
  Component: PageWithLayout
  pageProps: any
}
export default function App({ Component, pageProps }: AppProps) {

  const Layout = Component.layout || (({ children }: { children: React.ReactNode }) => <>{children}</>)
  return (
    <ApolloWrapper>
      <Layout>
        <PayPalScriptProvider options={{
          clientId: "Ac43IkML6uLHN9Dje8gXDC80pu50MDjujny3mNmYHmBW_REN-Xv0oXzXTU_y1nW3WZ2wg-_MTGa3IY4a",
          currency: "USD",
        }}>
          <Component {...pageProps} />
        </PayPalScriptProvider>
      </Layout>
    </ApolloWrapper>
  )
}
