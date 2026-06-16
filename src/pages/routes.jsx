import React, { useEffect , useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useMusic } from './musicprovider';
import Splash from './splashscreen';
import Levels from './levels';
import Levels2 from './levels2';
import LevelOne from './levelone';
import Story from './story';
import MenuOverlay from './menu';
import { MusicProvider } from './musicprovider';
import MusicButton from '../components/musicbtn';
import { useClickSound } from '../hooks/useClickSound';
import WinScreen from './winscreen';
import LoseScreen from './losescreen';
import Clues from './clues';
import LevelTwo from './level2';
import LoseScreen2 from './losescreen2';
import MenuOverlay2 from './menu2';
import WinScreen2 from './winscreen2';
import Clues2 from './clues2';
import Levels3 from './levels3';
import LevelThree from './levelthree';
import Level4 from './levelfour';

const Layout = () => {
    const location = useLocation();
    const { pause, resume } = useMusic();
    const prevPath = useRef(null);
    useClickSound('/music/key.mp3');

    useEffect(() => {
        if (location.pathname === '/story') {
            pause();
        } else if (prevPath.current === '/story') {
            resume();
        }
        prevPath.current = location.pathname;
    }, [location.pathname]);

    return (
        <>
            <MusicButton />
            <Routes>
                <Route path="/" element={<Splash />} />
                <Route path="/levels" element={<Levels />} />
                <Route path="/story" element={<Story />} />
                <Route path="/levelone" element={<LevelOne />} />
                <Route path="/leveltwo" element={<LevelTwo />} />
                <Route path="/levelthree" element={<LevelThree />} />
                <Route path="/level4" element={<Level4 />} />
                <Route path="/menu" element={<MenuOverlay2 />} />
                <Route path="/menu2" element={<MenuOverlay />} />
                <Route path="/win" element={<WinScreen />} />
                <Route path="/win2" element={<WinScreen2 />} />
                <Route path="/levels2" element={<Levels2 />} />
                <Route path="/levels3" element={<Levels3 />} />
                <Route path="/lose" element={<LoseScreen />} />
                <Route path="/lose2" element={<LoseScreen2 />} />
                <Route path="/clue" element={<Clues />} />
                <Route path="/clues2" element={<Clues2 />} />





            </Routes>
        </>
    );
};

const AppRoutes = () => (
    <BrowserRouter>
        <MusicProvider>
            <Layout />
        </MusicProvider>
    </BrowserRouter>
);

export default AppRoutes;