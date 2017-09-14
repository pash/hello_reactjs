"use strict";

var React = require('react');
var Router = require('react-router');
var routes = require('./routes');

// doesn't work in older browsers like IE8
// cleaner
// you have to configure server to support clean urls; need to direct all requests for your app to your client side's index page so react-router can over
// Router.run(routes, Router.HistoryLocation, function(Handler) {
//   React.render(<Handler/>, document.getElementById('app'));
// });

// has more browser support
// not clean because of hashtags
Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});

// long cut instead of react-router START
// we can use $ or jQuery
// $ = jQuery = require('jquery');
// var React = require('react');
// var Header = require('./components/common/header');
// var HomePage = require('./components/homePage');
// var AboutPage = require('./components/about/aboutPage');
// var AuthorPage = require('./components/authors/authorPage');
// (function(win) {
//   "use strict";
//   var App = React.createClass({
//     render: function() {
//       var Child; // which child we want to render
//
//       switch(this.props.route) {
//         case 'about': Child = AboutPage; break;
//         case 'authors': Child = AuthorPage; break;
//         default: Child = HomePage;
//       }
//
//       return (
//         <div>
//           <Header />
//           <Child />
//         </div>
//       );
//     }
//   });
//   function render() {
//     var route = win.location.hash.substr(1);
//     React.render(<App route={route} />, document.getElementById('app'));
//   }
//   win.addEventListener('hashchange', render);
//   render();
// })(window);
// long cut instead of react-router END
