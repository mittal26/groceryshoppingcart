import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        {
          _id: 1,
          quantitycount: 1,
        },
        {
          _id: 2,
          quantitycount: 2,
        },
        {
          _id: 3,
          quantitycount: 3,
        },
        {
          _id: 4,
          quantitycount: 4,
        },
        {
          _id: 5,
          quantitycount: 5,
        },
        {
          _id: 6,
          quantitycount: 6,
        },
        {
          _id: 7,
          quantitycount: 7,
        },
        {
          _id: 8,
          quantitycount: 8,
        },
        {
          _id: 9,
          quantitycount: 9,
        },
        {
          _id: 10,
          quantitycount: 10,
        },
      ],
    };
  }

  render() {
    //console.log(this.props, "ddddddd");
    const { options } = this.state;
    return (
      <div>
        <select
          onChange={this.props.onSelectChange}
          name="quantitycount"
          id="quantitycount"
          className="form-control"
          value={this.props.quantitycount}
        >
          {options.map((option) => (
            <option key={option._id} value={option.quantitycount}>
              {option.quantitycount}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default Counter;
