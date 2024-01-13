import React, { useEffect, useState } from 'react'
import { TDailySong } from '../types/types'
import VinylRecord from "../assets/icons/VinylRecord.svg"
import placeholder from "../assets/icons/placeholder.svg"
import axios from "axios"

interface HeaderProps {
  dailySongs: (TDailySong)[]| null
  selectedSongs: (TDailySong)[]|[]
  addToPlaylist: (song: TDailySong[] | null)=> void
}

export default function Header({selectedSongs,dailySongs, addToPlaylist}: HeaderProps) :JSX.Element {
  const [date, setDate ] = useState({
    day: new Date().getDay().toString().padStart(2, '0'),
    month: (new Date().getMonth() + 1).toString().padStart(2, '0'),
    year: new Date().getFullYear()
  })

  const [isHidden, setIsHidden]  = useState(false)
  const handleScroll = () : void=> {
    const scrollPosition = window.scrollY
    setIsHidden(scrollPosition > 10)
    
}

useEffect(()=> {
  window.addEventListener('scroll', handleScroll)
  return()=>
  window.removeEventListener('scroll', handleScroll)
},[])

useEffect(()=> {
    console.log( new Date().getDay())
},[])

  
 
  return (
    <div className={`w-full px-[16px] md:px-[34px] lg:px-[64px] py-[24px]  bg-neutral-700   h-fit fixed ${isHidden? '-translate-y-16' : 'translate-y-0'} top-16 transition-all duration-300 z-40`}>
    
    <div className={ `${isHidden ? 'max-h-0 overflow-hidden' :'max-h-[90px] '} overflow-hidden transition-max-height ease-in-out duration-500` }>
    <div className="w-[358px] text-stone-300 text-2xl font-medium font-rightGrotesk leading-none">
    daily pick of 7 great songs from undiscovered artistes curated by;
    </div>
    <div className="w-16 h-6 justify-start items-start inline-flex pt-[12px] gap-[12px] md:gap-0">
        <img className="w-6 h-6 rounded-3xl border  border-white border-opacity-10" src={placeholder}  alt='displayPic'/>
        <img className="w-6 h-6 rounded-3xl border md:ml-[-4px] border-white border-opacity-10" src={placeholder} alt='displayPic'/>
        <img className="w-6 h-6 rounded-3xl border  md:ml-[-4px]  border-white border-opacity-10" src={placeholder} alt='displayPic'/>
        </div>
    
    </div>
    
    
        <div className='p-[16px] md:px-[32px] md:py-[14px] bg-zinc-800 mt-[16px] md:mt-[24px] rounded-[20px] md:rounded-full  backdrop-blur-[200px] flex flex-col md:flex-row md:justify-between md:items-center'>
        <div>
        <div className="w-[284px] text-stone-300 text-2xl font-black font-['Inter'] leading-normal">today’s pick</div>
        <div className=" text-white text-base font-medium font-inter leading-normal">{date.day + `/`+ date.month + `/` + date.year}</div>
        </div>
        <div className='flex  justify-end'>
          {selectedSongs.length === 0?
            <button onClick={()=>addToPlaylist(dailySongs)} className=" w-[220px]  px-[20px] py-[10px] bg-green-500 rounded-[30px] text-center text-neutral-900 text-base font-medium font-inter leading-normal" >
           add all to spotify
            </button>
              :
              <button onClick={()=>addToPlaylist(selectedSongs)} className=" w-[220px]  px-[20px] py-[10px] bg-green-500 rounded-[30px] text-center text-neutral-900 text-base font-medium font-inter leading-normal" >
              add selection to spotify
              </button>
            }
      

        </div>
     
        </div>
        <div className='flex justify-end mt-[8px]'>
        {
                   selectedSongs.length> 0 &&
            <div className="  px-[8px] py-1 rounded-[20px] border border-white border-opacity-20 items-center gap-1 inline-flex">
               
                <img src={VinylRecord} alt='VinylRecord'/>

               
           
                 <div className="  text-center text-white text-base font-medium font-['Geist Mono'] leading-none">{
                 
                
                 selectedSongs.length + ' of 7'
                 
                 }</div>

               
                </div>
}
               
            </div>

            
            
       

</div>
  )
}
