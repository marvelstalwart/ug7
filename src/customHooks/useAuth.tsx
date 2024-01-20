import React, {useState, useEffect} from 'react'


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
  
export default function useAuth() {
  const [user, setUser] = useState<SpotifyApi.CurrentUsersProfileResponse | null>(null)


  // useEffect(()=> {
  //   const token = getTokenfromUrl().access_token
  // if (token) {
  // localStorage.setItem("token", token)
  
  // setSpotifyToken(token)
  // setLoggedIn(true)
  // } 
  // if (randomSongs)  
  // console.log(randomSongs)
  // },[])
  return (
    <div>useAuth</div>
  )
}
