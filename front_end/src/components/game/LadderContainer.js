import React from 'react';
import Ladder from './Ladder';

let LadderContainer = ( props ) => {
	// console.log('props in ladder container : ', props)
	return (
		<div className="ladders">
			{ props.ladders.map( ladder => {
					return(
						<Ladder key={ ladder.id } data={ ladder } />
					)
				})
			}
		</div>
	)
}

export default LadderContainer;

