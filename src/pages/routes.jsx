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
                <Route path="/menu" element={<MenuOverlay />} />
                <Route path="/win" element={<WinScreen />} />
                <Route path="/levels2" element={<Levels2 />} />
                <Route path="/levels2" element={<Levels2 />} />
                <Route path="/lose" element={<LoseScreen />} />



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