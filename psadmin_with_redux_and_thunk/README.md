# To run
- npm start -s
- npm run lint (to check linting errors)
- npm run test:watch (to run tests)

# To run in production
- npm run build

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

# Mock API Advantages
- Start before the API exists
- Independence
- Backup plan (when realy API is down)
- Ultra-fast
- Test slowness (using setTimeout to delay responses)
- Aids testing
- Point to the real API later (by changing import or toggle config)

# Testing
- npm run test:watch
- Mocha (testing framework)
- Expect (assertion library because Mocha doesn't have it - https://www.npmjs.com/package/expect)
- Enzyme (helper libary)
- Enzyme is an abstraction that calls react test utils behind the scenes and uses JSDOM (in-memory DOM) and cheerio (fast jQuery style selectors) as well.
- jSDOM simulates an actual browser by creating a DOM in memory that we can interact with.

# Production
- dist (index.html, bundle.js, styles.css and sourcemaps)
- setup production redux store
- setup webpack
- setup html build
- setup dist server
- setup npm scripts

# Production Build Process
- lint and run tests
- bundle and minify js and css
- generate js and css sourcemaps
- exclude dev-specific concerns
- build react in production mode
- 4.8MB -> 121k

# Webpack Production Scripts
- clean-dist
- remove-dist (cross platform way to remove dist ie: rm -rf)
- build:html
- prebuild (babel-node is used because we're using ES6; needed to transpile down to ES5 so node can parse it even without running latest version of node)
- build (By convention, prebuild will run before build and postbuild will run after build.)
- postbuild

# Challenge
- Author administration (Hint: be sure to add logic you can't delete author who has a course)
- Delete course
- Hide empty course list
- Unsaved changes message
- Client-side validation
- Handle 404's (Hint: need to add logic to mapStateToProps)
- Show # of courses in Header
- Pagination / Infinite Scrolling
- Sort course table (A-Z) (Hint: mapStateToProps is where this should be added)
- Revert abandoned changes
