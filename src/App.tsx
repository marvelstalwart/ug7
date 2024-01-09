import React, {useState, useEffect} from 'react';
import "./App.css"
import Navbar from './components/Navbar';
import Home from './pages/Home';

import SpotifyWebApi from 'spotify-web-api-js'

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
  const [spotifyToken, setSpotifyToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState<SpotifyApi.CurrentUsersProfileResponse>({
    display_name:"",
    external_urls:{
      spotify: ""
    },
    followers: {href:"", total:0},
    href:"",
    id:"",
    images:[],
    type:"user",
    uri:"",
    birthdate: "",
    country:"",
    email:"",
    product:""

  })

  const getRandomSongs = async ()=> {
   
      spotifyApi.getPlaylist("5O4C4Dmn0h7iABxLDCE4N6").then(function(res): void{
       const tracks = res.tracks.items.map(item=> item.track)
   
         setRandomSongs(tracks)
        
   
      }, function(err) : void{ 
       console.error(err)
      })


    }

  

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
         getRandomSongs()
          return setUser(user)
         
        })

       
  
      

      
    }     
  },[loggedIn])



  return (
   <main className='w-full h-full scroll-smooth'>
        <Navbar  loggedIn={loggedIn} user={user}/>
        <Home spotifyToken={spotifyToken} loggedIn={loggedIn} randomSongs={randomSongs} user={user}/>
   </main>
  )
}

export default App;
 