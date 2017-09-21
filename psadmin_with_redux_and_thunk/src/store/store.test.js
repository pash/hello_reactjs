// this is a unit test to test action -> store -> reducer flow

import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';

describe('Store', function() {
  it('Should handle creating courses', function() {
    // arrange
    const store = createStore(rootReducer, initialState); // similar to app entry point setup
    const course = {
      title: "Clean Code"
    };

    // act
    const action = courseActions.createCourseSuccess(course);
    store.dispatch(action);
    // you can add more dispatch calls here

    // assert
    const actual = store.getState().courses[0];
    const expected = {
      title: "Clean Code"
    };
    expect(actual).toEqual(expected);
  });
});
