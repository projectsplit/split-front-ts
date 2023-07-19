import React from "react";
import { StyledSelectionButton } from "./SelectionButton.styled";
import OptionsContainer from "../../OptionsContainer/OptionsContainer";
import { SelectionButtonProps } from "../../../interfaces";

export default function SelectionButton({
  children,
  name,
  description,
}: SelectionButtonProps) {
  return (
    <StyledSelectionButton>
      <OptionsContainer hasarrow={true}>
        <div className="main">
          {children}
          <div className="confing">
            <div className="name">{name}</div>
            <div className="descr">{description}</div>
          </div>
        </div>
      </OptionsContainer>
    </StyledSelectionButton>
  );
}
