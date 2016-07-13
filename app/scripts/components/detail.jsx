var React = require('react');
var Recipe = require('../models/recipe').Recipe;
var RecipeCollection = require('../models/recipe').RecipeCollection;
require('../router');

var RecipeDetailComponent = React.createClass({
  getInitialState: function(){
    return {
      recipe: {}
    }
  },
  componentWillMount: function(){
    var self = this;

    var recipeCollection = new RecipeCollection();
    recipeCollection.fetch().done(function(){
      recipeCollection.each(function(recipe){
        var recipe = new Recipe();
        recipe.set('objectId', this.props.objectId);
        recipe.fetch().done(function(data){
          console.log(data)
          self.setState({recipe: recipe});
        });
      });
    });
  },
  render: function(){
    var self = this;
    var recipe = self.state.recipe;
    return(
      <div>
        <div className="hello col-md-12">
          <h1>{recipe.get('title')}</h1>
        </div>
        <img src={recipe.get('url')} />
        <h4>Serving Size: 10</h4>
        <h5>Ingredients</h5>
        <dl>
          <dd>1 cup of sugar</dd>
          <dd>1 cup of sugar</dd>
          <dd>1 cup of sugar</dd>
          <dd>1 cup of sugar</dd>
          <dd>1 cup of sugar</dd>
          <dd>1 cup of sugar</dd>
        </dl>
      </div>
    );
  }
});

module.exports = RecipeDetailComponent;
