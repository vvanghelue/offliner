define(function (require) {

    "use strict";

    var _ = require('underscore'),
        Backbone = require('backbone'),
        youtube  = require('app/helpers/crawler/strategies/youtube');
        //direct   = require('app/helpers/crawler/strategies/direct');

    var Crawler = function(attributes) {
        this.initialize.apply(this, arguments);
      };

    _.extend(Crawler.prototype, {
        initialize: function(url){
            this.url = url;
        },
        getContentType: function(contentType){
            if(contentType.indexOf('text/html') > -1)
                return 'page';

            if(contentType.indexOf('video/mp4') > -1)
                return 'video';

            if(contentType.indexOf('audio/mp3') > -1)
                return 'audio';

            if(contentType.indexOf('image/') > -1)
                return 'image';

        },
        done: function(error, success) {

            var that = this;
            var xhr  = new XMLHttpRequest();

            xhr.open('GET', this.url)
            xhr.send()
            var ok = false;
            xhr.onreadystatechange =  function(){
                if(xhr.readyState == 3 & !ok){
                    var contentType = ok = that.getContentType(xhr.getResponseHeader('Content-Type'));


                    //Direct download
                    if(_.contains(['video', 'image', 'audio'], contentType)) {
                        console.log('direct download');
                        success({
                            remoteFile : that.url,
                            name       : 'todo',
                            thumb      : null,
                            type       : contentType
                        });
                        return;
                    }

                    //More complicated
                    if(contentType == 'page') {

                        var providers = [
                            youtube,
                            //dailymotion,
                            //soundcloud,
                            //html
                        ];

                        //searching good one
                        for(var k in providers){
                            var provider = new providers[k]();

                            console.log(xhr.getResponseHeader('Location'));
                            if(provider.isEligible(that.url)) {
                                console.log('Provider choosen : ' + provider.name);
                                provider.process(that.url, error, success);
                                break;
                            }
                        }
                        return;
                    }
                    xhr.abort();



                    //success()
                }
            }

        }
    });

    return Crawler;
});