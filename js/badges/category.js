'use strict';

var Badges = require('./service');
var BadgeInList = require('./in-list');
var React = require('react');
var Router = require('react-router');

module.exports = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function() {

    var badgeNodes = (<li><h3>Loading...</h3></li>);
    var badgesFiltered = Badges.queryBadges(this.props.query, this.props.category.category);

    if (badgesFiltered.length) {
      badgeNodes = badgesFiltered.map(function(badge) {
        return (<BadgeInList key={badge.slug} badge={badge} />);
      });
    } else {
      badgeNodes = (<li><h3 className="no-results">No results in this category for &ldquo;{this.props.query}&rdquo;.</h3></li>);
    }

    return (
      <div className="category">
        <h2>
          <img src={this.props.category.iconSrc} />
          {this.props.category.typeLabel}
        </h2>
        <ul className="badges">{badgeNodes}</ul>
      </div>
    );
  }
});
