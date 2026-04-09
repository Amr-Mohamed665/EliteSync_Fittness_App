import "../index.css";

import {
  FaInstagram,
  FaTiktok,
  FaFacebookF,
  FaXTwitter,
} from "react-icons/fa6";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Footer() {
  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "Our Trainers", path: "/trainers" },
    { label: "Packages", path: "/packages" },
    { label: "Book Session", path: "/packages" },
    { label: "Contact Us", path: "/contact" },
  ];

  return (
    <footer className="bg-gray-950 text-gray-400 px-4 sm:px-6 md:px-10 py-10 sm:py-14 border-t border-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <Link to="/">
            <h2 className="text-2xl font-bold text-white">
              Elite<span className="text-orange">Sync</span>
            </h2>
          </Link>

          <p className="mt-4 text-sm leading-6">
            Elite personal training for peak performance. Transform your body,
            elevate your mindset.
          </p>

          <div className="flex gap-3 mt-5">
            {[FaInstagram, FaTiktok, FaFacebookF, FaXTwitter].map((Icon, i) => (
              <div
                key={i}
                className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-lg hover:bg-red-500 cursor-pointer transition"
              >
                <Icon />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className="hover:text-white transition"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Specialties</h3>
          <ul className="space-y-2">
            {[
              "Strength Training",
              "HIIT & Cardio",
              "Yoga & Mindfulness",
              "Sports Performance",
              "Functional Fitness",
              "Women's Fitness",
            ].map((item) => (
              <li
                key={item}
                className="hover:text-white cursor-pointer transition"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>

          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <FiMapPin /> Egypt
            </p>
            <p className="flex items-center gap-2">
              <FiMail /> hello@elitesync.com
            </p>
            <p className="flex items-center gap-2">
              <FiPhone /> +20 123 456 7890
            </p>
          </div>

          <div className="flex mt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-800 px-4 py-2 rounded-l-md outline-none text-white w-full"
            />
            <button className=" bg-orange px-4 rounded-r-md flex items-center justify-center">
              <IoSend />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
