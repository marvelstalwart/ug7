import React, {useState, useEffect, useRef, SetStateAction, Dispatch} from 'react'
import { TDailySong } from '../types/types'
import Header from '../components/Header'
import SongCard from '../components/SongCard'
import SpotifyWebApi from 'spotify-web-api-js'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import { coverImg } from '../assets/img/cover'
import WaveSurfer from 'wavesurfer.js'
import { loginEndpoint } from '../utils/spotify'
import useScroll from '../customHooks/useScroll'
import Dialog from '../components/Dialog'
import PageLoading from '../components/PageLoading'
import axios from "axios"
const spotifyApi = new SpotifyWebApi()



interface HomeProps {
  dailySongs:TDailySong[] | null
  randomSongs: (SpotifyApi.TrackObjectFull | SpotifyApi.EpisodeObjectFull)[] | null
  spotifyToken: string
  loggedIn: boolean
  user: SpotifyApi.CurrentUsersProfileResponse | null

}

export default function Home({spotifyToken, loggedIn, randomSongs, user, dailySongs}: HomeProps) {



 


  const [selectedSongs, setSelectedSongs] = useState<TDailySong[]>([    ])
  const [NowPlaying, setNowPlaying] = useState<string>("")
  const audioRefs  : React.RefObject<HTMLAudioElement> =useRef<HTMLAudioElement>(null)
  const [prevIndex, setPrevIndex ] = useState<number >(0)
  const [playlistId, setPlaylistId] = useState<string>("")
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const[isLoading, setIsLoading] = useState<boolean>(false)
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

const filterTracksByUri = (uris: string[])=> {
        const uniqueTrackIds =  dailySongs?.filter(song=> uris.includes(song.uri) ).map(song=> song._id)
        
        return uniqueTrackIds
      }

const updateDailySavesCount = async (trackIds: string[])=> {
        const isProd = process.env.NODE_ENV === 'production'  
        const host=    "https://ug7-server.onrender.com"
         await axios.post(`${isProd ? host: 'http://localhost:1337'}/ug7/update`,{songIds: trackIds})
}

const addToPlaylist=  async (songs: TDailySong[] | null) : Promise<void> => {
// Sign in user if not authenticated
setIsLoading(true)
if (!user) {
  window.location.href = loginEndpoint
}
else {


  // Get all the trackUris from the selectedSong

let trackUris =  songs?.map(song=> song.uri ) || []

if (trackUris.length ===0){
  console.error('No track URIs to add to the playlist.');
  return;
}



spotifyApi.getUserPlaylists(user.id).then(async (res)=> {

  console.log(process.env)
  const playListExists = res.items.find((res)=> res.name === "underground7even")
  // Add tracks to playlist if our playlist exists
    if (playListExists){
      let uniqueTrackUris:string[];
      try{
        
        // Get a list of all the existing tracks in the playlist
        const existingPlaylistTracks  = await spotifyApi.getPlaylistTracks(playListExists.id)
        // Get the track URIs
        const existingTrackUris = existingPlaylistTracks.items.map((item) => item.track.uri);
        // Eliminate duplicate tracks
        uniqueTrackUris = trackUris.filter(uri=> !existingTrackUris.includes(uri))
        
        spotifyApi.addTracksToPlaylist(playListExists.id, uniqueTrackUris)
        .then( async (res)=> {
          // On successful add to the playlist
            setShowDialog(true)
            setIsLoading(false)
        setPlaylistId(playListExists.id)
        // Update the save count by sending the track ids to the database
          const trackIds = filterTracksByUri(uniqueTrackUris)
          if (trackIds){

            try {
              await updateDailySavesCount(trackIds)

            }
            catch(err) {
              throw new Error ("An error occured while updating save count!")
            }
          }


        })
        .catch(err=> {
          setIsLoading(false)
          console.error(err)
        })
      }
      catch(err){
        setIsLoading(false)
          console.error(err)
      }
   
      




    
    } 
    //If our playlist has not been created, create new underground7even playlist and add tracks to it
    else {
         spotifyApi.createPlaylist(user.id,  {name: `underground7even`, public: true})
  .then((playlist : SpotifyApi.CreatePlaylistResponse)=> {

      spotifyApi.addTracksToPlaylist(playlist.id, trackUris).then(async (res: SpotifyApi.AddTracksToPlaylistResponse)=> {

        setPlaylistId(playlist.id)
        const trackIds = filterTracksByUri(trackUris)
        if (trackIds){

          try {
            await updateDailySavesCount(trackIds)

          }
          catch(err) {
            throw new Error ("An error occured while updating save count!")
          }
        }

        spotifyApi.uploadCustomPlaylistCoverImage(playlist.id, coverImg).then((res)=> {
          setShowDialog(true)
          setIsLoading(false)
          
        }).catch(err=>{

          setIsLoading(false)
         console.error("An error occured while adding tracks to playlist and uploading custom data")
        }
         )

      }).catch((err)=>
      {
        setIsLoading(false)
      console.error("An error occured while adding tracks to playlist")
  })
   
  })
  .catch((err)=> 
  {
    setIsLoading(false)
    console.error("An error occured while creating playlist")
  })

    }

})
.catch((err)=>{
  setIsLoading(false)
  console.error(err)}
  )
}
 }

const closeDialog = ():void=> {
  setShowDialog(false)
}
  

  return (  
    <main className='bg-neutral-900 min-h-screen '>
     <Dialog playlistId={playlistId} closeDialog={closeDialog} showDialog={showDialog}/>
       <Header dailySongs={dailySongs} selectedSongs={selectedSongs} addToPlaylist={addToPlaylist} isLoading={isLoading}/>
      
     {

      !dailySongs ? <PageLoading/>
      :
       <section ref={audioRefs} className='  w-full mt-[32px]  pt-[350px] flex flex-col gap-[10px] items-center px-[12px]'>
            {
                dailySongs?.map((song: any,index: number) =>  <SongCard song={song} addSelectedSong={addSelectedSong} removeSelectedSong={ removeSelectedSong} selectedSongs={selectedSongs}  key={index} changeSong={changeSong} NowPlaying={NowPlaying} pauseAudio={pauseAudio} index={index} />)
            }


       </section> 

     }

       
      <Footer/> 

        </main>
  )
}
