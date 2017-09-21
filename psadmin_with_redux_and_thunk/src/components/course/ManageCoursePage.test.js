import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';

// first attempt:
// import ManageCoursePage from './ManageCoursePage';
// option 2:
import {ManageCoursePage} from './ManageCoursePage';

describe('Manage Course Page', () => {
  it('sets error message when trying to save empty title', () => {
    const props = {
      authors: [],
      actions: { saveCourse: () => { return Promise.resolve(); }},
      course: { id: '', watchHref: '', title: '', authorId: '', length: '', category: '' }
    };

    // first attempt:
    // will cause an error because it's not connected to a store
    // const wrapper = mount(<ManageCoursePage/>);

    // option 1:
    // const wrapper = mount(<Provider store={store}><ManageCoursePage/></Provider>);

    // option 2: use named import by adding export to ManageCoursePage
    // adding authors to fix TypeError: Cannot read property 'map' of undefined in SelectInput.js#15
    const wrapper = mount(<ManageCoursePage {...props}/>);
    const saveButton = wrapper.find('input').last();
    expect(saveButton.prop('type')).toBe('submit');
    saveButton.simulate('click');
    expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
  });
});
