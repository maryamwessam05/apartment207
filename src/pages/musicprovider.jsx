import { createContext, useContext, useRef, useEffect, useState } from 'react';
import music from '../music/Abdel Halim Hafez - Nebtady Menen ElHekaya  Short version  عبد الحليم حافظ - نبتدى منين الحكاية.mp3';

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
    const audioRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [unlocked, setUnlocked] = useState(false);
    const [sfxOn, setSfxOn] = useState(true);

    useEffect(() => {
        const unlock = () => {
            if (!unlocked) {
                audioRef.current?.play().then(() => {
                    setPlaying(true);
                    setUnlocked(true);
                }).catch(() => {});
                window.removeEventListener('click', unlock);
                window.removeEventListener('keydown', unlock);
            }
        };
        window.addEventListener('click', unlock);
        window.addEventListener('keydown', unlock);
        return () => {
            window.removeEventListener('click', unlock);
            window.removeEventListener('keydown', unlock);
        };
    }, [unlocked]);

    const toggle = () => {
        if (!audioRef.current) return;
        if (playing) {
            audioRef.current.pause();
            setPlaying(false);
        } else {
            audioRef.current.play().catch(() => {});
            setPlaying(true);
        }
    };

    const pause = () => {
        audioRef.current?.pause();
        setPlaying(false);
    };

    const resume = () => {
        audioRef.current?.play().catch(() => {});
        setPlaying(true);
    };

    const toggleSfx = () => setSfxOn(prev => !prev);

    return (
        <MusicContext.Provider value={{ playing, toggle, pause, resume, sfxOn, toggleSfx }}>
            <audio ref={audioRef} src={music} loop />
            {children}
        </MusicContext.Provider>
    );
};

export const useMusic = () => useContext(MusicContext);