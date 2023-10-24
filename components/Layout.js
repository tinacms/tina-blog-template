import Head from 'next/head'
import Footer from '../components/Footer'
import Header from '../components/Header'

export const Layout = (props) => {

  return (
    <div className="px-4 md:px-0 mx-auto w-full max-w-2xl prose-xl text-gray-600 dark:prose-invert dark:text-gray-200">
      <Head>
        <meta name="description" content="A TinaCMS Application" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🦙</text></svg>" />
      </Head>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </div>
  )
}
