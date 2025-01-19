import Image from 'next/image'
import Link from 'next/link'
import ServiceCard from './ServiceCard'
import EducationIcon from './EducationIcon'
import PreschoolIcon from './PreschoolIcon'
import NurseryIcon from './NurseryIcon'

export default function Hero() {
  return (
    <section className="hero px-4 bg-[url('/xxc.png')] bg-cover bg-no-repeat" id="home">
      <div className=" max-w-7xl mx-auto px-4 py-12 md:grid md:grid-cols-2 flex flex-col-reverse items-center">
        <div className="">
          <span className="text-[#FC403A]">Join Us</span>
          <h1 className="md:text-7xl text-4xl text-[#252B42] font-bold mt-2 mb-4">Children's House School</h1>
          <p className="text-[#252B42] mb-6">
            A place children from 3 months-5years embark on a journey of discovery and growth. 
            Our aim is to redefine childhood learning for children.
          </p>
          <Link 
            href="https://docs.google.com/forms/d/e/1FAIpQLSe3i0wclVLuN19RBPM9kYFSHO3nN4UTCZGYS7isQdhKMPvqvQ/viewform"
            className="join-btn bg-[#FC403A] text-white px-6 py-3 rounded inline-block"
          >
            Get Enquiries
          </Link>
        </div>
        <div className="hero-image md:w-full md:h-96 h-80 flex justify-center mb-10 md:mt-0">
          <Image
            src="/hero.png"
            alt="Children learning together"
            width={400}
            height={400}
            className="rounded-lg"
          />
        </div>
      </div>

      <div className="services grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 py-12">
        <ServiceCard
          icon={<EducationIcon />}
          title="Crèche"
          description="Our crèche program offers a safe, nurturing, and stimulating environment for infants and toddlers. We focus on early development, providing age-appropriate activities to help your child grow and thrive."
        />
        <ServiceCard
          icon={<PreschoolIcon />}
          title="Preschool"
          description="Our preschool curriculum encourages curiosity and creativity through play-based learning. We aim to build a strong foundation in literacy, numeracy, and social skills to prepare your child for the next stage of their education."
        />
        <ServiceCard
          icon={<NurseryIcon />}
          title="Nursery 1 & 2"
          description="In Nursery 1 & 2, we focus on developing early literacy, numeracy, and critical thinking skills. Our experienced teachers create engaging lesson plans tailored to each child's learning needs."
        />
      </div>
    </section>
  )
}