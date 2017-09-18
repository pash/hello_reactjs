import React, { PropTypes } from 'react';
import { connect } from 'react-redux'; // the connect function is what we use to create components that react with redux and is usually callled container components
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    // for the form
    this.state = {
      course: { title: "" }
    };

    // here or in the render, but that's a performance hit because everytime you do a bind and render causes a new function to be created
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  onTitleChange(event) {
    const course = this.state.course;
    course.title = event.target.value;
    this.setState({ course: course });
  }

  onClickSave() {
    // more verbose way to dispatch
    // this.props.dispatch(courseActions.createCourse(this.state.course));

    // this.props.createCourse(this.state.course);
    // or
    // use bindActionCreators pattern
    this.props.actions.createCourse(this.state.course);
  }

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>
        {this.props.courses.map(this.courseRow)}
        <h2>Add Course</h2>
        <input
          type="TextInput"
          onChange={this.onTitleChange}
          value={this.state.course.title} />
        <input
          type="submit"
          value="Save"
          onClick={this.onClickSave} />
      </div>
    );
  }
}

CoursesPage.propTypes = {
  // We don't need this now that we've defined mapDispatchToProps.
  // dispatch: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  // createCourse: PropTypes.func.isRequired,
  // or
  // use bindActionCreators pattern
  actions: PropTypes.object.isRequired
};

// this exposes state to the component (this.props.courses)
function mapStateToProps(state, ownProps) {
  return {
    // check the name we used in the rootReducer
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // createCourse: course => dispatch(courseActions.createCourse(course))
    // or
    // use bindActionCreators pattern
    actions: bindActionCreators(courseActions, dispatch)
  };
}

// 2 function style: connect returns a function and that function calls our container component
// alternative is:
// const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
// export default connectedStateAndProps(CoursesPage)
// export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
//
// Since we just want to dispatch immediately from props, we can omit the 2nd parameter and connect will get a dispatch property attached to it.
// export default connect(mapStateToProps)(CoursesPage);
//
// Another version with it
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
