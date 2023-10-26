import Footer from '../components/Footer'
import Header from '../components/Header'

export const Layout = (props) => {

  return (
    <div className="px-4 md:px-0 mx-auto w-full max-w-2xl prose-xl text-gray-600 dark:prose-invert dark:text-gray-200">
      <Header />
      <main>{props.children}</main>
      <Footer />
    </div>
  )
}
