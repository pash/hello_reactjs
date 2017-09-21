import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import CourseForm from './CourseForm';

function setup(saving) {
  let props = {
    course: {}, saving: saving, errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  let renderer = TestUtils.createRenderer();
  renderer.render(<CourseForm {...props} />);
  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('CourseForm via React Test Utils', () => {
  it('renders form and h1', () => {
    const { output } = setup();
    // get top level element
    expect(output.type).toBe('form');
    // get first child element
    let [ h1 ] = output.props.children;
    expect(h1.type).toBe('h1');
  });

  it('save button is labeled "Save" when not saving', () => {
    const { output } = setup(false);
    // get 5th child
    const submitButton = output.props.children[5];
    expect(submitButton.props.value).toBe('Save');
  });

  it('save button is labeled "Saving..." when saving', () => {
    const { output } = setup(true);
    // get 5th child
    const submitButton = output.props.children[5];
    expect(submitButton.props.value).toBe('Saving...');
  });
});
