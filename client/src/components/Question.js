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
        {this.props.question.options ? (
          <ListGroup>
            {this.props.question.options.map((option, index) => (
              <ListGroupItem key={index}>{option}</ListGroupItem>
            ))}
          </ListGroup>
        ) : (
          <p>Loading</p>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  question: state.question.question
});

export default connect(
  mapStateToProps,
  { getQuestion }
)(Question);
