import styled from "styled-components"

export const StyledList = styled.ul`
margin: 0;
min-width: 18rem;
overflow: hidden;
padding: 0.25rem;
scrollbar-width: none;
position: fixed; /* Add fixed position */
top: 20%; /* Adjust as necessary */
left: 50%; /* Adjust as necessary */
transform: translateX(-50%); /* Center horizontally */
background-color: white; /* Add background color */
z-index: 1000; /* Ensure it is above other elements */
border: 1px solid #ccc; /* Optional border for visibility */
border-radius: 0.375rem; /* Rounded corners */
box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;