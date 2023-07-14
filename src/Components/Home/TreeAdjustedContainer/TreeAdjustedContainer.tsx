import React from "react";
import { StyledTreeAdjustedContainer } from "./TreeAdjustedContainer.styled";
import { OptionsContainerProps } from "../../../interfaces";
import Tree from "../../Tree/Tree";
import OptionsContainer from "../../OptionsContainer/OptionsContainer";
import IonIcon from "@reacticons/ionicons";

export default function TreeAdjustedContainer({
  children,
  onClick,
  hasArrow,
}: OptionsContainerProps) {

  const hasTreeComponent = React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && child.type === Tree
  );

  if (!hasTreeComponent) {
    return <OptionsContainer onClick={onClick} hasArrow={hasArrow}>
      {children}
      {hasArrow && <IonIcon name="chevron-forward-outline" className="arrow" />}
      </OptionsContainer>;
  }
  return (
    <StyledTreeAdjustedContainer onClick={onClick} hasArrow={hasArrow}>
      {children}
      {hasArrow && <IonIcon name="chevron-forward-outline" className="arrow" />}
    </StyledTreeAdjustedContainer>
  );
}
