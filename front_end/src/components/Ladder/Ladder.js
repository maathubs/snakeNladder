import React from 'react';
import * as Helper from '../../Helpers/Helper';

let Ladder = (props) => {
	const { data } = props;
	let styles = Helper.generateLadderStyle(data);
	return (
		<div className="ladder" style={styles}>
		</div>
	)
}
export default Ladder;

