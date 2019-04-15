import {
  GET_QUESTION,
  QUESTION_LOADING,
  GET_ALL_QUESTIONS,
  ADD_QUESTION,
  DELETE_QUESTION,
  EDIT_QUESTION,
  PICK_QUESTION
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getQuestion = () => dispatch => {
  dispatch(setQuestionLoading());
  axios
    .get("/api/question")
    .then(res => {
      dispatch({
        type: GET_QUESTION,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setQuestionLoading = () => {
  return {
    type: QUESTION_LOADING
  };
};

export const getAllQuestions = () => dispatch => {
  dispatch(setQuestionLoading());
  axios
    .get("/api/question/all")
    .then(res => {
      dispatch({
        type: GET_ALL_QUESTIONS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addQuestion = item => (dispatch, getState) => {
  axios
    .post("/api/question", item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_QUESTION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteQuestions = ids => (dispatch, getState) => {
  axios
    .post(`/api/question/delete`, ids, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_QUESTION
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const editQuestion = question => (dispatch, getState) => {
  axios
    .put(`/api/question/${question._id}`, question, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: EDIT_QUESTION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const pickQuestion = (pickedId, otherId) => dispatch => {
  axios
    .post(`/api/question/pick`, { pickedId, otherId })
    .then(res =>
      dispatch({
        type: PICK_QUESTION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
