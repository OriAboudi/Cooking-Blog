import { useState, useEffect, useRef } from 'react';

const useElementHeight = () => {
  const [height, setHeight] = useState(null);
  const elementRef = useRef(null);

  const handleMoveToHeight = (newHeight) => {
    const element = elementRef.current;
    if (element) {
      element.style.height = `${newHeight}px`;
    }
  }

  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      setHeight(element.offsetHeight);
    }
  }, []);

  return [height, elementRef, handleMoveToHeight];
};

export default useElementHeight;