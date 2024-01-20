import React, {useState} from 'react'
import XCircle from "../assets/icons/XCircle.svg"
import { Link } from 'react-router-dom'
import {motion} from "framer-motion"
interface DialogProps {
    showDialog : boolean
    closeDialog: ()=> void
    playlistId: string
}

export default function Dialog(props: DialogProps) {
const {showDialog, closeDialog, playlistId} = props
   
  return (

    
        showDialog ?
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='w-[90%] sm:w-[400px] h-[280px] bg-zinc-800 rounded-xl fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-50 flex flex-col items-center justify-center gap-[8px] px-5 border border-white border-opacity-10'>
        <img className='absolute top-0 right-0 p-2 ' src={XCircle} alt='XCircle' onClick={closeDialog}/>
        <img className='w-[160px] h-[120px] rounded-[10px]' src='https://s3-alpha-sig.figma.com/img/e0f6/49c7/b7546bf728b216e3a79708585a8d16fd?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PyjNnLt90AUqMO3OsHPsvors4QDelFAfAmyHBkPQsO9K-jEAYp3dhMXFefZ0iruuaTH5hkh7NSWaQfHOru3DOEJkHPPsg1x1GCvSmpI3oF-o54y9UcPmviNv-uJvUpSEtIKhT3OamUtBrclg373dpLrpGAoRLGsMh71EF9jl2mAWVb9bSG2RjNgqEM0HVF3uukf~nb1K-Wrkd-oh3oPvpTYJfaIjJ-KQUTToybjZmtATJnMTRjW09GKJxALGTIHVZIkq8FDeLIA-rAwZDe9e-DeZnDlglk6eAvZ-IisUlASS3osvocBDzGaO3SpdEUoiYSfRGfpD5f-TGQ9s8Mx0Yg__' alt=""/>
          <div className='text-center text-white text-xl font-medium font-inter'>Selection added to spotify</div>
          <Link className='w-full' to={`https://open.spotify.com/playlist/${playlistId}`}><button className='h-10 px-4 bg-green-500 rounded w-fit text-neutral-900 text-base font-medium font-inter'>View on spotify</button></Link>
      </motion.div>

        :
        null
    
  )
}
