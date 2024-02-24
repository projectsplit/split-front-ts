import styled from "styled-components"
import { theme } from "../../../constants/theme"


export const StyledExpese = styled.div`
position: relative;
  display: flex;
  flex-direction: column;
  padding: 1rem 0.8rem;
  border-radius: 10px;
  gap:6px;
  background-color: ${({ theme }) => theme.colors.layer2};
  border-color: ${({ theme }) => theme.colors.layer2};
  border-style: solid;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out; /* Add transition for background-color */
  border: none;
  &:hover {
    background-color: ${theme.colors.layer2}; /* Change background-color on hover */
  }

.dateLocationAndCommentsStripe{
  display:flex;
  flex-direction: row;
  font-size: 12px;
  font-weight: 600;
.date{
  font-size: 12px;
  font-weight: 600;
  color: #777777;
  }
.time{
  font-size: 12px;
  font-weight: 600;
  color: #777777;
  }
}

.descrAndTotalStripe{
  display:flex ;
  flex-direction: row;
  justify-content: space-between;
  gap:10px;
  align-items: center;
  .description{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 18px;
    font-weight: 400;
    color: #dddddd;
    font-style: italic;
  }
  .totalAndAmount{
    display: flex;
    flex-direction: row;
    font-size: 15px;
    font-weight: 600;
    font-style: italic;
    gap:6px;
    .total,.amount{
      color: #777777;
    }
  }
}
.labelsAndPersonalInfoStripe{
    display:flex ;
    flex-direction: row;
    justify-content: space-between;
    .labels{
      display: flex;
      flex-direction:row;
      overflow: auto;
      gap:5px;
    }
    .personalInfo{
      display: flex;
      flex-direction: row;
    white-space: nowrap;
      gap:6px;
      font-size: 15px;
      font-weight: 600;
      font-style: italic;
      .personalQuote{ color: #777777;}
    }
  }
`
