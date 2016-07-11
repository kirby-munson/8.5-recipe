var Backbone = require('backbone');


var User = Backbone.Model.extend({
  initialize: function(){
    console.log('a new user is born!')
  },
  urlRoot: 'https://tiny-parse-server.herokuapp.com/users'
});

module.exports = {
  'User': User
};



// ,{
//   login: function(username, password){
//     var loggedInUser = new User();
//     var queryString = 'username=' + username + '&password=' + password;
//     loggedInUser.urlRoot = 'https://tiny-parse-server.herokuapp.com/login?' + queryString;
//     return loggedInUser.fetch();
//   }
