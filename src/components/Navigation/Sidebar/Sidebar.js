import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../Logo/Logo";
import "./Sidebar.css";
import Backdrop from "../../../UI/Backdrop/Backdrop";

const sidebar = props => {
  let attached = ["Sidebar", "Close"];
  if (props.open) {
    attached = ["Sidebar", "Open"];
  }
  return (
    <React.Fragment>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attached.join(" ")}>
        <Logo height="11%" marginbottom="32px" />
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default sidebar;
