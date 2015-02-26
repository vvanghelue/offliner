rm -rf www/*
cp -R www_grunt/app www/app
cp -R www_grunt/assets www/assets
cp -R www_grunt/build www/build
cp -R www_grunt/lib www/lib
cp -R www_grunt/tpl www/tpl
cp -R www_grunt/app.js www/app.js
cp -R www_grunt/index.html www/index.html

cordova build ios