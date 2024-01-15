import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';
import { createImagesURL } from '../services/movies';
import { FaPlayCircle } from "react-icons/fa"
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'

const Search = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  const { user } = UserAuth();

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_APP_TMDB_API_KEY}&query=${query}&include_adult=false&language=en-US&page=1`)
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }, [])
  return (
    <>
      <Nav />
      <Helmet>
        <title>Search - {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <div className='min-h-screen pt-24 text-white bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]'>
        <div className='container m-auto top-[45%] lg:top-[20%] p-4 md:p-8 flex justify-between items-center'>
          <h1 className='text-3xl font-semibold '> Search results for : "{query}"</h1>
        </div>
        <div className='container m-auto grid gap-5 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 p-5 justify-items-center align-items-center'>
          {
            movies.map(movie => (
              <div key={movie.id} className='bg-black font-semibold text-l p-2 shadow-2xl relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] rounded-lg overflow-hidden  group hover:scale-110 hover:rounded-lg transition'>
                <img src={createImagesURL(movie.poster_path, "w500")} alt={movie.title} className="w-full h-full object-cover object-top rounded-lg " />
                <div className='absolute top-0 left-0 w-full h-full bg-black/80 opacity-0 hover:opacity-70'>
                  <p className='whitespace-normal text-xs md:text-sm flex justify-center items-center h-full '>
                    {movie.title}
                  </p>
                  <div className='flex justify-between items-center'>
                    <Link to={`/watch/${movie.id}`}>
                      <FaPlayCircle size={40} className='absolute bottom-2 left-2 text-white' />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Search
