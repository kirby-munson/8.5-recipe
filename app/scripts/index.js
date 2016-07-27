var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
require('./router');


$(function(){
  Backbone.history.start();
});


var $ = window.jQuery = require('jquery');

var User = require('./models/user').User;

$.ajaxSetup({
  beforeSend: function(xhr){
    xhr.setRequestHeader("X-Parse-Application-Id", "tiygvl");
    xhr.setRequestHeader("X-Parse-REST-API-Key", "slumber");
  }
});

$.fn.serializeObject = function(){
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name] !== undefined) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};
