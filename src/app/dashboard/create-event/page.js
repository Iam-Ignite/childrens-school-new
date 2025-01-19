'use client'
import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../components/hook/useAuth';

export default function Editscreen() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    headline: '',
    subHeadline: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { logout } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Preview the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (!selectedFile) {
        throw new Error('Please select an image');
      }

      const formDataToSend = new FormData();
      formDataToSend.append('image', selectedFile);
      formDataToSend.append('headline', formData.headline);
      formDataToSend.append('subHeadline', formData.subHeadline);

      const response = await fetch('/api/events', {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create event');
      }

      // Navigate back to the events page
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar components remain the same */}
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
      <main className="flex-1 p-6">
        <button
          onClick={() => router.push('/dashboard')}
          className="mb-6 px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 border border-red-500 rounded-lg hover:bg-red-100"
        >
          Go Back
        </button>

        <form onSubmit={handleSubmit} className=" mx-auto bg-white shadow-md rounded-lg p-6">
          {error && (
            <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

          {/* Title Text */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Title Text
            </label>
            <input
              type="text"
              name="headline"
              value={formData.headline}
              onChange={handleInputChange}
              placeholder="Children's House School"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Sub-Title Text */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Sub-Title Text
            </label>
            <textarea
              name="subHeadline"
              value={formData.subHeadline}
              onChange={handleInputChange}
              rows={3}
              placeholder="A place children from 3 months-5 years embark on a journey of discovery and growth."
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            ></textarea>
          </div>

          {/* Media Section */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700">Media</h3>
            <div className="mt-2 flex flex-col items-center w-1/2 gap-1 py-10 border rounded-lg p-4 bg-gray-100">
              {previewUrl ? (
                <div className="mb-4">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-48 h-48 object-cover rounded-lg"
                  />
                </div>
              ) : (
                <p className="mt-2 text-sm text-gray-600">
                  Click add image
                </p>
              )}
              <p className="text-sm text-gray-500">
                Photo dimension should be square
              </p>
              
              <label className="mt-4 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 cursor-pointer">
                Add Image
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}