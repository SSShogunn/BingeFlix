import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Collections from '../components/Collections';
import Hero from '../components/Hero';
import axios from 'axios';
import Nav from '../components/Nav';
import endPoints from '../services/movies';
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {
  return (
    <>
      <Nav/>
      <div className='font-custom h-full flex flex-col items-center justify-center pt-24 text-white bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]'>
        <Hero />
        <div className=' pt-10 w-full '>
          <Collections title='Popular 🔥' data={endPoints.popular} />
          <Collections title='Top Rated ⭐⭐⭐⭐⭐' data={endPoints.topRated} />
          <Collections title='Now Playing 📽️' data={endPoints.trending} />
          <Collections title='Upcoming 🎞️' data={endPoints.upComing} />
          <Collections title='Comedy 🤣' data={endPoints.comedy} />
        </div>
      </div>
      <ToastContainer/>
    </>

  );
};

export default Home;
