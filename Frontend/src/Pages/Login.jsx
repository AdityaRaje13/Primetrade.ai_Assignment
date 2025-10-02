import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Cookies from 'js-cookie'

function LoginCustomer() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const submitHandler = async(e) => {

    e.preventDefault();

    const customer = {
      email : email,
      password : password,
    }

    const response = await fetch("http://localhost:3000/api/auth/login",{
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(customer)
    })

    if(response.ok){
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data.user));
      Cookies.set("token", data.token, { expires: 1, secure: true });
      // console.log(Cookies.get("token"));
      toast.success("Login successfully");
      navigate('/home');
    }
    else{
      const result = await response.json();
      toast.error(result.error);
    }

  }

  return (
   <>
   
   <div className="flex h-screen w-screen bg-gray-100">
      
      {/* Left Half - Form */}
      <div className="w-1/2 flex items-center justify-center p-10 bg-white shadow-lg ">
        <form onSubmit={submitHandler} className="w-3/4 max-w-md bg-gray-50 p-6 rounded-xl shadow-2xl shadow-black">
          <h2 className="text-2xl font-semibold text-center mb-4">Login to Your Account</h2>
          
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input onChange={(e) => {setEmail(e.target.value)}} type="email" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Enter email" />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input onChange={(e) => {setPassword(e.target.value)}} type="password" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Enter password" />
          </div>
          
          <button className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition">Login</button>
  
          <p align="center">Don't Have an account <Link to="/register" className='text-blue-700'>Register here</Link></p>
        </form>
      </div>
      
      {/* Right Half - Title */}
      <div className="w-1/2 bg-blue-600 flex items-center justify-center text-white text-4xl font-bold p-10">
        <div className="text-center">
          <h1 className="text-5xl mb-4">📝</h1>
          <h2 className="text-3xl">Notes App</h2>
          <p className="text-lg mt-2">Welcome back! Ready to take notes?</p>
        </div>
      </div>
    </div>
   
   </>
  )
}

export default LoginCustomer