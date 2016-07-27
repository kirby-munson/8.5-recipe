var React = require('react');
var models = require('../models/recipe');
var router = require('../router');
var models = require('../models/recipe');

var IngredientForm = React.createClass({
  handleAmount: function(e){
    this.props.ingredient.set('amount', e.target.value);
  },
  handleUnits: function(e){
    this.props.ingredient.set('units', e.target.value);
  },
  handleName: function(e){
    this.props.ingredient.set('name', e.target.value);
  },
  render: function(){
    var ingredient = this.props.ingredient;
    var count = this.props.counter + 1;
    return (
      <div>
        <h4>Ingredient #{count}</h4>
        <input onChange={this.handleAmount} value={ingredient.get('amount')} type="text" name="amount" placeholder="Amount" className="form-control col-md-2"/>
        <input onChange={this.handleUnits} type="text" name="units" placeholder="Units" className="form-control col-md-2"/>
        <input onChange={this.handleName}  type="text" name="name" placeholder="Ingredient" className="form-control col-md-6"/>
      </div>
    );
  }
});

var StepsForm = React.createClass({
  handleStep: function(e){
    this.props.step.set('step', e.target.value);
  },
  render: function(){
    var step = this.props.step;
    var count = this.props.counter + 1;
    return (
      <div>
        <h4>Step #{count}</h4>
        <input onChange={this.handleStep} value={step.get('step')} type="text" name="step" placeholder="Step" className="form-control col-md-2"/>
      </div>
    );
  }
});

var RecipeFormComponent = React.createClass({
  getInitialState: function(){
    var ingredients = new models.IngredientCollection();
    ingredients.add([{}]);
    var steps = new models.StepCollection();
    steps.add([{}]);

    return {
      ingredients: ingredients,
      steps: steps,
      recipe: new models.Recipe()
    };
  },
  componentWillMount: function(){
    var self = this;
    var recipe = this.state.recipe;

    recipe.on('change', this.update);
    this.state.ingredients.on('add', this.update);
    this.state.steps.on('add', this.update);


    if(this.props.editId){
      recipe.set('objectId', this.props.editId);
      recipe.fetch().done(function(){
        self.setState({
          ingredients: recipe.get('ingredients'),
          steps: recipe.get('steps'),
          recipe: recipe,
          title: recipe.get('title')
        });
      });
    }
  },
  update: function(){
    this.forceUpdate();
  },
  handleSubmit: function(e){
    e.preventDefault();
    var router = this.props.router;
    var recipe = this.state.recipe;
    var ingredients = this.state.ingredients;
    var steps = this.state.steps;

    recipe.set('ingredients', ingredients.toJSON());
    recipe.set('steps', steps.toJSON());

    recipe.save().done(function(){
      router.navigate('profile/', {trigger: true});
    });
  },
  handleTitleChange: function(e){
    this.state.recipe.set('title', e.target.value);
  },
  handleDescChange: function(e){
    this.state.recipe.set('url', e.target.value);
  },
  handleSizeChange: function(e){
    this.state.recipe.set('size', e.target.value);
  },
  addIngredient: function(e){
    e.preventDefault();
    this.state.ingredients.add([{}]);
  },
  addSteps: function(e){
    e.preventDefault();
    this.state.steps.add([{}]);
  },
  render: function(){

    var ingredientFormSet = this.state.ingredients.map(function(ingredient, index){
      return <IngredientForm key={ingredient.cid} ingredient={ingredient} counter={index}/>
    });

    var stepFormSet = this.state.steps.map(function(step, index){
      return <StepsForm key={step.cid} step={step} counter={index}/>
    });

    return (
      <div className="row">
        <div>
          <div className="hello col-md-12">
            <h1>Create New Recipe</h1>
          </div>

          <form className="recipe-form col-md-offset-4 col-md-4" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input onChange={this.handleTitleChange} value={this.state.recipe.get('title')} type="title" className="form-control" id="title" name="title" placeholder="Recipe Title" />
            </div>

            <div className="form-group">
              <label htmlFor="description">Image</label>
              <input onChange={this.handleDescChange} value={this.state.recipe.get('url')} type="url" className="form-control" id="url" name="url" placeholder="Recipe url" />
            </div>

            <div className="form-group">
              <label htmlFor="size">Serving Size</label>
              <input onChange={this.handleSizeChange} value={this.state.recipe.get('size')} type="number" className="form-control" id="size" name="size" placeholder="Serving Size" />
            </div>

            <div className="form-group">
              {ingredientFormSet}
              <button type="button" className="add-in btn btn-success" onClick={this.addIngredient}>Add Ingredient</button>
            </div>

            <div className="form-group">
              {stepFormSet}
              <button type="button" className="add-in btn btn-success" onClick={this.addSteps}>Add Steps</button>
            </div>

            <input type="submit" className="col-md-12 btn btn-primary" value="Add Recipe"/>
          </form>

        </div>
      </div>
    );
  }
});



module.exports = RecipeFormComponent;
