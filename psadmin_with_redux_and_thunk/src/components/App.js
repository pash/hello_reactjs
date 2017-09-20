import React, {PropTypes} from 'react';
import Header from './common/Header';

// We need this to get ajaxCallsInProgress and be able to pass it to Header where LoadingDots is rendered.
import {connect} from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header
          loading={this.props.loading}
        />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

// We need this to get ajaxCallsInProgress and be able to pass it to Header where LoadingDots is rendered.
function mapStateToProps(state, ownProps) {
  return {
    loading: state.ajaxCallsInProgress > 0
  };
}

// We need this to get ajaxCallsInProgress and be able to pass it to Header where LoadingDots is rendered.
// instead of just
// export default App;
export default connect(mapStateToProps)(App);
