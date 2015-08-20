var _ = require('lodash');
var NewsHeader = require('./NewsHeader');
var NewsItem = require('./NewsItem');
var React = require('react');

var NewsList = React.createClass({
  statics: {
    getQueryVariable: function getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      return false;
    },
  },

  getMore: function () {
    var page = 2;
    if (NewsList.getQueryVariable('p')) {
      page = parseInt(NewsList.getQueryVariable('p')) + 1;
    }
    return (
      <div className="newsList-more">
        <a className="newsList-moreLink" href={"http://localhost:8888/html/app.html?p=" + page}>More</a>
      </div>
    );
  },

  render: function () {
    var page = 0;
    if (parseInt(NewsList.getQueryVariable('p'))) {
      page = parseInt(NewsList.getQueryVariable('p')) - 1;
    }
    return (
      <div className="newsList">
        <NewsHeader/>
        <div className="newsList-newsItems">
          {_(this.props.items).map(function (item, index) {
            var rank = index + 1 + page * 30;
            return <NewsItem key={item.id} item={item} rank={rank}/>;
          }.bind(this)).value()}
        </div>
        {this.getMore()}
      </div>
    );
  }
});

module.exports = NewsList;