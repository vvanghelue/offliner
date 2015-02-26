define(function (require) {

    "use strict";

    var $            = require('jquery'),
        _            = require('underscore'),
        Backbone     = require('backbone'),
        tpl          = require('text!tpl/download.tpl');

    return Backbone.View.extend({

        events: {
            'click .delete' : 'delete',
            'click .play'   : 'play',
        },

        className: 'download',

        initialize: function(options) {
            this.model = options.model;

            var that = this;

            setTimeout(function(){
                that.model.on('change', function(){that.render()});
            }, 0);
        
            console.log(typeof(FileTransfer) == 'undefined');

            if(this.model.get('status') == 'starting' && typeof(FileTransfer) == 'undefined') {
                setTimeout(function(){
                    that.model.set('status', 'downloading');
                    that.model.set('size', 1000);

                    var interval = setInterval(function(){
                        var current = parseFloat(that.model.get('downloaded'));
                        that.model.set('downloaded',  current + Math.floor(Math.random() * 10));
                    }, 1000);

                    setTimeout(function(){
                        clearInterval(interval);
                        that.model.set('status', 'complete');
                        that.model.set('localFile', 'https://ia902302.us.archive.org/27/items/Pbtestfilemp4videotestmp4/video_test.mp4');
                        that.model.save();
                    }, 10000);
                }, 5000);
            }
            

            if(this.model.get('status') == 'starting' && typeof(FileTransfer) != 'undefined') {
                console.log('start downloading')

                that.model.set('status', 'downloading');
                that.model.save();

                var fileTransfer = new FileTransfer();
                
                var size = 0;
                var downloaded = 0;

                var interval = setInterval(function(){
                    that.model.set('downloaded', downloaded);
                    that.model.set('size', size);
                }, 500);

                fileTransfer.onprogress = function(progressEvent) {
                    if (progressEvent.lengthComputable) {
                        //download.setPercentage(progressEvent.loaded / progressEvent.total);
                        
                        downloaded = progressEvent.loaded;
                        size = progressEvent.total;


                        //loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
                    } else {
                        //loadingStatus.increment();
                    }
                };

                fileTransfer.download(
                    //that.model.get('onlineFile'),
                    'http://techslides.com/demos/sample-videos/small.mp4',
                    'cdvfile://localhost/persistent/'+ that.model.get('id') + '_file',
                    //'cdvfile://localhost/persistent/test',
                    function(entry) {
                        console.log("download complete: " + entry.toURL());
                        
                        setTimeout(function(){

                            that.model.set('status', 'complete');
                            that.model.set('localFile', entry.toURL());
                            that.model.save();
                            clearInterval(interval)

                        }, 2000);
                    },
                    function(error) {
                        console.log("download error source " + error.source);
                        console.log("download error target " + error.target);
                        console.log("upload error code" + error.code);
                    },
                    false,
                    {
                        headers: {
                            //"Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                        }
                    }
                );
            }

            return this;
        },

        setPercentage: function(percentage){
            console.log(percentage);
        },

        render: function () {

            console.log('render view');

            this.$el.empty();

            this.$el.append(_.template(tpl)({
                model: this.model
            }));

            return this;
        }
    });
});