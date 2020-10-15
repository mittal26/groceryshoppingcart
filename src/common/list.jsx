import React, { Component } from "react";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      textProperty,
      valueProperty,
      categoryItems,
      selectedItem,
      handleListItem,
    } = this.props;
    return (
      <div>
        <ul className="list-group clickable">
          {categoryItems.map((listItem) => (
            <li
              key={listItem[valueProperty]}
              className={
                listItem === selectedItem
                  ? "list-group-item active"
                  : "list-group-item"
              }
              onClick={(e) => handleListItem(listItem)}
            >
              {listItem[textProperty]}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

List.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default List;
