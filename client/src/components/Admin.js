import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllQuestions,
  addQuestion,
  deleteQuestion,
  editQuestion
} from "./../actions/questionActions";
import PropTypes from "prop-types";
import { Spinner } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import moment from "moment";

import("react-bootstrap-table/dist/react-bootstrap-table.min.js");
import("react-bootstrap-table/dist/react-bootstrap-table.min.css");

class Admin extends Component {
  componentDidMount() {
    this.props.getAllQuestions();
    this.options = {
      afterInsertRow: this.addRow,
      afterDeleteRow: this.deleteRow
    };
  }

  static propTypes = {
    getAllQuestions: PropTypes.func.isRequired,
    addQuestion: PropTypes.func.isRequired,
    deleteQuestion: PropTypes.func.isRequired,
    editQuestion: PropTypes.func.isRequired
  };

  addRow = row => {
    if (row) {
      const newQuestion = {
        options: [
          {
            scenario: row.scenario,
            theme: row.theme
          }
        ]
      };

      this.props.addQuestion(newQuestion);
      this.props.getAllQuestions();
    }
  };

  deleteRow = (rowKeys, row) => {
    this.props.deleteQuestion(row[0]._id);
    this.props.getAllQuestions();
  };

  editRow = (row, cellName, cellValue) => {
    this.props.editQuestion(row);
  };

  render() {
    return (
      <div>
        {this.props.loading ? (
          <Spinner size="sm" color="secondary" />
        ) : (
          <BootstrapTable
            data={this.props.options}
            version="4"
            search={true}
            strictSearch={false}
            insertRow={true}
            options={this.options}
            deleteRow={true}
            selectRow={{ mode: "radio" }}
            cellEdit={{
              mode: "click",
              blurToSave: true,
              afterSaveCell: this.editRow
            }}
          >
            <TableHeaderColumn dataField="_id" isKey={true} hidden={true}>
              ID
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="scenario"
              searchable={true}
              tdStyle={{ whiteSpace: "normal" }}
            >
              Scenario
            </TableHeaderColumn>

            <TableHeaderColumn dataField="theme" dataSort width="12%">
              Theme
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="dateCreated"
              dataSort
              hiddenOnInsert
              width="15%"
              dataFormat={(cell, row) => {
                return moment(cell).format("MMM do YYYY");
              }}
            >
              Created Date
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="timesShown"
              width="10%"
              hiddenOnInsert
            >
              Shown
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="timesPicked"
              width="10%"
              hiddenOnInsert
            >
              Picked
            </TableHeaderColumn>
          </BootstrapTable>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  options: state.question.options,
  loading: state.question.loading
});

export default connect(
  mapStateToProps,
  { getAllQuestions, addQuestion, deleteQuestion, editQuestion }
)(Admin);
