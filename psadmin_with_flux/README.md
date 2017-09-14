# CLI Commands
- npm init (This creates the package.json file)
- npm install -g gulp (If gulp hasn't been installed yet)
- npm install --save gulp@3.9.0 gulp-connect@2.2.0 gulp-open@1.0.0
- npm install --save browserify@11.0.1 reactify@1.1.1 vinyl-source-stream@1.1.0
- npm install --save bootstrap@3.3.5 jquery@2.1.4 gulp-concat@2.6.0
- npm install --save gulp-eslint@0.15.0
- npm install --save react@0.13.3 react-router@0.13.3 flux@2.0.3
- npm install --save lodash
- npm install --save toastr@2.1.0
- npm install --save object-assign

# Video Notes

## Lifecycle Methods

### componentWillMount
- when: before initial render, both client and server
- why: good spot to set initial state

### componentDidMount
- when: after render
- why: access DOM, integrate with frameworks, set timers, ajax requests

### componentWillReceiveProps
- when: when receiving new props; not called on initial render
- why: set state before a render

### shouldComponentUpdate
- when: before render when new props or state are being received; not called on intial render
- why: performance; return false to void unnecessary re-renders

### componentWillUpdate
- when: immediately before rendering when new props or state are being received; not called on initial render; can't call setState in this function
- why: prepare for an update

### componentDidUpdate
- when: after component's updates are flushed to the DOM; not called for the initial render
- why: work with the DOM after an update

### componentWillUnmount
- when: immediately before component is removed from the DOM
- why: cleanup

## Controller Views
- top level component
- sets props on children
- interacts with stores
- not recommended to nest controller views!

## react-router
- Route
- DefaultRoute
- NotFoundRoute
- Redirect

## Transitions

### willTransitionTo
- going to this component

### willTransitionFrom usage
- leaving this component

## Flux

### Controller Views
- Top level component
- Interacts with Stores
- Holds data in state
- Sends data to children as props

### Flow
- 1. Action ~ Send Action Payload; also actions commonly calls Web APIs ->
- 2. Dispatcher ~ Send Action Payload ->
- 3. Store ~ Updates storage and fires change event ->
- 4. React View -> goto 1 if needed

## debugger
- Chrome will break at those points
