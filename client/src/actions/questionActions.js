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

export const getQuestion = () => dispatch => {
  dispatch(setQuestionLoading());
  axios.get("/api/question").then(res => {
    dispatch({
      type: GET_QUESTION,
      payload: res.data
    });
  });
};

export const setQuestionLoading = () => {
  return {
    type: QUESTION_LOADING
  };
};

export const getAllQuestions = () => dispatch => {
  dispatch(setQuestionLoading());
  axios.get("/api/question/all").then(res => {
    dispatch({
      type: GET_ALL_QUESTIONS,
      payload: res.data
    });
  });
};

export const addQuestion = item => dispatch => {
  axios.post("/api/question", item).then(res =>
    dispatch({
      type: ADD_QUESTION,
      payload: res.data
    })
  );
};

export const deleteQuestion = id => dispatch => {
  axios.delete(`/api/question/${id}`).then(res =>
    dispatch({
      type: DELETE_QUESTION,
      payload: id
    })
  );
};

export const editQuestion = question => dispatch => {
  axios.put(`/api/question/${question._id}`, question).then(res =>
    dispatch({
      type: EDIT_QUESTION,
      payload: res.data
    })
  );
};

export const pickQuestion = id => dispatch => {
  axios.post(`/api/question/pick/${id}`, id).then(res =>
    dispatch({
      type: PICK_QUESTION,
      payload: res.data
    })
  );
};
