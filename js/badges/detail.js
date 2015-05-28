var Badges = require('./service');
var BrowseBadges = require('./browse');
var React = require('react/addons');
var Router = require('react-router');

var cx = React.addons.classSet;
var Link = Router.Link;

module.exports = React.createClass({
  mixins: [ Router.State ],
  componentDidMount: function() {
    this.getBadge();
  },
  componentDidUpdate: function() {
    if (this.state.triedParams.slug !== this.getParams().slug) {
      this.getBadge();
    }
  },
  getBadge: function() {

    this.state.triedParams = this.getParams();
    
    Badges.fetch().then(function() {

      this.setState({
        badge: Badges.filter('badges', 'slug', this.getParams().slug)[0]
      });

    }.bind(this));

  },
  getInitialState: function() {
    return { badge: {} };
  },
  render: function() {
    
    if (!this.state.badge.slug) return (
      <div className="container"><h2>Loading...</h2></div>
    );

    var nextSlug = Badges.getSlugFor(this.state.badge, 'next');
    var prevSlug = Badges.getSlugFor(this.state.badge, 'prev');

    var nextClasses = cx({
      'badge-switch': true,
      'badge-switch-right': true,
      'disabled': nextSlug === this.state.badge.slug
    });
    var prevClasses = cx({
      'badge-switch': true,
      'badge-switch-left': true,
      'disabled': prevSlug === this.state.badge.slug
    });

    return (
      <div>
        <div className="detail-view">
          <div className="container clearfix">
            <div className="badge-switcher">
              <Link to="badge"
                    params={{ slug: prevSlug }}
                    className={prevClasses}>
                <i className="fa fa-chevron-left"></i>
              </Link>
              <Link to="badge"
                    params={{ slug: nextSlug }}
                    className={nextClasses}>
                <i className="fa fa-chevron-right"></i>
              </Link>
              <div className="full-badge clearfix">
                <div className="full-badge-icon">
                  <img src={this.state.badge.icons.large} />
                </div>
                <div className="full-badge-title">
                  {this.state.badge.description}
                </div>
                <div className="full-badge-description">
                  {this.state.badge.safeExtendedDescription}
                </div>
              </div>
            </div>
          </div>
        </div>
        <BrowseBadges />
      </div>
    );
  }
});
