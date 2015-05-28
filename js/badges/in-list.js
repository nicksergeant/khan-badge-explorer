var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

module.exports = React.createClass({
  render: function() {
    return (
      <li>
        <Link to="badge" params={{ slug: this.props.badge.slug }}>
          <img src={this.props.badge.iconSrc} />
        </Link>
      </li>
    );
  }
});
