import React from "react";
import Whatsapp from "./Whatsapp";

const Help = () => {
  return (
    <>
      <div className="help flex items-center justify-center gap-1  lg:gap-10 h-44 my-16">
        <p className="text-2xl px-6 text-white font-bold lg:text-3xl">
          We are here, if you still have questions!{" "}
        </p>
        <Whatsapp />
      </div>
    </>
  );
};

export default Help;
