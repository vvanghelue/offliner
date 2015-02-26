define(function (require) {

    "use strict";

    var $            = require('jquery'),
        Backbone     = require('backbone'),
        HelloView    = require('app/views/hello');

    return Backbone.Router.extend({

        routes: {
            "" : "hello",
        },

        initialize: function(user) {
          window.app = this;
        },

        hello: function () {
          var view = new HelloView();
          this.changePage(view.render().$el);
        },
        
        changePage: function(element) {
          $('body').html(element);
        }
    });

});