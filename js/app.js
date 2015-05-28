'use strict';

var BadgeDetail = require('./badges/detail');
var BrowseBadges = require('./badges/browse');
var React = require('react');
var Router = require('react-router');

var Link = Router.Link;
var NotFoundRoute = Router.NotFoundRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  render: function() {
    return (
      <div>
        <header>
          <Link className="logo" to="browse"><img src="http://i.imgur.com/4cmAfuD.png" /></Link>
        </header>
        <RouteHandler />
      </div>
    );
  }
});
var PageNotFound = React.createClass({
  render: function() {
    return (
      <div className="detail-view">
        <div className="container clearfix">
          <h1>404: Page not found.</h1>
        </div>
      </div>
    );
  }
});

var routes = (
  <Route handler={App}>
    <Route path="/" handler={BrowseBadges} name="browse" />
    <Route path="/:slug" handler={BadgeDetail} name="badge" />
    <NotFoundRoute handler={PageNotFound} />
  </Route>
);

Router.run(routes, function(Handler, state) {
  React.render(<Handler params={state.params} />, document.getElementById('app'));
});
