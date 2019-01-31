import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const FILLING_PRICES = {
  lettuce: 0.5,
  cheese: 1.0,
  meat: 5.0,
  bacon: 1.0
};

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fillings: {
        lettuce: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice: 2.0,
      purchasable: false,
      purchasing: false
    };
  }

  updatePurchaseState(fillings) {
    const sum = Object.keys(fillings)
      .map(fgKey => {
        return fillings[fgKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({
      purchasable: sum > 0
    });
  }

  addFillingHandler = type => {
    const oldCount = this.state.fillings[type];
    const updatedCounted = oldCount + 1;
    const updatedFillings = {
      ...this.state.fillings
    };
    updatedFillings[type] = updatedCounted;
    const priceAddition = FILLING_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      fillings: updatedFillings
    });
    this.updatePurchaseState(updatedFillings);
  };

  removeFillingHandler = type => {
    const oldCount = this.state.fillings[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCounted = oldCount - 1;
    const updatedFillings = {
      ...this.state.fillings
    };
    updatedFillings[type] = updatedCounted;
    const priceDeduction = FILLING_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({
      totalPrice: newPrice,
      fillings: updatedFillings
    });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    alert("You Continue");
  };

  render() {
    const disableInfo = {
      ...this.state.fillings
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            fillings={this.state.fillings}
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burger fillings={this.state.fillings} />
        <BuildControls
          fillingAdded={this.addFillingHandler}
          fillingRemoved={this.removeFillingHandler}
          disabled={disableInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;
