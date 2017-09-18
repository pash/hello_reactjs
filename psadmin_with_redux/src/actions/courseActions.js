import * as types from './actionTypes';

// in es6, we can omit the right hand side if it's the same as the left hand side (ex: course: course could be written just course)
export function createCourse(course) {
  return { type: types.CREATE_COURSE, course };
}
