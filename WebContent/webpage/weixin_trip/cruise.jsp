<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/context/mytags.jsp"%>
<c:url var="trip_res" value="/webpage/weixin_trip" />
<!--DOCTYPE html-->
<html ng-app="mainApp" lang="zh-cn" style="font-size: 53.3333px;">
	<head lang="en">
		<meta charset="utf-8">
		<meta name="viewport" content="initial-scale=1,maximum-scale=1, minimum-scale=1,user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta http-equiv="Expires" content="-1">
		<meta http-equiv="Cache-Control" content="no-cache">
		<meta http-equiv="Pragma" content="no-cache">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<meta name="format-detection" content="telephone=no">
		<meta name="screen-orientation" content="portrait">
		<meta name="x5-orientation" content="portrait">
		<!-- UC默认竖屏 ，UC强制全屏 -->
		<meta name="full-screen" content="yes">
		<meta name="browsermode" content="application">
		<!-- QQ强制竖屏 QQ强制全屏 -->
		<meta name="x5-orientation" content="portrait">
		<meta name="x5-fullscreen" content="true">
		<meta name="x5-page-mode" content="app">
		
		<link rel="stylesheet" href="${trip_res}/2/detail.css" >
		<link rel="stylesheet" href="${trip_res}/2/addbutton.css" >
		<script type="text/javascript" src="${trip_res}/2/font.js"></script>
		<script type="text/javascript" src="${trip_res}/2/jquery-2.1.1.min.js"></script>
		<style type="text/css">
    		.description-info{
	           background-color:white;
	           margin-bottom:.2rem;
	           border-radius:.1rem;
    		}
		</style>
	</head>
	<body ng-controller="content">
		<!-- 最顶层  detail-content  开始 -->
		<div class="detail-content">
			<!-- 此外,二级页面都是拉出来的那种效果 -->
			<div class="detail uzai-wrapper" id="wrapper" style="display: block;"> 
				<!-- 头部 开始 -->
				<header class="white-topbar none ">
					<!-- 滑动的时候北京变由透明变实 -->
					<div class="con border-bot">
						<a class="back fl" ng-click="goBack()"><i class="iconfont icon-back"></i></a>
						<div class="fr">
							<a class="share ng-hide">
								<i class="iconfont icon-share"></i>
							</a>
							<a class="more"><i class="iconfont icon-more"></i></a>
						</div>
						<div class="title">
							<h1 class=""></h1>
						</div>
					</div>
					<div class="more-list hide">
						<ul>
                            <li><a ng-click="signup()"><i class="iconfont icon-comfooter-wode"></i>注册会员</a></li>
                            <%--
                            <li><a ng-click="GoMyOrder()"><i class="iconfont icon-order"></i>我的订单</a></li>
							<li ng-if="!isApp" class="ng-scope"><a class="history-show" ng-click="history_init()"><i class="iconfont icon-history"></i>浏览历史</a></li>
							<li><a ng-click="GoIndex()"><i class="iconfont icon-home"></i>回到首页</a></li> --%>
						</ul>
					</div>
				</header>
				
				<!-- 行程头部 开始 滚动到相对应的位置才显示 -->
				<div class="trip-header hide">
	
				</div>
                <!-- 行程头部 结束 -->
                <!-- 头部 结束 -->
				
				<!-- 头部以下全是脚 开始 -->
				<div class="wrapper-scroll" id="wrapper-scroll">
					<!-- 头部背景 开始 -->
					<nav class="head-bg swiper-container-headbg">
						<ul class="swiper-wrapper">
                        <li class="swiper-slide" ng-repeat="ProductImg in ProductImgs " find-head-bg>
                            <div ng-if="$index>0" class="swiper-lazy-preloader"></div>
                            <img ng-if="$index==0" ng-src="{{ ProductImg.ImgUrl }}" onerror="onerror=null;src='about:blank'">
                            <img ng-if="$index>0" class="swiper-lazy" data-src="{{ ProductImg.ImgUrl }}" onerror="onerror=null;src='about:blank'">
                        </li>
						</ul>
					</nav>
					<!-- 头部背景 结束 -->
				</div>
                <!-- 头部以下全是脚  结束 -->
                
                <!-- 详情 开始 -->
				<div class="main">
					<div class="scroll-head" id="scroll-head">
						<!-- 产品信息 -->
						<div class="red-com-box">
							<section class="com-box detail-type red-triangle">
								<div class="title">
									<span>
	                                	<i class="iconfont icon-flag "></i> 
	                                	<em class="ng-binding">线路名称</em>
	                            	</span>
								</div>
								<!--
								<p class="number " >产品编号：</p>
								-->
								<p class="con-text " ng-bind-html="ProductInfo.ProductName | trustHtml"></p>
								<div class="on-shelf">
									<div class="price-bot border-top">
										<p class="fl">
											<span class="price">¥ <i class="big ng-binding" ng-bind="ProductInfo.BenefitedPrice"></i><em>起</em></span>
											<span class="gray-under ng-binding" ng-bind="ProductInfo.Price"></span>
											<span class="question-btn" ng-click="QuestionPop()"><i class="iconfont icon-question"></i></span>
										</p>
									</div>
									<div class="com-hr"><i class="l"></i><i class="r"></i></div>
								</div>
							</section>
						</div>
					</div>
                    
					<!-- 国内产品的行程介绍 开始 -->
					<div class="trip periphery">
						<nav class="com-tit">行程介绍<i class="round-ico"></i></nav>
						<section ng-repeat="JouneryGroupInfo in JouneryGroups" ng-class="$index == 0? 'wrap-box':'wrap-box hide'" find-trip-center>
							<div class="com-box" id="jounery-group-info">
								<!-- 14日行程 -->
								<div class="wrap-box-two days-info on">
									<div class="com-box">
										<div class="top">
											<p><label class="fl">行程天数</label> <span class="red ng-binding">{{JouneryGroupInfo.Days}}天{{JouneryGroupInfo.Nights}}晚</span></p>
										</div>
									</div>
									<div class="list">
										<div class="part" ng-repeat="Detail in JouneryGroupInfo.JouneryDetail" class="ng-binding ng-scope">
											<p class="day-tit ng-binding">
												<i class="iconfont icon-calendar"></i>第 {{Detail.Days}} 天
											</p>
											<p class="tit">
    											<span>
    												<em ng-repeat="ProductTravelType in Detail.ProductTravelTypes">
    												<i class="iconfont icon-vehicle-{{ProductTravelType.Type}}" ng-show="!$first"></i>{{ProductTravelType.TreeName}}</em>
    											</span>
											</p>
                                            <div class="five-line text ng-binding" ng-bind-html="Detail.Content | trustHtml"><br></div>
										</div>
									</div>
	
									<a href="javascript:void(0)" ng-click="JouneryInfo_init(JouneryGroupInfo.UzaiJouneryGroupID)" class="trip-info"><i class="iconfont icon-daohangxianlu"></i>详细行程<i class="iconfont icon-right"></i></a>
								</div>
	
							</div>
							
							<div class="list-con">
								<a href="#/purchasenoticejounery" class="com-box buyinfo-btn ">
									<i class="iconfont icon-booking-notice"></i>注意事项<span class="right-btn iconfont icon-right"></span>
								</a>
								<!-- 费用说明 -->
								<div class="wrap-box-two description-info" id="buyinfo-description" ng-hide="JouneryGroupInfo.Notice==''">
									<div class="trip-ls none" ng-bind-html="JouneryGroupInfo.Notice | trustHtml"></div>
								</div>
							</div>
							
							<div class="list-con">
								<a href="#/purchasenoticejounery" class="com-box buyinfo-btn ">
									<i class="iconfont icon-booking-notice"></i>购买须知<span class="right-btn iconfont icon-right"></span>
								</a>
								<!--  -->
								<div class="wrap-box-two description-info" >
									<div class="trip-ls-tit"><span><i class="iconfont icon-costnotinclude"></i>费用包含</span></div>
									<div class="trip-ls none" id="cost-include" ng-show="JouneryGroupInfo.CostInclude!=''" ng-bind-html="JouneryGroupInfo.CostInclude | trustHtml"></div>
	
									<div class="trip-ls-tit margin-hr border-top" ><span><i class="iconfont icon-costnotincludes"></i>费用不包含</span></div>
									<div class="trip-ls none" id="cost-notinclude" ng-show="JouneryGroupInfo.CostNotInclude!=''" ng-bind-html="JouneryGroupInfo.CostNotInclude | trustHtml"></div>
								</div>
							</div>
							
						</section>
					</div>
				</div>
				
			</div> 
		</div> <!-- 最顶层  detail-content 结束  -->
		
		<!-- 详细行程 -->
        <div class="J-router-traveldetail uzai-wrapper j-router" id="detail_wrapper" style="display: none;"></div>
		<script src="${trip_res}/2/api.js"></script>  
		<script src="${trip_res}/2/api-weixin.js"></script>
		<script src="${trip_res}/2/swiper-3.3.1.min.js"></script>
		<script src="${trip_res}/2/angular.min.js"></script>
		<script src="${trip_res}/2/detail.js"></script>
		
	</body>
</html>