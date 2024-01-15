
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { IoMdClose } from "react-icons/io";
import { UserAuth }  from "../context/AuthContext";

const SingUp = () => {
  const [remember, setRemember] = useState(false)

  const[first_name, setFirstName] = useState("")
  const[last_name, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [confirmPassword, setConfirmPassword] = useState("")

  const {user, signUp} = UserAuth()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
      try {
        await signUp(email, password, first_name, last_name);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <>
      <Helmet>
        <title>Signup - {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <div className="w-full h-screen relative text-white">
        <img src="https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""
          className="absolute w-full h-full sm:block object-cover " />

        <div className="fixed top-0 left-0 w-full h-screen bg-black/30"></div>

        <div className="w-full px-3 py-36 absolute ">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/80 rounded-xl">
            <IoMdClose size={30} className="flex float-end m-5" onClick={() => { navigate("/") }} />
            <div className="max-w-[350px] mx-auto py-16">
              <h1 className="w-full text-3xl text-white px-3">Sign Up</h1>
              <form onSubmit={handleSubmit} className="w-full flex flex-col py-4">

                <div className="grid grid-cols-2 gap-2">

                  <input
                    type="text"
                    placeholder="First Name"
                    autoComplete="first_name"
                    className="p-3 my-2 bg-gray-700 rounded"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={first_name} />
                    
                    <input
                    type="text"
                    placeholder="Last Name"
                    autoComplete="last_name"
                    className="p-3 my-2 bg-gray-700 rounded"
                    onChange={(e) => setLastName(e.target.value)}
                    value={last_name} />

                </div>
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
                  className={`p-3 my-2 bg-gray-700 rounded transition `}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password} />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  autoComplete="current-password"
                  className={`p-3 my-2 bg-gray-700 rounded `}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword} />

                <button className="bg-red-600 hover:bg-red-700 py-3 my-6 rounded ">Register</button>

                <p className="my-4 text-white">
                  <span className="text-gray-600 mr-2">
                    Already have an account?
                  </span>
                  <Link to={"/login"}>Sign In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default SingUp;
