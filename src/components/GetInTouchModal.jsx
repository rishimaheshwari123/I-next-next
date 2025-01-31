"use client";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import Swal from "sweetalert2";

const GetInTouchModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });
  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.contact ||
      !formData.message
    ) {
      Swal.fire({
        title: "Error!",
        text: "All fields are required.",
        icon: "error",
      });
      return;
    }
    Swal.fire({
      title: "Loading...",
      text: "Please wait while we process your request.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await axios.post(
        "https://i-next-ets.onrender.com/api/v1/user/contact",
        formData
      );

      if (response?.data?.success) {
        Swal.fire({
          title: "Good job!",
          text: "Your message has been sent successfully!",
          icon: "success",
        });
        setFormData({ name: "", email: "", contact: "", message: "" });
        onClose();
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "There was a problem sending your message. Please try again later.",
        icon: "error",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg relative w-[80%] max-w-md">
        <span
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 cursor-pointer"
          onClick={onClose}
        >
          <RxCross2 size={25} />
        </span>
        <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="p-3 outline-none h-14 border border-gray-300 bg-transparent rounded-md"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 outline-none rounded-md h-14 border border-gray-300 bg-transparent"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label className="block text-gray-700">Contact</label>
            <input
              type="text"
              placeholder="Enter your phone "
              className="p-3 outline-none h-14 border rounded-md border-gray-300 bg-transparent"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label className="block text-gray-700">Message</label>
            <textarea
              className="p-3 outline-none rounded-md h-28 border border-gray-300 bg-transparent"
              placeholder="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
          <button
            type="submit"
            className="flex mt-5 contact-btn
          "
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default GetInTouchModal;
