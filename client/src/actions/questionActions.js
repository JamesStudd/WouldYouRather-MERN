import { GET_QUESTION, QUESTION_LOADING } from "./types";
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
