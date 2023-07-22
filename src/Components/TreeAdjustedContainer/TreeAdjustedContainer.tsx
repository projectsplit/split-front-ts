import React from "react";
import { StyledTreeAdjustedContainer } from "./TreeAdjustedContainer.styled";
import { TreeAdjustedContainerProps } from "../../interfaces";
import Tree from "../Tree/Tree";
import OptionsContainer from "../OptionsContainer/OptionsContainer";
import IonIcon from "@reacticons/ionicons";

export default function TreeAdjustedContainer({
  children,
  onClick,
  hasarrow,
  items,

}: TreeAdjustedContainerProps) {
  const hasTreeComponent = items.length > 1 ? true : false;

  if (!hasTreeComponent) {
    return (
      <OptionsContainer onClick={onClick} hasarrow={hasarrow.toString()} >
        {children}
        {hasarrow && (
          <IonIcon name="chevron-forward-outline" className="arrow" />
        )}
        {items}
      </OptionsContainer>
    );
  }
  return (
    <StyledTreeAdjustedContainer onClick={onClick} hasarrow={hasarrow.toString()} >
      {children}
      {hasarrow && <IonIcon name="chevron-forward-outline" className="arrow" />}
      <Tree items={items} />
    </StyledTreeAdjustedContainer>
  );
}
