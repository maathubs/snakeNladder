import React from 'react';
import Snake from './Snake';

let SnakeContainer = ( props ) => {
	// console.log('props in ladder container : ', props)
	return (
		<div className="snakes">
			{ props.snakes.map( snake => {
					return(
						<Snake key={ Snake.id } data={ snake } />
					)
				})
			}
		</div>
	)
}

export default SnakeContainer;

