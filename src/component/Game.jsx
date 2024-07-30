import React,{useEffect, useState} from 'react'
import { RiSpeakFill } from "react-icons/ri";
import { FaHouse } from "react-icons/fa6";

function Game() {
 const [quote, setQuote]=useState('')
 const [bywho, setBywho]=useState('')
 const [house, setHouse]=useState('')
 const [loading, setLoading]=useState(false)
 const [error, setError]=useState('')

 const fetchapi = async()=>{
  setLoading(true)
  const baseurl= 'https://Game-of-Thrones-Quotes.proxy-production.allthingsdev.co/v1/random'
    const baseq={ 
      method:'GET',
      headers:{"x-apihub-key":"7eUBIc4a4gWsqZBRoanebL3LBXAUVNvhlZO8z7xSkV1kOWXC9w",
             "x-apihub-host": "Game-of-Thrones-Quotes.allthingsdev.co",
              "x-apihub-endpoint": "21ab1648-83fe-4505-9f5d-51f0b6a9babd"},
      redirect: "follow"
  }
      try {
        const response = await fetch(baseurl,baseq)
        const newqoute = await response.json()
        console.log(newqoute);
        if (response.ok) {
          setQuote(newqoute.sentence)
        setBywho(newqoute.character.name)
        setHouse(newqoute.character.house.name)
        }else{
          setError('Failed to fetch quote')
        }
        } catch (error) {
        console.log(error);
        setError('An error occurred. Please try again.');
        
      }
      setLoading(false)
 }
 useEffect(()=>{
  fetchapi()
  
 const changequote= setInterval(fetchapi,15000);
 return()=>clearInterval(changequote)
},[])
 

  return (
    <>
    <section className='bg-zinc-950 h-[100vh]  laptop:flex flex gap-7  flex-col laptop:gap-10 items-center laptop:justify-center  text-white py-10'>
      <div><h1 className='font-extrabold laptop:text-2xl text-center'>The Game of Thrones Quotes API</h1>
      <p className="text-center text-red-300 "> Created by NATRAK_DEV <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span></span></p></div>
   { loading?<p>Loading...Please Wait</p>:error?<p className='text-red-500'>{error}</p>: 
   <div className='bg-pink-800 flex flex-col gap-4   p-5 rounded text-white text-center laptop:w-[600px]'>
    <h1>{quote}</h1>
   { bywho&& <div className='flex items-center justify-center gap-4 bg-black rounded'>
     
     <div className='text-3xl'><RiSpeakFill /></div> 
    <h1>{bywho}</h1>
    </div>}
   {house &&<div className='flex items-center justify-center gap-4'>
      <div className='text-xl' ><FaHouse /></div>
      <h1>{house}</h1>
    </div>}
    
    </div>}
    <p className='text-center laptop:w-[60vw] w-[90vw]  text-xs py-2'>The Game of Thrones Quotes API offers fans easy access to memorable quotes from the series, along with character and house details, for reliving iconic moments and dialogue..
       </p>
    </section> 
    </>
  )
}

export default Game
