import React, { Component } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Spinner,
  Row,
  Col
} from "reactstrap";
import { connect } from "react-redux";
import { getQuestion, pickQuestion } from "./../actions/questionActions";
import PropTypes from "prop-types";

import "./../styles/Question.scss";

class Question extends Component {
  componentDidMount() {
    this.props.getQuestion();
  }

  static propTypes = {
    getQuestion: PropTypes.func.isRequired,
    pickQuestion: PropTypes.func.isRequired
  };

  onSelectOption = id => {
    this.props.pickQuestion(id);
    this.props.getQuestion();
  };

  render() {
    return (
      <Container style={{ textAlign: "center" }}>
        {this.props.loading ? (
          <Spinner size="sm" color="primary" />
        ) : (
          <Row className={"row align-items-center"}>
            <Col>
              <ListGroup className={"list-group-horizontal"}>
                {this.props.options.map((option, index) => (
                  <ListGroupItem
                    key={option._id}
                    action
                    onClick={this.onSelectOption.bind(this, option._id)}
                    className={"option outside-row"}
                    id={index === 0 ? "leftOption" : "rightOption"}
                  >
                    <strong>{option.scenario}</strong>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Col>
          </Row>
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
  { getQuestion, pickQuestion }
)(Question);
