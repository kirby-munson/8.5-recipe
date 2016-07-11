var React = require('react');
var Recipe = require('../models/recipe').Recipe;
require('../router');

var RecipeDetailComponent = React.createClass({
  getInitialState: function(){
    return {}
  },
  componentWillMount: function(){

  },
  render: function(){
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
    )
  }
});

module.exports = RecipeDetailComponent;