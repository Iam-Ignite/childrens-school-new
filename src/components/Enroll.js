import Image from 'next/image'
import Link from 'next/link'

export default function Enroll() {
  return (
    <section className="enroll py-16 bg-[#ffe6e6] px-6" id="enroll">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-medium mb-4">Enroll Your Children Now 🤩🤩</h2>
          <p className="mb-6">
            Join our family today and watch your little ones thrive in a place that feels like home.
          </p>
          <Link 
            href="https://docs.google.com/forms/d/e/1FAIpQLSe3i0wclVLuN19RBPM9kYFSHO3nN4UTCZGYS7isQdhKMPvqvQ/viewform"
            className="join-btn bg-[#FC403A] text-white px-6 py-3 rounded inline-block"
          >
            Get Enquiries
          </Link>
        </div>
        <div className="hero-image md:w-1/2">
          <Image
            src="/entrol.png"
            alt="Children playing"
            width={300}
            height={200}
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  )
}
