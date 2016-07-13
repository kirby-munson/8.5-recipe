var Backbone = require('backbone');

var Recipe = Backbone.Model.extend({
  idAttribute: 'objectId',
  urlRoot: 'https://tiny-parse-server.herokuapp.com/classes/Munson'
});

var RecipeCollection = Backbone.Collection.extend({
  model: Recipe,
  url: 'https://tiny-parse-server.herokuapp.com/classes/Munson',
  parse: function(data){
    return data.results;
  }
});

module.exports = {
  'Recipe': Recipe,
  'RecipeCollection': RecipeCollection
}
