<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/context/mytags.jsp"%>
<c:url var="trip_res" value="/webpage/weixin_trip" />
<!--DOCTYPE html-->
<html ng-app="myApp" lang="zh-cn" style="font-size: 53.3333px;">
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
		
		<link rel="stylesheet" href="${trip_res}/2/signup.css" >
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
	<body class="fixed-bg uzai-member-noload" ng-controller="myCtrl">
    
    <div class="uzai-login-bg uzai-tel-login uzai-wrapper">
        <div class="tel-login">
            <div class="tel-header">
                <a ng-click="historyBack()"><i class="iconfont left icon-close"></i></a>
                <b class="center">登录</b>
                <!-- <a href="#/passwordlogin" class="paw">密码登录</a> -->
            </div>
            <div class="logo" style="background-image:none">

            </div>

            <div class="tel-conts">
                <div class="conts">
                    <p class="tel-input ng-hide">
                        <i class="squ iconfont icon-yuanquan"></i>
                        <input placeholder="微信号" id="openid" ng-model="openid">
                    </p>
                    <p class="tel-input">
                        <i class="squ iconfont icon-yuanquan"></i>
                        <input placeholder="姓名" id="name" ng-model="name"">
                    </p>
                    <p class="tel-input">
                        <i class="squ iconfont icon-yuanquan"></i>
                        <input placeholder="手机号" maxlength="11" id="tel" ng-model="tel" onkeyup="value=value.replace(/[^\d]/g,'')">
                    </p>
                    <p class="tel-input">
                        <i class="squ iconfont icon-yuanquan"></i>
                        <input placeholder="公司名称" id="corpName" ng-model="corpName">
                    </p>
                    <p class="tel-input"><%--  ng-if="showImageCode" --%>
                        <i class="squ iconfont icon-yuanquan"></i>
                        <input placeholder="验证码" maxlength="4" id="imageCode" ng-model="imgCode"><%--  ng-change="setAuthCodeBtnStyle(imgCode)" --%>
                        <b class="img-paw">
                            <img ng-src="{{imageUrl}}" alt="" ng-click="switchImageCode()">
                        </b>
                    </p>
                    <p class="tel-input ng-hide">
                        <i class="squ iconfont icon-yuanquan"></i>
                        <input type="tel" placeholder="输入验证码" id="authCode" maxlength="4" ng-model="value" ng-change="verificationCondition(value)" onkeyup="value=value.replace(/[^\d]/g,'')">
                        <b class="btn get-cord" ng-click="getLoginAuthCode()">获取验证码</b>
                    </p>
                </div>

            </div>
            <p class="friend-tips">未注册的手机号码验证后自动创建账号,且表示您已同意<br><b><a href="###">《用户使用协议》</a></b></p>
        </div>
        <a href="" class="login-now active" ng-click="dynamicLogin()">注册</a>
    </div>

    <script type="text/javascript" src="${trip_res}/2/api.js"></script>
    <%--<script type="text/javascript" src="${trip_res}/2/api-map.js"></script>--%>
    <script type="text/javascript" src="${trip_res}/2/app-bridge.js"></script>
    <script type="text/javascript" src="${trip_res}/2/angular.min.js"></script>
    <script type="text/javascript" src="${trip_res}/2/signup.js"></script>
</body>
</html>