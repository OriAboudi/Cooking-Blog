import { useEffect, useRef, useState } from "react";

export const useHover = ()=> {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => setIsHovering(true);
  const handleMouseOut = () => setIsHovering(false);

  const elementRef = useRef();

  useEffect(()=>{
      elementRef.current.addEventListener('mouseover', handleMouseOver);
      elementRef.current.addEventListener('mouseout', handleMouseOut);
  },[])


  return [elementRef, isHovering];
};  

