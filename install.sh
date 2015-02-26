rm -rf www/*
cp -R src/app www/app
cp -R src/assets www/assets
cp -R src/build www/build
cp -R src/lib www/lib
cp -R src/tpl www/tpl
cp -R src/app.js www/app.js
cp -R src/index.html www/index.html

cordova platform remove ios
cordova platform remove android

cordova platform add ios
cordova platform add android

cordova plugin add org.apache.cordova.file
cordova plugin add org.apache.cordova.file-transfer
#cordova plugin add org.apache.cordova.inappbrowser
cordova plugin add https://github.com/vvanghelue/cordova-plugin-inappbrowser
cordova plugin add https://github.com/Initsogar/cordova-activityindicator
