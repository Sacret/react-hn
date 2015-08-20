var _ = require('lodash');
var $ = require('jquery');
var NewsList = require('./NewsList');
var React = require('react');

// Get the top item ids
$.ajax({
  url: 'https://hacker-news.firebaseio.com/v0/topstories.json',
  dataType: 'json'
}).then(function (stories) {
  // Get the item details in parallel
  var currPage = parseInt(NewsList.getQueryVariable('p'));
  var start = 0, end = 30;
  if (currPage) {
    start = (currPage - 1) * 30;
    end = currPage * 30;
  }
  var detailDeferreds = _(stories.slice(start, end)).map(function (itemId) {
    return $.ajax({
      url: 'https://hacker-news.firebaseio.com/v0/item/' + itemId + '.json',
      dataType: 'json'
    });
  }).value();
  return $.when.apply($, detailDeferreds);
}).then(function () {
  // Extract the response JSON
  var items = _(arguments).map(function (argument) {
    return argument[0];
  }).value();

  // Render the items
  React.render(<NewsList items={items}/>, $('#content')[0]);
});