import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const ContactBody = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
      <div className="flex flex-col md:flex-row justify-around items-center mb-8">
        <div className="w-full max-w-md">
          <form className="bg-blue-100 shadow-md rounded-lg p-6 space-y-4">
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
                className="block text-sm font-medium text-gray-700 h-12"
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
              type="submit"
              className="btn bg-blue-500 text-white p-2 rounded"
            >
              Send
            </button>
          </form>
        </div>
        <div className="mt-8 md:mt-0 bg-blue-100 shadow-md rounded-lg p-6 space-y-4">
          <h4 className="text-lg font-bold text-blue-800 ">Reach us at:</h4>
          <p className="mt-2">Phone: +123456789</p>
          <div className="flex space-x-4 mt-4">
            <div className="">
              <a href="">
                <FaFacebook className="text-2xl text-blue-600 hover:text-blue-800" />
              </a>
            </div>
            <div className="">
              <a href="#">
                <FaInstagram className="text-2xl text-pink-600  hover:text-blue-800 " />
              </a>
            </div>
            <div className="">
              <a href="#">
                <FaTwitter className="text-2xl text-blue-400  hover:text-blue-800" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactBody;
