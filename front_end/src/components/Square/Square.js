import React from 'react';
import './Square.css';
const Square=(props)=> {
  return(
    <div className="square lighten" style={props.data.style} id={ 'tile_' + props.data.tileNumber }>
      <span className="tile-number">{props.data.tileNumber}</span>
      {props.data.tileNumber===1?<span className="start">START</span>:null}
      {props.data.tileNumber===100?<span className="gameOver">SUCCESS</span>:null}
    </div>
  )
}
export default Square;

   
  
