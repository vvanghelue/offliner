<div style="
background-image: url('<%= model.get('thumb') %>');
background-size: 100%;
-webkit-filter: blur(5px);
height: 300px;
position: absolute;
left: -5%;
top: -5%;
width: 110%;
background-position: center 30%;
opacity: .2;
"></div>

<div style="position:absolute;width:100%;">
<div class="thumb play" style="background-color:#eee;background-image:url('<%= model.get('thumb') %>');background-size:120%; width:20%;height:40px;float:left;margin:4px;
background-position: center center
">
<video controls src="<%= model.get('localFile') %>"></video>
</div>
<div class="content" style="width:70%;float:left;padding:5px;">
	<h1><%= model.get('name') %></h1>
	<% if(model.get('status') == "downloading") { %>
		<div style="line-height:23px;font-size:23px;">
			<%= Math.round(model.get('downloaded') / 1000000) %>/<%= Math.round(model.get('size')/1000000) %>MB
		</div>
	<% } %>
	<% if(model.get('status') == "complete") { %>
		<div style="line-height:23px;font-size:23px;"><%= Math.round(model.get('size')/1000000) %>MB</div>
	<% } %>

</div>

<div style="clear:both"></div>

<% if(model.get('status') == "downloading") { %>
<div class="progressBar" style="background:rgb(200, 255, 200)">
	<div class="percentage" style="width:<%= model.get('downloaded')/model.get('size') * 100 %>%;"></div>
</div>
<% } %>

<% if(model.get('status') == "complete") { %>
<div class="progressBar" style="background:rgb(100, 230, 250)">
</div>
<% } %>

<% if(model.get('status') == "starting") { %>
<div class="progressBar" style="background:rgb(230, 230, 230)">
</div>
<% } %>

</div>
<style>
.download {
	background: rgba(255, 255, 255, .2);
	margin-bottom: 10px;
	overflow: hidden;
	position: relative;
	height:151px;
}
.progressBar {
	height:3px;
}
.progressBar .percentage{
	background: rgb(100, 240, 100);
	height:3px;
}
.download .content {
	line-height: 15px;
}
.download .content h1 {
	padding:0px;
	font-size: 14px;
	margin:0px;
	font-weight: 200;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}
}
</style>
