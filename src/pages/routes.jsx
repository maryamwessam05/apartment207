import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Splash from './splashscreen';

const AppRoutes = () => {
    return ( 
        <>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Splash />} />

                </Routes>
            </BrowserRouter>

        
        </>
     );
}
 
export default AppRoutes;