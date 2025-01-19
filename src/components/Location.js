import Image from "next/image";

export default function Location() {
    return (
      <section id="location" className="bg-[#ffe6e6] py-16">
        <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-2 items-center gap-8">
          <div className="location-info">
            <h2 className="text-3xl font-bold mb-4">Our Location</h2>
            <div className="h-1 w-20 bg-red-500 mb-6"></div>
            <div className="relative md:h-96 h-44 mb-6">
              <Image
                src="/Children_s/SYM_6113.jpg"
                alt="Building"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h3 className="text-xl mb-2">Orchid Hotel Road, Eleganza Bus Stop,</h3>
            <p>Lekki, Lagos State, Nigeria</p>
          </div>
          
          <div className="h-full w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3855.4361202991604!2d3.542417419739592!3d6.445076038812934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf7017fc02585%3A0xee39ec67f83aaae4!2sOrchid%20Hotels%20Limited!5e0!3m2!1sen!2sng!4v1737021521818!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    );
  }