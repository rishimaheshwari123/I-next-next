"use client";
import React, { useState, useEffect } from "react";
import { IoIosArrowDropright } from "react-icons/io";

const HowWeWork = () => {
  const [clientsCount, setClientsCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);

  useEffect(() => {
    const clientsTarget = 18;
    const projectsTarget = 200;
    const duration = 1000;

    const incrementClients = Math.ceil(clientsTarget / (duration / 100));
    const incrementProjects = Math.ceil(projectsTarget / (duration / 100));

    const clientsInterval = setInterval(() => {
      setClientsCount((prev) => {
        if (prev < clientsTarget) {
          return prev + incrementClients;
        } else {
          clearInterval(clientsInterval);
          return clientsTarget;
        }
      });
    }, 100);

    const projectsInterval = setInterval(() => {
      setProjectsCount((prev) => {
        if (prev < projectsTarget) {
          return prev + incrementProjects;
        } else {
          clearInterval(projectsInterval);
          return projectsTarget;
        }
      });
    }, 100);

    return () => {
      clearInterval(clientsInterval);
      clearInterval(projectsInterval);
    };
  }, []);

  return (
    <>
      <div className=" mt-[99px] lg:mt-[50px]  w-11/12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2  items-center ">
          <div className="first ">
            <p className="text-3xl font-bold">
              Premium <span className="text-orange-500">Tech Recruitment</span>{" "}
              and
              <span className="text-blue-600"> Software Development</span>{" "}
              Services
            </p>

            <p className="text-xl">
              For demanding clients and challenging projects.
            </p>
            <div className="flex gap-16 lg:gap-24 my-8">
              <div className="flex flex-col gap-4">
                <span className="text-3xl font-bold">{clientsCount}+</span>
                <div className="grid">
                  <span className="text-wrap">Clients worldwide</span>
                  <span>since 2010.</span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-3xl font-bold">{projectsCount}+</span>
                <div className="grid">
                  <span>Live projects worldwide </span>
                  <span>since 2010.</span>
                </div>
              </div>
            </div>
            <br />
            <button className="flex items-center gap-2 font-bold text-2xl bg-orange-500 px-5 py-3 rounded-lg hover:bg-gray-300 hover:text-orange-600">
              Learn More <IoIosArrowDropright className="mt-1" />
            </button>
            <br />
          </div>

          <div className="second">
            <img
              src="/developer_male-removebg-preview.png"
              alt="not found"
              className="animate-float"
            />
          </div>
        </div>
        <div className="grid gap-5 mt-7">
          <p className="text-xl lg:text-3xl font-bold text-center">
            Our Process
          </p>
          <p className="text-xl  text-center">
            See what our projects have to go through..!
          </p>
          <img
            src="https://www.groovyweb.co/assets/img/assets-img/Diagram.svg"
            alt="not found"
          />
        </div>
      </div>
    </>
  );
};

export default HowWeWork;
