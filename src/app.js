require.config({

    baseUrl: 'lib',
    urlArgs: "bust=" +  (new Date()).getTime(),

    paths: {
        app: '../app',
        tpl: '../tpl',
    },

    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'backbone.dualstorage': {
            deps: ['backbone'],
            exports: 'BackboneDualStorage'
        },
        'underscore': {
            exports: '_'
        }
    }
});

//Loading the app
require(['jquery',
         'backbone',
         'backbone.dualstorage',
         'locache',
         'app/router', 
         ], function ($, Backbone, BackboneDualStorage, locache, Router) {
            
            window.locache = locache;
            window.app     = new Router();

            if(locache.get('downloads') == null) {
                locache.set('downloads', []);
            }

            Backbone.history.start();

            /*
            //$.support.cors = true;
            $.ajaxSetup({
              headers: {
                'Authorization': "Basic " + getLocalData('AuthToken')
              }
            });

            $.ajax({
                'url'      : window.apiRoot  + '/secured/self',
                'type'     : 'get',
                success    : function(userData){

                    if(window.plugins)
                        initPushNotifications();

                    //window.location.href = "#payment/61c341d27533ac022d3cad145ef0b72b";
                    //window.location.href = "#pay/61c341d27533ac022d3cad145ef0b72b";
                    window.location.href = '#homeLogged';
                    
                    //window.location.href = 'http://localhost/SharePayMobile/#/payment/9d80bafd24442ed12f70ebd167c840a4';
                    Backbone.history.start();

                    setLocalData('userData', userData);
                },
                error      : function(){
                    window.location.href = '#home';
                    Backbone.history.start();
                }
            });
            */
});