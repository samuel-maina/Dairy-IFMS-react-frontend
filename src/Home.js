import Nav from './Nav';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import moment from 'moment';

const Home =()=> {
    
        const user = localStorage.getItem("employee");
        const tenantname = localStorage.getItem("tenant_name");
    

    
        return(
                <div class="relative">
                    <Nav/>
                    <div class="absolutfe hidden center-left bg-teal padding-md pointer border-right-rad-md text-white">
                        <span class="material-symbols-outlined">chevron_right</span> 
                    </div>
                
                    <div class="content-box relative">
                        <span class="text-white Mulish absolute  padding-md bg-blue">Home</span>
                        <span class="text-white font-sm"></span>
                        <div class="right-top-2 absolute text-white bg-orange padding-sm font-sm pointer">{tenantname} {user} {moment().format("MMMM DD YYYY ")}</div>
                               
                                <div class="text-white flex-vertical centerpage text-lg text-center">
                                Good to see you back {user}!
                                </div>
                    </div>
                </div>
                );

    

}
;
export default Home;
