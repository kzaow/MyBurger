import React, { Component } from "react";
import Button from "../../../UI/Button/Button";
import "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../UI/Spinner/Spinner";
import Input from "../../../UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: ""
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Address"
        },
        value: ""
      },
      zipcode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Zipcode"
        },
        value: ""
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country"
        },
        value: ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: ""
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: ""
      }
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.fillings,
      price: this.props.price
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  onChangedHandler = (event, inputIdentifer) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifer] };
    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifer] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={event => this.onChangedHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className="ContactData">
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}
export default ContactData;
