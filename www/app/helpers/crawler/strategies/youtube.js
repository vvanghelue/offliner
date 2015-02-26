define(function (require) {

    "use strict";

    var _ = require('underscore');

    var Youtube = function(attributes) {
        this.initialize.apply(this, arguments);
    };

    _.extend(Youtube.prototype, {
        initialize: function(){
            console.log('current crawler :' + this);
            window.crawler = this;
        },

        name: 'youtube',

        isEligible: function(url){
            if(url.indexOf('youtu') > -1) {
                return true;
            }
            return false;
        },

        getDomValue: function(selector, attr, callback){
            var urlEvent = 'event' + Math.floor(Math.random() * 9999999);

            var done = false;
            var doneCallback = function(event) {
                console.log(urlEvent);
                var value = event.url.split("#" + urlEvent + "/")[1];
                if(event.url.indexOf(urlEvent) > 0 && !done && value && value != 'null') {
                    done = true;
                    callback(
                        decodeURIComponent(
                            event.url.split("#" + urlEvent + "/")[1]
                        )
                    );
                    return;
                }
            };

            this.window.addEventListener('loadstop', doneCallback);
            this.window.addEventListener('loadstart', doneCallback);

            var code = '(function(){'+
                            'var interval = setInterval(function(){'+
                                'var element = document.querySelectorAll("'+selector+'")[0];';

            if(attr == 'text') {
                code += 'var value = element.innerText;';
                        

            } else if(attr == 'backgroundImage') {

                code += 'var style = element.currentStyle || window.getComputedStyle(element, false);' +
                        'var value = style.backgroundImage.slice(4, -1);';

            } else if(attr == 'src') {
                code += 'var value = element.getAttribute("src");';

            }


            code +=         'if(!element || !value){return}else{clearInterval(interval)}console.log("test '+attr+'");' +
                            'setTimeout(function(){window.location.href = "#' + urlEvent + '/"+value;}, 500);'+
                        '}, 400);' +
                    '})();';

            console.log(code);
            this.window.executeScript({
                code: code
            });
        },

        clickOnElement: function(){
            this.window.executeScript({code: 'document.querySelectorAll("._mop")[0].click();'});
        },

        process: function(url, error, success){
            //success()

            this.window = window.open(url, '_blank', 'hidden=no');

            this.window.executeScript({code: 'window.navigator.userAgent = "Iphone"'});

            ActivityIndicator.show('Please wait...');
            var that = this;
            this.window.addEventListener('loadstop', function(){

                that.getDomValue('._mlab', 'text', function(title){
                    console.log(title)

                    that.getDomValue('._mop', 'backgroundImage', function(thumb){

                        that.clickOnElement('._mop');

                        that.getDomValue('video', 'src', function(video){
                            console.log(video);
                            
                            if(video != null && video != 'null') {
                                success({
                                    thumb: thumb,
                                    name: title,
                                    remoteFile: video,
                                    type: 'video'
                                })
                                ActivityIndicator.hide();
                                that.window.close();
                            }
                        });
                    });
                });


            });
            
            return;
            
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



        }
    });

    return Youtube;
});