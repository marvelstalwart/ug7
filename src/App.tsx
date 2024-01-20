import React, {useState, useEffect} from 'react';
import "./App.css"
import Navbar from './components/Navbar';
import Home from './pages/Home';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-js'
import { TDailySong } from './types/types';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Admin from './pages/Admin';

const spotifyApi = new SpotifyWebApi()

const getTokenfromUrl = ()=> {
  return window.location.hash
  .substring(1)
  .split("&")
  .reduce((initial: Record<string, string>,item)=> {
    let parts = item.split("=");
    initial[parts[0]] = decodeURIComponent(parts[1]);
    return initial 
  },{})
}

function App() {

  const [randomSongs, setRandomSongs] = useState<(SpotifyApi.TrackObjectFull | SpotifyApi.EpisodeObjectFull)[]| any | null>(null)
  const [dailySongs, setDailySongs] = useState<TDailySong[]|null>(null)
  const [spotifyToken, setSpotifyToken] = useState("");
  const[showDisconnect, setShowDisconnect] = useState<boolean>(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [user, setUser] = useState<SpotifyApi.CurrentUsersProfileResponse | null>(null)



  // Get access token as sent from the URL hash
 useEffect(()=> {
  const token = getTokenfromUrl().access_token
if (token) {
localStorage.setItem("token", token)

setSpotifyToken(token)
setLoggedIn(true)
} 
if (randomSongs)  
console.log(randomSongs)
},[])


//Set access token, get spotify data and random songs
  useEffect(()=> {
    if (loggedIn) {
        spotifyApi.setAccessToken(spotifyToken)
        spotifyApi.getMe().then((user)=> {
         
        //  getRandomSongs()
          return setUser(user)
         
        })

       
  
      

      
    }     
  },[loggedIn])


const getDailySongs= async ()=> {

  const isProd = process.env.NODE_ENV=== "production"
  const host = "https://ug7-server.onrender.com"
const res = await axios.get(`${isProd? host : "http://localhost:1337"}/ug7/`)

setDailySongs(res.data)
   

   
      
}  

const toggleDisconnect = ()=> {
      setShowDisconnect(!showDisconnect)
}

const disconnect = async ()=> {
  spotifyApi.setAccessToken(null)
  localStorage.removeItem("token")
  setUser(null)
  setLoggedIn(false)
  setShowDisconnect(false)
}

    useEffect(()=> { 
   
          getDailySongs()
         
    },[randomSongs])

  return (
    <main className='w-full h-full bg-neutral-900 scroll-smooth '>
       <Navbar toggleDisconnect={toggleDisconnect} loggedIn={loggedIn} user={user} showDisconnect={showDisconnect}/>
       
       {showDisconnect ?
         <button onClick={disconnect} className='absolute right-3 top-14 z-50 w-44 h-fit p-2 bg-stone-900 rounded border border-white border-opacity-10'>
         <div className=' px-2 py-3 bg-zinc-800 rounded-sm text-white text-base font-medium font-inter leading-normal'>disconnect</div>
       </button>
        :
      null
      }
      

    <Router>
     <Routes>

     

          <Route  path='/'  element={<Home    spotifyToken={spotifyToken} loggedIn={loggedIn} randomSongs={randomSongs} dailySongs={dailySongs} user={user}/>}/>

          {/* <Route path="/admin" element={<Admin user={user}/>}/> */}
          <Route path="*" element={<Home  spotifyToken={spotifyToken} loggedIn={loggedIn} randomSongs={randomSongs} dailySongs={dailySongs} user={user}/>} />

      </Routes>

    </Router>
   </main>
  )
}

export default App;
 