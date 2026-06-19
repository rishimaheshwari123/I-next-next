import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebase.config";
import Cookies from "cookies-js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { employee } from "../context/employee";
import Swal from "sweetalert2";
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { setemployeeData } = useContext(employee);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));

    // console.log(formData) ;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!formData.email.trim() || !formData.password.trim()) {
        Swal.fire({
          title: "Error!",
          text: "All fields are required.",
          icon: "error",
        });
        setLoading(false);
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

      const q = query(
        collection(db, "employees"),
        where("email", "==", formData.email)
      );
      const userSnap = await getDocs(q);

      let user;
      userSnap.forEach((doc) => {
        user = doc.data();
      });

      console.log(user);

      if (!user || user.password !== formData.password) {
        Swal.fire({
          title: "Error!",
          text: "Invalid Password .",
          icon: "error",
        });
        setLoading(false);
        return;
      }
      Cookies.set("email", user.email, {
        expires: 36500,
        path: "/",
        secure: false,
      });
      const cookieSet = Cookies.get("email");
      console.log("Cookie set:", cookieSet);
      Swal.fire({
        title: "Good job!",
        text: "You are successfully logged in !",
        icon: "success",
      });

      setemployeeData(user) ; 
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const email = Cookies.get("email");
    console.log("Retrieved email from cookies:", email);
  }, []);

  return (
    <div className="mt-[87px] w-11/12 mx-auto">
      <div className="md:text-2xl md:font-bold  flex justify-center md:my-10 ">
        Employee Login Page
      </div>
      <div className="flex justify-center shadow-2xl bg-[#FFFFFF] w-full flex-col gap-5 items-center md:h-[400px] ">
        <div className="flex flex-col space-y-1 w-[40%] ">
          <label className="text-xl font-medium ">
            Enter Valid Email
            <span className="text-red-600">*</span>
          </label>
          <input
            onChange={handleChange}
            required
            placeholder="Enter Email address"
            className="py-2 focus:outline-none   px-4 border-2 border-gray-300 rounded-md "
            id="email"
            type="email"
          />
        </div>
        <div className="flex flex-col space-y-1 w-[40%] ">
          <label className="text-xl font-medium ">
            Enter Password
            <span className="text-red-600">*</span>
          </label>
          <input
            onChange={handleChange}
            required
            placeholder="Enter Password"
            className="py-2 focus:outline-none   px-4 border-2 border-gray-300 rounded-md "
            id="password"
            type="password"
          />
        </div>
        <div className="w-fit">
          <button
            onClick={handleSubmit}
            className="contact-btn"
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
        {message && <div>{message}</div>}
      </div>
    </div>
  );
};
export default Login;
