import React from "react";
import { StyledPill } from "./Pill.styled";
import { PillOptions } from "../../interfaces";
import { IoClose } from "react-icons/io5";

export default function Pill({ title, color, closeButton }: PillOptions) {
  return (
    <StyledPill color={color}>
      <div className="titleAndCloseButton">
        <div className="title">{title}</div>
        {closeButton ? (
          <div className="closeSign" onClick={() => console.log("clicked!")}>
            <IoClose />
          </div>
        ) : (
          <></>
        )}
      </div>
    </StyledPill>
  );
}
