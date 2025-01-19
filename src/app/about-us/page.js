import Enroll from "../../components/Enroll";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Location from "../../components/Location";
import React from "react";

export default function page() {
  return (
    <div>
      <Header />
      <section className="hero-about md:h-[80dvh] h-[50dvh] bg-[url('/bg-about.png')]">
        <h1 className="text-white text-3xl mb-4">About Us</h1>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSe3i0wclVLuN19RBPM9kYFSHO3nN4UTCZGYS7isQdhKMPvqvQ/viewform"
          className="join-btn"
        >
          Get Enquiries
        </a>
        <div className="features">
          <div className="feature-card">
            <h3>About Us </h3>
            <div className="line"></div>
            <p>
              A place children from 3 months-5years embark on a journey of
              discovery and growth. Our aim is to redefine childhood learning
              for children. A school where we believe in excellence and we exude
              excellence at every turn. At Children's house school our purpose
              is to provide a nurturing and enriching environment that empowers
              children to flourish.
            </p>
          </div>
        </div>
      </section>

      <section className="about">
        <h2 className="font-bold text-3xl">About Us</h2>
        <div className="video-container">
          {/* <!-- Video embed code would go here --> */}
          <video
            controls
            src="./WhatsApp Video 2025-01-16 at 08.46.48.mp4"
          ></video>
        </div>
      </section>
      {/* <Enroll /> */}
      <Location />
      <Footer />
    </div>
  );
}
