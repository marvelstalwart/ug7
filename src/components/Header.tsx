import React, { useEffect, useState } from 'react'
import { TDailySong } from '../types/types'
import VinylRecord from "../assets/icons/VinylRecord.svg"
import placeholder from "../assets/icons/placeholder.svg"
import useScroll from '../customHooks/useScroll'
import XCircle from "../assets/icons/XCircle.svg"
import axios from "axios"

import { Link } from 'react-router-dom'
import Dialog from './Dialog'
import Loading from './Loading'
interface HeaderProps {
  dailySongs: (TDailySong)[]| null
  selectedSongs: (TDailySong)[]|[]
  addToPlaylist: (song: TDailySong[] | null)=> void
  isLoading:boolean
}

export default function Header({selectedSongs,dailySongs, isLoading, addToPlaylist}: HeaderProps) :JSX.Element {
  const [date, setDate ] = useState({
    day: new Date(Date.now()).getDate().toString().padStart(2, '0'),
    month: (new Date(Date.now()).getMonth() + 1).toString().padStart(2, '0'),
    year: new Date(Date.now()).getFullYear()
  })


  
const {isHidden, setIsHidden} = useScroll()




 
  return (
    <div className={`w-full      bg-neutral-900  border border-white border-opacity-10  h-fit fixed ${isHidden? '-translate-y-16 top-12 ' : 'translate-y-0 py-[24px] top-16'}  transition-all duration-100 z-40`}>
    
  

    <div className={ `${isHidden ? 'max-h-0 overflow-hidden' :'max-h-[120px] '} overflow-hidden transition-max-height ease-in-out duration-500` }>
    <div className=" px-[16px] md:px-[64px] md:w-[480px] w-[366px]  text-white text-xl md:text-2xl font-medium font-inter leading-tight lg:text-2xl lg:w-[520px]">
        7 daily gems, unheard & uncut. curated by;
    </div>
    <div className=" px-[16px] md:px-[64px] w-16 md:w-48 h-6 justify-start items-start inline-flex pt-[12px] gap-[8px] md:gap-2">
        <img className="w-8 h-8 rounded-3xl border  border-white border-opacity-10" src={placeholder}  alt='displayPic'/>
        <img className="w-8 h-8 rounded-3xl border md:ml-[-4px] border-white border-opacity-10" src={placeholder} alt='displayPic'/>
        <img className="w-8 h-8 rounded-3xl border  md:ml-[-4px]  border-white border-opacity-10" src={placeholder} alt='displayPic'/>
        </div>
    
    </div>
    
    
        <div className='px-[16px]  md:py-[14px] md:px-[64px] border-t  border-white border-opacity-10  mt-[16px] md:mt-[24px]   flex flex-col md:flex-row md:justify-between md:items-center '>
        <div>
        <div className=" w-[284px] text-stone-300 text-xl font-semibold font-inter leading-normal pt-[8px]">today’s pick</div>
        <div className=" text-amber-300 text-base font-medium font-inter leading-normal">{date.day + `/`+ date.month + `/` + date.year}</div>
        </div>
        <div className='flex  justify-end'>
        {
                   selectedSongs.length> 0 &&
            <div className="  px-[8px]   items-center gap-1 inline-flex">
               
                <img src={VinylRecord} alt='VinylRecord'/>

               
           
                 <div className="  text-center text-white text-base font-medium font-['Geist Mono'] leading-none">{
                 
                
                 selectedSongs.length + ' of 7'
                 
                 }</div>

               
                </div>
}
          
          {selectedSongs.length === 0?
            <button onClick={()=>addToPlaylist(dailySongs)} className="rounded-sm max-w-fit  h-10 px-[14px]  transition-all ease-in-out duration-100 bg-green-500 text-center text-neutral-900 text-base font-medium font-inter leading-normal cursor-pointer" >
           
           {isLoading ?
           <Loading/>
           :
           <>add all to spotify</>
          }
            </button>
              :
              <button onClick={()=>addToPlaylist(selectedSongs)} className="rounded-sm max-w-fit px-[14px] h-10 transition-all ease-in-out duration-100  bg-green-500 text-center text-neutral-900 text-base font-medium font-inter  cursor-pointer" >
              {
                isLoading ?
                <Loading/>

                :
                <> save selection to spotify</>
              }
             
              </button>
            }
      

        </div>
     
        </div>
        <div className='flex justify-end mt-[8px]'>
            
            </div>

            
            
       

</div>
  )
}
