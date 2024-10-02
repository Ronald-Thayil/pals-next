import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              Get in Touch
            </h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark"
              >
                Send Message
              </button>
            </form>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              Our Location
            </h2>
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4205.193639313382!2d72.54535297585336!3d23.097565279121294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e831824190719%3A0x73f901e0e996377c!2sVandemataram%20Icon!5e1!3m2!1sen!2sin!4v1727854107067!5m2!1sen!2sin"
                style={{ border: 0, width: "100%", height: "350px" }}
                allowFullScreen={true}
                loading="lazy"
                className="w-full h-full"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-primary mr-2" />
                <p>
                  E-202, Vande Matram Icon, Opp Sukan Residency, Gota
                  Ahmedabad-382481
                </p>
              </div>
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-primary mr-2" />
                <p>(+91) 7990257851</p>
              </div>
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-primary mr-2" />
                <p>sales@fourpalsventures.com</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
