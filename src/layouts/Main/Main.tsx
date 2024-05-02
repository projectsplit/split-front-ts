import React from "react";
import { Outlet } from "react-router-dom";
import { StyledMain } from "./Main.styled";
import MainStripe from "./MainStripe/MainStripe";


export default function Main() {
  return (
    <StyledMain>
      <MainStripe />
      <Outlet />
    </StyledMain>
  );
}
