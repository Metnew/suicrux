import {css} from 'styled-components'
import _ from 'lodash'

const pxToEm = px => px / 16 + 'em'

const iWantToUseEm = true
// NOTE: This grid don't match SUI's grid.
// NOTE: RSUI has <Responsive> element!
// You might don't need media template function for styled-components
const sizes = _.mapValues(
	{
		xs: 0, // Extra small screen / phone
		sm: 480, // Small screen / phone
		md: 768, // Medium screen / tablet
		lg: 992, // Large screen / desktop
		xl: 1200 // Extra large screen / wide desktop
	},
	(value, key) => {
		// NOTE: Please, read more about `em` before switching
		// https://stackoverflow.com/questions/22228568/switching-to-em-based-media-queries
		return iWantToUseEm ? pxToEm(value) : value + 'px'
	}
)

// NOTE: @Metnew: this block may be rewritten more elegant (like the code below, from off docs)
export const media = {
	xs: (...args) => css`
		@media only screen and (max-width: ${sizes.sm}) {
			${css(...args)};
		}
	`,
	sm: (...args) => css`
		@media only screen and (max-width: ${sizes.md}) {
			${css(...args)};
		}
	`,
	smOnly: (...args) => css`
		@media only screen and (max-width: ${sizes.sm}) and (min-width: ${sizes.xs}) {
			${css(...args)};
		}
	`,
	md: (...args) => css`
		@media only screen and (max-width: ${sizes.lg}) {
			${css(...args)};
		}
	`,
	mdOnly: (...args) => css`
		@media only screen and (max-width: ${sizes.md}) and (min-width: ${sizes.sm}) {
			${css(...args)};
		}
	`,
	lg: (...args) => css`
		@media only screen and (min-width: ${sizes.lg}) {
			${css(...args)};
		}
	`,
	lgOnly: (...args) => css`
		@media only screen and (max-width: ${sizes.xl}) and (min-width: ${sizes.lg}) {
			${css(...args)};
		}
	`,
	xl: (...args) => css`
		@media only screen and (min-width: ${sizes.xl}) {
			${css(...args)};
		}
	`
}
