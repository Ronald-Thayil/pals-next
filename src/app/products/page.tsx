"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DummyImage from "@/images/headphone-6.png";

export default function ProductList() {
  const categories = [
    "All",
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports & Outdoors",
  ];
  const products = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    category:
      categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
    price: (Math.random() * 100 + 10).toFixed(2),
  }));

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8">Our Products</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/4">
            <div className="flex justify-between items-center md:hidden mb-4">
              <h2 className="text-xl font-semibold">Categories</h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="text-primary"
              >
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>
            </div>
            <ul
              className={`space-y-2 ${
                showFilters ? "block" : "hidden"
              } md:block`}
            >
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left py-2 px-4 rounded ${
                      selectedCategory === category
                        ? "bg-primary text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
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
                    <h3 className="text-lg font-semibold mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-2">{product.category}</p>
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
