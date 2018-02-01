<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/context/mytags.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<title>首页</title>
	<meta name="viewport" content="width=device-width,height=device-height,inital-scale=1.0,maximum-scale=1.0,user-scalable=no;">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="format-detection" content="telephone=no">

	<style type="text/css">
		* {
			margin: 0;
			padding: 0;
		}
		
		li {
			list-style-type: none;
		}
		
		.wz04_content {
			background-color: #121313;
			margin: 0;
		}
		
		.wz04_content a,.wz04_content a:hover,.wz04_content a:visited {
			color: #ffffff;
		}
		
		.content_big_out {
			width: 33.33%;
			float: left;
		}
		
		.content_big {
			background-color: black;
			padding: 0 1px 1px 0;
		}
		
		.content_big_inner {
			background-color: #337DC2;
		}
		
		.content_right_none {
			margin: 0;
		}
		
		.content_big img {
			width: 100%;
		}
		
		.content_smm_one {
			text-align: center;
			padding: 10px 10px 5px;
		}
		
		.content_smm_one img {
			width: 60px;
			height: 60px;
		}
		
		.content_smm_two {
			width: 100%;
			padding-bottom: 5px;
		}
		
		.content_smm_two span {
			display: block;
			line-height: 20px;
			font-size: 16px;
			width: 100%;
			text-align: center;
			color: fffff;
			height: 20px;
			overflow: hidden;
		}
		
		html,body { /*position:relative;
						height:100%;*/
			color: #ffffff;
			font-family: Microsoft YaHei, Helvitica, Verdana, Tohoma, Arial, san-serif;
			background-color: #121313;
			margin: 0;
			padding: 0;
			text-decoration: none;
		}
		
		.clr {
			display: block;
			clear: both;
			height: 0;
			overflow: hidden;
		}
		
		html,body {
			background-color: #ffffff;
		}
		
		.wz13_content {
			background-color: #ffffff;
			margin: 0;
			padding-top: 10px;
		}
		
		.wz13_content a,.wz04_content a:hover,.wz04_content a:visited {
			color: #121313;
		}
		
		.content_smm_one img {
			width: 95px;
			height: 95px;
		}
		
		a {
			text-decoration: none;
		}
		/** 轮播图样式 **/
		.fluid_container {
			margin: 0 auto;
			width: 100%;
		}
	</style>
	<link rel="stylesheet" type="text/css" href="<%=basePath %>/plug-in/weixin/cms/css/iscroll.css">
	<script type="text/javascript">
		var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
		document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F45c2c05021c0a49b04bb7c8fb4994b21' type='text/javascript'%3E%3C/script%3E"));
	</script>
	<script src="<%=basePath %>/plug-in/weixin/cms/js/h.js" type="text/javascript"></script>
	<script src="<%=basePath %>/plug-in/weixin/cms/js/iscroll.js" type="text/javascript"></script>
	<script type="text/javascript">
        var myScroll;
        function loaded() {
            myScroll = new iScroll('wrapper', {
                snap: true,
                momentum: false,
                hScrollbar: false,
                onScrollEnd: function () {
                    document.querySelector('#indicator > li.active').className = '';
                    document.querySelector('#indicator > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';
                }
            });
        }
        document.addEventListener('DOMContentLoaded', loaded, false);
	</script>
</head>
<body>
	<div class="banner">
		<div id="wrapper" style="overflow: hidden;">
			<div id="scroller" style="width: 5396px; -webkit-transition: 0ms; transition: 0ms;">
				<ul id="thelist"> 
				<c:if test="${fn:length(adList)  > 0 }">
				<c:forEach items="${adList}" var="poVal" varStatus="stuts">
				<li><p>${poVal.title}</p><a href="#"><img src="${poVal.imageHref}" style="width: 1349px;"></a></li>
				</c:forEach>
				</c:if>	
				</ul>
			</div>
		</div>
		<div id="nav">
			<div id="prev" onclick="myScroll.scrollToPage(&#39;prev&#39;, 0,400,3);return false">← prev</div>
			<ul id="indicator">
			<li class="">1</li><li class="">2</li><li class="">3</li><li class="active">4</li>			</ul>
			<div id="next" onclick="myScroll.scrollToPage(&#39;next&#39;, 0);return false">next →</div>
		</div>
		<div class="clr"></div>
	</div>
	<script>
        var count = document.getElementById("thelist").getElementsByTagName("img").length;
        for(i = 0; i < count; i++){
            document.getElementById("thelist").getElementsByTagName("img").item(i).style.cssText = " width:"+document.body.clientWidth+"px";
        }
        document.getElementById("scroller").style.cssText = " width:" + document.body.clientWidth * count + "px";
        setInterval(function(){
            myScroll.scrollToPage('next', 0, 400, count);
        },3500 );

        window.onresize = function(){ 
            for(i=0;i<count;i++){
                document.getElementById("thelist").getElementsByTagName("img").item(i).style.cssText = " width:"+document.body.clientWidth+"px";
            }
            document.getElementById("scroller").style.cssText = " width:"+document.body.clientWidth*count+"px";
        } 

	</script>
	<div class="fluid_container">
		<div class="camera_wrap camera_azure_skin" id="camera_wrap_1"></div>
	</div>
	
	<c:forEach items="${columnList}" var="poVal" varStatus="stuts">
	<a href="cmsArticleController.do?cmsArticleListShow&columnId=${poVal.id}" style="color: black;">
		<div class="content_big_out">
			<div>
				<div>
					<div class="content_smm_one">
						<img src="${poVal.imageHref}">
					</div>
					<div class="content_smm_two">
						<span style="font-size: 12px;">${poVal.name}</span>
					</div>
				</div>
			</div>
		</div>
	</a>
	</c:forEach>
	
</body>
</html>