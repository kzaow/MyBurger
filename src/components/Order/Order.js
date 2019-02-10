import React from "react";
import "./Order.css";

const order = props => {
  const fillings = [];

  for (let fillingName in props.fillings) {
    fillings.push({ name: fillingName, amount: props.fillings[fillingName] });
  }

  const fillingOutput = fillings.map(ig => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px"
        }}
        key={ig.name}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });

  return (
    <div className="Order">
      <p>Ingredients: {fillingOutput} </p>
      <p>
        Price: <strong>USD {props.price}</strong>
      </p>
    </div>
  );
};

export default order;
