import React from 'react'
import Header from '../components/Header'
import SongCard from '../components/SongCard'
import Footer from '../components/Footer'
export default function Home() {
    const songCount = [1,2,3,4,5,6,7]
  return (
    <main className='bg-zinc-800 min-h-screen'>
       <Header/>
       <section className=' gap-[20px] w-full mt-[24px] pt-[390px] flex flex-col items-center'>
            {
                songCount.map((song,i)=>  <SongCard/>)
            }

       </section>
      <Footer/>

        </main>
  )
}
