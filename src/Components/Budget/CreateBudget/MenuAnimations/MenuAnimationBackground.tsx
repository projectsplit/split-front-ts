import React from "react";
import { CSSTransition } from "react-transition-group";
import { MenuAnimationBackgroundProps } from "../../../../interfaces";

export default function MenuAnimationBackground({
  menu,
  setMenu,
}: MenuAnimationBackgroundProps) {
  const nodeRef = React.useRef(null);
  return (
    <CSSTransition in={Boolean(menu)} timeout={0} unmountOnExit>
      <div
        style={{
          position: "fixed",
          left: "0px",
          top: "0px",
          height: "100%",
          width: "100%",
          backgroundColor: "black",
          opacity: "0.7",
        }}
        onClick={() => setMenu(null)}
      />
    </CSSTransition>
  );
}
