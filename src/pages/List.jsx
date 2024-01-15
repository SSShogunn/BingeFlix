import Nav from '../components/Nav'
import { db } from '../services/firebase'
import { UserAuth } from '../context/AuthContext'
import { createImagesURL } from '../services/movies'

import React, { useEffect, useState } from 'react'
import { arrayRemove, doc, onSnapshot, updateDoc } from 'firebase/firestore'

import { Link } from 'react-router-dom'
import { IoMdClose } from "react-icons/io";
import { FaHeart, FaRegHeart, FaPlayCircle } from "react-icons/fa"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const List = () => {
    const [movies, setMovies] = useState([])
    const { user } = UserAuth();

    useEffect(() => {
        if (user) {
            onSnapshot(doc(db, "users", `${user.uid}`), (doc) => {
                if (doc.data()?.favShows) {
                    setMovies(doc.data()?.favShows)
                }
            });
        }
    }, [user])

    const handleUnlike = async (movie) => {
        const userDoc = doc(db, "users", `${user.uid}`);
        await updateDoc(userDoc, {
            favShows: arrayRemove(movie)
        })
        toast('Movie Removed ✅', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });
    }

    if (!user) {
        return (
            <div>
                <p>
                    NO DATA FOUND . . . . .
                </p>
            </div>
        )
    }

    return (
        <>
            <Nav />
            <ToastContainer />
            <div className='h-full pt-24 text-white bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]'>
                <div className='container m-auto top-[45%] lg:top-[20%] p-4 md:p-8 flex justify-between items-center'>
                    <h1 className='text-3xl font-semibold '> My WatchList </h1>
                    <p className='font-light text-gray-300 '>{user?.email}</p>
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
                                        <button onClick={() => { handleUnlike(movie) }}>
                                            <IoMdClose size={30} className='absolute top-2 right-2 text-white' />
                                        </button>
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

export default List
