import React, { PropTypes } from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const CourseForm = ({course, allAuthors, onSave, onChange, loading, errors}) => {
  return (
    <form>
      <h1>Manage Course</h1>
      <TextInput
        name="title"
        label="Title"
        onChange={onChange}
        placeholder="Enter Title"
        value={course.title}
        error={errors.title}
      />

      <SelectInput
        name="authorId"
        label="Author"
        onChange={onChange}
        defaultOption="Select Author"
        value={course.authorId}
        error={errors.authorId}
        options={allAuthors}
       />

      <TextInput
        name="category"
        label="Category"
        onChange={onChange}
        placeholder="Enter Category"
        value={course.category}
        error={errors.category}
      />

      <TextInput
        name="length"
        label="Length"
        onChange={onChange}
        placeholder="Enter Length"
        value={course.length}
        error={errors.length}
      />

      <input
        type="submit"
        disabled={loading}
        value={loading ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}
      />
    </form>
  );
};

CourseForm.propTypes = {
  course: React.PropTypes.object.isRequired,
  allAuthors: React.PropTypes.array,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default CourseForm;
