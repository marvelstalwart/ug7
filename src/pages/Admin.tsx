import React, {useEffect, useState} from 'react'
import axios, { AxiosResponse } from "axios"
import SpotifyWebApi from 'spotify-web-api-js'
import { loginEndpoint } from '../utils/spotify'
import { log } from 'console'

interface AdminProps {
    user: SpotifyApi.CurrentUsersProfileResponse | null

}

const spotifyApi = new SpotifyWebApi()

export default function Admin({user}: AdminProps) {

    const [password, setPassword] = useState("")
    const [showSecQ, setShowSecQ] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const uploadPassword = process.env.REACT_APP_PASSWORD
    const isProd = process.env.NODE_ENV === "production"


    useEffect(()=> {
        const token = localStorage.getItem("token")
        spotifyApi.setAccessToken(token)
    
    },[])

    const getPlaylistTracks = async (): Promise<(SpotifyApi.TrackObjectFull | SpotifyApi.EpisodeObjectFull)[] | null>=> {
               

                    let res =  await spotifyApi.getPlaylist("1IxT8TjBe5cNpYI3ihwPsz")
                
                        const tracks = res?.tracks.items.map(item=> item.track)
                        return tracks
      
          
    }

    const splitPayloadInBatches = (data: (SpotifyApi.TrackObjectFull | SpotifyApi.EpisodeObjectFull)[] | null, batchSize = 20)=> {
       if (data){

           const batches = Array.from({ length: Math.ceil(data.length / batchSize) }, (v, i) =>
           data.slice(i * batchSize, i * batchSize + batchSize)
       );

     return batches
       }
    }

    const handleTracksUpload = async  (e: React.MouseEvent<HTMLButtonElement>): Promise<AxiosResponse<any, any> | void>=> {
            e.preventDefault()
        const tracks  = await getPlaylistTracks()
        
       let batches = splitPayloadInBatches(tracks)
      
       if (batches){
                 
                    const host = "https://ug7-server.onrender.com"
                    for (const batch of batches) {
                        try {
                            await axios.post(`${isProd ? host :  'http://localhost:1337'}/ug7/`, batch)
                        }   
                       catch(err){
                            console.error(err)
                       }
                   


                }
                alert("Successfully uploaded songs!")
        // const res = await axios.post(`${isProd ? host :  'http://localhost:1337'}/ug7/`, tracks)
        // console.log(res)
        //    return res
        
        // TODO Login user if not authenticated
            }
   
    }

    const handleToggleSecurityQ = ()=> {
            setShowSecQ(prev=> !prev)
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>)=> {
        setPassword(e.target.value)

    }

console.log(user) 
    useEffect(()=> {
            if (password === uploadPassword ) {
                setDisabled(false)
            }
            else {
                setDisabled(true)
            }
    },[password])

    return (

    <div className='bg-zinc-800 min-h-screen flex items-center justify-center'>


            {
            
            showSecQ ? 
            
            <div className='absolute  bg-neutral-700  rounded-lg h-[15rem] '>
                <div className='relative'>

                <div className="absolute right-0 px-4 text-2xl cursor-pointer" onClick={handleToggleSecurityQ}>x</div>

                </div>
                <div className='p-10'>

                    <h1 className='text-2xl font-bold flex items-center gap-1 text-white'><span className='text-red-500 font-bold '>*** </span>SECURITY QUESTION<span className='text-red-500 font-bold'>*** </span></h1>
                    <form className='flex flex-col gap-4 mt-4 items-center'>
                        <input className='w-full p-2 border-0 outline-0 bg-gray-400 rounded-lg' type='password' value={password} onChange={(e)=> handlePassword(e)}/>
                        <button className={`${disabled? 'bg-gray-500 text-gray-400 cursor-not-allowed' : 'bg-green-500'} w-[220px]  px-[20px] py-[10px] rounded-[30px]` } onClick={(e)=>handleTracksUpload(e)} disabled={disabled}>Confirm Upload</button>
                    </form>

                    </div>


             </div>

                :
                        null

            }
           
        <button className=" w-[220px]  px-[20px] py-[10px] bg-green-500 rounded-[30px] text-center text-neutral-900 text-base font-medium font-inter leading-normal cursor-pointer " onClick={handleToggleSecurityQ}>Upload Songs</button>



    </div>
  )
}
