import React, {useState, useEffect, useRef} from 'react'
import { TDailySong } from '../types/types'
import Header from '../components/Header'
import SongCard from '../components/SongCard'
import SpotifyPlayer from 'react-spotify-web-playback'
import SpotifyWebApi from 'spotify-web-api-js'
import axios from "axios"
import Footer from '../components/Footer'

const spotifyApi = new SpotifyWebApi()



interface HomeProps {
  dailySongs:TDailySong[] | null
  randomSongs: (SpotifyApi.TrackObjectFull | SpotifyApi.EpisodeObjectFull)[] | null
  spotifyToken: string
  loggedIn: boolean
  user: SpotifyApi.CurrentUsersProfileResponse
}

export default function Home({spotifyToken, loggedIn, randomSongs, user, dailySongs}: HomeProps) {



 


  const [selectedSongs, setSelectedSongs] = useState<TDailySong[]>([    ])
  const [NowPlaying, setNowPlaying] = useState<string>("")
  const audioRefs  : React.RefObject<HTMLAudioElement> =useRef<HTMLAudioElement>(null)
  const [prevIndex, setPrevIndex ] = useState<number >(0)

  




  const addSelectedSong = (id: string) : void=> {
  console.log("adding")
  // Find song by Id
    let song  = dailySongs?.find(song=> song.id === id)
   
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
const nextSong = findCurrentAudioElement(audioRefs?.current?.children[nextIndex])
const prevSong  =  findCurrentAudioElement(audioRefs?.current?.children[prevIndex])

prevSong?.pause()
nextSong?.play()

if ( !nextSong?.paused) {
  setPrevIndex(nextIndex)
}
 

  setNowPlaying(songUri)


  
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

setNowPlaying("")

audioElement?.pause()

}

 console.log(dailySongs)

const addToPlaylist= (songs: TDailySong[] | null) : void => {
let trackUris =  songs?.map(song=> song.uri ) || []

if (trackUris.length ===0){
  console.error('No track URIs to add to the playlist.');
  return;
}

  spotifyApi.createPlaylist(user.id,  {name: `ug7 + ${Date.now().toString()}}`, public: true})
  .then((res : SpotifyApi.CreatePlaylistResponse)=> {
      spotifyApi.addTracksToPlaylist(res.id, trackUris).then((res: SpotifyApi.AddTracksToPlaylistResponse)=> {
            alert("Successfully added tracks to playlist")
      }).catch((err)=> console.error("An error occured while adding tracks to playlist"))
       
  })
  .catch((err)=> console.error("An error occured while creating playlist"))

 }



  return (  
    <main className='bg-zinc-800 min-h-screen'>
       <Header dailySongs={dailySongs} selectedSongs={selectedSongs} addToPlaylist={addToPlaylist}/>
       <section ref={audioRefs} className=' gap-[20px] w-full  pt-[412px] flex flex-col items-center'>
            {
                dailySongs?.map((song: any,index: number) =>  <SongCard song={song} addSelectedSong={addSelectedSong} removeSelectedSong={ removeSelectedSong} selectedSongs={selectedSongs}  key={index} changeSong={changeSong} NowPlaying={NowPlaying} pauseAudio={pauseAudio} index={index} />)
            }

       </section> 
      <Footer/> 

        </main>
  )
}
