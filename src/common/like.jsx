import React, { Component } from "react";

class Like extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let classes = "fa fa-heart";
    if (!this.props.liked) classes += "-o";
    return (
      <i
        style={{ cursor: "pointer" }}
        onClick={this.props.onLike}
        className={classes}
        aria-hidden="true"
      ></i>
    );
  }
}

export default Like;
