import { Component } from "react";
import auth from "../services/authService";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    auth.logout();
    window.location = "/";
  }

  render() {
    return null;
  }
}

export default Logout;
