'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e) => {
      const hamburger = document.querySelector('.hamburger');
      const mobileNav = document.querySelector('.mobile-nav');
      if (
        hamburger &&
        mobileNav &&
        !hamburger.contains(e.target) &&
        !mobileNav.contains(e.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <Head>
        <title>Children's House School</title>
        <meta
          name="description"
          content="Welcome to Children's House School - A place where education and exploration come together."
        />
        <meta
          name="keywords"
          content="Children's House School, education, school events, building exploration"
        />
        <meta name="author" content="Children's House School" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <header className="flex items-center px-6 md:px-16 justify-between p-4 bg-white">
        <Image
          src="/logo.png"
          alt="Children's House School Logo"
          width={120}
          height={40}
          className="logo"
        />

        <nav className="hidden md:flex space-x-6">
          <Link href="/">Home</Link>
          <Link href="/about-us">About Us</Link>
          <Link href="/event">Event</Link>
          <Link href="/explore">Explore Our Building</Link>
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLSe3i0wclVLuN19RBPM9kYFSHO3nN4UTCZGYS7isQdhKMPvqvQ/viewform">
            Contact
          </Link>
        </nav>

        <div className="flex gap-2">
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSe3i0wclVLuN19RBPM9kYFSHO3nN4UTCZGYS7isQdhKMPvqvQ/viewform"
            className="hidden md:block join-btn bg-[#FC403A] text-white px-4 py-2 rounded"
          >
            JOIN US →
          </Link>
          <Link
            href="/admin-auth"
            className="hidden md:block font-medium border-[#FC403A] text-[#FC403A] border-2 px-4 py-2 rounded"
          >
            LOGIN →
          </Link>
        </div>
        <button
          className={`hamburger md:hidden ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link href="/#home" onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </Link>
          <Link href="/about-us" onClick={() => setIsMobileMenuOpen(false)}>
            About Us
          </Link>
          <Link href="/event" onClick={() => setIsMobileMenuOpen(false)}>
            Event
          </Link>
          <Link href="/explore" onClick={() => setIsMobileMenuOpen(false)}>
            Explore Our Building
          </Link>
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSe3i0wclVLuN19RBPM9kYFSHO3nN4UTCZGYS7isQdhKMPvqvQ/viewform"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSe3i0wclVLuN19RBPM9kYFSHO3nN4UTCZGYS7isQdhKMPvqvQ/viewform"
            className="join-btn text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            JOIN US →
          </Link>
        </div>
      </header>
    </>
  );
}
