import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';

const Watch = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    useEffect(() => {
        if (id) {
            axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_APP_TMDB_API_KEY}`)
                .then((res) => {
                    setTitle(res.data.title);
                })
                .catch((error) => {
                    console.error('Error fetching movies:', error);
                });
        }
        console.log(title);
    }, [id]);
    return (
        <>
            <Helmet>
                <title>{`Watch - ${title}`}</title>
            </Helmet>
            <div className='z-50 bg-cover h-screen'>
                <button className='absolute top-5 right-5 bg-white opacity-70 text-black px-4 py-2 rounded-md hover:bg-black hover:text-white transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white' onClick={() => navigate('/')}>
                    <i class="fa-solid fa-angle-left fa-xl"></i>
                </button>
                <iframe src={`https://vidsrc.xyz/embed/movie/${id}`} allowFullScreen frameborder="0" className='h-screen bg-cover w-full' referrerpolicy="origin"></iframe>
            </div>
        </>
    );
};

export default Watch;
