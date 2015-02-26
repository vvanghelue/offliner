<div class="header" style="padding:10px;padding-top:30px;height:70px;position:absolute;width:100%;z-index:100">
	<input class="form-control" placeholder="Paste url here !" style="width:80%;float:left;"/> 
	<button class="btn btn-primary goButton" style="float:left; margin-left:10px;">Go</button>
</div>

<div class="downloadList">
</div>

<style>
.header{
	position:relative;
	--background:rgba(255, 255, 255, .8);
	background: linear-gradient(to bottom, rgba(0,0,0,1) 0%,rgba(0,0,0,0) 100%); 
}
.header input{
	background: #444;/*rgba(0,0,0,.2);*/
	border-radius: 0px;
	border: none;
}
.header button {
	background: #111 !important;
	border-radius: 0px;
	border: none;
	padding:7.8px 15px;
	margin-left: 11px;
}
.downloadList {
	--background: url('http://my-smashing.smashingapps.netdna-cdn.com/wp-content/uploads/2013/04/blurbackgrounds9.jpg');
	--background: rgba(0, 0, 0, .2);
	background-size: cover;
	position: absolute;
	width:100%;
	height:100%;
	overflow: scroll;
	padding:10px;
	padding-top:80px;
	-webkit-overflow-scrolling:touch;
  	-webkit-transform: translate3d(0,0,0);
}
</style>