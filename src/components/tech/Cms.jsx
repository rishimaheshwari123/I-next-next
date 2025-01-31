import React from "react";
import { cms } from "./data";

const Cms = () => {
  return (
    <div className="flex mt-10 flex-wrap items-center justify-center lg:gap-24">
      {cms.map((currElem) => (
        <div className="flex flex-col gap-2 items-center" key={currElem.id}>
          {currElem.img}
          {currElem.title}
        </div>
      ))}
    </div>
  );
};

export default Cms;
