import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function About() {
  const founders = [
    {
      name: "John Doe",
      role: "Founder",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Jane Smith",
      role: "Co-founder",
      image: "/placeholder.svg?height=300&width=300",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8">About Us</h1>

        <section className="mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Our Vision</h2>
          <p className="text-gray-700">
            At TraderStore, we envision a world where quality products are
            accessible to everyone. We strive to create a seamless shopping
            experience that connects consumers with the best products from
            around the globe.
          </p>
        </section>

        <section className="mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-700">
            Founded in 2010, TraderStore began as a small local shop with a big
            dream. Over the years, we&apos;ve grown into a global e-commerce
            platform, serving customers in over 50 countries. Our journey has
            been driven by our passion for quality products and exceptional
            customer service.
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-8">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Image
                  src={founder.image}
                  alt={founder.name}
                  width={300}
                  height={300}
                  layout="responsive"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{founder.name}</h3>
                  <p className="text-gray-600">{founder.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
