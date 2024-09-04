"use client";
import React from "react";
import Image from "next/image";

function page() {
  return (
    <>
      <section className="py-10">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center p-4 md:p-8  pt-[150px] md:pt-[130px] ">
          <div className="w-full lg:w-1/2 flex flex-col items-start order-1 lg:order-1">
          <h5 className="mb-4 text-sm lg:text-xl text-[#07092B] font-semibold">Career opportunities</h5>
            <h1 className="text-2xl lg:text-5xl font-bold text-[#3D3D3D]">
              Do your best work
              at SmartCare Connect
            </h1>
            <p className="mt-4 text-sm lg:text-base">
              SmartCare Connect is here to provide you a learning platform not only
              on technical aspects but also on emotional and social arenas. We
              invite you to be a part of our amazing success story through
              exciting growth opportunities. Our company can proudly say that we
              as employers feel employees’ as valuable assets, who are provided
              guidance and support in a dynamic environment.
            </p>
            <p className="mt-4 text-sm lg:text-base">Check out our open
              roles below – if you don't see one that matches your talents,
              please send message on <a className="text-[#207EF7]" href="">info@danphehealth.com</a></p>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end order-2 lg:order-2 pt-5 md:pt-6 lg:pt-0">
            <Image
              src="https://danphehealth.com/frontend/img/image33.jpg"
              width={480}
              height={0}
              className="rounded-lg"
              alt="Healthcare Software Solutions"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default page;
