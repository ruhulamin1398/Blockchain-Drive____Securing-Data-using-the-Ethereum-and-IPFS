import React from 'react';
import Navigation from './Navigation';

const Layout = () => {
    return (

        <>

            <Navigation />




            <div className='min-h-[500px] '>
                <Outlet />
            </div>
            


 
        
        </>
    );
}

export default Layout;
