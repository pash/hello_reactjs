import {combineReducers} from 'redux';
import courses from './courseReducer';

// es6 short hand property names
const rootReducer = combineReducers({
  courses
});

export default rootReducer;
