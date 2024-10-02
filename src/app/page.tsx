import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DummyImage from "@/images/stroller-baby-darkblue.jpg";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Banner */}
        <section className="relative h-64 sm:h-96">
          <Image
            src={DummyImage}
            alt="Banner"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
                Welcome to 4pal&apos;s
              </h1>
              <p className="text-lg sm:text-xl mb-8">
                Discover amazing products at great prices
              </p>
              {/* <Link
                href="/products"
                className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark"
              >
                Shop Now
              </Link> */}
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
              Featured Categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
              {[
                "Electronics",
                "Clothing",
                "Home & Garden",
                "Sports & Outdoors",
              ].map((category) => (
                <Link
                  key={category}
                  href={`/products?category=${category.toLowerCase()}`}
                  className="group"
                >
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src={DummyImage}
                      alt={category}
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                      <h3 className="text-white text-xl font-semibold">
                        {category}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Products */}
        <section className="py-12 sm:py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
              Trending Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-8">
              {[1, 2, 3, 4, 5].map((product) => (
                <div
                  key={product}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <Image
                    src={DummyImage}
                    alt={`Product ${product}`}
                    width={200}
                    height={200}
                    layout="responsive"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Product {product}
                    </h3>
                    <p className="text-gray-600 mb-2">$99.99</p>
                    <Link
                      href={`/products/${product}`}
                      className="text-primary hover:underline"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        {/* <section className="py-12 sm:py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Join Our Community
            </h2>
            <p className="text-lg sm:text-xl mb-8">
              Get exclusive offers and stay updated with our latest products
            </p>
            <Link
              href="/signup"
              className="bg-white text-primary px-6 py-3 rounded-md hover:bg-gray-100"
            >
              Sign Up Now
            </Link>
          </div>
        </section> */}
      </main>
      <Footer />
    </div>
  );
}
