import React from 'react';
import Navigation from './Navigation';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (

        <>
   <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>
        
            <Navigation />




            <div className='min-h-[500px] '>
                <Outlet />
            </div>
            


 
        
        </>
    );
}

export default Layout;
