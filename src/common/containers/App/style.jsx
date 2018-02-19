import styled, {css} from 'styled-components'
import {Sidebar} from 'semantic-ui-react'

export const SidebarSemanticPushable = Sidebar.Pushable
export const SidebarSemanticPusherStyled = styled(Sidebar.Pusher)`
	height: 100%;
	-webkit-overflow-scrolling: touch;
	${({sidebar_opened: sidebarOpened}) => {
		// `sidebar_opened` attr instead of `media` util -> SSRed app looks better
		return sidebarOpened && css`max-width: calc(100% - 150px);`
	}};
`

export const PageLayout = styled.div`
	height: 100%;

	.pushable {
		display: initial;
		height: 100%;
		overflow-x: hidden;
		padding: 0;
		transform: translate3d(0, 0, 0);
		> ${SidebarSemanticPusherStyled} {
			overflow: visible !important;
		}
	}

	.main-layout {
		min-height: calc(100% - 72px);
		display: flex;
		flex-direction: column;
		color: ${props => props.theme.black};
		background-color: ${props => props.theme.white};

		> .main-content {
			flex-grow: 1;
			min-height: calc(100% - 72px);
			display: flex;
			flex-direction: column;

			> .main-container {
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
			}
		}
	}
`
