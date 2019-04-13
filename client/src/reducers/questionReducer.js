import {
  GET_QUESTION,
  QUESTION_LOADING,
  GET_ALL_QUESTIONS
} from "./../actions/types";

const initialState = {
  options: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_QUESTION:
      return {
        ...state,
        options: action.payload,
        loading: false
      };
    case QUESTION_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ALL_QUESTIONS:
      return {
        ...state,
        options: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
