
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { IoMdClose } from "react-icons/io";
import { UserAuth }  from "../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import { FaHeart, FaRegHeart, FaPlayCircle } from "react-icons/fa"


const Login = () => {
  const [remember, setRemember] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate();

  const {user, signIn} = UserAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signIn(email, password);
      navigate("/");
    } catch (error) {
      console.log(error)
    }

  }



  return (
    <>
      <Helmet>
        <title>Login - {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <div className="w-full h-screen relative text-white">
        <img src="https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""
          className="absolute w-full h-full sm:block object-cover " />

        <div className="fixed top-0 left-0 w-full h-screen bg-black/30"></div>

        <div className="w-full px-3 py-36 absolute ">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/80 rounded-xl">
            <IoMdClose size={30} className="flex float-end m-5" onClick={() => { navigate("/") }} />
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="w-full text-3xl text-white">Login</h1>
              <form onSubmit={handleSubmit} className="w-full flex flex-col py-7">

                <input
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  className="p-3 my-2 bg-gray-700 rounded"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email} />

                <input
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  className={`p-3 my-2 bg-gray-700 rounded`}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password} />

                <button className="bg-red-600 hover:bg-red-700 py-3 my-6 rounded ">Login</button>

                <div className="flex justify-between items-center text-gray-600">
                  <p className="text-white">
                    <input type="checkbox" checked onChange={() => { setRemember(!remember) }} className="mr-2 " />
                    Remember me
                  </p>
                  <p className="cursor-pointer">Need Help?</p>
                </div>

                <p className="my-4 text-white">
                  <span className="text-gray-600 mr-2">
                    Don't have an account?
                  </span>
                  <Link to={"/signup"}>Sign Up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />

    </>
  );
};

export default Login;
