import styled from 'styled-components'
import {media} from 'styles/utils'
import {Dimmer, Sidebar, Container} from 'semantic-ui-react'

export const PageLayout = styled.div`height: 100%;`

export const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  color: ${props => props.theme.primaryTextColor};
  background-color: ${props => props.theme.primaryColorText};
`

export const MainContent = styled.main`
  display: flex;
  flex-grow: 1;
  padding-left: 1rem;
  padding-right: 1rem;
  ${media.md`
		padding-top: 65px;
	`};
  ${media.lg`
		padding-top: 72px;
	`};
`

export const SidebarSemanticPusherStyled = styled(Sidebar.Pusher)`
	height: 100%;
	overflow: scroll!important;

	${'' /* poptop_modules/components/views/AppComponent/index.jsx 65:52   ${media.md`
		max-width: ${props => props.sidebarOpened && `calc(100% - 150px)`};
	`} */}

	${'' /* ${media.sm`
		overflow: hidden;
	`} */}
`

export const SidebarSemanticPushableStyled = styled(Sidebar.Pushable)`
	display: initial;
`

//  margin - just to fill empty space
export const MainContainer = styled(Container)`
  margin-top: 2em;
  margin-bottom: 2em;

  &#main-container {
		${media.mdOnly`
			width: 100% !important;
		`}

		${media.smOnly`
		  width: 100% !important;
		`}
	}


	> .grid,
	> * > .grid {
		${'' /* FIXME: uncomment me, if somethind doesnt work properly position: relative;
		width: 100% !important; */}
		min-height: 100%;
	}
`

export const StyledDimmer = styled(Dimmer)`
	z-index: 55!important;
	cursor: pointer;
`
