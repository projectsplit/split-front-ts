import { BeautifulMentionsMenuProps } from "lexical-beautiful-mentions";
import React from "react";
import { StyledMenu } from "./Menu.styled";
import { CombinedMenuProps } from "../../../../interfaces";


export const Menu = React.forwardRef<any, CombinedMenuProps>(
  ({ open, ...other }, ref) => {
    return (
        <StyledMenu ref={ref} {...other} />
    );
  }
);
