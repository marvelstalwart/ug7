import React, {useState, useEffect, useRef } from 'react'
import { TDailySong } from '../types/types'
import plusIcon from "../assets/icons/plus-icon.svg"
import PlayIconNew from "../assets/icons/play-icon-new.svg"
import PauseIconNew from "../assets/icons/pause-icon-new.svg"
import bookmark from "../assets/icons/bookmark.svg"
import MinusIcon from "../assets/icons/minus-icon.svg"
import WaveSurfer from 'wavesurfer.js'
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

const getFormattedArtistes = () : string => {
  const artistes = song?.artists.reduce((acc :string, artist: any, index:number)=> {
    const seperator = index !== song.artists.length -1 ? ", " : ""
 return  acc + artist.name.toLowerCase() + seperator

}, ""
 )

 return artistes
}
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

    <div className='w-full md:w-[560px] h-[104px] md:h-28 bg-zinc-800 ] p-[10px] flex items-center justify-between rounded-sm relative '>
       <audio  id={song.id} src={song.preview_url}  >
            
            </audio>
            <div className='flex gap-[10px] flex-1 ] overflow-x-hidden '>
              <div className='min-w-[84px] min-h-[84px]  max-w-[84px] max-h-[84px] md:w-[92px] md:h-[92px]  md:max-w-[92px] md:max-h-[92px]  overflow-hidden  relative'>
          
           
            <img className='  min-w-full min-h-full ' src={song.album.images[0].url} alt='pause'/>
         
              </div>
            <div className='flex flex-col flex-1 gap-[4px] '>
            <div className='w-[10rem] overflow-hidden'>

            <div className={` text-white text-[1rem] md:text-xl font-black font-inter leading-tight text-nowrap flex flex-nowrap  max-w-[10rem] overflow-hidden ${song.preview_url === NowPlaying ? 'animate-slide' : null} `}>{song.name.toLowerCase()}</div>
            </div>
            <div className=" text-zinc-500 text-sm font-medium font-inter leading-none">{getFormattedArtistes()}</div>
           
            <img src="https://s3-alpha-sig.figma.com/img/3f53/07bc/3f8e6eaf876598d93b353dba861d6964?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DQYjiT8h51sp6~wnz6-4wFv68fnfxL8ZdyJ4nJYPK0-VBqret488ZmwyGJiEEbOSq7Abyp-Nx8UKhUvHC5Mwk89I3EZ~ag6Uh1qv65W3MIkUCvdJJPQa2KYx3hv~-fltwWHmmQNx0hpx3Gk~ckYibUBK5I8IVKIszu8C0vwmIJnYuOE2elp5DFqRK9KCDYa5AaG5Z2DnoGh0rsLXtevj2OQsJu2SXHsG6Dan6uyHf1nH7m4wVZ-WvC8TIQZTurBsxILZ1LPmsXb4z4pvdq~kYOA7aI1bCddca8tkRdotMye~qzLp4T90xdYscmSNAVvOuUbeL1E6O1UM6F9tt0NPcw__" alt='spotify' className='w-5 absolute right-0 mt-[0px] mr-[7px]'/>
            {/* PLAY PAUSE */}
            <div className='flex items-center gap-3 pt-[8px]'>
            

              {
                 song.preview_url === NowPlaying ?

                 <button className=' h-8 pr-3 bg-green-500 bg-opacity-10 rounded-lg flex items-center justify-center w-[98px] ' onClick={()=> pauseAudio(song.preview_url, index)}>
                 <span>
                   <img className='cursor-pointer' src={PauseIconNew}  alt='pause'/>
                   </span>
                 <div className=' text-green-500 text-sm font-semibold font-geist leading-tight'>

                     <div>Pause</div>

                   </div>
                 </button>

                 :
                
                 <button className=' h-8 pr-3 bg-green-500 bg-opacity-10 rounded-lg flex items-center justify-center w-[98px] ' onClick={()=> changeSong(song.preview_url, index)}>
                 <span>
                 <img className='cursor-pointer' src={PlayIconNew} onClick={()=> changeSong(song.preview_url, index)} alt='pause'/>
                   </span>
                 <div className=' text-green-500 text-sm font-semibold font-geist leading-tight'>

                     <div>Preview</div>

                   </div>
                 </button>


              }
           
              <div className='w-[122px] flex justify-between items-center h-8 bg-white bg-opacity-5 rounded-lg  border border-white border-opacity-5'>
                <div className='flex  items-center w-fit  '>
                  <img  src={bookmark} alt='saved'/>
                  <div className='text-stone-400 text-sm font-medium font-geist leading-tight'>{song.totalSaves}</div>
                </div>
                <div className='w-8 h-[30px] relative rounded-tr-lg rounded-br-lg bg-stone-900 flex justify-center items-center'>
                    
                    {
                       hasBeenSelected ?
                       <img className="h-4 w-4 cursor-pointer" src={MinusIcon} alt='plus-icon' onClick={()=>removeSelectedSong(song.id)}/>
                    
                          :
                    <img className="h-4 w-4 cursor-pointer" src={plusIcon} alt='plus-icon' onClick={()=> addSelectedSong(song.id)}/>
                      
                  }   
                </div>
              </div>
            </div>
                  </div>

            


            </div>


            <div>

            </div>
            <div className='flex items-center gap-[10px]'>
          
<div className='flex gap-[13px] items-center'>

</div>
    
            </div>
    </div>
    

  )
}
