import config from './config';

export const ladders = [
	{ id: 'ladder_1', from: 2, to: 38 },
	{ id: 'ladder_2', from: 4, to: 24 },
	{ id: 'ladder_3', from: 7, to: 56 },
	{ id: 'ladder_4', from: 8, to: 13 },
	{ id: 'ladder_5', from: 10, to: 30 },
	{ id: 'ladder_6', from: 28, to: 48 },
	{ id: 'ladder_7', from: 47, to: 88 },
	{ id: 'ladder_8', from: 62, to: 81 },
	{ id: 'ladder_10', from: 71, to: 91 },
	{ id: 'ladder_12', from: 59, to: 97 },
];

export const snakes = [
	{ id: 'sn_1', from: 36, to: 15 },
	{ id: 'sn_2', from: 69, to: 31 },
	{ id: 'sn_4', from: 99, to: 64 },
	{ id: 'sn_5', from: 40, to: 19 },
	{ id: 'sn_6', from: 76, to: 55 },
	{ id: 'sn_7', from: 96, to: 74 }
];
let gameboard;
let calculated_ladder_styles = [];
let calculated_snake_styles = [];
let player_colors = [
	{ color: "red", selected: false },
	{ color: "blue", selected: false },
	{ color: "yellow", selected: false },
	{ color: "green", selected: false }
];

export function check_for_ladder(position) {
	let p = false;
	for (let i = 0; i < ladders.length; i++) {
		let ladder = ladders[i];
		if (ladder.from === position) {
			console.log('ladder present', ladder.to)
			p = ladder.to; break;
		}
	}
	return p;
}

export function check_for_snake(position) {
	let p = false;
	for (let i = 0; i < snakes.length; i++) {
		let snake = snakes[i];
		if (snake.from === position) {
			console.log('snake present', snake.to)
			p = snake.to; break;
		}
	}
	return p;
}

export function getPlayerStyle(position, state) {
	let tilePosition;

	if (position >= 100) {
		tilePosition = document.getElementById(`tile_100`).getBoundingClientRect();
	}
	else
		tilePosition = document.getElementById(`tile_${position}`).getBoundingClientRect();
	let playerPosition = {
		top: tilePosition.top + window.scrollY - (tilePosition.height / 2),
		left: tilePosition.left,
		bottom: tilePosition.bottom,
		right: tilePosition.right,
		margin_left: state.currentUserId + 1
	}
	return playerPosition;
}

export function get_player_color() {
	let selected_color = "white";
	for (let i = 0; i < player_colors.length; i++) {
		let item = player_colors[i];
		if (item && !item.selected) {
			player_colors[i].selected = true;
			selected_color = item.color;
			break;
		}
	}
	return { backgroundColor: selected_color };
}


export function generateLadderStyle(data) {
	let existing = calculated_ladder_styles[data.id];
	if (existing) {
		return {
			top: existing.top,
			left: existing.left,
			height: existing.height,
			width: existing.width,
			transform: existing.transform || '',
		};
	}
	let from_tile = document.getElementById(`tile_${data.from}`).getBoundingClientRect();
	let to_tile = document.getElementById(`tile_${data.to}`).getBoundingClientRect();
	if (!gameboard) {
		gameboard = document.getElementsByClassName('squareContainer')[0].getBoundingClientRect();
	}

	let to_tile_top = to_tile.top + window.scrollY;
	let from_tile_top = from_tile.top + window.scrollY;
	let gameboard_top = gameboard.top + window.scrollY;
	let ladder_position = 1;

	let left_tile = {};
	let right_tile = {};
	if (to_tile.left <= from_tile.left) {
		left_tile = to_tile;
		right_tile = from_tile;
	} else {
		left_tile = from_tile;
		right_tile = to_tile;
	}

	if (to_tile.left < from_tile.left) {
		ladder_position = -1;
	}

	let top = to_tile_top - gameboard_top;
	let height = from_tile_top - to_tile_top + (config.tile.height - config.tile.margin);
	let left = left_tile.left - gameboard.left;
	let width = right_tile.left - left_tile.left - config.tile.margin + config.tile.width;

	let tile_css_styles = {
		top,
		left,
		height,
		width,
		ladder_position
	}

	tile_css_styles = getLadderTransformStyles(tile_css_styles);
	calculated_ladder_styles[data.id] = tile_css_styles;  // store this ladders calculated styles
	return tile_css_styles;
}

export function getLadderTransformStyles(div) {
	let tile_count = (div.width + config.tile.margin) / config.tile.width;
	let tile_row_count = (div.height + config.tile.margin) / config.tile.height;
	let rotate_deg = 0;
	if (tile_count <= 1) { rotate_deg = 0; }
	else if (tile_count <= 2) {
		let number = 7;
		if (div.ladder_position === 1) {
			if (tile_row_count <= 4) { number = 10; }
		} else {
			if (tile_row_count <= 4) { number = 20; }
		}
		rotate_deg = number * tile_count;
	}
	else if (tile_count < 4) { rotate_deg = 7 * tile_count; }

	else if (tile_count < 5) {
		let number = 8;
		if (tile_row_count >= 4 && div.ladder_position !== 1) { number = 11; }
		rotate_deg = number * tile_count;
	}

	else if (tile_count < 7) {
		rotate_deg = 13 * tile_count;
		div.top = div.top - (12 * tile_count);
		div.height = div.height + (26 * tile_count);
	}

	else { rotate_deg = 7 * tile_count; }

	if (tile_row_count === 1) {
		rotate_deg = 90;
		div.top = div.top - ((div.width - div.height) / 2);
		div.height = div.height + ((tile_count - 1) * config.tile.height);
	}

	let transform = `rotate(${rotate_deg * div.ladder_position}deg)`;

	let styles = {
		top: `${div.top}px`,
		left: `${div.left}px`,
		height: `${div.height}px`,
		width: `${div.width}px`,
	}
	if (transform) { styles.transform = transform; }
	return styles;

}
export function generateSnakeStyle(data) {
	let existing = calculated_snake_styles[data.id];
	if (existing) {
		return {
			top: existing.top,
			left: existing.left,
			height: existing.height,
			width: existing.width,
		};
	}

	let from_tile = document.getElementById(`tile_${data.to}`).getBoundingClientRect();
	let to_tile = document.getElementById(`tile_${data.from}`).getBoundingClientRect();
	if (!gameboard) {
		gameboard = document.getElementsByClassName('squareContainer')[0].getBoundingClientRect();
	}

	let to_tile_top = to_tile.top + window.scrollY;
	let from_tile_top = from_tile.top + window.scrollY;
	let gameboard_top = gameboard.top + window.scrollY;
	let snake_position = -1;

	let left_tile = {};
	let right_tile = {};
	if (to_tile.left <= from_tile.left) {
		left_tile = to_tile;
		right_tile = from_tile;
	} else {
		left_tile = from_tile;
		right_tile = to_tile;
	}

	if (to_tile.left < from_tile.left) { snake_position = 1; }

	let top = to_tile_top - gameboard_top;
	let height = from_tile_top - to_tile_top + (config.tile.height - config.tile.margin);
	let left = left_tile.left - gameboard.left;
	let width = right_tile.left - left_tile.left - config.tile.margin + config.tile.width;

	let tile_css_styles = {
		top: `${top}px`,
		left: `${left}px`,
		height: `${height}px`,
		width: `${width}px`,
	}

	calculated_snake_styles[data.id] = tile_css_styles; // store this snake's calculated styles

	return tile_css_styles;
}



