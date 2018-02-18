import styled from 'styled-components'

export const StyledFooter = styled.footer`
	width: 100%;
	display: flex;
	align-items: center;
	background-color: ${props => props.theme.black};
	color: ${props => props.theme.white};
	height: 72px;
	min-height: 72px;

	.footer-inner {
		padding: 15px 1rem;
	}
`
