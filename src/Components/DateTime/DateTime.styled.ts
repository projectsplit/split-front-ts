import styled from 'styled-components'

export const StyledDateTime = styled.div`
  
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  position: relative;
  user-select: none;
  padding: 6px 6px;
  color: ${({ theme }) => theme.color.text2};
  
  .text {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 1em;
  }
`