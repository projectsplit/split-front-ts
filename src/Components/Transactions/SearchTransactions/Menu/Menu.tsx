import { BeautifulMentionsMenuProps } from "lexical-beautiful-mentions";
import React from "react";
import { StyledList } from "./StyledList";

export const Menu = React.forwardRef<any, BeautifulMentionsMenuProps>(
  ({ open, ...other }, ref) => {
    return <StyledList ref={ref} {...other} />;
  }
);
