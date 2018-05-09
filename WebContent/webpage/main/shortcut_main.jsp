d<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/context/mytags.jsp"%>
<!DOCTYPE html >
<html>
<head>
<title>JeeWx 开源微信管家平台</title>
<t:base type="jquery,easyui,tools,DatePicker,autocomplete"></t:base>
<link rel="shortcut icon" href="images/favicon.ico">
<style type="text/css">
    a {
    	color: Black;
    	text-decoration: none;
    }
    
    a:hover {
    	color: black;
    	text-decoration: none;
    }
    .tree-node-selected{
        background: #eaf2ff;
    }
</style>
</head>
<body class="easyui-layout" style="overflow-y: hidden" scroll="no">
    <!-- 顶部-->
    <div region="north" border="false" title="" style="BACKGROUND: #A8D7E9; height: 100px; padding: 1px; overflow: hidden;">
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
    	<tr>
    		<td align="left" style="vertical-align: text-bottom">
                <!-- 
                <img src="plug-in/weixin/logo/logo_weixin2.png"> 
	            <img src="plug-in/login/images/toplogo.png" width="550" height="52" alt="">
                -->
    		</td>
    		<td align="right" nowrap>
    		<table border="0" cellpadding="0" cellspacing="0">
    			<tr style="height: 25px;" align="right">
    				<td style="" colspan="2">
    				<div style="background: url(plug-in/login/images/top_bg.jpg) no-repeat right center; float: right;">
        				<div style="float: left; line-height: 25px; margin-left: 70px;">
                            <span style="color: #386780">当前用户:</span> 
                            <span style="color: #FFFFFF">${userName }</span>&nbsp;&nbsp;&nbsp;&nbsp; 
                            <span style="color: #386780">职务:</span> 
                            <span style="color: #FFFFFF">${roleName }</span>
                        </div>
        				<div style="float: left; margin-left: 18px;">
            				<div style="right: 0px; bottom: 0px;">
                                <a href="javascript:void(0);" class="easyui-menubutton" menu="#layout_north_kzmbMenu" iconCls="icon-comturn" style="color: #FFFFFF">控制面板</a>&nbsp;&nbsp;
                                <a href="javascript:void(0);" class="easyui-menubutton" menu="#layout_north_zxMenu" iconCls="icon-exit" style="color: #FFFFFF">注销</a>
                            </div>
            				<div id="layout_north_kzmbMenu" style="width: 100px; display: none;">
            					<div onclick="openwindow('用户信息','userController.do?userinfo')">个人信息</div>
            					<div class="menu-sep"></div>
            					<div onclick="add('修改密码','userController.do?changepassword')">修改密码</div>
            					<div class="menu-sep"></div>	
            					<div onclick="add('修改首页风格','userController.do?changestyle')">首页风格</div>
            					<div class="menu-sep"></div>	
            					<div onclick="javascript:window.open('http://yun.jeecg.org')">云插件中心</div>
            				</div>
            				<div id="layout_north_zxMenu" style="width: 100px; display: none;">
            					<div onclick="exit('loginController.do?logout','确定退出该系统吗 ?',1);">退出系统</div>
            				</div>
        				</div>
                        <div style="float: left; margin-left: 8px;margin-right: 5px; margin-top: 5px;">
                            <img src="plug-in/easyui/themes/default/images/layout_button_up.gif" style="cursor:pointer" onclick="panelCollapase()" />
                        </div>
                        <%--update-end--Author:JueYue  Date:20140616 for：首页上方可以折叠--%>
                    </div>
                    </td>
    			</tr>
    			<tr style="height: 80px;">
    				<td colspan="2">
        				<ul class="shortcut">
        					<!-- 动态生成并赋值过来 -->
        				</ul>
    				</td>
    			</tr>
    		</table>
    		</td>
    	</tr>
    </table>
    </div>
    
    <!-- 左侧-->
    <div region="west" split="true" href="loginController.do?shortcut_top" title="导航菜单" style="width: 200px; padding: 1px;"></div>
    
    <!-- 中间-->
    <div id="mainPanle" region="center" style="overflow: hidden;">
        <div id="maintabs" class="easyui-tabs" fit="true" border="false">
        <div class="easyui-tab" title="首页" href="loginController.do?home" style="padding: 2px; overflow: hidden;"></div>
        <c:if test="${map=='1'}">
        	<div class="easyui-tab" title="地图" style="padding: 1px; overflow: hidden;">
                <iframe name="myMap" id="myMap" scrolling="no" frameborder="0" src="mapController.do?map" style="width: 100%; height: 99.5%;"></iframe>
            </div>
        </c:if>
        </div>
    </div>
    
    <!-- 底部 -->
    <div region="south" border="false" style="height: 25px; overflow: hidden;">
        <div align="center" style="color: #CC99FF; padding-top: 2px">&copy; 版权所有 <span class="tip"> 南宁喜洋洋国际旅行社有限公司 </span></div>
    </div>
    
    <div id="mm" class="easyui-menu" style="width: 150px;">
        <div id="mm-tabupdate">刷新</div>
        <div id="mm-tabclose">关闭</div>
        <div id="mm-tabcloseall">全部关闭</div>
        <div id="mm-tabcloseother">除此之外全部关闭</div>
        <div class="menu-sep"></div>
        <div id="mm-tabcloseright">当前页右侧全部关闭</div>
        <div id="mm-tabcloseleft">当前页左侧全部关闭</div>
    </div>
</body>
<script type="text/javascript">

</script>
</html>