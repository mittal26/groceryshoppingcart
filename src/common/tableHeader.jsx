import React, { Component } from "react";

class TableHeader extends Component {
  raiseonSort = (fieldname) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.fieldname === fieldname) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.order = "asc";
      sortColumn.fieldname = fieldname;
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.fieldname !== sortColumn.fieldname) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              className="clickable"
              onClick={() => this.raiseonSort(column.fieldname)}
              key={column.fieldname || column.key}
            >
              {column.lable} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
