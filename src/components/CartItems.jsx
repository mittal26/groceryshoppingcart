import React, { Component } from "react";

class CartItems extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { cartItems } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div>Cart is Empty</div>
        ) : (
          <div>You have {cartItems.length} Item in Cart </div>
        )}
      </div>
    );
  }
}

export default CartItems;
