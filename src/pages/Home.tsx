import React, {useState, useEffect, useRef} from 'react'
import { Tsong } from '../types/types'
import Header from '../components/Header'
import SongCard from '../components/SongCard'
import SpotifyPlayer from 'react-spotify-web-playback'
import SpotifyWebApi from 'spotify-web-api-js'
import axios from "axios"
import Footer from '../components/Footer'

const spotifyApi = new SpotifyWebApi()



interface HomeProps {
  randomSongs: (SpotifyApi.TrackObjectFull | SpotifyApi.EpisodeObjectFull)[] | null
  spotifyToken: string
  loggedIn: boolean
  user: SpotifyApi.CurrentUsersProfileResponse
}

export default function Home({spotifyToken, loggedIn, randomSongs, user}: HomeProps) {






  const [selectedSongs, setSelectedSongs] = useState<(SpotifyApi.TrackObjectFull | SpotifyApi.EpisodeObjectFull)[]>([    ])
  const [NowPlaying, setNowPlaying] = useState("")
  const audioRefs  : React.RefObject<HTMLAudioElement> =useRef<HTMLAudioElement>(null)
  const [prevIndex, setPrevIndex ] = useState<number >(0)

  




  const addSelectedSong = (id: string) : void=> {
  
  // Find song by Id
    let song  = randomSongs?.find(song=> song.id === id)
   
   let selected = [...selectedSongs]

   if (song) {

     const hasBeenSelected =  selected.includes(song)
     //Prevent double selection and exceeding max selection of 7
     if( !hasBeenSelected && selected.length < 7) {
        selected.push(song)
   
      }
      setSelectedSongs(selected)
   }

  
  }

  const removeSelectedSong  = (id: string): void => {
    
    let selected = [...selectedSongs]
   
  setSelectedSongs(selected.filter(song=> song.id !== id))    

  }


const changeSong  = (songUri: string, nextIndex:number)=> {
  console.log("hi")
const nextSong = findCurrentAudioElement(audioRefs?.current?.children[nextIndex])
const prevSong  =  findCurrentAudioElement(audioRefs?.current?.children[prevIndex])
// console.log(audioElement)
prevSong?.pause()
nextSong?.play()

if ( !nextSong?.paused) {
  setPrevIndex(nextIndex)
}
  // if (!audioRef.current?.paused)  {
  //   audioRef?.current?.pause()
  // }

  setNowPlaying(songUri)

  // audioRef?.current?.play()
  
}

const findCurrentAudioElement =  (element: Element| undefined) : HTMLAudioElement | null => {
  
  
  if(!element )  {
    return null;
  }
   // If the current element is an audio element, return it
  if (element.tagName.toLowerCase()==='audio'){
    return element as HTMLAudioElement
  }
    // If not, recursively search in the children
 const children = element.children



 for (let i = 0; i< children.length; i++) {
  const audioElement = findCurrentAudioElement(children[i] as HTMLElement)
if (audioElement) {
  return audioElement
}
}
 return null
}


const pauseAudio = (id: string, index: number)  :void=> {
  const audioElement = findCurrentAudioElement(audioRefs?.current?.children[index])



audioElement?.pause()

}

 





  return (  
    <main className='bg-zinc-800 min-h-screen'>
       <Header selectedSongs={selectedSongs}/>
       <section ref={audioRefs} className=' gap-[20px] w-full  pt-[412px] flex flex-col items-center'>
            {
                randomSongs?.map((song,index)=>  <SongCard song={song} addSelectedSong={addSelectedSong} removeSelectedSong={ removeSelectedSong} selectedSongs={selectedSongs}  key={index} changeSong={changeSong} NowPlaying={NowPlaying} pauseAudio={pauseAudio} index={index} />)
            }

       </section> 
      <Footer/> 

        </main>
  )
}
