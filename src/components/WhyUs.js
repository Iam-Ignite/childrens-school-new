import Image from 'next/image'

export default function WhyUs() {
  return (
    <section className="why-us py-16 px-8 bg-gray-50" id="why-us">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
        <div className="why-us-images md:w-1/2">
          <Image
            src="/why.png"
            alt="Classroom activities"
            width={400}
            height={400}
            className="rounded-lg"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-6">Why Choose Us</h2>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-2">
              <span className="text-[#FC403A]">✓</span>
              Our environment is expertly designed
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#FC403A]">✓</span>
              Our teachers are qualified and friendly
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#FC403A]">✓</span>
              We provide perfect blend of play and learning
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#FC403A]">✓</span>
              Swimming pools and more
            </li>
          </ul>
          <p>Our programs ensure every milestone is not just met but surpassed.</p>
        </div>
      </div>
    </section>
  )
}
