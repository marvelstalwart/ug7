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


export default function Navbar() {
  const [spotifyToken, setSpotifyToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  const [user, setUser] = useState<SpotifyApi.CurrentUsersProfileResponse>({
    display_name:"",
    external_urls:{
      spotify: ""
    },
    followers: {href:"", total:0},
    href:"",
    id:"",
    images:[],
    type:"user",
    uri:"",
    birthdate: "",
    country:"",
    email:"",
    product:""

  })

  useEffect(()=> {
        const token = getTokenfromUrl().access_token
     if (token) {
      localStorage.setItem("token", token)

      setSpotifyToken(token)
      setLoggedIn(true)
     }

    
  },[])


  


  useEffect(()=> {
    if (loggedIn) {
        spotifyApi.setAccessToken(spotifyToken)
        spotifyApi.getMe().then((user)=> {
         
          return setUser(user)
         
        })
  
      

      
    }     
  },[loggedIn])
 
 
 
  return (

    <div className='w-screen top-0 bg-zinc-800 h-16 p-[16px] flex justify-between fixed z-40'>
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
