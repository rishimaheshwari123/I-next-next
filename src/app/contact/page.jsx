"use client";
import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      if (response?.data) {
        Swal.fire({
          title: "Good job!",
          text: "Your message has been sent successfully!",
          icon: "success",
        });
        // console.log(response.data);
      }
      setFormData({ name: "", email: "", contact: "", message: "" });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "There was a problem sending your message. Please try again later.",
        icon: "error",
      });
    }
  };

  if (!isClient) {
    return null;
  }
  return (
    <div className="mt-[87px] w-11/12 mx-auto">
      <iframe
        title="rishi"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.24334420191!2d77.43451330000002!3d23.234230300000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c426995118ba1%3A0x5b7132b3422f2cfd!2sI%20NEXT%20ETS-%20website%20design%20and%20digital%20marketing%20company%20in%20bhopal%20mobille%20app%20developement!5e0!3m2!1sen!2sin!4v1719913977542!5m2!1sen!2sin"
        allowFullScreen
        className="w-full h-[500px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <div className=" grid gap-4 main lg:grid lg:grid-cols-2 my-36 items-center">
        <div className="first flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <span className="px-4 py-3 bg-cyan-500 rounded-md text-xl">
              <FaLocationDot />
            </span>
            <span>
              {" "}
              Plot No - 11 ,2nd floor, near MANOHAR DAIRY, Zone-I, Maharana
              Pratap Nagar, Bhopal, Madhya Pradesh 462011
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-4 py-3 bg-cyan-500 rounded-md text-xl">
              <FaLocationDot />
            </span>
            <span>
              USA Address : 9733 Jefferson Pkwy D3, Englewood CO USA 80112
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-4 py-3 bg-cyan-500 rounded-md  text-xl">
              <MdEmail />
            </span>
            <span>info.inextets@gmail.com</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-4 py-3 bg-cyan-500 rounded-md  text-xl">
              <FaPhone />
            </span>
            <span>+91 9981122493</span>
          </div>
        </div>
        <form className="second flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Enter your name"
              className="p-3 outline-none h-14 border border-gray-300 bg-transparent"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 outline-none h-14 border border-gray-300 bg-transparent"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <input
            type="text"
            placeholder="Enter your phone "
            className="p-3 outline-none h-14 border border-gray-300 bg-transparent"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />
          <textarea
            className="p-3 outline-none h-28 border border-gray-300 bg-transparent"
            placeholder="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button
            type="submit"
            className="flex mt-5 contact-btn
          "
          >
            Send Message!
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
