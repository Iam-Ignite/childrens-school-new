"use client";
import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../../components/hook/useAuth";

// Custom hook for managing events
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
  const deleteEvent = async (eventId) => {
    try {
      setLoading(true); // Show loading during delete
      const response = await fetch(`/api/events?id=${eventId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      setEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== eventId)
      );
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Load events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  return { events, loading, error, deleteEvent, refreshEvents: fetchEvents };
};

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { events, loading, error, deleteEvent } = useEvents();
  const { logout } = useAuth();


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };


  const handleDelete = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const success = await deleteEvent(eventId);
      if (success) {
        console.log("Event deleted successfully");
      }
    }
  };

  // Debug logging

  return (
    <div className="flex h-screen bg-gray-50 relative">
      {/* Hamburger Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-white shadow-md"
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static w-64 bg-white shadow-md h-full z-40 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 text-center">
          <img
            src="/logo.png"
            alt="Children's House Logo"
            className="w-20 h-20 mx-auto mb-4"
          />
          <h1 className="text-lg font-bold text-gray-800">Children's House</h1>
        </div>
        <nav className="flex flex-1 justify-between h-[70vh] flex-col">
          <a
            href="#"
            className="flex items-center hover:text-red-600 px-6 py-3"
          >
            <span className="material-icons">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_231_546"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="24"
                  height="25"
                >
                  <rect y="0.428589" width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_231_546)">
                  <path
                    d="M12 17.4286C13 17.4286 13.8708 17.1036 14.6125 16.4536C15.3542 15.8036 15.8 14.9953 15.95 14.0286C15.9833 13.8619 15.9458 13.7203 15.8375 13.6036C15.7292 13.4869 15.5833 13.4286 15.4 13.4286H8.6C8.43333 13.4286 8.29167 13.4869 8.175 13.6036C8.05833 13.7203 8.01667 13.8619 8.05 14.0286C8.2 14.9953 8.64583 15.8036 9.3875 16.4536C10.1292 17.1036 11 17.4286 12 17.4286ZM12 22.4286C10.75 22.4286 9.57917 22.1911 8.4875 21.7161C7.39583 21.2411 6.44583 20.5994 5.6375 19.7911C4.82917 18.9828 4.1875 18.0328 3.7125 16.9411C3.2375 15.8494 3 14.6786 3 13.4286V4.42859C3 3.87859 3.19583 3.40776 3.5875 3.01609C3.97917 2.62442 4.45 2.42859 5 2.42859H19C19.55 2.42859 20.0208 2.62442 20.4125 3.01609C20.8042 3.40776 21 3.87859 21 4.42859V13.4286C21 14.6786 20.7625 15.8494 20.2875 16.9411C19.8125 18.0328 19.1708 18.9828 18.3625 19.7911C17.5542 20.5994 16.6042 21.2411 15.5125 21.7161C14.4208 22.1911 13.25 22.4286 12 22.4286Z"
                    fill="black"
                  />
                </g>
              </svg>
            </span>
            <span className="ml-4">Event Section</span>
          </a>

          <button onClick={() => logout()} 
            className="flex items-center hover:text-red-600 px-6 py-3"
          >
            <span className="material-icons">
              <svg
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.200195 18.2286V0.628601H9.01945V2.2786H1.8502V16.5786H9.01945V18.2286H0.200195ZM13.2617 13.9671L12.0347 12.7479L14.5539 10.2286H6.04245V8.5786H14.5539L12.0347 6.05935L13.2617 4.8901L17.8002 9.4286L13.2617 13.9671Z"
                  fill="black"
                />
              </svg>
            </span>
            <span className="ml-4">Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:ml-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 mt-8 lg:mt-0">
          <div>{error && <p className="text-red-600">Error: {error}</p>}</div>
          <Link href="/dashboard/create-event">
            <button className="px-6 py-2 text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600">
              + Add Event
            </button>
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
          </div>
        )}

        {/* Cards Grid */}
        {!loading && Array.isArray(events) && events.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={event.imageUrl || "/calture.png"}
                  alt={event.headline}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-800">
                    {event.headline}
                  </h2>
                  <p className="text-sm text-gray-600">{event.subHeadline}</p>
                </div>
                <div className="flex p-4 space-x-4 border-t">
                  <a href={`/dashboard/edit/&id=${event._id}`}>
                    <button className="flex items-center justify-center w-full px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                      <span className="material-icons">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.2544 4.94552C16.2485 3.95142 16.2485 2.33967 15.2544 1.34557L14.6544 0.745574C13.6603 -0.248525 12.0486 -0.248525 11.0545 0.745574L1.39265 10.4074C1.04164 10.7584 0.800913 11.2044 0.70011 11.6905L0.0181894 14.9786C-0.105812 15.5766 0.423397 16.1058 1.02133 15.9818L4.30952 15.2999C4.79559 15.1991 5.24158 14.9584 5.5926 14.6073L15.2544 4.94552ZM14.0544 2.54555L13.4545 1.94556C13.1231 1.61419 12.5858 1.61419 12.2545 1.94556L11.3545 2.84557L13.1544 4.64555L14.0544 3.74553C14.3858 3.41417 14.3858 2.87692 14.0544 2.54555ZM11.9544 5.84553L10.1545 4.04556L2.59263 11.6074C2.47563 11.7244 2.39539 11.8731 2.36179 12.0351L1.94233 14.0577L3.96492 13.6382C4.12695 13.6046 4.27561 13.5244 4.39261 13.4074L11.9544 5.84553Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      <span className="ml-2">Edit</span>
                    </button>
                  </a>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="flex items-center justify-center w-full px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600"
                  >
                    <span className="material-icons">
                      <svg
                        width="16"
                        height="18"
                        viewBox="0 0 16 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.09583 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                    <span className="ml-2">Delete</span>
                  </button>
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
      </main>
    </div>
  );
}
