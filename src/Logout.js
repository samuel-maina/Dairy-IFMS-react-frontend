import {render} from "react-dom";
import React from "react";
import {Redirect} from 'react-router-dom'
class Logout extends React.Component {
    componentDidMount(){
        this.deleteToken();
    }
    
    deleteToken(){
        localStorage.removeItem('maziwatoken');
    }
    render() {
        return(
                
                <Redirect to="/login/"/>
                );
    }
}
;

export default Logout;
