import React from "react";
import TreeAdjustedContainer from "../../Home/TreeAdjustedContainer/TreeAdjustedContainer";
import { StyledActiveGroups } from "./ActiveGroups.styled";
export default function ActiveGroups() {

  const items = [
    <div className="groupsInfo">
      <strong>You</strong> are owed <span className="owed">£56.00</span>
    </div>,
    <div className="groupsInfo">
      <strong>You</strong> owe <span className="owe">$5.65</span>
    </div>,
  ];
  
  return (
    <StyledActiveGroups>
      <div className="groupList">
        <TreeAdjustedContainer
          onClick={() => console.log("goto group")}
          hasArrow={true}
          items={items}
        >
          <div className="groupName">Kythnos</div>
        </TreeAdjustedContainer>
        <TreeAdjustedContainer
          onClick={() => console.log("goto group")}
          hasArrow={true}
          items={items}
        >
          <div className="groupName">Kythnos</div>
        </TreeAdjustedContainer>
        <TreeAdjustedContainer
          onClick={() => console.log("goto group")}
          hasArrow={true}
          items={items}
        >
          <div className="groupName">Kythnos</div>
        </TreeAdjustedContainer>
      </div>
    </StyledActiveGroups>
  );
}
