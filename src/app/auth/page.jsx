"use client";

import axios from "axios";

import React, { useState } from "react";

import globalContext from "../context/global-context";

import { useRouter } from 'next/navigation';


const readUsersfile = async () => {
  try {
   
    const response = await axios.get(`http://localhost:3001/users`);
   
    if (Array.isArray(response.data)) {
   
      return { users: response.data };
    } else if (response.data.users) {
   
      return response.data;
    } else {
    
      console.error('Unexpected response format:', response.data);
    
      throw new Error('Users data format is incorrect');
    }
  } 
  catch (error) {
  
    console.error('ERROR:', error);
  
    throw error;
  }
};

const validateUser = (username, password, usersData) => {
 
  const user = usersData.users.find(
 
    (u) => u.username === username && u.password === password
 
    );
  return user;

};

const Login = () => {
  
  const router = useRouter();
  
  const [input, setInput] = useState({
  
    username: "",
  
    password: "",
  
  });
  
  const [setError] = useState(null);

  const [user, setUser] = useState(null);

  const handleChange = (e) => {
  
    setInput({
  
      ...input,[e.target.name]: e.target.value,

    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
     
      const usersData = await readUsersfile();
     
      const user = validateUser(input.username, input.password, usersData);

      if (user) {
     
        console.log('Login berhasil! Token:', user.token);
     
        setUser({ token: user.token, name: user.username });
     
        router.push("../components/Kasir");

        setError(null);
      } 
      else
      {
     
        setError('Login gagal. Username atau password salah.');
      }
    } 
    catch (error) 
    {
     
      console.error('ERROR:', error);
    }
  };

  // const Login = () => {
  //   const [input, setInput] = useState({
  //     username: "",
  //     password: "",
  //   });
  
  //   const handleChange = (e) => {
  //S     setInput({
  //       ...input,
  //       [e.target.name]: e.target.value,
  //     });
  //   };
  
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  
  //     try {
  //       const data = new FormData();
  //       data.append("username", input.username);
  //       data.append("password", input.password);
  
  //       const response = await axios.post(
  //         `${process.env.NEXT_PUBLIC_URL}/api/login`,
  //         data,
  //         {
  //           maxBodyLength: Infinity,
  //         }
  //       );
  
  //       console.log("RESPONSE:", response.data);
  //     } catch (error) {
  //       console.error("ERROR:", error);
  //     }
  //   };
  
  return (
    <globalContext.Provider value={user}  >
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Kasir.65</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    name="username"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Username address"
                    onChange={(e) => handleChange(e)}
                  />
                  <label
                    htmlFor="username"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Username Address
                  </label>
                </div>
                <div className="relative">
                  <input
                    name="password"
                    type="password"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Password"
                    onChange={(e) => handleChange(e)}
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <button
                    className="bg-blue-500 text-white rounded-md px-2 py-1 mt-5"
                    onClick={(e) => handleSubmit(e)}  
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </globalContext.Provider>

  );
};

export default Login;
