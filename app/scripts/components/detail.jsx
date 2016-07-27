var React = require('react');
var Recipe = require('../models/recipe').Recipe;
var RecipeCollection = require('../models/recipe').RecipeCollection;
var IngredientCollection = require('../models/recipe').IngredientCollection;
require('../router');

var RecipeDetailComponent = React.createClass({
  getInitialState: function(){
    return {
      recipeCollection: [],
    }
  },
  componentWillMount: function(objectId){
    var self = this;
    var recipeCollection = new RecipeCollection();

    recipeCollection.fetch().done(function(){
      self.setState({
        recipeCollection: recipeCollection
      });
    });
  },
  render: function(){
    var self = this;
    var recipeCollection = this.state.recipeCollection;


    var recipeItem = recipeCollection.map(function(recipe, index){
      var id = recipe.id;
      var ingredients = recipe.get('ingredients');
      var ingredientListItem = ingredients.map(function(ingredient, index){
        return(
          <div key={index}>{ingredient.amount + ' '}{ingredient.units + ' ' + "of" + ' '}{ingredient.name + ' '}</div>
        )
      });
      var steps = recipe.get('steps');
      var stepListItem = steps.map(function(step, index){
        return(
          <div key={index}>{step.step + ' '}</div>
        )
      });
      if(id == self.props.objectId){

        return (
          <div key={index}>
            <div className="col-md-offset-2 col-md-8 cards">
              <img className="recipe_card col-md-7" src={recipe.get('url')}/>
              <h2>{recipe.get('title')}</h2>
              <h4>Serving Size: {recipe.get('size')}</h4>
              <h4>Ingredients: </h4>
              <div>{ingredientListItem}</div>
            </div>

            <div className="col-md-offset-2 col-md-8 cards">
              <h1>Steps: </h1>
              <div>{stepListItem}</div>
            </div>

            <div className="col-md-offset-2 col-md-4">
              <ul className="detail-buttons">
                <li><a href="#profile/"><button className="btn detail detail-button">Return to List</button></a></li>
                <li><a href="#recipe/"><button className="btn adjusting adjust-button">Adjust Recipe</button></a></li>
              </ul>
            </div>

          </div>
        )
      }
    });

    return (
        <div>
          {recipeItem}
        </div>
    )
  }
});





module.exports = RecipeDetailComponent;
