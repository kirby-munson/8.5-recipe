var React = require('react');

var HomeComponent = React.createClass({
  render: function(){
    return(
      <div>
        <nav className="nav">
          <a className="profile-link" href="#profile/">My Profile</a>
          <h1>Recipe Hub</h1>
        </nav>
        <div className="welcome col-md-12">
          <a href="#login/"><button className="col-md-offset-4 col-md-2 login btn">Login</button></a>
          <a href="#signup/"><button className="col-md-2 sign-up btn">Sign Up</button></a>
        </div>
        <div className="quote col-md-12">
          <h2>A recipe is a story that ends with a good meal.</h2>
        </div>
      </div>
    )
  }
});

module.exports = HomeComponent;
