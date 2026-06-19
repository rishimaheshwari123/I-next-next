import React from "react";
import { AboutProject } from "../cardData";
const Projects = () => {
  return (
    <div>
      <span className="text-4xl font-bold block my-7">Latest Projects</span>
      <span className="text-xl">
        Check out our projects where we made our clients win in the real world.
      </span>
      <div className="sm:grid gap-3 lg:grid lg:grid-cols-3 my-10 lg:gap-10 ">
        {AboutProject.map((currElem) => (
          <div
            className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-100 workCard"
            key={currElem.id}
          >
            <img className="w-full" src={currElem.img} alt="Example Image" />
            <div className="px-6 py-4">
              <div className="font-bold text-2xl mb-4 text-center">
                {currElem.title}
              </div>
              <p className="text-gray-700 text-base text-center">
                {currElem.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
