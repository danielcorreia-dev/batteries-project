import Image from 'next/image';
import React from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Pagination]);

interface Slide {
  image: string;
  title: string;
  content: string;
}

interface SliderProps {
  slides: Slide[];
}

const Slider: React.FC<SliderProps> = ({ slides }) => {
  return (
    <Swiper
      // navigation
      pagination={{ clickable: true }}
      spaceBetween={10}
      slidesPerView={1}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className='flex items-center'>
            <Image
              src={slide.image}
              alt={`Slide ${index}`}
              width={500}
              height={500}
            />
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{slide.title}</h2>
              <p className="text-gray-700">{slide.content}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
