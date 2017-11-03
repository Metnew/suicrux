import styled from 'styled-components'
import {media} from 'styles/utils'
import {Dimmer, Sidebar, Container} from 'semantic-ui-react'

export const PageLayout = styled.div`height: 100%;`

export const MainLayout = styled.div`
	display: flex;
	flex-direction: column;
	color: ${props => props.theme.primaryTextColor};
	background-color: ${props => props.theme.primaryColorText};
	${'100% - Header height - Footer height'};
	height: 100%;
	max-height: calc(100% - 72px);
`

export const MainContent = styled.main`
	height: 100%;
	display: flex;
	flex-grow: 1;
	padding-left: 1rem;
	padding-right: 1rem;
`

// 	${'' /* height: 100%; */}
export const SidebarSemanticPusherStyled = styled(Sidebar.Pusher)`
  -webkit-overflow-scrolling: touch;
	${''}

  ::-webkit-scrollbar {
	  width: 0px!important;
	}
`

export const SidebarSemanticPushableStyled = styled(Sidebar.Pushable)`
	display: initial;
	> .pusher {
		overflow: visible!important;
	}
`

//  Margin - just to fill empty space
export const MainContainer = styled(Container)`
	height: 100%;
  margin-top: 2em;
  margin-bottom: 1em;

  &#main-container {
		${media.mdOnly`
			width: 100% !important;
		`}

		${media.smOnly`
		  width: 100% !important;
		`}
	}
`

export const StyledDimmer = styled(Dimmer)`
	z-index: 55!important;
	cursor: pointer;
`
