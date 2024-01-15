import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { MdOutlineMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

export default function Nav () {

    const [state, setState] = useState(false)
    const [drapdownState, setDrapdownState] = useState({ isActive: false, idx: null })
    const [menuState, setMenuState] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const [search, setSearch] = useState("")

    const { user, logOut } = UserAuth()

    const navigate = useNavigate();
    const isWatchComponent = location.pathname.startsWith("/watch/");

    const navigation = [
        { title: "Home", path: "/" },
        { title: "Movies", path: "/movies" },
        { title: "Series", path: "/series" },
        { title: "WatchList", path: "/list" },
    ];

    useEffect(() => {

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);


        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [])

    const handleLogOut = async () => {
        try {
            await logOut()
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className='flex justify-center'>
                <nav className={`container fixed top-0 w-full backdrop-blur-sm rounded-b-3xl z-30 shadow-2xl ${isWatchComponent ? 'hidden' : ''} ${isScrolled ? "bg-black bg-opacity-75" : ""} transition`}>
                    <div className="items-center gap-x-14 px-4 mx-auto md:flex md:px-8">
                        <div className="flex items-center justify-between py-3 md:py-3 md:block">
                            <a href="/">
                                <img
                                    src="/logo.png"
                                    width={200}
                                    alt="Logo"
                                />
                            </a>
                            <div className="md:hidden">
                                <button className="text-white hover:text-gray-800"
                                    onClick={() => setState(!state)}
                                >
                                    {
                                        state ? (
                                            <IoMdClose size={30} />
                                        ) : (
                                            <MdOutlineMenu size={30} />
                                        )
                                    }
                                </button>
                            </div>
                        </div>
                        <div className={`nav-menu w-full flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
                            <ul className="items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                                {
                                    navigation.map((item, idx) => {
                                        return (
                                            <li key={idx}>
                                                {
                                                    item.isDrapdown ? (
                                                        <button className="w-full flex items-center justify-between gap-1 text-gray-700 hover:text-white"
                                                        >
                                                            {item.title}
                                                        </button>
                                                    ) : (
                                                        <a href={item.path} className="block text-white hover:text-indigo-600">
                                                            {item.title}
                                                        </a>
                                                    )
                                                }
                                                {
                                                    item.isDrapdown && drapdownState.idx == idx && drapdownState.isActive ? (
                                                        <div className="mt-6 inset-x-0 top-20 w-full md:absolute md:border-y md:shadow-md md:mt-0">
                                                            <ul className='max-w-screen-xl mx-auto grid items-center gap-6 md:p-8 md:grid-cols-2 lg:grid-cols-3'>
                                                                {item?.navs.map((dropdownItem, idx) => (
                                                                    <li key={idx}>
                                                                        <p className="text-indigo-600 text-sm">{dropdownItem.label}</p>
                                                                        <ul className='mt-5 space-y-6'>
                                                                            {dropdownItem.navs.map((navItem, idx) => (
                                                                                <li key={idx} className="group">
                                                                                    <a href={navItem.path} className='flex gap-3 items-center'>
                                                                                        <div className='w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center duration-150 group-hover:bg-indigo-600 group-hover:text-white md:w-14 md:h-14'>
                                                                                            {navItem.icon}
                                                                                        </div>
                                                                                        <div>
                                                                                            <span className="text-gray-800 duration-200 group-hover:text-indigo-600 text-sm font-medium md:text-base">{navItem.title}</span>
                                                                                            <p className='text-sm text-gray-600 group-hover:text-gray-800 mt-1'>{navItem.desc}</p>
                                                                                        </div>
                                                                                    </a>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ) : ""
                                                }
                                            </li>
                                        )
                                    })
                                }
                                <div className='flex-1 items-center justify-end gap-x-6 space-y-3 md:flex md:space-y-0'>
                                    <form className="flex justify-end space-x-2 border rounded-md p-2"
                                        onSubmit={(e) => {
                                            if (location.pathname.startsWith('/search/')) {
                                                navigate(`/search/${search}`);
                                              } else {
                                                navigate(`/search/${search}`);
                                              }
                                        }}>
                                        <CiSearch size={30} className="text-white" />
                                        <input
                                            className="w-full outline-none appearance-none placeholder-gray-500 bg-transparent text-white sm:w-auto"
                                            type="text"
                                            placeholder="Search"
                                            onChange={(e) => setSearch(e.target.value)}
                                            value={search}
                                        />
                                    </form>
                                    {user?.email ?
                                        (
                                            <div className="">
                                                <Link onClick={handleLogOut} className="block py-3 px-4 font-medium text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow md:inline">
                                                    Logout
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className="">
                                                <Link to="/login" className="block py-3 px-4 font-medium text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow md:inline">
                                                    Login
                                                </Link>
                                            </div>
                                        )
                                    }
                                </div>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            {
                state ? (
                    <div
                        className="z-10 fixed top-0 w-screen h-screen bg-black/20 backdrop-blur-sm md:hidden"
                        onClick={() => setState(false)}></div>
                ) : ""
            }
        </>
    )
}