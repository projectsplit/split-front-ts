import Select from 'react-select'
import styled from 'styled-components'

export const StyledSelect = styled(Select)`

  font-size: 20px;

  /* .Select__multi-value {
    flex-shrink: 0;
    display: inline-flex;
  }

  .Select__value-container {
    overflow: auto;
    display: flex;
    flex-wrap: nowrap;
  } */
    
  .Select__control {
    /* height: 40px; */
    overflow: hidden;
    width: 100%;
    border: 1px solid #a1a1a1;
    border-radius: 10px;
    cursor: pointer;
  }

  .Select__control:hover {
    border-color: #a1a1a1;
  }

  .Select__control--is-focused {
    box-shadow: 0 0 0 1px black;
    outline: none;
  }

  .Select__indicator-separator {
  }

  .Select__menu {
  }
`