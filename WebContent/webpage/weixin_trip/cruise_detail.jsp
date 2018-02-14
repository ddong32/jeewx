<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/context/mytags.jsp"%>
<c:url var="trip_res" value="/webpage/weixin_trip" />
<meta charset="UTF-8">
<!-- 更多行程子页面 -->


<!-- 头部 开始 -->
<header id="j_traveldetail_hd" class="hd">
    <!-- 滑动的时候北京变由透明变实 -->
    <a ng-click="routerGoBack();" class="back"><i class="iconfont icon-back"></i></a> 详细行程
</header>
<!-- 头部 结束 -->
<div class="traveldetail">

    <div id="dropdown" class="dropdown">
        <div class="ondays" id="ondays_title">
            <i class="iconfont icon-calendar"></i>第
            <i id="showday" class="showday">1</i>天
            <i class="xiala"></i>
            <a id="ondays"></a>
        </div>
    </div>
    <!-- 下拉菜单开始 -->
    <div class="days " id="j-drop-wrapper">
        <div class="ondayscon ">
            <ul id="j-t-scroller" class="line">
                <li ng-repeat="Info in  JouneryDayInfo" ng-click="JouneryInfo_days($index);">
                    <span class="onday">第<i class="daynumber">{{Info.Days}}</i>天</span>
                    <span class="onday">
                        <i class="startadr" ng-repeat="ProductTravelType in  Info.ProductTravelTypes"><em class="iconfont icon-vehicle-{{ProductTravelType.Type}}" ng-show="!$first"></em>{{ProductTravelType.TreeName}}</i>
                    </span>

                </li>
            </ul>
        </div>
    </div>
    <!-- 下拉菜单结束 -->
    <!-- 列表开始 -->
    <div class="travels" id="t-wrapper">
        <div class="" id="t-scroller">
            <!--<section class="tsection" ng-repeat="JouneryInfo in  JouneryDayInfo" travel-detail>-->
            <section class="tsection" ng-repeat="JouneryInfo in  JouneryDayInfo">
                <!-- 第几天开始 -->
                <div class="daytitle" ng-show="$index!=0">
                    <span class="ellipse"><i class="iconfont icon-calendar"></i></span>
                    <span class="theday">第{{JouneryInfo.Days}}天</span>
                </div>
                <!-- 第几天结束 -->
                <!-- 旅游内容开始 -->
                <div class="travelistone">
                    <div class="place">
                        <div class="placecontent">
                            <span class="startp" ng-repeat="JouneryProductTravelType in  JouneryInfo.ProductTravelTypes">
                                <i class="iconfont icon-vehicle-{{JouneryProductTravelType.Type}}" ng-show="!$first"></i>
                                {{JouneryProductTravelType.TreeName}}
                            </span>
                        </div>
                    </div>
                    <!-- 轮播开始 -->
                    <div class="swiper-container" ng-show="JouneryInfo.JouneryImgInfo.length>0" style="height:2.4rem;">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" ng-repeat="ImgInfo in  JouneryInfo.JouneryImgInfo">
                                <img ng-src={{ImgInfo.ImgUrl}} class="slideimg" src="" onerror="onerror=null;src='about:blank'">
                                <p>{{ImgInfo.TreeName}}</p>
                            </div>
                        </div>
                    </div>
                    <!-- 轮播结束 -->
                    <div class="dinner mt20" ng-show="JouneryInfo.StartTime!='00:00' &&JouneryInfo.EndTime!='23:00'">
                        <i class="iconfont icon-timeon fl"></i>
                        <div class="breakcon">
                            <span class="timeon">{{JouneryInfo.StartTime}}<i class="timeline"></i>{{JouneryInfo.EndTime}}</span>
                        </div>

                    </div>
                    <div class="dinner mt20">
                        <i class="iconfont icon-meal fl"></i>

                        <div class="breakcon" ng-if="JouneryInfo.Lunch===''">
                            <span class="breakfast">用餐:</span>自理
                        </div>

                        <div class="breakcon" ng-if="JouneryInfo.Lunch!=''">
                            <span class="breakfast">用餐:</span>{{ JouneryInfo.Lunch }}
                        </div>

                    </div>
                    <div class="dinner">
                        <i class="iconfont icon-hotel fl"></i>
                        <div class="jiudiancon">
                            <span class="breakfast">特色酒店_参考酒店:</span><span class="ml30">{{JouneryInfo.HotelList}}</span>
                        </div>
                    </div>
                    <p class="traveldec" ng-bind-html="JouneryInfo.Content | trustHtml"></p>
                </div>
                <!-- 旅游内容结束 -->
            </section>

        </div>
    </div>
    <!-- 列表结束 -->
</div>
<script src="${trip_res}/2/traveldetail.js"></script>