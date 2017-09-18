import * as types from '../actions/actionTypes';

export default function courseReducer(state = [], action) {
  switch(action.type) {
    case types.CREATE_COURSE:
      // state is immutable! so we have to honor its immutability
      // ... spread operator which explodes the array returns a new instance of state array
      // object.assign creates a deep copy of action.course
      return [...state, Object.assign({}, action.course)];
    default:
      return state;
  }
}
