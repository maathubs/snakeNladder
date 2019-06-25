import React from 'react';
import * as Helper from '../../Helpers/Helper';

let Snake = ( props ) => {
	const { data } = props;
	let styles = Helper.generateSnakeStyle( data );
	return (
		<div className="snake" style={styles}>
		</div>
	)
}

export default Snake;

