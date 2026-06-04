import { useEffect, useRef } from "react";
import { useMusic } from "../pages/musicprovider";

export function useClickSound(soundPath) {
  const audioRef = useRef(null);
  const { sfxOn } = useMusic();

  useEffect(() => {
    audioRef.current = new Audio(soundPath);
    audioRef.current.volume = 1;
    audioRef.current.load();
  }, [soundPath]);

  useEffect(() => {
    const handleClick = () => {
      if (audioRef.current && sfxOn) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [sfxOn]); 
}