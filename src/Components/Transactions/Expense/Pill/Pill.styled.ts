import styled from "styled-components"
interface StyledPillOptions {
  color: string
}
export const StyledPill = styled.div<StyledPillOptions>`
  font-weight: 400;
  font-size: 15px;
  background-color: #131519c9;
  -webkit-tap-highlight-color: transparent;

  display: flex;
  flex-direction: row;
  align-items: center;

  border-style: solid;
  border-width: 1px;
  border-radius: 6px;
  padding: 1px 8px;
  gap: 3px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.50) 0px 4px 4px;
  color:${props => props.color};
  `