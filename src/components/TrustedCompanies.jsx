// components/TrustedCompanies.js
"use client";

import Marquee from "react-fast-marquee";
import Image from "next/image";

const TrustedCompanies = () => {
  const companies = [
    { src: "/t1.png", alt: "Company 1", width: 260, height: 170 },
    { src: "/t2.png", alt: "Company 2", width: 200, height: 200 },
    { src: "/t3.png", alt: "Company 3", width: 210, height: 200 },
    { src: "/t4.png", alt: "Company 4", width: 380, height: 70 },
    { src: "/t5.png", alt: "Company 5", width: 300, height: 200 },
    { src: "/t6.png", alt: "Company 6", width: 280, height: 200 },
    { src: "/t7.png", alt: "Company 7", width: 350, height: 200 },
    { src: "/t8.png", alt: "Company 8", width: 240, height: 200 },
    { src: "/t9.png", alt: "Company 9", width: 200, height: 200 },
  ];

  return (
    <div className="my-16">
      <p className="text-center text-xl">
        Trusted by companies all over the world.
      </p>
      <br />
      <Marquee pauseOnHover={true} gradient={false}>
        {companies.map((company, index) => (
          <div key={index} className="mx-4">
            <Image
              src={company.src}
              alt={company.alt}
              width={company.width}
              height={company.height}
              priority={true}
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default TrustedCompanies;
