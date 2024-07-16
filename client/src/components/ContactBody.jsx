import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // Corrected import for Twitter icon

const ContactBody = () => {
  return (
    <div className="container mx-auto px-4 py-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
      <div className="w-full max-w-md mx-auto">
        <form className="bg-blue-100 shadow-md rounded-lg p-6 space-y-2">
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-12"
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10"
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
              rows="6"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="button"
            className="btn bg-blue-500 text-white p-2 rounded"
          >
            Send
          </button>
        </form>
      </div>

      <footer className="flex justify-center items-center mt-8 bg-blue-300 shadow-md rounded-lg">
        <div className="flex space-x-4 mt-4 text-black">
          <p>Phone: +251949309145</p>
          <a href="#">
            <FaFacebook className="text-2xl hover:text-blue-800" />
          </a>
          <a href="#">
            <FaInstagram className="text-2xl hover:text-blue-800" />
          </a>
          <a href="#">
            <FaXTwitter className="text-2xl hover:text-blue-800" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default ContactBody;
