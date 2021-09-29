import { FETCH_SEARCH_RESULTS_SUCCESS } from '../actions/actionTypes';

const initialsearchState = {
  results: [],
};

export default function search(state = initialsearchState, action) {
  switch (action.type) {
    case FETCH_SEARCH_RESULTS_SUCCESS:
      return {
        ...state,
        results: action.users,
      };
    default:
      return state;
  }
}
