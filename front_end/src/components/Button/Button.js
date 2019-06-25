import React from 'react';
const Button=(props)=> {
    return(
        <div>
            <button type={props.type} className={props.className} disabled={props.move} onSubmit={props.onSubmit} onClick={props.onClick}>{props.value}</button>
        </div>
    )
}
export default Button