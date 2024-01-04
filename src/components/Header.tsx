import React from 'react'
import VinylRecord from "../assets/icons/VinylRecord.svg"
import placeholder from "../assets/icons/placeholder.svg"
export default function Header() {
  return (
    <div className='w-full px-[16px] py-[24px]  bg-stone-300  bg-opacity-10  backdrop-blur-[1000px] h-[332px] fixed top-16 z-40'>
    <div className="w-[358px] text-stone-300 text-2xl font-medium font-rightGrotesk leading-none">
    daily pick of 7 great songs from undiscovered artistes curated by;
    </div>
    <div className="w-16 h-6 justify-start items-start inline-flex pt-[12px]">
        <img className="w-6 h-6 rounded-3xl border ] border-white border-opacity-10" src={placeholder}  alt='displayPic'/>
        <img className="w-6 h-6 rounded-3xl border ml-[-4px] border-white border-opacity-10" src={placeholder} alt='displayPic'/>
        <img className="w-6 h-6 rounded-3xl border ml-[-4px] border-white border-opacity-10" src={placeholder} alt='displayPic'/>
        </div>
        <div className='p-[16px] bg-zinc-800 mt-[16px] rounded-[20px]  backdrop-blur-[200px] flex flex-col md:flex-row md:justify-between md:items-center'>
        <div>
        <div className="w-[284px] text-stone-300 text-2xl font-black font-['Inter'] leading-normal">today’s pick</div>
        <div className=" text-white text-base font-medium font-['Inter'] leading-normal">01/01/2024</div>
        </div>
        <div className='flex  justify-end'>
        <button className="mt-[12px] w-[220px]  px-[20px] py-[10px] bg-green-500 rounded-[30px] text-center text-neutral-900 text-base font-medium font-inter leading-normal">
            add selection to spotify
            </button>

        </div>
     
        </div>
        <div className='flex justify-end mt-[8px]'>
           
            <div className="  px-[8px] py-1 rounded-[20px] border border-white border-opacity-20 items-center gap-1 inline-flex">
               
                <img src={VinylRecord} alt='VinylRecord'/>

               
               
                <div className="  text-center text-white text-base font-medium font-['Geist Mono'] leading-none">1 of 7</div>
                </div>
               
            </div>

            
            
       

</div>
  )
}
