import Image from "next/image";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import DummyImage from "@/images/setup-gear-10.jpg";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const product = {
    id: params.id,
    name: `Product ${params.id}`,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: (Math.random() * 100 + 10).toFixed(2),
    category: "Electronics",
  };

  const relatedProducts = Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
    name: `Related Product ${i + 1}`,
    price: (Math.random() * 100 + 10).toFixed(2),
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Image
              src={DummyImage}
              alt={product.name}
              width={400}
              height={400}
              layout="responsive"
            />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">
              {product.name}
            </h1>
            <p className="text-gray-600 mb-4">{product.category}</p>
            <p className="text-2xl font-bold text-primary mb-4">
              ${product.price}
            </p>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <button className="w-full sm:w-auto bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark">
              Add to Cart
            </button>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {relatedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Image
                  src={DummyImage}
                  alt={product.name}
                  width={200}
                  height={200}
                  layout="responsive"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-primary font-bold mb-2">
                    ${product.price}
                  </p>
                  <Link
                    href={`/products/${product.id}`}
                    className="text-primary hover:underline"
                  >
                    View Details
                  </Link>
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
