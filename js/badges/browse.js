var BadgeCategory = require('./category');
var Badges = require('./service');
var React = require('react');
var Search = require('../search');

module.exports = React.createClass({
  componentDidMount: function() {

    Badges.fetch().then(function() {
      this.setState({ categories: Badges.data.categories });
    }.bind(this));

  },
  getInitialState: function() {
    return { categories: [], query: '' }
  },
  handleSearch: function(event) {

    this.setState({
      query: event.target.value.toLowerCase()
    });

  },
  render: function() {

    var categoryNodes = (<div className="category"><h2>Loading...</h2></div>);

    if (this.state.categories.length) {
      categoryNodes = this.state.categories.map(function(category) {
        return (
          <BadgeCategory query={this.state.query}
            key={category.category}
            category={category} />
        );
      }.bind(this));
    }

    return (
      <div>
        <Search onSearch={this.handleSearch} />
        <div className="browse-view">
          <div className="container clearfix">
            {categoryNodes}
          </div>
        </div>
      </div>
    );
  }
});
