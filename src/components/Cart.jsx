import React, { Component } from "react";
import CartContext from "./../context/cartContext";

class Cart extends Component {
  static contextType = CartContext;
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <button
        // disabled={this.props.quantitycount <= 0 ? true : false}
        className="btn btn-primary btn-sm"
        onClick={() => {
          this.props.onAddtoCart();
          this.context.onCartUpdate();
        }}
      >
        AddToCart
      </button>
    );
  }
}

export default Cart;
