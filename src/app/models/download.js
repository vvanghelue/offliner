define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),
        locache             = require('locache'),

        Download = Backbone.Model.extend({
            remote: false,
            local: true,
            urlRoot: window.apiRoot + 'downloads'
        }),

        DownloadCollection = Backbone.Collection.extend({

            remote: false,
            local: true,

            model: Download,
            
            url: function() {
                return window.apiRoot + 'downloads';
            },
        });

        return {
            Download          : Download,
            DownloadCollection: DownloadCollection
        };

});