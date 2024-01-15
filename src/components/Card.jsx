import React, { useEffect } from 'react';
import { useState } from 'react';
import { createImagesURL } from '../services/movies';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaPlayCircle } from "react-icons/fa"
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { UserAuth } from '../context/AuthContext';
import { Toast } from 'radix-ui';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card = ({ movie, className }) => {
  const [like, setLiked] = useState(false);

  const { user } = UserAuth()
  const navigate = useNavigate();


  const markFav = async () => {
    const userId = user?.uid;
    if (userId) {
      const userDoc = doc(db, "users", userId);

      setLiked(!like);

      await updateDoc(userDoc, {
        favShows: arrayUnion({ ...movie })
      })

      toast('Movie Added ✅', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });

    } else {
      navigate('/login')
    }
  }

  return (
    // <div to={`/watch/${movie.id}`}>

    <div
      className={`relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden m-2 group hover:scale-110 hover:rounded-lg transition ${className}`}
    >
      <img src={createImagesURL(movie.poster_path, "w500")} alt="" className="w-full h-full object-cover" />
      <div className='absolute top-0 left-0 w-full h-full bg-black/80 opacity-0 hover:opacity-70'>
        <p className='whitespace-normal text-xs md:text-sm flex justify-center items-center h-full '>
          {movie.title}
        </p>
        <div className='flex justify-between items-center'>
          <Link to={`/watch/${movie.id}`}>
            <FaPlayCircle size={40} className='absolute bottom-2 left-2 text-white' />
          </Link>
          <button onClick={markFav}>
            {
              like ? (
                <FaHeart size={30} className='absolute top-2 right-2 text-white' />
              ) : (
                <FaRegHeart size={30} className='absolute top-2 right-2 text-white' />
              )
            }
          </button>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Card;
