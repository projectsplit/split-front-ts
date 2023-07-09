import styled from 'styled-components'

export const StyledColoredLabel = styled.div`

  font-weight: 600;
  color: ${props => props.color};
  
  /* border-radius: 6px;
  padding: 2px 6px;
  border-style: solid;
  border-width: 1px;
  border-color: ${props => props.color};
  background-color: ${({ theme }) => theme.colors.body}; */
`
