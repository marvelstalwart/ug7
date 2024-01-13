import React, {useState, useEffect } from 'react'
import { TDailySong } from '../types/types'
import SpotifyWebApi from 'spotify-web-api-js'
import PauseIcon from "../../src/assets/icons/pause-icon.svg"
import SpotifyWebPlayer, { SpotifyPlayer } from 'react-spotify-web-playback'
import coverImg from "../assets/icons/cover-img.svg"
import plusIcon from "../assets/icons/plus-icon.svg"
import minusIcon from "../assets/icons/minus-icon.svg"

import playIcon from "../assets/icons/play-icon.svg"



interface SongCardProps {
 
  selectedSongs:  (TDailySong)[]
  song: SpotifyApi.TrackObjectFull | SpotifyApi.EpisodeObjectFull | any
  addSelectedSong: (id: string)=> void
  removeSelectedSong: (id: string)=> void
  NowPlaying: string
  pauseAudio : (id: string, index: number)=> void
changeSong: (songUri : string, index:number)=> void
index: number
} 


export default function SongCard({ addSelectedSong, selectedSongs, song, removeSelectedSong, changeSong, NowPlaying, pauseAudio, index}: SongCardProps ): JSX.Element {
  const [hasBeenSelected, setHasBeenSelected] = useState(false)
  const [accessToken, setAccessToken] = useState<string>("")
  const token = localStorage.getItem("token")
  useEffect(()=> {
    if (token)
    {
      setAccessToken(token)
    }

  },[])


useEffect(()=> {
      console.log(song.preview_url === NowPlaying) 
},[NowPlaying])

  useEffect(()=> {
    
    if (selectedSongs.includes(song)) {
      setHasBeenSelected(true)
    }
    else {
      setHasBeenSelected(false)
    }
    console.log("TOken is")
    console.log(token)

},[selectedSongs])


  return (
   
    // <SpotifyWebPlayer token={accessToken} uris={song.uri}/>

    <div className='w-full md:w-[560px] h-20 bg-neutral-900 rounded-[40px] p-[10px] flex items-center justify-between'>
       <audio  id={song.id} src={song.preview_url}  >
            
            </audio>
            <div className='flex gap-[10px]'>
              <div className='min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px] rounded-[50%]   overflow-hidden  relative'>
             {
                  song.preview_url === NowPlaying ?
                    <img className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-30 ' src={PauseIcon} alt='playIcon' onClick={()=> pauseAudio(song.id, index)}/>
                        : 
                    <img className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-30 ' src={playIcon} alt='playIcon' onClick={()=>changeSong(song.preview_url, index)}/>

             } 
           
            <img className='blur-md  min-w-full min-h-full ' src={song.album.images[0].url} alt='pause'/>
         
              </div>
            <div className='flex  flex-col gap-[4px]'>
            <div className=" text-white text-xl md:text-2xl font-black font-['Inter'] leading-tight text-nowrap flex flex-nowrap  max-w-[10rem] overflow-hidden">{song.name}</div>
            <div className=" text-zinc-500 text-base font-medium font-['Inter'] leading-none">{song?.artists.map((artist: any)=> (<span>{artist.name + " "}</span>))}</div>

            </div>

            


            </div>


            <div>

            </div>
            <div className='flex items-center gap-[10px]'>
            <div className="hidden md:inline-flex w-[120px] h-6 px-2 py-1 rounded-2xl border border-white border-opacity-10 justify-center items-center gap-1 ">
  <div className="text-right text-stone-300 text-base font-geist leading-none">added by</div>
  <div className="text-right text-stone-300 text-base font-medium font-['Geist Mono'] leading-none">200</div>
</div>
<div className="w-[60px] h-[60px] relative bg-zinc-800 rounded-[30px] cursor-pointer " >
  {
    hasBeenSelected ?
    <img  className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]" src={minusIcon} alt='plus' onClick={()=> removeSelectedSong(song.id)}/>
    : 
    <img  className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]" src={plusIcon} alt='plus' onClick={()=>addSelectedSong(song.id)}/>
  }
  </div>
    {/* <img src={plus} alt='toggle' style={{width:'60px', height:'60px'}}/> */}
            </div>
    </div>
    

  )
}
