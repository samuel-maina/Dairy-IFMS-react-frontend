import './App.css';
import Home from './Home'
import Licensing from './Licensing';
import Members from './Members';
import axios from 'axios';
import Admin from './Admin';
import Collections from './Collections';
import Records from './Records';
import SetAuthToken from './SetAuthToken';
import RouteGuard from './RouteGuard';
import Login from './Login';
import Logout from './Logout';
import {BrowserRouter as Router, Route, Routes, Switch, withRouter}
from 'react-router-dom';

function App() {

    axios.defaults.baseURL = 'http://192.168.0.102:8080';
    const token = localStorage.getItem("maziwatoken");
    if (token) {
        SetAuthToken(token);
    }

    return (
            <div className="App">
                <Router>
                    <Switch>
                    <RouteGuard exact path="/home/" component={Home}/>
                    <RouteGuard exact path="/" component={Home}/>
                    <RouteGuard exact path="/about/" component={Home}/>
                    
                    <RouteGuard exact path="/records/" component={Records}/>
                    <RouteGuard exact path ="/Collections/" component={Collections}/>
                    <RouteGuard exact path ="/members/" component={Members}/>
                    <RouteGuard exact path ="/licensing/" component={Licensing}/>
                    <RouteGuard exact path ="/admin_panel/" component={Admin}/>
                    <Route exact path="/logout" component={Logout}/>
                    <Route exact path ="/login/" component={Login}/>
                    </Switch>
                </Router>
            </div>
            );
}

export default App;
