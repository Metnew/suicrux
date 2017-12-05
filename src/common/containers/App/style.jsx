import styled, {css} from 'styled-components'
import {Dimmer, Sidebar, Container} from 'semantic-ui-react'

export const PageLayout = styled.div`
	height: 100%;
`

export const MainLayout = styled.div`
	min-height: calc(100% - 72px);
	display: flex;
	flex-direction: column;
	color: ${props => props.theme.primaryTextColor};
	background-color: ${props => props.theme.primaryColorText};
`

export const MainContent = styled.main`
	flex-grow: 1;
	min-height: calc(100% - 72px);
	display: flex;
	flex-direction: column;
`

export const SidebarSemanticPusherStyled = styled(Sidebar.Pusher)`
	height: 100%;
	-webkit-overflow-scrolling: touch;
	${({isloggedin, ismobile}) => {
		// using `ismobile` attr instead of `media` util is much smoother
		return (
			isloggedin &&
			!ismobile &&
			css`
				max-width: calc(100% - 150px);
				`
		)
	}};
`

export const SidebarSemanticPushableStyled = styled(Sidebar.Pushable)`
	display: initial;
	> .pusher {
		overflow: visible !important;
	}
`

export const MainContainer = styled(Container)`
	padding-left: 1rem;
	padding-right: 1rem;
	margin-top: 2em;
	margin-bottom: 1em;
	flex-direction: column;
	display: flex !important;
	flex-grow: 1;
	& > *:last-child {
		flex-grow: 1;
	}
`

export const StyledDimmer = styled(Dimmer)`
	z-index: 55 !important;
	cursor: pointer;
`
