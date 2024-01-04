import React from 'react'
import listDown from "../assets/icons/list-down.svg"
export default function Navbar() {
  return (
    <div className='w-screen top-0 bg-zinc-800 h-16 p-[16px] flex justify-between fixed'>
            <div className=' font-fairDisplay text-white'>u_grd7</div>
           
            <div className="w-fit h-8 px-2 py-1 rounded-[20px] border border-white border-opacity-20 items-center gap-2 flex">
            <div className="w-6 h-6 bg-zinc-400 rounded-full shadow" />
            <div className="text-center text-stone-300 text-base font-medium font-inter">username</div>
            <img src={listDown} alt='list-down'/>
            </div>

    </div>
  )
}
