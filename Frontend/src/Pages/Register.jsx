import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function RegisterCustomer() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    const user = {
      username : username,
      email : email,
      password : password,
      role : role
    }

    try {
      
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method : "POST",
        headers :{
          "Content-Type" : "application/json",
        },
        body : JSON.stringify(user)
      })

      if(response.ok){
        const data = await response.json();
        console.log(data);
        toast.success("User registered successfully");
        navigate('/');
      }
      else{
        const result = await response.json();
        toast.error(result.error);
        if(result.errors){
          result.errors.map((err) => (toast.error(err.msg)));
        }
      }
      
    } 
    catch (error) {
      toast.error(error.message);
    }
  }


  const handleUpload = () => {
    console.log("Hello");
  }


  return (
    <>
    
        <div className="flex h-screen w-screen bg-gray-100">
          
          {/* Left Half - Title */}
          <div className="w-1/2 bg-blue-600 flex items-center justify-center text-white text-4xl font-bold p-10">
            <div className="text-center">
              <h1 className="text-5xl mb-4">📝</h1>
              <h2 className="text-3xl">Notes App</h2>
              <p className="text-lg mt-2">Your personal note-taking companion</p>
            </div>
          </div>
          
          {/* Right Half - Form */}
          <div className="w-1/2 flex items-center justify-center p-10 bg-white shadow-lg ">
            <form onSubmit={handleSubmit} className="w-3/4 max-w-md bg-gray-50 p-6 rounded-xl shadow-2xl shadow-black">
              <h2 className="text-2xl font-semibold text-center mb-4">Create Your Account</h2>
              
              <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <input onChange={(e) => {setUsername(e.target.value)}} type="text" name='username' className="w-full p-2 border border-gray-300 rounded-md" placeholder="Enter username"/>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input onChange={(e) => {setEmail(e.target.value)}} type="email" name='email' className="w-full p-2 border border-gray-300 rounded-md" placeholder="Enter email" />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input onChange={(e) => {setPassword(e.target.value)}} type="password" name='password' className="w-full p-2 border border-gray-300 rounded-md" placeholder="Enter password" />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700">Role</label>
                <select onChange={(e) => {setRole(e.target.value)}} value={role} className="w-full p-2 border border-gray-300 rounded-md">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              
              <button type='submit' className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition cursor-pointer">Register</button>

              <p align="center">Already Have an account <Link to="/" className='text-blue-700'>Login here</Link></p>

            </form>
          </div>
        </div>

    </>
  )
}

export default RegisterCustomer