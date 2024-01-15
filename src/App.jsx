import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react"

import Login from "./pages/Login";
import SignUp from "./pages/SingUp";
import Home from "./pages/Home";
import Watch from "./pages/Watch";
import List from "./pages/List";
import Search from "./pages/Search";
import { AuthContextProvider } from "./context/AuthContext";

export default function App() {


  return (
    <AuthContextProvider>
      
      <BrowserRouter>

        <ToastContainer />

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="watch/:id" element={<Watch />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<SignUp />} />

          <Route path="/list" element={<List />} />

          <Route path="/search/:query" element={<Search />} />

        </Routes>

      </BrowserRouter>

    </AuthContextProvider>

  )
}