'use client'
import { useState } from 'react';

const BuildingGallery = () => {
  const [selectedImage, setSelectedImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const buildingImages = [
    { src: '/Children_s/SYM_5616.jpg', label: 'Outside Our Building' },
    { src: '/Children_s/SYM_6117.jpg', label: 'The Compound' },
    { src: '/Children_s/SYM_5695.jpg', label: 'Playground' },
    { src: '/Children_s/SYM_5758.jpg', label: 'Pitch' },
    { src: '/Children_s/SYM_5867.jpg', label: 'Reception' },
    { src: '/Children_s/SYM_5779.jpg', label: 'Playground' },
    { src: '/Children_s/SYM_5956.jpg', label: 'Classroom' },
    { src: '/Children_s/SYM_6024.jpg', label: 'Classroom' },
    { src: '/Children_s/SYM_6032.jpg', label: 'Restroom' },
    { src: '/Children_s/SYM_6034.jpg', label: 'Restroom' },
    { src: '/Children_s/SYM_6056.jpg', label: 'Classroom' },
    { src: '/Children_s/SYM_6065.jpg', label: 'Classroom' },
    { src: '/Children_s/SYM_6071.jpg', label: 'Classroom' },
    { src: '/Children_s/SYM_6109.jpg', label: 'Kitchen' },
    { src: '/Children_s/SYM_6144.jpg', label: 'Classroom' },
  ];

  const openModal = (src) => {
    setSelectedImage(src);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  // Handle ESC key press
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  return (
    <div className="py-16 bg-white">

      <section className="mt-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Explore Our Building</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {buildingImages.map((image, index) => (
            <div 
              key={index} 
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
              onClick={() => openModal(image.src)}
            >
              <div className="relative pt-[75%]">
                <img
                  src={image.src}
                  alt={image.label}
                  className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute top-2 left-2 bg-black/70 text-white px-3 py-1 rounded-md text-sm font-semibold">
                {image.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 p-4 flex items-center justify-center"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300"
          >
            ×
          </button>
          <div 
            className="relative max-w-6xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Selected building view"
              className="max-h-[90vh] max-w-full mx-auto object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BuildingGallery;