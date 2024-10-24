import { Link, NavLink } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
class Nav extends React.Component {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {}
    render() {

        return (
                <div class="relative">
        <div class="float-right w-250"><div class="flex-horizontal"><NavLink to={'/about?client='+localStorage.getItem("tenant")} activeClassName="selected" className='text-gray ' >
                            <div class=" border-rad-mdd padding-md ">
                                <span class="material-symbols-outlineds Mulish font-sm">ABOUT</span> 
                            </div>
                        </NavLink>
                        <NavLink to={'/licensing?client='+localStorage.getItem("tenant")} activeClassName="selected" className='text-gray' >
                            <div class=" border-rad-mdd padding-md">
                            <span class="material-symbols-outlineds Mulish font-sm">LICENSING</span> 
                            </div>
                            </NavLink></div></div>
                    <div className="left-vertical-menu">
                        <NavLink to={'/home?client='+localStorage.getItem("tenant")} activeClassName="selected" className='text-gray' >
                            <div class="menu-item border-rad-mdd padding-md">
                                <span class="material-symbols-outlined">home</span> 
                            </div>
                        </NavLink>
                        <NavLink to={'/records?client='+localStorage.getItem("tenant")} activeClassName="selected" className='text-gray' >
                            <div class="menu-item border-rad-mdd padding-md">
                                <span class="material-symbols-outlined">table_chart</span> 
                            </div>
                        </NavLink>
                         <NavLink to={'/collections?client='+localStorage.getItem("tenant")} activeClassName="selected" className='text-gray' >
                            <div class="menu-item border-rad-mdd padding-md">
                                <span class="material-symbols-outlined">grocery</span> 
                            </div>
                        </NavLink>
                        
                        <NavLink to={'/members?client='+localStorage.getItem("tenant")} activeClassName="selected" className='text-gray' >
                            <div class="menu-item border-rad-mdd padding-md">
                                <span class="material-symbols-outlined">people</span> 
                            </div>
                        </NavLink>
                        <NavLink to={'/licensing?client='+localStorage.getItem("tenant")} activeClassName="selected" className='text-gray' >
                            <div class="menu-item border-rad-mdd padding-md">
                                <span class="material-symbols-outlined">manage_accounts</span> 
                            </div>
                        </NavLink>
                       
                        <NavLink to={'/admin_panel?client='+localStorage.getItem("tenant")} activeClassName="selected" className='text-gray' >
                            <div class="menu-item border-rad-mdd padding-md">
                                <span class="material-symbols-outlined">admin_panel_settings</span> 
                            </div>
                        </NavLink>
                        <NavLink to={'/logout?client='+localStorage.getItem("tenant")} activeClassName="selected" className='text-gray' >
                            <div class="menu-item border-rad-mdd padding-md">
                                <span class="material-symbols-outlined">logout</span> 
                            </div>
                        </NavLink>
                    </div></div>
                );
    }
}
export default Nav;