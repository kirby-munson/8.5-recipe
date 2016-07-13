var React  = require('react');
var Recipe = require('../models/recipe');
var User = require('../models/user').User;


var SignUpComponent = React.createClass({
  getInitialState: function(){
    return {
      'username': '',
       'password': ''
     }
  },
  handleSubmit: function(e){
    e.preventDefault();
    var username = this.state.username;
    var password = this.state.password;
    var newUser = new User();
    newUser.set({'username': username, 'password': password});

    console.log(newUser);

    newUser.save();

  },
  handleNameChange: function(e){
    e.preventDefault();
    this.setState({
      'username': e.target.value
    });
  },
  handlePasswordChange: function(e){
    e.preventDefault();
    this.setState({
      'password': e.target.value
    });
  },
  render: function(){
    return(
      <div className="sign-up-form">
        <form className="well col-md-offset-4 col-md-4" onSubmit={this.handleSubmit}>
          <h3>Sign Up!</h3>
          User Name: <br/>
          <input type="text"
                  value={this.state.username}
                  onChange={this.handleNameChange}/><br/>
          Password:<br/>
          <input type="password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}/><br/>
          <button className="sign btn" type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
});

module.exports = SignUpComponent;
