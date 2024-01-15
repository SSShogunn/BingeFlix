import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";


const Collections = ({ title, data }) => {
  const [movies, setMovies] = useState([]);

  const ctgId = Math.floor(Math.random() * 1000);

  useEffect(() => {
    axios.get(data)
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);

      });
  }, [data]);

  const slide = (offset) => {
    const slider = document.getElementById(`slider` + ctgId)
    slider.scrollLeft += offset
  }

  return (
    <div className='border-t rounded-3xl mt-3 border-blue-900'>
      <h2 className='md:text-3xl pt-4 pl-7 capitalize font-semibold '>{title}</h2>
      <div className='relative flex items-center group'>
        <FaChevronLeft 
        size={30} 
        className=' rounded-full absolute left-2 text-white z-10 hidden group-hover:block cursor-pointer h-full'
        onClick={()=>{slide(-500)}}
        />
        <div id={`slider` + ctgId} className='scroll-container overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide p-4'>
          {movies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
        <FaChevronRight 
        size={30} 
        className='rounded-full absolute right-2 text-white z-10 hidden group-hover:block cursor-pointer h-full'
        onClick={()=>{slide(500)}}
        />
      </div>
    </div>
  );
};

export default Collections;
