import React from 'react';
import './Square.css';
const Square=(props)=> {
  return(
    <div className="square">
      <span className="tile-number">{props.num}</span>
      {props.num===1?<span>START</span>:null}
    </div>
  )
}
export default Square;

   
  
