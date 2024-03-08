import styled from "styled-components";

export const StyledSeparator = styled.div`
&::after {
    content: '';
    position: fixed;
    left: 0;
    right: 0;
    z-index: 1;
    height: 1px; /* Adjust thickness as needed */
    background-color: rgb(54,54,54); /* Your pale line color */
    
  }
`