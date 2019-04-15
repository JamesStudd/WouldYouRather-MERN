import React, { Component } from "react";
import { Container, Spinner, Row, Col } from "reactstrap";
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

  onSelectOption = pickedId => {
    let otherId = this.props.options[0]._id;
    if (this.props.options[0]._id === pickedId)
      otherId = this.props.options[1]._id;

    this.props.pickQuestion(pickedId, otherId);
    this.props.getQuestion();
  };

  render() {
    return (
      <Container style={{ textAlign: "center" }}>
        {this.props.loading ? (
          <Spinner size="sm" color="primary" />
        ) : (
          <Row className={"row align-items-center justify-content-center"}>
            <React.Fragment>
              {this.props.options.map((option, index) => (
                <Col
                  className={"col-6 option"}
                  key={option._id}
                  id={index === 0 ? "leftOption" : "rightOption"}
                  onClick={this.onSelectOption.bind(this, option._id)}
                >
                  {option.scenario}
                </Col>
              ))}
              {this.props.options.map((option, index) => (
                <Col className={"col-6 bottom-text"} key={option._id + index}>
                  Shown {option.timesShown} times, picked {option.timesPicked}{" "}
                  times.
                </Col>
              ))}
            </React.Fragment>
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

//       <ListGroupItem
//         key={option._id}
//         action
//         onClick={this.onSelectOption.bind(this, option._id)}
//         className={"option outside-row"}
//         id={index === 0 ? "leftOption" : "rightOption"}
//       >
//         <strong>{option.scenario}</strong>
//       </ListGroupItem>
