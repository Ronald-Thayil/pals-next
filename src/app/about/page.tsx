import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProfileImg from "@/images/profile.png";
export default function About() {
  const founders = [
    {
      name: "Sijo Samkutty",
      role: "Founder",
      image: ProfileImg,
    },
    {
      name: "Shiju Samkutty",
      role: "Co-founder",
      image: ProfileImg,
    },
    {
      name: "Ronald Thayil",
      role: "Director",
      image: ProfileImg,
    },
    {
      name: "Shawn Liju",
      role: "Director",
      image: ProfileImg,
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
            At 4pals, we envision a world where quality products are accessible
            to everyone. We strive to create a seamless shopping experience that
            connects consumers with the best products from around the globe.
          </p>
        </section>

        <section className="mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-700">
            FourPalsVentures Pvt Ltd is a sourcing company founded by four
            friends, dedicated to helping businesses grow by providing
            high-quality packing materials and essential commodities. We
            specialize in sourcing a wide range of products, including lug caps,
            ROPP caps, standup pouches, and much more. Whether you need reliable
            packaging solutions or commodities like rice and spices, we ensure
            you get the best products without any hassle. Let us be your trusted
            partner in meeting all your sourcing needs
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
