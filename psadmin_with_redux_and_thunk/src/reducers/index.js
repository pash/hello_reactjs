import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';

// es6 short hand property names
const rootReducer = combineReducers({
  courses,
  authors
});

export default rootReducer;
