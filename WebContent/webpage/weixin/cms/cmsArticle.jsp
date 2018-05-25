<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/context/mytags.jsp"%>
<!DOCTYPE html>
<html>
<head>
    <title>信息管理</title>
    <t:base type="jquery,easyui,tools,DatePicker"></t:base>
    <link type="text/css" rel="stylesheet" href="plug-in/weixin/css/appmsg_edit.css" />
    <link type="text/css" rel="stylesheet" href="plug-in/weixin/css/jquery.fileupload.css" />
    
    <script type="text/javascript" src="plug-in/ckfinder/ckfinder.js"></script>
    <!--fileupload-->
    <script type="text/javascript" src="plug-in/weixin/js/vendor/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="plug-in/weixin/js/load-image.min.js"></script>
    <script type="text/javascript" src="plug-in/weixin/js/jquery.fileupload.js"></script>
    <script type="text/javascript" src="plug-in/weixin/js/jquery.fileupload-process.js"></script>
    <script type="text/javascript" src="plug-in/weixin/js/jquery.fileupload-image.js"></script>
    <script type="text/javascript" src="plug-in/weixin/js/jquery.iframe-transport.js"></script>
    <!--UEditor-->
    <script type="text/javascript" charset="utf-8" src="plug-in/ueditor/ueditor.config.js"></script>
    <script type="text/javascript" charset="utf-8" src="plug-in/ueditor/ueditor.all.min.js"></script>
    <!--建议手动加在语言，避免在ie下有时因为加载语言失败导致编辑器加载失败-->
    <!--这里加载的语言文件会覆盖你在配置项目里添加的语言类型，比如你在配置项目里配置的是英文，这里加载的中文，那最后就是中文-->
    <script type="text/javascript" charset="utf-8" src="plug-in/ueditor/lang/zh-cn/zh-cn.js"></script>
    <script type="text/javascript" src="webpage/weixin/cms/js/cmsArticle.js"></script>
</head>
<body class="easyui-layout" fit="true">
    <div data-options="region:'center',split:true" id="layout-center" style="height:600px; ">
    </div>
</body>