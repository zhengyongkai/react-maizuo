import { useEffect, useRef } from "react";

export default function useSroll(fn: (e: Event) => void) {
  const fnRef = useRef(fn);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  useEffect(() => {
    window.addEventListener("scroll", fnRef.current);
  }, []);
  return () => {
    window.removeEventListener("scroll", fnRef.current);
  };
}
