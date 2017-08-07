import {css} from 'styled-components'
import _ from 'lodash'

const pxToEm = px => {
	return px / 16 + 'em'
}

const iWantToUseEm = true
const sizes = _.mapValues(
	{
		xs: 0, // Extra small screen / phone
		sm: 480, // Small screen / phone
		md: 768, // Medium screen / tablet
		lg: 1024, // Large screen / desktop
		xl: 1200 // Extra large screen / wide desktop
	},
	(value, key) => {
		// NOTE: Please, read more about `em`, before switching to it
		// https://stackoverflow.com/questions/22228568/switching-to-em-based-media-queries
		return iWantToUseEm ? pxToEm(value) : value + 'px'
	}
)

// FIXME: @Metnew: dirty-hardcode version of media template!
export const media = {
	xs: (...args) => css`
	  @media only screen and (max-width: ${sizes.sm}) {
	    ${css(...args)}
	  }
	`,
	sm: (...args) => css`
	  @media only screen and (max-width: ${sizes.md}) {
	    ${css(...args)}
	  }
	`,
	smOnly: (...args) => css`
		@media only screen and (max-width: ${sizes.sm}) and (min-width: ${sizes.xs}) {
			${css(...args)}
		}
	`,
	md: (...args) => css`
	  @media only screen and (max-width: ${sizes.lg}) {
	    ${css(...args)}
	  }
	`,
	mdOnly: (...args) => css`
		@media only screen and (max-width: ${sizes.md}) and (min-width: ${sizes.sm}) {
			${css(...args)}
		}
	`,
	lg: (...args) => css`
	  @media only screen and (min-width: ${sizes.lg}) {
	    ${css(...args)}
	  }
	`,
	lgOnly: (...args) => css`
		@media only screen and (max-width: ${sizes.xl}) and (min-width: ${sizes.lg}) {
			${css(...args)}
		}
	`,
	xl: (...args) => css`
	  @media only screen and (min-width: ${sizes.xl}) {
	    ${css(...args)}
	  }
	`
}

// NOTE: from official docs, but it looks like a black-voodoo-magic
// // iterate through the sizes and create a media template
// export const media = Object.keys(sizes).reduce((accumulator, label, i) => {
// 	console.log(accumulator, label)
// 	// use em in breakpoints to work properly cross-browser and support users
// 	// changing their browsers font-size: https://zellwk.com/blog/media-query-units/
// 	const emSize = sizes[label] / 16
// 	accumulator[`${label}-only`] = (...args) => css`
//     @media only screen and (max-width: ${emSize}em) and (max-width: ${emSize}em) {
//       ${css(...args)}
//     }
//   `
// 	accumulator[label] = (...args) => css`
//     @media only screen (min-width: ${emSize}em) {
//       ${css(...args)}
//     }
//   `
// 	return accumulator
// }, {})
