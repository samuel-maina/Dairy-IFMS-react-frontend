import Nav from './Nav';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

class Admin extends React.Component {

    render() {
        return(
                <div class="relative">
                    <Nav/>
                    <div class="content-box   ">
                 
                <div class="centerpage  text-white center"><div class="flex-vertical"><span class=" float-left font-sm">Please enter the code to authorize yourself to protected pages</span><form><input type="text" focus="true" class="input-magic border-none center padding-sm white" maxlength="1" required/><input type="text" class="input-magic border-none center padding-sm white" maxlength="1" required/><input type="text" class="input-magic border-none center padding-sm white" maxlength="1" required/><input type="text" class="input-magic border-none center padding-sm white" maxlength="1" required/><input type="text" class="input-magic border-none center padding-sm white" maxlength="1" required/><div class="margin-sm top-right"><button type="submit" class="input-magic  centder bg-green padding-sm border-none"><span class=" material-symbols-outlined">
                                    chevron_right 
                                    </span></button></div></form></div></div>
                    </div>
                </div>
                );

    }

}
;
export default Admin;