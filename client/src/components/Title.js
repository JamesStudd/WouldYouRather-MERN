import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "./../actions/authActions";
import PropTypes from "prop-types";
import { Button } from "reactstrap";

class Title extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    logout: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className={"jumbotron "}>
        {this.props.isAuthenticated && (
          <Button onClick={this.props.logout}>Logout</Button>
        )}
        <h1 style={{ textAlign: "center" }} className={"display-4"}>
          Would You Rather
        </h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { logout }
)(Title);
