import styled from "styled-components";

export const StyledMainStripe = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: space-between;
 margin-top: 15px;
 margin-bottom: 50px;
 

.groupName{
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size:25px ;
  gap:8px;
}
 .options{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 14px;
  font-size: 25px;
 }
 
 .addUserButton, .optionsButton {
    cursor: pointer;
  }
`