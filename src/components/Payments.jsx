import React, { Component } from "react";
import CartContext from "../context/cartContext";
import { Link } from "react-router-dom";
import formatCurrency from "./../utils/formatCurrency";

class Payments extends Component {
  static contextType = CartContext;

  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
    };
  }

  onDelete = (item) => {
    const orgiginalItems = this.context.cartItems;
    let cartItems = orgiginalItems.filter((temp) => temp._id !== item._id);
    //console.log(cartItems, "dsfdsfsdf");
    this.context.oncartRemoveItems(cartItems);
    this.context.onCartUpdate();
  };

  totalPrice = () => {
    const cartItems = this.context.cartItems;
    return formatCurrency(
      cartItems.reduce((a, c) => a + c.price * c.quantitycount, 0)
    );
  };

  render() {
    //console.log(this.context);
    return (
      <CartContext.Consumer>
        {(cartContext) =>
          cartContext.cartItems.length !== 0 ? (
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity Count</th>
                    <th scope="col">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartContext.cartItems.map((item, i) => (
                    <tr key={item._id}>
                      <td>{i + 1}</td>
                      <td>{item.title}</td>
                      <td>{item.price}</td>
                      <td>{item.quantitycount}</td>
                      <td>
                        <button
                          onClick={() => this.onDelete(item)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Link
                to="checkout/finalpayment"
                className="btn btn-warning"
                style={{ float: "right", marginTop: "57px" }}
              >
                Checkout
              </Link>
              <div
                style={{
                  float: "right",
                  marginTop: "60px",
                  marginRight: "39px",
                }}
              >
                <h4>Total Price: {this.totalPrice()}</h4>
              </div>
            </div>
          ) : (
            <div>
              <h3>No Items in Cart</h3>
            </div>
          )
        }
      </CartContext.Consumer>
    );
  }
}

export default Payments;
