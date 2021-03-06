var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var AppComponent = require('./components/recipe.jsx');
var LoginComponent = require('./components/login.jsx');
var SignUpComponent = require('./components/signup.jsx');
var RecipeFormComponent = require('./components/form.jsx');
var HomeComponent = require('./components/home.jsx');
var ProfileComponent = require('./components/profile.jsx');
var RecipeDetailComponent = require('./components/detail.jsx');

var TheAppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'login/': 'login',
    'signup/': 'signUp',
    'recipe/': 'recipe',
    'profile/':'profile',
    'profile/add/': 'add',
    'profile/:id/edit/': 'add',
    'profile/:id/': 'details'
  },
  // initialize: function(){
  //   this.user = JSON.parse(logcalStorage.getItem('user'));
        // this.fetch()
  // },
  execute: function(callback, args, name){
    var user = JSON.parse(localStorage.getItem('user'));
    if (!user && name != 'login'){
      this.navigate('login/', {trigger:true})
    }
    if(callback) callback.apply(this,args);
  },
  index: function(){
    ReactDOM.render(
      React.createElement(HomeComponent),
      document.getElementById('container')
    );
  },
  login: function(){
    var self = this;
    ReactDOM.render(
      React.createElement(LoginComponent, {router: self}),
      document.getElementById('container')
    );
  },
  signUp: function(){
    ReactDOM.render(
      React.createElement(SignUpComponent),
      document.getElementById('container')
    );
  },
  profile: function(){
    var self = this;
    ReactDOM.render(
      React.createElement(ProfileComponent, {router: self}),
      document.getElementById('container')
    );
    $(document).ready(function(){
          $("div.div1").click(function(){
              $("div.1").toggleClass("main1");
          });
      });
  },
  add: function(objectId){
    var self = this;
    ReactDOM.render(
      React.createElement(RecipeFormComponent, {router: self, objectId: objectId}),
      document.getElementById('container')
    );
  },
  details: function(objectId){
    ReactDOM.render(
      React.createElement(RecipeDetailComponent, {objectId: objectId}),
      document.getElementById('container')
    );
  },
  recipe: function(){
    ReactDOM.render(
      React.createElement(AppComponent),
      document.getElementById('container')
    );
  },
});

var router = new TheAppRouter();

module.exports = router;
