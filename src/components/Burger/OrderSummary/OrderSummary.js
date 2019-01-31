import React, { Component } from "react";
import Button from "../../../UI/Button/Button";

class OrderSummary extends Component {
  componentWillUpdate() {
    console.log("ORDERSUMMARY willUpdate");
  }

  render() {
    const fillingSummary = Object.keys(this.props.fillings).map(flKey => {
      return (
        <li key={flKey}>
          <span style={{ textTransform: "capitalize" }}>{flKey}:</span>{" "}
          {this.props.fillings[flKey]}
        </li>
      );
    });
    return (
      <React.Fragment>
        <h3>Your Order</h3>
        <p>A delivious burger with the followng fillings:</p>
        <ul>{fillingSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancel}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinue}>
          CONTINUE
        </Button>
      </React.Fragment>
    );
  }
}
export default OrderSummary;
