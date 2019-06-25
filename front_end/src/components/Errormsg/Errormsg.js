import React from 'react';
import classes from './Errormsg.module.css';
const Errormsg=(props)=> {
    return(
        <div className={classes.errorMsg}>{props.msg}</div>
    )
}
export default Errormsg