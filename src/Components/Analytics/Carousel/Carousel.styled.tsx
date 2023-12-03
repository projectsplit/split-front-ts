import styled from "styled-components";

export const StyledCarousel = styled.div`
  position: relative;
  overflow: hidden;
  margin: 0;
  width: 100vw;

  .carousel {
    display: flex;
    transition: transform 0.3s ease-in-out;
  }

  .carousel-item {
    flex: 0 0 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .arrow-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
    cursor: pointer;
    z-index: 1;
  }

  .left {
    left: 0px;
  }

  .right {
    right: 0px;
  }
`;
