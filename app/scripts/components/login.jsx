var React  = require('react');
var Recipe = require('../models/recipe');
var router = require('../router');


var LoginComponent = React.createClass({
  getInitialState: function(){
    return {
      'username': '',
      'password': ''
    }
  },
  handleSubmit: function(e){
    e.preventDefault();
    var username = this.state.username
    var password = this.state.password
    jQuery.get('https://tiny-parse-server.herokuapp.com/login?' + 'username=' + username + '&password=' + password).done(function(user){
      localStorage.setItem('user', JSON.stringify(user));

      this.props.router.navigate('profile/', {trigger: true});
    });
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
      <div className="log-in-form">
        <form className="well col-md-offset-4 col-md-4" onSubmit={this.handleSubmit}>
          <h3>Log In!</h3>
          User Name:<br/>
          <input type="text"
                  value={this.state.username}
                  onChange={this.handleNameChange}
             /><br/>
          Password:<br/>
          <input type="password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
            /><br/>
          <button className="log btn" type="submit">Log In</button>
        </form>
      </div>
    );
  }
});

module.exports = LoginComponent;
