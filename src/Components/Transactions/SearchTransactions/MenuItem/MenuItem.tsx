import { BeautifulMentionsMenuItemProps } from "lexical-beautiful-mentions";
import { StyledMenuItem } from "./StyledMenuItem";
import React from "react";


export const MenuItem = React.forwardRef<
HTMLLIElement,
BeautifulMentionsMenuItemProps
>(({ selected, ...props }, ref) => {
return <StyledMenuItem ref={ref} selected={selected} {...props} />;
});