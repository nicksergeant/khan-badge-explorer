var Q = require('q');

var api = {
  badges: 'https://www.khanacademy.org/api/v1/badges?casing=camel',
  categories: 'https://www.khanacademy.org/api/v1/badges/categories?casing=camel'
};
var request = function(url) {

  var deferred = Q.defer();
  var req = new XMLHttpRequest();

  req.onload = function() {
    deferred.resolve(JSON.parse(this.responseText));
  };

  req.open('get', url, true);
  req.send();

  return deferred.promise;
};

module.exports = {
  data: {},
  filter: function(set, key, value) {
    return this.data[set].filter(function(item) {
      return item[key] === value;
    });
  },
  queryBadges: function(query, category) {
    return this.data.badges.filter(function(badge) {
      return badge.badgeCategory === category && 
              (badge.description.toLowerCase().indexOf(query) !== -1 ||
               badge.safeExtendedDescription.toLowerCase().indexOf(query) !== -1);
    });
  },
  fetch: function() {

    if (this.data.badges) return Q.when(this.data);

    var promises = [request(api.badges), request(api.categories)];

    return Q.all(promises).then(function(responses) {
      this.data.badges = this.order(responses[0], 'badgeCategory');
      this.data.categories = this.order(responses[1], 'category');
    }.bind(this));

  },
  getSlugFor: function(badge, direction) {

    if (!direction) return badge.slug;

    var currentIndex = this.data.badges.indexOf(badge);

    if (direction === 'next' && currentIndex !== this.data.badges.length - 1) {
      return this.data.badges[currentIndex + 1].slug;
    }

    if (direction === 'prev' && currentIndex !== 0) {
      return this.data.badges[currentIndex - 1].slug;
    }

    return badge.slug;
  },
  order: function(collection, key) {
    return collection.sort(function(a, b) {
      return a[key] - b[key];
    });
  }
};
