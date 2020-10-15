import React, { Component } from "react";
import Pagination from "./../common/pagination";
import { paginate } from "./../utils/paginate";
import { getItems, deleteItems } from "../services/itemService";
import { getCategory } from "../services/categoryService";
import List from "./../common/list";
import ItemsTable from "./itemsTable";
import { Link } from "react-router-dom";
import _ from "lodash";
import Search from "./Search";
import { toast } from "react-toastify";
import withLoader from "../components/withLoader";
import CartContext from "./../context/cartContext";

class Items extends Component {
  static contextType = CartContext;
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      category: [],
      currentPage: 1,
      itemsPerPage: 4,
      cartItems: [],
      sortColumn: { fieldname: "title", order: "asc" },
      searchValue: "",
      selectedCategory: "",
      selectedQuantityCount: "",
    };
  }

  async componentDidMount() {
    this.props.onshowLoader();
    const { data } = await getCategory();
    //console.log(data,"data")
    const category = [{ _id: "", name: "All Items" }, ...data];
    const { data: items } = await getItems();
    this.props.onhideLoader();
    this.setState({ items, category: category });
  }

  onHandlePageClick = (page) => {
    //console.log(page);
    this.setState({ currentPage: page });
  };

  handleDelete = async (item) => {
    const orgiginalItems = this.state.items;
    const items = orgiginalItems.filter((temp) => temp._id !== item._id);
    this.setState({ items });

    try {
      await deleteItems(item._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This item is already deleted");
      }
      this.setState({ items: orgiginalItems });
    }
  };

  handleAddToCart = (item) => {
    //debugger;
    let alreadyExists = false;
    //console.log(this.state.selectedQuantityCount);
    const cartItems = this.context.cartItems;
    //debugger;
    cartItems.forEach((x, i) => {
      if (x._id === item._id) {
        if (x.quantitycount)
          x.quantitycount = x.quantitycount + item.quantitycount;
        alreadyExists = true;
      }
    });
    if (!alreadyExists) {
      cartItems.push({ ...item });
    }

    this.setState({ cartItems });
    toast("Item Added to Cart");
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  handletoggleLike = (item) => {
    const items = [...this.state.items];
    const index = items.indexOf(item);
    items[index] = { ...items[index] };
    items[index].liked = !items[index].liked;
    this.setState({ items });
    //console.log(items[index]);
  };

  onListItemFilter = (itemselected) => {
    //console.log(itemselected);
    this.setState({
      selectedItem: itemselected,
      searchValue: "",
      currentPage: 1,
    });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      currentPage,
      itemsPerPage,
      items: allItems,
      selectedItem,
      sortColumn,
      searchValue,
    } = this.state;

    let filterItems = allItems;
    if (searchValue) {
      filterItems = allItems.filter((itemData) =>
        itemData.title.toLowerCase().startsWith(searchValue.toLowerCase())
      );
    } else if (selectedItem && selectedItem._id) {
      filterItems = allItems.filter(
        (itemData) => itemData.category._id === selectedItem._id
      );
    }

    const sorted = _.orderBy(
      filterItems,
      [sortColumn.fieldname],
      [sortColumn.order]
    );
    const items = paginate(sorted, itemsPerPage, currentPage);

    return { totalCountFiltered: filterItems.length, data: items };
  };

  handleSearch = (query) => {
    const searchValue = query;
    this.setState({
      searchValue: searchValue,
      selectedItem: null,
      currentPage: 1,
    });
  };

  handleSelectChange = ({ currentTarget: input }, item) => {
    let selectedQuantityCount = parseInt(input.value, 10);
    //console.log(selectedQuantityCount, "xxxxx");
    let items = [...this.state.items];
    const index = items.indexOf(item);
    items[index] = { ...items[index] };
    items[index].quantitycount = selectedQuantityCount;
    // debugger;
    this.setState({ items });
  };

  render() {
    const { length: count } = this.state.items;
    const { currentPage, itemsPerPage, sortColumn, searchValue } = this.state;
    const { user } = this.props;
    const { totalCountFiltered, data: items } = this.getPageData();

    if (this.state.items.length === 0)
      return <p>There are no items in the Database</p>;

    return (
      <CartContext.Consumer>
        {(cartcontext) => (
          <div className="row">
            <div className="col-4">
              <List
                handleListItem={this.onListItemFilter}
                selectedItem={this.state.selectedItem}
                categoryItems={this.state.category}
              />
            </div>
            <div className="col">
              {user && (
                <Link to="items/new" style={{ marginBottom: "20px" }}>
                  <button className="btn btn-primary">New Item</button>
                </Link>
              )}
              <p> Showing {totalCountFiltered} items in the Database</p>
              <Search onChange={this.handleSearch} value={searchValue} />
              <ItemsTable
                items={items}
                selectedQuantityCount={this.selectedQuantityCount}
                onSelectChange={this.handleSelectChange}
                onAddtoCart={this.handleAddToCart}
                onDelete={this.handleDelete}
                onLike={this.handletoggleLike}
                totalcartItems={this.state.cartItems.length}
                onSort={this.handleSort}
                sortColumn={sortColumn}
              />
              <div style={{ display: "inline-block", textAlign: "center" }}>
                {this.props.loader}
              </div>
              <Pagination
                totalItems={totalCountFiltered}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                handlePageClick={this.onHandlePageClick}
              />
            </div>
          </div>
        )}
      </CartContext.Consumer>
    );
  }
}

export default withLoader(Items);
