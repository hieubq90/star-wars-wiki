import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <div data-theme="luxury">
      <Navbar />
      <main className="main-app">{children}</main>
      <Footer />
    </div>
  )
}
