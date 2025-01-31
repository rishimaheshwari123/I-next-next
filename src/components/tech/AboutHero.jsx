import React from "react";

const AboutHero = () => {
  return (
    <div className="grid gap-5 grid-cols-1 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center lg:h-[60vh] px-6 lg:px-12 my-14">
      <div className="flex flex-col gap-6 lg:gap-9">
        <span className="text-4xl lg:text-5xl font-bold">
          Passion for technology and business brought us here.
        </span>
        <p className="text-xl lg:text-2xl">
          With a shared dedication to innovation and a customer-centric
          approach, our team brings a wealth of experience and skills to the
          table.
        </p>
        <button className="bg-yellow-300 hover:bg-yellow-400 w-28 h-10 rounded-md lg:text-xl font-bold">
          Let's Talk
        </button>
      </div>
      <div className="flex gap-4 h-full items-center">
        <div className="h-[50vh] lg:h-[60vh] w-full overflow-hidden relative">
          <div className="absolute inset-0 animate-scroll-down">
            <div className="flex flex-col gap-4 h-full">
              <img
                src="https://assets-global.website-files.com/659b0c71094eaac10e702c1f/65a046c10913c7549f00ffa6_about%20us%20banner7.jpg"
                alt="About Us Image 1"
                className="w-full object-contain mb-4"
              />
              <img
                src="https://assets-global.website-files.com/659b0c71094eaac10e702c1f/659b0c71094eaac10e702d65_About%20B%20Consult%20Craft%20Webflow%20Template%204.jpg"
                alt="About Us Image 2"
                className="w-full object-contain mb-4"
              />
              <img
                src="https://assets-global.website-files.com/659b0c71094eaac10e702c1f/65a04757a546da33f32f3d15_about%20us%20banner12.jpg"
                alt="About Us Image 3"
                className="w-full object-contain mb-4"
              />
              <img
                src="https://assets-global.website-files.com/659b0c71094eaac10e702c1f/65a04757a546da33f32f3d15_about%20us%20banner12.jpg"
                alt="About Us Image 3"
                className="w-full object-contain"
              />
            </div>
          </div>
        </div>

        <div className="h-[50vh] lg:h-[60vh] w-full overflow-hidden relative">
          <div className="absolute inset-0 animate-scroll-up">
            <div className="flex flex-col gap-4 h-full">
              <img
                src="https://assets-global.website-files.com/659b0c71094eaac10e702c1f/65a04757a546da33f32f3d15_about%20us%20banner12.jpg"
                alt="About Us Image 4"
                className="w-full object-contain mb-4"
              />
              <img
                src="https://assets-global.website-files.com/659b0c71094eaac10e702c1f/65a046c10913c7549f00ffa6_about%20us%20banner7.jpg"
                alt="About Us Image 5"
                className="w-full object-contain mb-4"
              />
              <img
                src="https://assets-global.website-files.com/659b0c71094eaac10e702c1f/65a046c10913c7549f00ffa6_about%20us%20banner7.jpg"
                alt="About Us Image 5"
                className="w-full object-contain mb-4"
              />
              <img
                src="https://assets-global.website-files.com/659b0c71094eaac10e702c1f/659b0c71094eaac10e702d65_About%20B%20Consult%20Craft%20Webflow%20Template%204.jpg"
                alt="About Us Image 6"
                className="w-full object-contain mb-4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;
