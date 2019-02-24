import React, { Component } from "react";
import { connect } from "react-redux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      purchasing: false,
      loading: false,
      error: false
    };
  }

  componentDidMount() {
    // axios
    //   .get("https://myburger-fb283.firebaseio.com/ingredients.json")
    //   .then(response => {
    //     this.setState({ fillings: response.data });
    //   })
    //   .catch(error => {
    //     this.setState({ error: true });
    //   });
  }

  updatePurchaseState(fillings) {
    const sum = Object.keys(fillings)
      .map(fgKey => {
        return fillings[fgKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    const disableInfo = {
      ...this.props.fills
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

    if (this.props.fills) {
      burger = (
        <React.Fragment>
          <Burger fillings={this.props.fills} />
          <BuildControls
            fillingAdded={this.props.onFillingAdded}
            fillingRemoved={this.props.onFillingRemoved}
            disabled={disableInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.fills)}
            ordered={this.purchaseHandler}
          />
        </React.Fragment>
      );
      orderSummary = (
        <OrderSummary
          fillings={this.props.fills}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          price={this.props.price}
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

const mapStateToProps = state => {
  return {
    fills: state.fillings,
    price: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFillingAdded: fillName =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: fillName
      }),
    onFillingRemoved: fillName =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: fillName
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
