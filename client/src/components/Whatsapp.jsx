import React from "react";
import { BsWhatsapp } from "react-icons/bs";

function Whatsapp() {
  return (
    <div className="whatsapp mr-5 ">
      <a
        href="https://wa.me/919981122493"
        target="_blank"
        className="flex items-center gap-2"
      >
        <span className="  lg:text-2xl text-white">
          {" "}
          <BsWhatsapp />
        </span>
      </a>
    </div>
  );
}

export default Whatsapp;
