import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { value: "" },
    };
  }
  render() {
    return (
      <div>
        <input
          className="form-control my3"
          type="text"
          name="search"
          value={this.props.searchValue}
          id="search"
          onChange={(e) => this.props.onChange(e.target.value)}
          placeholder="Search"
        />
      </div>
    );
  }
}

export default Search;
