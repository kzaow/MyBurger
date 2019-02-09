import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";


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
      fillings: null,
      totalPrice: 2.0,
      purchasable: false,
      purchasing: false,
      loading: false,
      error: false
    };
  }

  componentDidMount() {
    axios
      .get("https://myburger-fb283.firebaseio.com/ingredients.json")
      .then(response => {
        this.setState({ fillings: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
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
    //alert("You Continue");
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.fillings,
      price: this.state.totalPrice,
      customer: {
        name: "Kevin Zhou",
        address: {
          street: "Fake Street",
          zipcode: "12345",
          country: "US"
        },
        email: "test@test.com"
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
      });
  };

  render() {
    const disableInfo = {
      ...this.state.fillings
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Fillings can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.state.fillings) {
      burger = (
        <React.Fragment>
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
      orderSummary = (
        <OrderSummary
          fillings={this.state.fillings}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
