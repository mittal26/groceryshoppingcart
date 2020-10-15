import React, { Component } from 'react';
import Items from './components/Items';
import NavBar from './components/navBar';
import Payments from './components/Payments';
import Checkout from './components/Checkout';
import NotFound from './components/NotFound';
import ItemDetails from './components/itemDetails';
import { Route, Switch, Redirect } from "react-router-dom";
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logout from './components/logout';
import auth from "./services/authService";
import ProtectedRoute from './common/protectedRoute';
import CartContext from './context/cartContext';
import profile from './components/profile';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cartItems: []
    };
  }

  getCartItems = () => {
    //console.log("herererererrere")
    let cartItems = [...this.state.cartItems];
    cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    this.setState({ cartItems: cartItems })
  }

  updateCartItems = (items) => {
    //console.log("here23222222")
    let cartItems = [...items];
    cartItems = localStorage.setItem("cartItems", JSON.stringify(cartItems));
    this.setState({ cartItems: cartItems })
  }

  componentDidMount() {
    try {
      //console.log("App-Mounted")
      const user = auth.getCurrentUser()
      // const storedItem = JSON.parse(localStorage.getItem("cartItems"));
      // const cartItems = storedItem ? storedItem : [];
      this.getCartItems();
      this.setState({ user })
    } catch (error) {

    }
  }



  render() {
    //console.log("App-Mounted life cycle")
    const { user, cartItems } = this.state;
    return (
      <div>
        <CartContext.Provider value={{ cartItems, onCartUpdate: this.getCartItems, oncartRemoveItems: this.updateCartItems }}>
          <main role="main" className="flex-shrink-0">
            <div className="container">
              <NavBar user={user} />
              <ToastContainer />
              <Switch>

                <ProtectedRoute path="/items/:id" component={ItemDetails} />
                <Route path="/checkout/:id" component={Checkout} />
                <Route path="/items" render={(props) => <Items {...props} user={user} />} />
                <Route path="/payments" component={Payments} />
                <Route path="/profile" component={profile} />
                <Route path="/logout" component={Logout} />
                <Route path="/login" component={LoginForm} />
                <Route path="/register" component={RegisterForm} />
                <Route path="/notfound" component={NotFound} />
                <Redirect exact from="/" to="/items" />
                <Redirect to="/notfound" />
              </Switch>
            </div>
          </main>
        </CartContext.Provider>
      </div>
    );
  }
}

export default App;
