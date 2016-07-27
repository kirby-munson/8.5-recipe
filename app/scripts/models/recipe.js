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

var Ingredient = Backbone.Model.extend({
  idAttribute: 'objectId',
});

var IngredientCollection = Backbone.Collection.extend({
  model: Ingredient,
});

var Step = Backbone.Model.extend({
  idAttribute: 'objectId',
});

var StepCollection = Backbone.Collection.extend({
  model: Step
});

module.exports = {
  'Recipe': Recipe,
  'RecipeCollection': RecipeCollection,
  'Ingredient':Ingredient,
  'IngredientCollection':IngredientCollection,
  'Step':Step,
  'StepCollection':StepCollection
}
