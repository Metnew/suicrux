import styled from 'styled-components'

export const TextCenter = styled.div`text-align: center;`

export const Hidden = elem => {
	return styled(elem)`
    display: none;
  `
}

export const Spacer = styled.span`flex-grow: 1;`
