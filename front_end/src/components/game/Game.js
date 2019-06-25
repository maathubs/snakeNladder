import React from 'react';
import Square from '../Square/Square';

const Game = (props) => {
    // console.log('props in game : ', props)
    return (
        <div>
            {
                props.tiles.map(tile => {
                    return <Square key={tile.tileNumber} data={tile}/>;
                    // console.log("TILE:::",tile)
                })
            }
        </div>
    )
}
export default Game;



