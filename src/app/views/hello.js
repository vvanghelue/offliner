define(function (require) {

    "use strict";

    var $             = require('jquery'),
        _             = require('underscore'),
        Backbone      = require('backbone'),
        tpl           = require('text!tpl/home.tpl'),
        DownloadModel = require('app/models/download'),
        DownloadView  = require('app/views/download'),
        Crawler       = require('app/helpers/crawler/crawler');

    return Backbone.View.extend({

        events: {
            'click .goButton' : 'go',
        },

        className: 'helloBlock',

        initialize: function(){
            
            window.main = this;

            this.collection = new DownloadModel.DownloadCollection();
            
            var that = this;
            this.collection.fetch({
                success : function(data){
                    console.log(data);
                    //that.render();
                },
                error: function(){
                    console.log('error');
                }
            });
            
            this.collection.on('add remove', function(){console.log('collection change binding');that.render();});
        },

        addDownload: function(download) {
            var that = this;
            this.collection.create(download).save();
            return this;
        },

        go: function(){
            console.log('GOOOOOOO');

            var url = this.$el.find('input.form-control').val();

            var that = this;
            var crawler = new Crawler(url);
            crawler.done(
                function(error){alert('An error has occured ' + error)},
                function(data){
                    var downloadData = {
                        name   : data.name,
                        originalUrl    : 'http://youtube.com/lol',
                        localFile      : null,
                        onlineFile     : data.remoteFile,
                        thumb  : data.thumb,
                        type   : data.type,
                        status : 'starting',
                        downloaded: 0,
                        size:0
                    };

                    that.addDownload(downloadData);
                }
            )
            return;


            this.addDownload(downloadData);
            return this;


            var url = this.$el.find('input.form-control').val();
            
            ActivityIndicator.show();


            var that = this;
            var success = function(url){

                var downloadData = {
                    name   : '',
                    url    : url,
                    thumb  : '',
                    type   : '',
                    status : 'starting'
                };

                var crawler = new Crawler(url);
                crawler.start().done(
                    function(error){alert('An error has occured ' + error)},
                    function(data){
                        that.addDownload(data);
                    }
                )

                that.addDownload(downloadData);


            };

            var test = window.open(url, '_blank');
            var found = false;
            test.addEventListener('loadstart', function(event) {found = event.url.indexOf('googlevideo') > 0; if(found){test.close(); success(event.url)} });

            clearInterval(interval);

            test.executeScript({code: 'document.querySelectorAll("._mup")[0].click();'});

            var interval = setInterval(function(){
                if(!found) {
                    
                    test.executeScript({code: 'document.querySelectorAll("._mup")[0].click();'});
                    test.executeScript({code: 'window.location.href = window.document.querySelectorAll("video")[0].src;'});
                }
            }, 200);





        },

        render: function () {

            this.$el.empty();

            this.$el.append(_.template(tpl)());

            var that = this;
            _.each(this.collection.models, function(model){
                console.log('prepend');
                that.$el.find('.downloadList').prepend(new DownloadView({model: model}).render().$el);
            });

            that.$el.find('.downloadList').css('height', $(window).height() + 'px');

            return this;
        }
    });
});