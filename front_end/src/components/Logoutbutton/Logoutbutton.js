import React, { Component } from 'react';
import classes from  './Logoutbutton.module.css';
import { Link} from "react-router-dom";
class Logoutbutton extends Component{
    Logout=()=>{
        localStorage.removeItem("user");
    }
    render(){
        return (
            <Link className={classes.logout} onClick={this.Logout} to="/Login">Logout</Link>
        )
    }
}
export default Logoutbutton