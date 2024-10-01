"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          TraderStore
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="text-gray-600 hover:text-primary">
            Home
          </Link>
          <Link href="/products" className="text-gray-600 hover:text-primary">
            Products
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-primary">
            About Us
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-primary">
            Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <button
            className="md:hidden text-gray-600 hover:text-primary"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col space-y-2 px-4 py-2">
            <Link
              href="/"
              className="text-gray-600 hover:text-primary"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-600 hover:text-primary"
              onClick={toggleMenu}
            >
              Products
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-primary"
              onClick={toggleMenu}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-primary"
              onClick={toggleMenu}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
