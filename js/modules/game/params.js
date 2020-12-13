/** Internal paramters used by the game */

/**
 * Listing of font sizes and their associated widths and heights
 * @type {{Number: {width: number, height: number}}}
 *
 * If other font sizes are needed, run the 'initSizer' method in the Renderer class to get a listing of valid
 * heights and widths for font sizes from 8 to 64.
 */
const fontSizes = {
	12: { height: 14, width: 7 },
	18: { height: 20, width: 11 },
	20: { height: 23, width: 12 },
	30: { height: 34, width: 18 },
	40: { height: 45, width: 24 },
	60: { height: 68, width: 36 }
}

/**
 * Norders (padding) for the playground and the scorecard
 * @type {{top: number, left: number, bottom: number, right: number}}
 */
const borders = {
	top: 10, left: 10, bottom: 10, right: 10
}

export { fontSizes, borders };
