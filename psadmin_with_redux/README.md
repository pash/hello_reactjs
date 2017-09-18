# Video Notes
- packages in package.json are described here: https://github.com/coryhouse/pluralsight-redux-starter
- we're running scripts with babel-node because we're using ES6
- .eslintrc values 0 OFF, 1 Warning, 2 Error

# Creating React components
- ES5 has autobinding (ex: <div onclick={this.handleClick}></div> )
- ES6 doesn't have autobinding (ex: <div onclick={this.handleClick.bind(this)}></div> )
- review container vs presentation components

# Redux
- Action ->
- Store <-> Reducers (returns new state)
- React

# A Chat with Redux
- React - Hey CourseAction, someone clicked this "Save Course" button
- Action - Thanks React! I will dispatch an action so reducers that care can update state.
- Reducer - Ah, thanks action. I see you passed me the current state and the action to perform. I'll make a new copy of the state and return it.
- Store - Thanks for updating the state reducer. I'll make sure that all connected components are aware.
- React-Redux - Woah, thanks for the new data Mr. Store. I'll now intelligently determine if I should tell React about this change so that it only has to bother with updating the UI when necessary.
- React - Ooo! Shiny new data has been passed down via props from the store! I'll update the UI to reflect this!

# Gotchas
- In ES5, when you use React's createClass function, then functions are bound for you. Not in ES6! See CoursesPage.js where we had to bind 'this' to the on-events.
- Do your binds in the constructor.
