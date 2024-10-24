import { render } from "react-dom";
import React, { useState } from "react";
import SetAuthToken from './SetAuthToken';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner'
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
const url = 'http://127.0.0.1:8080/api/auth/signin'
const Login = () => {
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleSubmit = (event) => {
        setLoading(true);
        var user = {phone: phone, loginAccess: password};
        const response = axios.post(url, user)
                .then((response) => {
                    const token = response.data.value;
                    const tenant = response.data.tenant;
                    const tenantName = response.data.tenantName;
                    const employee = response.data.employee;
                    localStorage.setItem("maziwatoken", token);
                    localStorage.setItem("tenant", tenant);
                    localStorage.setItem("tenant_name", tenantName);
                    localStorage.setItem("employee", employee);
                    SetAuthToken(token);
                    window.location.href = '/home';
                    //this.setState({loading: false});
                }).catch((err) => {
                    setError(err.response.data.message);

        });
        event.preventDefault();
    }

    return(
            <div class="  bg-black h-100 body relative center ">
                
            
                <div class="font-xsm border-1 login-banner padding-md fixed"></div>
                
                <form onSubmit={handleSubmit} className=" bg- w-50 h-50 relative flex-vertical center border-rad-md text-white  padding-md  " >
                <div class=" font-xsm  text-white ">  
                    {error ?
                            <div class=" crimson-text center margin-top-md bg-orange padding-md border-rad-sm alert">
                                <span class="material-symbols-outlined ">
                                    gpp_maybe
                                </span>
                                <div class="text-salmon">{error}</div>
                            </div> : <div></div>}
            
                </div>
                    <div class="Roboto font-bold text-lg text-blue text-green"><i>ZILLOWETH</i></div>
            
                    <div class="flex-vertical  border-rad-sm">
                        <div class="center">
                            <span class="material-symbols-outlined">
                                phone 
                            </span>
            
                        </div>
                        <input type="text" id="email" value={phone} class="padding-md border-rad-sm bg-white border-none w-20" required onChange={handlePhoneChange} placeholder="Email" />
                    </div>   
                    <div class="flex-vertical  border-rad-sm">
                        <div class="center">
            
                            <span class="material-symbols-outlined text-salmon">
                                key 
                            </span>
            
            
                        </div>
                        <input type="password" id="password" value={password} class=" padding-md border-rad-sm bg-white border-none w-20" required onChange={handlePasswordChange} placeholder="password" />
                    </div>                        
            
                    <input type="submit" value="Login" className="menu-item border-none margin-md  flex-horizontal top-right w-20 padding-md " />
                </form>
                <div class="footer"></div>
            </div>


            );

}
;
export default Login;


