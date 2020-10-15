import React, { Component } from "react";
import Counter from "../components/Counter";
import Cart from "../components/Cart";
import Like from "../common/like";
import Table from "../common/table";
import { Link } from "react-router-dom";
import auth from "../services/authService";

class ItemsTable extends Component {
  columns = [
    {
      fieldname: "title",
      lable: "Title",
      content: (item) => <Link to={"items/" + item._id}>{item.title}</Link>,
    },
    { fieldname: "category.name", lable: "Category" },
    { fieldname: "price", lable: "Price" },
    { fieldname: "quantity", lable: "Quantity" },
    {
      key: "like",
      content: (item) => (
        <Like onLike={() => this.props.onLike(item)} liked={item.liked} />
      ),
    },
    {
      key: "add",
      content: (item) => (
        <Counter
          quantitycount={item.quantitycount}
          selectedQuantityCount={this.props.selectedQuantityCount}
          onSelectChange={(event) => this.props.onSelectChange(event, item)}
        />
      ),
    },
    {
      key: "cart",
      content: (item) => (
        <Cart
          quantitycount={item.quantitycount}
          selectedQuantityCount={this.props.selectedQuantityCount}
          onAddtoCart={() => this.props.onAddtoCart(item)}
          totalcartItems={this.props.totalcartItems}
        />
      ),
    },
  ];

  deleteColumn = {
    key: "delete",
    content: (item) => (
      <button
        onClick={() => this.props.onDelete(item)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const {
      items,
      onDelete,
      onLike,
      onAddtoCart,
      onSelectChange,
      totalcartItems,
      sortColumn,
      onSort,
    } = this.props;
    return (
      <Table
        items={items}
        onDelete={onDelete}
        onAddtoCart={onAddtoCart}
        sortColumn={sortColumn}
        onSelectChange={onSelectChange}
        totalcartItems={totalcartItems}
        onLike={onLike}
        onSort={onSort}
        columns={this.columns}
      />
    );
  }
}

export default ItemsTable;
