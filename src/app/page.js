"use client"
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';


function page() {
  return (
    <>
    <section className='#F2FBF8'>
    <div className="container mx-auto px-5 py-10">
    <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div>
            <div>
            <h2 className='font-bold text-4xl'>Efficient, Reliable and Affordable</h2>
            <h4>Transforming healthcare information management with complete Health Care Solutions</h4>
            <div>
            <button className="mt-5 py-3 px-3 rounded-md bg-[#207EF6] text-white hover:bg-[#07092B]">
              <i className="bi bi-calendar2-minus-fill pr-2"></i>
              Schedule a Demo
            </button>
            <button className="mt-5 py-3 px-4 rounded-md border border-[#207EF6] text-[#207EF6] hover:bg-[#07092B] ml-3">
              <i className="bi bi-calendar2-minus-fill pr-2"></i>
              Learn More 
            </button>
            </div>
            </div>
            <div></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
      </Swiper>
    </div>


    </section>
    
    
    </>
  )
}

export default page