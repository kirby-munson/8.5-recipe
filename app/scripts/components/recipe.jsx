var React  = require('react');
var Recipe = require('../models/recipe').Recipe;


var RecipeList = React.createClass({
  render: function(){
    var recipe = this.props.newRecipe;
    var ingredients = this.props.newRecipe.get('ingredients');
    var ingredientList = ingredients.map(function(ingredient, index){
      return (
        <h6 key={index}>{ingredient.amount + ' '}{ingredient.measurement + ' of '}{ingredient.ingredient}</h6>
      )
    });

    return (
      <div>
        <h4>{recipe.get('title')}</h4>
        <h5>{'Serving Size: ' + recipe.get('servingSize')}</h5>
        {ingredientList}
      </div>
    )
}
});

var RecipeForm = React.createClass({
  getInitialState: function(){
    return {
      'servingSize': ''
    }
  },
  handleSubmit: function(e){
    e.preventDefault();
    this.props.handleAdjustment(this.state.servingSize);
  },
  handleServingChange: function(e){
    e.preventDefault();
    this.setState({
      'servingSize': e.target.value
    });
  },
  render: function(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <span>Makes</span>
          <input
            type="number"
            id="servingSize"
            value={this.state.servingSize}
            onChange={this.handleServingChange}
            placeholder={this.props.newRecipe.get('servingSize')}
            name='servingSize' />
          <span>servings</span>
          <button className="adjust-button btn" type="submit">Adjust Recipe</button>
        </form>
      </div>
    );
  }
});

var AppComponent = React.createClass({
  getInitialState: function(){
    return {
      'newRecipe': {}
    }
  },
  componentWillMount: function(){
    var newRecipe = new Recipe();

      newRecipe.set('title', 'Sugar Cookies')
      newRecipe.set('servingSize', 10)
      newRecipe.set('ingredients', [
        {ingredient: 'sugar', measurement: 'cups', amount: 2},
        {ingredient: 'water', measurement: 'cups', amount: 3},
        {ingredient: 'salt', measurement: 'teaspoons', amount: 12},
        {ingredient: 'walnuts', measurement: 'cups', amount: 5}
      ])

      this.setState({
        'newRecipe': newRecipe
      });

      newRecipe.on('change:ingredients', this.update);
  },
  update: function(){
    this.forceUpdate();
  },
  handleAdjustment: function(servingSize){

    var oldServingSize = this.state.newRecipe.get('servingSize');
    var newServingSize = servingSize / oldServingSize
    var ingredients = this.state.newRecipe.get('ingredients');
    var adjustedIngredients = ingredients.map(function(ingredient){
      ingredient.amount = (ingredient.amount * newServingSize).toFixed(2);
      return ingredient;
    });
    this.state.newRecipe.unset('ingredients');
    this.state.newRecipe.set({'ingredients': adjustedIngredients});
  },
  render: function(){
    return(
      <div>
        <div className="row">
          <div className="adjust col-md-offset-4 col-md-4">
            <h3>Adjust Recipe by Serving Size</h3>
            <RecipeForm newRecipe={this.state.newRecipe} handleAdjustment={this.handleAdjustment} />
            <RecipeList newRecipe={this.state.newRecipe}/>
          </div>
        </div>
      </div>
    );
  }
});


module.exports = AppComponent;
