import axios from 'axios';
import React, { useEffect, useState } from 'react';
import endPoints , {createImagesURL} from '../services/movies';
import { Link } from 'react-router-dom';
import { ThreeCircles } from 'react-loader-spinner';

const Hero = () => {
    const [hero, setHero] = useState(null); 

    useEffect(() => {
        axios.get(endPoints.popular)
            .then((response) => {
                const randomHero = response.data.results[Math.floor(Math.random() * response.data.results.length)];
                setHero(randomHero); 
            })
            .catch((error) => {
                console.error('Error fetching hero:', error); 
            });
    }, []);

    return (
        <>
            {hero === null ? (
                <div className="flex justify-center items-center">
                    <ThreeCircles
                        visible={true}
                        height="100"
                        width="100"
                        color="white"
                        ariaLabel="three-circles-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            ) : (
                <div className="w-[90%] h-[75vh] rounded-3xl bg-cover bg-center overflow-hidden shadow-2xl flex flex-col justify-end" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${hero.backdrop_path})` }}>
                    <div className="m-10 text-white drop-shadow-2xl">
                        <h1 className="text-5xl my-5 drop-shadow-2xl">{hero.original_title}</h1>
                        <p className="text-xl font-semibold md:w-[50%]">{hero.overview}</p>
                        <div className="flex text-2xl py-5">
                            <Link className="rounded-xl bg-white text-black shadow-2xl px-3 py-2 m-2" to={`/watch/${hero.id}`}>
                                <i className="fa-solid fa-play fa"></i>
                                <span> Play</span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Hero;
