var React = require('react');
var models = require('../models/recipe');
require('../router');


var RecipeCards = React.createClass({
  getInitialState: function(){
    return {
      recipeCollection: []
    };
  },
  componentWillMount: function(){
    var recipeCollection = new models.RecipeCollection();
    var self = this;
    recipeCollection.fetch().done(function(){
      self.setState({recipeCollection: recipeCollection});
    });
  },
  render: function(){
    var recipes = this.state.recipeCollection;
      var recipeList = recipes.map(function(recipe){
        return (
          <dd key={recipe.get('objectId')} className="col-md-3">
            <div className="cards-wrapper">
              <div className="cards">
                <div className="card-img-wrapper">
                  <img src={recipe.get('url')} />
                </div>
                <a href={"#profile/" + recipe.get('objectId') + '/'}><h4>{recipe.get('title')}</h4></a>
                <a href={"#profile/" + recipe.get('objectId') + "/edit/"}><h5>Edit</h5></a>
              </div>
            </div>
          </dd>
        );
      });
      return (
        <dl className="recipelist">
          {recipeList}
        </dl>
      );
    }
  });

var ProfileComponent = React.createClass({
  render: function(){
    return(
      <div>
        <div className="hello col-md-12">
          <h1>Hello Chef, Kirby!</h1>
          <a href="#profile/add/"><button className="create-new btn btn-success">Create New Recipe</button></a>
        </div>
        <div className="bg-profile">
          <div className='side-nav col-md-2'>
            <dl>
              <dd>My Recipes</dd>
            </dl>
          </div>
          <RecipeCards />
        </div>
      </div>
    )
  }
});


module.exports = ProfileComponent;
