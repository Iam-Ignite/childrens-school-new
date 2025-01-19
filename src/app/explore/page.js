import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Location from '../../components/Location'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div>
    <Header />
    <section className="hero-about md:h-[50dvh] h-[50dvh] bg-[url('/Children_s/SYM_6113.jpg')]">
      <h1 className="text-black font-bold text-3xl mb-4">Explore Our Building      </h1>
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSe3i0wclVLuN19RBPM9kYFSHO3nN4UTCZGYS7isQdhKMPvqvQ/viewform"
        className="join-btn"
      >
        Get Enquiries
      </a>

    </section>

    <section className="about">
      <h2 className="font-bold text-3xl">Inside Our Build
      </h2>
      <div className="video-container">
        <video
          controls
          src="./Children_s/Video/7A4112E2-7609-45A1-A0D8-A0EF6FC91EF8.mov"
        ></video>
      </div>
    </section>
    {/* <Enroll /> */}
    <Location />
    <Footer />
  </div>
  )
}
