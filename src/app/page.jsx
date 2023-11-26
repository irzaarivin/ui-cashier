'use client'

import axios from 'axios'

import { useEffect, useState } from 'react'

// import Calculator from './components/calculator'

import Auth from './auth/page'
 
 import Kasir from './components/kasir'


export default function Home() {

  const [data,setData] = useState([])
  
  useEffect(() => {
    (async () => {
      const response =  await axios.get('https://jsonplaceholder.typicode.com/todos/1')
      setData(response.data)
    })()
  }, [])

  return (
    <main className=''> 
    <Auth />
    
    </main>
   
  )
}
