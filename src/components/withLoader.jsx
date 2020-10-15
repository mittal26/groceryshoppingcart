import React from "react";

function withLoader(Component) {
  return class withLoader extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
      };
    }

    hideLoader = () => {
      this.setState({ loading: false });
    };

    showLoader = () => {
      this.setState({ loading: true });
    };

    render() {
      return (
        <div>
          <div>
            <Component
              loader={
                this.state.loading === true ? (
                  <i class="fa fa-refresh fa-spin fa-2x" aria-hidden="true"></i>
                ) : null
              }
              onhideLoader={this.hideLoader}
              onshowLoader={this.showLoader}
              {...this.props}
            />
          </div>
        </div>
      );
    }
  };
}

export default withLoader;
