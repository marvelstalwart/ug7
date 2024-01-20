import React, {useState, useEffect} from 'react'
import listDown from "../assets/icons/list-down.svg"
import Logo from "../assets/icons/Logo.svg"
import dropdown from "../assets/icons/dropdown.svg"
import { loginEndpoint } from '../utils/spotify'
import SpotifyWebApi from 'spotify-web-api-js'
import useScroll from '../customHooks/useScroll'



interface navbarProps {
  user: SpotifyApi.CurrentUsersProfileResponse | null
  loggedIn:boolean
  showDisconnect: boolean
  toggleDisconnect: ()=> void
}


export default function Navbar({user, loggedIn, showDisconnect, toggleDisconnect} : navbarProps) {
 
const {isHidden, setIsHidden} = useScroll()

  return (

    <div className={` w-screen top-0 ${isHidden ? ' opacity-0 overflow-hidden max-h-0 ' : 'max-h-16 overflow-hidden opacity-100'}  bg-neutral-900 transition-opacity duration-1000 p-[16px] lg:px-[64px] flex justify-between fixed z-40 `}>
      
            
            <img src={Logo} alt="logo"/>
            
            {/* <div  className=' font-fairDisplay text-amber-300'>u_grd7</div> */}
           
         
           
    
           
              {
              
              loggedIn? 
              
              <button onClick={toggleDisconnect} className="
              w-fit h-fit px-2 py-1 rounded-[20px] border border-green-500  items-center gap-2 flex
              text-center text-zinc-400 text-base font-medium font-inter " >
              
               
                {/* Image container */}
                <div className=" w-6 h-6  bg-zinc-400 rounded-full shadow" >
              <img className='w-full h-full  object-cover rounded-[50%] ' alt='' src={user?.images? user.images[0].url : undefined} />
            </div>
            <p className=''>
            {user?.display_name}
              </p>

              <img className={showDisconnect ? " rotate-180 duration-300 transition-all ease-in-out" : "rotate-0 transition-all duration-300"} alt='disconnect' src={dropdown}/>
            
            </button> 
            :
            <a href={loginEndpoint}>
            <button className='w-fit h-fit px-2 py-1 rounded-[20px] border border-green-500 text-center text-green-500 text-base font-medium font-inter'>connect <span className='  max-sm:hidden'>my spotify</span></button> 
            </a>
            }
            
          
          
            <img className='hidden' src={listDown} alt='list-down'/>
            </div>
         

   
  )
}
