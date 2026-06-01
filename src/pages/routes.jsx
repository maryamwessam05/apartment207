import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Splash from './splashscreen';
import Levels from './levels';
import LevelOne from './levelone';
import Story from './story';

const AppRoutes = () => {
    return ( 
        <>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Splash />} />
                    <Route path="/levels" element={<Levels />} />
                    <Route path="/story" element={<Story />} />
                    <Route path="/levelone" element={<LevelOne />} />


                </Routes>
            </BrowserRouter>

        
        </>
     );
}
 
export default AppRoutes;