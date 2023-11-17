'use client'

import axios from 'axios';
import React, { useContext, useState } from 'react';
import globalContext from '../context/global-context';

const Login = () => {
  const a =  useContext(globalContext)
  console.log(a)
  const [input, setInput] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    const data = new FormData()

    data.append('username', input.username);
    data.append('username', input.password);

    const response = await axios.post(process.env.NEXT_PUBLIC_URL, {
      maxBodyLength: Infinity,
      data: data,
      headers: {
        'Cookie': "XSRF-TOKEN=eyJpdiI6IjZzUXF6c1Y0OFVVejdRRlMwUG5WdUE9PSIsInZhbHVlIjoieGJyV2ZzV29qa1pmN0xocE4xeDRsVHM1ZWh5N2QyU2w0N3ZZOHNhT2FDWGFHcFhtVVN3SmpFNkN0MjFKQmIyVVo5L2JnTEErVW1oUHU0V1BiWWQxSnFvblByazJoR3FmZitSRVk4SktzUytWdTk0ZmNXUUs2WXN5UXVYTGszUVYiLCJtYWMiOiJjMzc1ZmYxMDA1ZWJlM2Q5M2MzNDNjNTUyN2ZkYWM1ZmI0YTZiZjI0NTQ5N2NjYjU0ZTg3YzViNDUxNWMzMzdiIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6InU4YVplSFB6NFRReUM0SmZZayt1N0E9PSIsInZhbHVlIjoiQXFFU1V2UlUwVjNEVzJ1bHlxR2FicWUyekVwY0FOeGt1RUVXZzlNNjk2bFc4K2s3eHlicEllbG1OWDhmWVpwNTVjTys3UmRUakV5V2wxcmJPZWRGa1p5SFY1aE9ubXNtUjhlRDdGMHBiNlZDaDlINDZQUWIyRVMwZU5VS3Y3K1YiLCJtYWMiOiJmZTZjZjY0NGRiNDg4ZjUyNDk2ZWY5OWFjYTcyMjQ4ZjYxZTRmYTI1ZGNjMTM0YTU4NWM2OGQ3NzdiMTI3Y2ZkIiwidGFnIjoiIn0%3D"
      }
    })

    console.log("RESPONSE :", response)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
        </div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Login Form with Floating Labels</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input name="username" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="username address" onChange={(e) => handleChange(e)} />
                  <label htmlFor="username" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">username Address</label>
                </div>
                <div className="relative">
                  <input name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" onChange={(e) => handleChange(e)} />
                  <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                </div>
                <div className="relative">
                  <button className="bg-blue-500 text-white rounded-md px-2 py-1" onClick={() => handleSubmit()}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
