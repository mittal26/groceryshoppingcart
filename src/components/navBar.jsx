import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import CartContext from "../context/cartContext";

const NavBar = ({ user }) => {
  const cartContext = useContext(CartContext);
  //console.log(cartContext.cartItems, cartContext, "Navbar");
  const totalItems = cartContext.cartItems ? cartContext.cartItems.length : [];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link " to="/items">
            Grocery Shopping{" "}
            {
              <span className="badge badge-pill  badge-secondary">
                {totalItems}
              </span>
            }
          </NavLink>
          {
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/payments">
                Payment
              </NavLink>
              <NavLink className="nav-item nav-link" to="/checkout/1">
                Checkout
              </NavLink>
            </React.Fragment>
          }
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/profile">
                {user.name}
              </NavLink>
              <NavLink className="nav-item nav-link" to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
