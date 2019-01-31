import React from "react";
import "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import BarToggle from "../Sidebar/BarToggle/BarToggle";

const toolbar = props => (
  <header className="Toolbar">
    <BarToggle clicked={props.barToggleClicked} />
    <Logo height="80%" />
    <nav className="DesktopOnly">
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
