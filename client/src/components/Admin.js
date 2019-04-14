import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllQuestions,
  addQuestion,
  deleteQuestions,
  editQuestion
} from "./../actions/questionActions";
import { loadUser } from "./../actions/authActions";
import PropTypes from "prop-types";
import { Spinner } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import moment from "moment";

import("react-bootstrap-table/dist/react-bootstrap-table.min.js");
import("react-bootstrap-table/dist/react-bootstrap-table-all.min.css");

class Admin extends Component {
  componentDidMount() {
    this.props.loadUser();
    if (this.props.isAuthenticated) {
      this.props.getAllQuestions();
    }

    this.options = {
      afterInsertRow: this.addRow,
      afterDeleteRow: this.deleteRow
    };
  }

  componentDidUpdate() {
    if (this.props.isAuthenticated && this.props.options.length === 0) {
      this.props.getAllQuestions();
    }
  }

  static propTypes = {
    getAllQuestions: PropTypes.func.isRequired,
    addQuestion: PropTypes.func.isRequired,
    deleteQuestion: PropTypes.func.isRequired,
    editQuestion: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    loadUser: PropTypes.func.isRequired
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

  deleteRow = (rowKeys, rows) => {
    const ids = rows.map(a => a._id);
    this.props.deleteQuestion(ids);
    this.props.getAllQuestions();
  };

  editRow = (row, cellName, cellValue) => {
    this.props.editQuestion(row);
  };

  customKeyField = (column, attr, editorClass, ignoreEditable) => {
    const seqId = 5;
    return (
      <input
        type="text"
        {...attr}
        disabled
        value={seqId}
        className={`${editorClass}`}
        key={5}
      />
    );
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          this.props.loading ? (
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
              selectRow={{ mode: "checkbox" }}
              cellEdit={{
                mode: "click",
                blurToSave: true,
                afterSaveCell: this.editRow
              }}
            >
              <TableHeaderColumn
                dataField="_id"
                isKey={true}
                hidden={true}
                customInsertEditor={{ getElement: this.customKeyField }}
              >
                ID
              </TableHeaderColumn>

              <TableHeaderColumn
                dataField="scenario"
                searchable={true}
                tdStyle={{ whiteSpace: "normal" }}
              >
                Scenario
              </TableHeaderColumn>

              <TableHeaderColumn
                dataField="theme"
                dataSort
                width="12%"
                dataFormat={(cell, row) => {
                  return (
                    cell.charAt(0).toUpperCase() + cell.slice(1).toLowerCase()
                  );
                }}
              >
                Theme
              </TableHeaderColumn>

              <TableHeaderColumn
                dataField="dateCreated"
                dataSort
                hiddenOnInsert
                width="15%"
                dataFormat={(cell, row) => {
                  return moment(cell).format("MMM Do YYYY");
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
          )
        ) : (
          <h1>You must login to view this page.</h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  options: state.question.options,
  loading: state.question.loading,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  {
    getAllQuestions,
    addQuestion,
    deleteQuestion: deleteQuestions,
    editQuestion,
    loadUser
  }
)(Admin);
