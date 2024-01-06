import React, {useState, useEffect} from 'react'
import { Tsong } from '../types/types'
import Header from '../components/Header'
import SongCard from '../components/SongCard'
import Footer from '../components/Footer'
export default function Home() {
  const [songs, setSongs] = useState<Tsong[]>([
    {id: 1, title: "Lonely at the top", artiste:"Asake", duration:3.31},
    {id: 2,title: "Solo", artiste:"Myles Smith", duration:3.31},
    {id:3,title: "Wasting Angels(feat. The Kid LAROI)", artiste:"Post Malone", duration:3.31},
    {id: 4, title: "Wait(feat. A Boogie wit da Hoodie)", artiste:"Maroon 5", duration:3.31},
    {id:5, title: "In Your Arms", artiste:"ILLENIUM", duration:3.31},
    {id: 6,title: "California", artiste:"Boy In Space", duration:3.31},
    {id: 7, title: "Roses (feat. ROZES)", artiste:"The Chainsmokers", duration:3.31},
  
  ])


  const [selectedSongs, setSelectedSongs] = useState<Tsong[]>([    ])
  

  const addSelectedSong = (id: number) : void=> {
  
  // Find song by Id
    let song  = songs.find(song=> song.id === id)
   
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

  const removeSelectedSong  = (id: number): void => {
    
    let selected = [...selectedSongs]
   
  setSelectedSongs(selected.filter(song=> song.id !== id))    

  }



  return (
    <main className='bg-zinc-800 min-h-screen'>
       <Header selectedSongs={selectedSongs}/>
       <section className=' gap-[20px] w-full mt-[24px] pt-[390px] flex flex-col items-center'>
            {
                songs.map((song,i)=>  <SongCard song={song} addSelectedSong={addSelectedSong} removeSelectedSong={ removeSelectedSong} selectedSongs={selectedSongs}  key={i}/>)
            }

       </section>
      <Footer/>

        </main>
  )
}
