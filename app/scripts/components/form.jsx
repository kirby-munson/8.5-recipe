var React = require('react');
var models = require('../models/recipe');
var router = require('../router');

var RecipeFormComponent = React.createClass({
  getInitialState: function(){
    return{
      recipe: {}
    }
  },
  componentWillMount: function(){
    var self = this;
    var recipe = new models.Recipe();
    recipe.set('id', this.props.id);
    recipe.fetch().done
  },
  handleSubmit: function(e){
    e.preventDefault();
    var router = this.props.router;
    var recipe = new models.Recipe();

    recipe.set(jQuery(e.target).serializeObject());
    recipe.save().done(function(){
    router.navigate('profile/', {trigger:true})
    });
  },
  render: function(){
    return(
      <div>
        <div className="hello col-md-12">
          <h1>Create New Recipe</h1>
        </div>
          <form className="col-md-offset-4 col-md-4" onSubmit={this.handleSubmit}>
            Title:<br />
          <input htmlFor="title" name="title" id="title" className='form-control' type='text' /><br />
            Image:<br />
          <input htmlFor="url" name="url" id="url" className='form-control' type='text' /><br />
            <button className="btn btn-warning" type='submit'>Create Recipe</button>
          </form>
      </div>
    )
  }
});


module.exports = RecipeFormComponent;
