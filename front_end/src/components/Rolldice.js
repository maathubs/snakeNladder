import React from 'react';
import Score from './Score/Score';

const Rolldice = (props) => {
    console.log('props in roll dice component ; ',props)
    return (
        <div className = "rollDice" >
            <div>
                <button className = {props.className } disabled={props.status} onClick = { props.onClick } >
                    <img src = {`images/dice${props.roll}.jpg`}  alt = "dice" />
                </button>
                <p className = "move">
                    Next Player = { props.status && props.isStart ? `winner=${props.currentUser}` : props.currentUser}       
                </p>
                <p className = "move">
                    <strong>
                        Move = { props.status && props.isStart ? "GAME OVER" : props.move }
                    </strong>
                </p>
            </div>
            <div>
                <Score users = { props.users } />
            </div>
        </div>
    )
}
export default Rolldice