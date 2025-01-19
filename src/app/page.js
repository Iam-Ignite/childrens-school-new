import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import WhyUs from '../components/WhyUs'
import Enroll from '../components/Enroll'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-700">
      <Header />
      <Hero />
      <About />
      <WhyUs />
      <Enroll />
      <Footer />
    </div>
  )
}
