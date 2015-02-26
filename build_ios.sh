rm -rf www/*
cp -R src/app www/app
cp -R src/assets www/assets
cp -R src/build www/build
cp -R src/lib www/lib
cp -R src/tpl www/tpl
cp -R src/app.js www/app.js
cp -R src/index.html www/index.html

cordova build ios
