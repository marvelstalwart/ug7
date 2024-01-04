import React from 'react'
import plus from "../assets/icons/plus.svg"
import pause from "../../src/assets/icons/pause.svg"
export default function SongCard() {
  return (
    
    <div className='w-[358px] md:w-[560px] h-20 bg-neutral-900 rounded-[40px] p-[10px] flex items-center justify-between'>
            <div className='flex gap-[10px]'>
            <img className=' ' src={pause} alt='pause'/>
            <div className='flex  flex-col gap-[4px]'>
            <div className=" text-white text-xl md:text-2xl font-black font-['Inter'] leading-tight">song title</div>
            <div className=" text-zinc-500 text-base font-medium font-['Inter'] leading-none">artiste</div>

            </div>

            


            </div>


            <div>

            </div>
            <div className='flex items-center gap-[10px]'>
            <div className="hidden md:inline-flex w-[120px] h-6 px-2 py-1 rounded-2xl border border-white border-opacity-10 justify-center items-center gap-1 ">
  <div className="text-right text-stone-300 text-base font-geist leading-none">added by</div>
  <div className="text-right text-stone-300 text-base font-medium font-['Geist Mono'] leading-none">200</div>
</div>
    <img src={plus} alt='toggle' style={{width:'60px', height:'60px'}}/>
            </div>
    </div>
    

  )
}
