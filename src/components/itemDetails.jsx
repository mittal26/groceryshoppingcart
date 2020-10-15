import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import { getCategory } from "../services/categoryService";
import { getItem, saveItem } from "./../services/itemService";

class ItemDetails extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        title: "",
        categoryId: "",
        price: "",
        quantity: "",
      },
      errors: {},
      category: [],
    };
  }

  async populateCategory() {
    const { data: category } = await getCategory();
    this.setState({ category: category });
  }

  async populateItem() {
    try {
      const itemId = this.props.match.params.id;
      if (itemId === "new") return;
      const { data: item } = await getItem(itemId);
      this.setState({ data: this.mapToViewModel(item) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

  async componentDidMount() {
    await this.populateCategory();
    await this.populateItem();
  }

  mapToViewModel = (item) => {
    return {
      _id: item._id,
      title: item.title,
      categoryId: item.category._id,
      price: item.price,
      quantity: item.quantity,
    };
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    categoryId: Joi.string().required().label("Category"),
    price: Joi.number().required().min(0).max(1000000).label("Price"),
    quantity: Joi.number().required().min(1).max(10).label("Quantity"),
  };

  doSubmit = async () => {
    //Call Server
    //console.log("Submitted");
    //console.log(this.state.data);
    await saveItem(this.state.data);
    this.props.history.push("/items");
  };

  render() {
    return (
      <React.Fragment>
        <h1>Movie Form</h1>
        <form action="" onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("categoryId", "Category", this.state.category)}
          {this.renderInput("price", "Price")}
          {this.renderInput("quantity", "Quantity")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default ItemDetails;
