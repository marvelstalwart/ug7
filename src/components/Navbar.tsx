import React, {useState, useEffect} from 'react'
import listDown from "../assets/icons/list-down.svg"
import axios from "axios"
import { loginEndpoint } from '../utils/spotify'
import SpotifyWebApi from 'spotify-web-api-js'

const spotifyApi = new SpotifyWebApi()
const getTokenfromUrl = ()=> {
  return window.location.hash
  .substring(1)
  .split("&")
  .reduce((initial: Record<string, string>,item)=> {
    let parts = item.split("=");
    initial[parts[0]] = decodeURIComponent(parts[1]);
    return initial 
  },{})
}

// const loginUser = async ()=> {
//   const user = await axios.get("http://localhost:8888/login")
//   console.log(user)
// }
interface navbarProps {
  user: SpotifyApi.CurrentUsersProfileResponse | null
  loggedIn:boolean
}


export default function Navbar({user, loggedIn} : navbarProps) {
 

  const [isHidden, setIsHidden] = useState(false)

  const handleScroll = () : void=> {
    const scrollPosition = window.scrollY
    setIsHidden(scrollPosition > 10)
    
}

  useEffect(()=> {
    window.addEventListener('scroll', handleScroll)
    return()=>
    window.removeEventListener('scroll', handleScroll)
  },[])
 
  return (

    <div className={` w-screen top-0 ${isHidden ? ' opacity-0 overflow-hidden' : 'max-h-16 overflow-hidden opacity-100'}  bg-zinc-800 transition-opacity duration-1000 p-[16px] flex justify-between fixed z-40`}>
      
            <div className=' font-fairDisplay text-white'>u_grd7</div>
           
            <div className="w-fit h-fit px-2 py-1 rounded-[20px] border border-white border-opacity-20 items-center gap-2 flex">
        
            <a href={loginEndpoint}>

           
            <div className="text-center text-stone-300 text-base font-medium font-inter" >{loggedIn? <><span className='  flex gap-[4px]'>    <div className=" w-6 h-6 bg-zinc-400 rounded-full shadow" >
              <img />
            </div>
            {user?.display_name}
            </span></> : <>connect <span className='  max-sm:hidden'>my spotify</span></> }</div>
            </a>
            <img className='hidden' src={listDown} alt='list-down'/>
            </div>

    </div>
  )
}
