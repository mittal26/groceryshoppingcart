import React, { Component } from "react";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.match.params.id === "finalpayment") {
      return (
        <div>This is a demonstration Project,This is final checkout page</div>
      );
    } else if (this.props.match.params.id === "1") {
      return (
        <div>
          This is a demonstration Project,Please add items in your Cart.
        </div>
      );
    }
  }
}

export default Checkout;
