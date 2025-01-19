import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  return (
    <section className=" py-16 px-8" id="about">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-6">About Us</h2>
          <p className="mb-4">
            A place children from 3 months-5years embark on a journey of discovery and growth. 
            Our aim is to redefine childhood learning for children.
          </p>
          <p className="mb-4">
            A school where we believe in excellence and we exude excellence at every turn.
          </p>
          <p className="mb-6">
            At Children's house school our purpose is to provide a nurturing and enriching 
            environment that empowers children to flourish.
          </p>
          <Link 
            href="/learn-more"
            className="join-btn bg-[#FC403A] text-white px-6 py-3 rounded inline-block"
          >
            Learn More
          </Link>
        </div>
        <div className="about-images md:w-1/2">
          <Image
            src="/Children_s/SYM_6113.jpg"
            alt="Children playing"
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  )
}
