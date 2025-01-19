"use client"
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Location from "../../components/Location";

const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/events");
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();

      // Ensure we're working with an array
      const eventsArray = Array.isArray(data)
        ? data
        : data.events
        ? data.events
        : data.data
        ? data.data
        : [];

      setEvents(eventsArray);
    } catch (err) {
      setError(err.message);
      setEvents([]); // Ensure events is always an array
    } finally {
      setLoading(false);
    }
  };

  // Delete event

  // Load events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  return { events, loading, error, refreshEvents: fetchEvents };
};
export default function page() {
    const { events, loading } = useEvents();

  return (
    <div>
      <Header />
      <section className="hero-about md:h-[80dvh] h-[50dvh] bg-[url('/bg-about.png')]">
        <h1 className="text-white text-3xl mb-4">Our Events</h1>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSe3i0wclVLuN19RBPM9kYFSHO3nN4UTCZGYS7isQdhKMPvqvQ/viewform"
          className="join-btn"
        >
          Get Enquiries
        </a>
      </section>

      <section className="about">
        <h2 className="font-bold text-3xl">Events</h2>
        {!loading && Array.isArray(events) && events.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white shadow-md rounded-lg p-4 overflow-hidden"
              >
                <img
                  src={event.imageUrl || "/calture.png"}
                  alt={event.headline}
                  className="w-full h-52 object-center object-fill rounded-md"
                />
                <div className="">
                  <h2 className="text-lg font-bold text-gray-800">
                    {event.headline}
                  </h2>
                  <p className="text-sm text-gray-600">{event.subHeadline}</p>
                </div>
           
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="text-center text-gray-500 mt-8">
              No events found
            </div>
          )
        )}
      </section>
      {/* <Enroll /> */}
      <Location />
      <Footer />
    </div>
  );
}
