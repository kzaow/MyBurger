import React from "react";
import "./Burger.css";
import BurgerFillings from "./BurgerFillings/BurgerFillings";
import { withRouter } from "react-router-dom";

const burger = props => {
  let transformedFillings = Object.keys(props.fillings)
    .map(fillKey => {
      return [...Array(props.fillings[fillKey])].map((_, i) => {
        return <BurgerFillings key={fillKey + i} type={fillKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []); // [] is the initial value, empty array

  if (transformedFillings.length === 0) {
    transformedFillings = <p>Please start adding fillings</p>;
  }

  return (
    <div className="Burger">
      <BurgerFillings type="bread-top" />
      {transformedFillings}
      <BurgerFillings type="bread-bottom" />
    </div>
  );
};

export default withRouter(burger);
