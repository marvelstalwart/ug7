import React, {useState, useEffect} from 'react'

export default function useScroll() {

    const [isHidden, setIsHidden]  = useState(false)
    const handleScroll = () : void=> {
      const scrollPosition = window.scrollY
      setIsHidden(scrollPosition > 10)
      
  }
  
  useEffect(()=> {
    window.addEventListener('scroll', handleScroll)
    return()=>
    window.removeEventListener('scroll', handleScroll)
  },[])
  

  return {
    isHidden,
    setIsHidden
  }
}
