import React, { PropTypes } from 'react';
import { connect } from 'react-redux'; // the connect function is what we use to create components that react with redux and is usually callled container components
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import {authorsFormmattedForDropdown} from '../../selectors/selectors';
import toastr from 'toastr';

export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    // We only need course in state because that's what's being changed in the form!
    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false
    };

    // so we can use this in the method
    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  // This function may run sometimes even if props haven't changed.
  // That's because sometimes React can't tell for sure if props has changed so it runs this function for safety.
  // Hence, the need for that check!
  componentWillReceiveProps(nextProps) {
    if (this.props.course.id != nextProps.course.id) {
      // necessary to populate form when existing course is loaded directly
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    // let course = this.state.course;
    // or below to avoid mutating state!
    let course = Object.assign({}, this.state.course);
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  saveCourse(event) {
    event.preventDefault();

    // front end validation
    if(!this.courseFormIsValid()) {
      return;
    }

    this.setState({saving: true});
    this.props.actions.saveCourse(this.state.course)
      .then((() => this.redirect()))
      .catch(error => {
        // server side validation
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Course saved');
    this.context.router.push('/courses');
  }

  render() {
    return (
      <CourseForm
        allAuthors={this.props.authors}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        course={this.state.course}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id == id);
  if (course) return course[0]; // since filter returns an array; have to grab the first
  return null;
}

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.params.id; // from the path `/course/:id`

  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

  // on refresh
  // - courses is blank because ajax hasn't completed yet so we need this check to avoid errors
  // - state.courses is set in index.js (I think)
  // but it's still not populating form because when the constructor is called, state.course is set through props which is nil
  // to fix, we need componentWillReceiveProps so that it updates props once the ajax call is completed (to map state to props?)
  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  return {
    course: course,
    authors: authorsFormmattedForDropdown(state.authors)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
