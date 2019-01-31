import React, { Component } from "react";
import "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Sidebar from "../Navigation/Sidebar/Sidebar";

class Layout extends Component {
  state = {
    showSideBar: false
  };

  sideBarCloseHandler = () => {
    this.setState({ showSideBar: false });
  };

  sideBarToggleHandler = () => {
    this.setState(prevState => {
      return { showSideBar: !prevState.showSideBar };
    });
  };

  render() {
    return (
      <React.Fragment>
        <Toolbar barToggleClicked={this.sideBarToggleHandler} />
        <Sidebar
          open={this.state.showSideBar}
          closed={this.sideBarCloseHandler}
        />
        <main className="Content">{this.props.children}</main>
      </React.Fragment>
    );
  }
}

export default Layout;
