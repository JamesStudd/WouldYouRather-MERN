import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem } from "reactstrap";
import { connect } from "react-redux";
import { getQuestion } from "./../actions/questionActions";
import PropTypes from "prop-types";

class Question extends Component {
  componentDidMount() {
    this.props.getQuestion();
  }

  static propTypes = {
    getQuestion: PropTypes.func.isRequired
  };

  render() {
    return (
      <Container>
        {this.props.loading ? (
          <p>Loading</p>
        ) : (
          <ListGroup>
            {this.props.options.map(option => (
              <ListGroupItem key={option._id}>{option.scenario}</ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  options: state.question.options,
  loading: state.question.loading
});

export default connect(
  mapStateToProps,
  { getQuestion }
)(Question);
