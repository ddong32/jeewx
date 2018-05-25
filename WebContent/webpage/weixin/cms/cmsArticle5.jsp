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
    <style type="text/css">
    td.trafficbox select {
    	width: 68px;
    }
    
    #cmsPhotoUploadButton {
    	display: none;
    	position: absolute;
    	z-index: 9;
    	left: 0;
    	top: 0;
    	opacity: 0;
    	filter: alpha(opacity = 0);
    }
    
    #cmsPhotoUploadButton, #cmsPhotoUploadButton input {
    	width: 64px;
    	height: 32px;
    	overflow: hidden;
    }
    
    .uploadButtonWrapper {
    	position: relative;
    	overflow: hidden;
    	width: 48px;
    	height: 20px;
    }
    
    .uploadButtonWrapper input {
    	margin: 0;
    	padding: 0;
    	width: 48px;
    	heigh: 20px;
    }
    
    input.uploadButton {
    	padding: 0;
    	width: 48px !important;
    	height: 20px;
    	position: absolute;
    	z-index: 9;
    	left: 0;
    	top: 0;
    	opacity: 0;
    	filter: alpha(opacity = 0);
    }
    
    #cmsRoutePhotoList, #cmsRoutePhotoList li {
    	margin: 0;
    	padding: 2px;
    	list-style: inside decimal;
    }
    
    .routePhotoItem {
    	cursor: pointer;
    }
    
    .routePhotoItem:hover {
    	text-decoration: underline;
    }
    
    .routePhotoDel {
    	margin-left: 16px;
    	font-weight: bold;
    	color: #F00;
    	cursor: default;
    }
    </style>
</head>
<body class="easyui-layout" fit="true">
    <div data-options="region:'west',split:true" style="width:400px; overflow:hidden;">
        <iframe name="cmsArticlePreviewer" width="100%" height="100%" frameborder="0" src="./cruiseController.do?detail&id=${cmsArticlePage.id}" ></iframe>
    </div>
    
    <div data-options="region:'center',split:true" id="layout-center" style="height:600px; ">
        <!-- 头部图片 -->
        <div class="easyui-layout data-edit-layout" data-options="fit:true" id="data-list">
            <div data-options="region:'center'" title="头部图片" >
            <t:datagrid name="cmsPhotoList" actionUrl="cmsPhotoController.do?datagrid&articleId=${cmsArticlePage.id}" idField="id" fit="true" sortName="createdate" sortOrder="asc" queryMode="group" pagination="false" >
                <t:dgCol title="编号" field="id" hidden="false"></t:dgCol>
                <t:dgCol title="编号" field="realpath" hidden="false"></t:dgCol>
                <t:dgCol title="图片名称" field="attachmenttitle" width="160"></t:dgCol>
                <t:dgCol title="创建时间" field="createdate" width="120" formatter="yyyy-MM-dd hh:mm:ss"></t:dgCol>
                <t:dgCol title="操作" field="opt" width="80"></t:dgCol>
            
                <%-- <t:dgFunOpt title="查看" funname="viewPhoto" /> --%>
                <t:dgFunOpt title="删除" funname="cmsAritcleInterval.delPhoto" />
            
                <t:dgToolBar title="上传" icon="icon-add" onclick="cmsAritcleInterval.uploadPhoto()" width="100%" height="100%"></t:dgToolBar>
                <%-- <t:dgToolBar title="编辑" icon="icon-edit" url="cmsArticleController.do?addorupdate" funname="update" width="100%" height="100%"></t:dgToolBar> --%>
                <t:dgToolBar title="查看" icon="icon-search" onclick="cmsAritcleInterval.viewPhoto()" width="100%" height="100%"></t:dgToolBar>
            </t:datagrid>
            </div>
            
            <div data-options="region:'south'" title="行程列表" style="height:380px">
            <t:datagrid name="cmsRouteList" actionUrl="cmsRouteController.do?datagrid&articleId=${cmsArticlePage.id}" idField="id" fit="true" sortName="createDate" sortOrder="asc" queryMode="group" pagination="false" >
                <t:dgCol title="编号" field="id" hidden="false"></t:dgCol>
                <t:dgCol title="线路" field="articleId" hidden="false"></t:dgCol>
                <t:dgCol title="早" field="breakfastLabel" hidden="false"></t:dgCol>
                <t:dgCol title="中" field="lunchLabel" hidden="false"></t:dgCol>
                <t:dgCol title="晚" field="dinnerLabel" hidden="false"></t:dgCol>
                <t:dgCol title="stay" field="stay" hidden="false"></t:dgCol>
                <t:dgCol title="detail" field="detail" hidden="false"></t:dgCol>
                <t:dgCol title="行程" field="traffic_trim" hidden="false"></t:dgCol>
                <t:dgCol title="行程" field="traffic" width="160"></t:dgCol>
                <t:dgCol title="录入时间" field="createDate" width="120" formatter="yyyy-MM-dd hh:mm:ss"></t:dgCol>
                <t:dgCol title="操作" field="opt" width="80"></t:dgCol>
                <%-- <t:dgFunOpt title="编辑" funname="editRoute" /> --%>
                <t:dgFunOpt title="删除" funname="cmsAritcleInterval.delRoute" />
                <t:dgToolBar title="录入" icon="icon-add" onclick="cmsAritcleInterval.addRoute()" width="100%" height="100%"></t:dgToolBar>
                <t:dgToolBar title="编辑" icon="icon-edit" onclick="cmsAritcleInterval.editRoute()" width="100%" height="100%"></t:dgToolBar>
                <%-- <t:dgToolBar title="查看" icon="icon-search" onclick="viewRoute()" width="100%" height="100%"></t:dgToolBar> --%>
            </t:datagrid>
            </div>
        </div>
        
        <!-- 基本信息  -->
        <div id="edit_cmsArticle" class="easyui-panel data-edit-layout" style="display:none">
        <div class="media_edit_area data-edit-layout">
            <t:formvalid formid="formobj" dialog="true" usePlugin="password" layout="table" action="cmsArticleController.do?save" beforeSubmit="beforeSubmit_formobj">
            <div class="appmsg_editor" style="margin-top: 10px;"><div class="inner"><div id="js_appmsg_editor">
                <div style="margin-top: 0px;">
                    <input type="hidden" name="id" id="id" value="${cmsArticlePage.id }"> 
                    <input type="hidden" name="accountid" value="${cmsArticlePage.accountid}"> 
                    <input type="hidden" name="imageName" id="imageName" value="${cmsArticlePage.imageName}"> 
                    <input type="hidden" name="photosId"> 
                    <input type="hidden" name="routesId">
                    <table cellpadding="0" cellspacing="0" class="formtable" style="background-color:transparent;">
                        <tr>
                            <td align="right" style="width:10em"><label class="Validform_label"> 标题: </label></td>
                            <td class="value"><input class="inputxt" id="title" name="title" style="width: 300px" value="${cmsArticlePage.title}" datatype="*" onblur="setimageTitle(this)"> <span class="Validform_checktip"></span> <label class="Validform_label" style="display: none;">标题</label></td>
                        </tr>
                        <tr>
                            <td align="right"><label class="Validform_label"> 所属栏目: </label></td>
                            <td class="value">
                                <input id="menuentityComboTree" name="menuentityComboTree" value="${cmsArticlePage.menuentityId}" />
                                <input id="menuentityId" name="cmsArticlePage.menuentityId" value="${cmsArticlePage.menuentityId}" />
                                <input id="menuentityComboTree" name="menuentityComboTree" type="text" maxlength="" class="easyui-numberbox" data-options="" missingMessage="请选择辖区" style="width:180px;height:25px;">
                            </td>
                        </tr>
                        <tr>
                            <td align="right"><label class="Validform_label"> 价格: </label></td>
                            <td class="value"><input class="inputxt" id="price" name="price" style="width: 300px" value="${cmsArticlePage.price}"> <span class="Validform_checktip"></span> <label class="Validform_label" style="display: none;">价格</label></td>
                        </tr>
                        <tr>
                            <td align="right"><label class="Validform_label"> 会员价: </label></td>
                            <td class="value"><input class="inputxt" id="price_vip" name="price_vip" style="width: 300px" value="${cmsArticlePage.price_vip}"> <span class="Validform_checktip"></span> <label class="Validform_label" style="display: none;">会员价</label></td>
                        </tr>
                        <tr>
                            <td align="right"><label class="Validform_label"> 上传图片: </label></td>
                            <td class="value"><span class="btn btn-success fileinput-button"> <i class="glyphicon glyphicon-plus"></i> <span>浏览</span> <input id="fileupload" type="file" name="files[]" multiple style="left:0;top:0;padding:0;width:48px!important;height:20px;font-size:12px">
                            </span> <input id="imageHref" name="imageHref" type="hidden" nullmsg="请添加图片" value="${cmsArticlePage.imageHref}"> <span id="imgName"></span> <span class="Validform_checktip"></span> <label class="Validform_label" style="display: none;">图片链接</label></td>
                        </tr>
                        <tr>
                            <td align="right"><label class="Validform_label"> 摘要: </label></td>
                            <td class="value"><textarea class="inputxt" id="summary" name="summary" style="width: 300px;height:80px;">${cmsArticlePage.summary}</textarea> <span class="Validform_checktip"></span> <label class="Validform_label" style="display: none;">摘要</label></td>
                        </tr>
                        <tr>
                            <td align="right"><label class="Validform_label"> 行程天数: </label></td>
                            <td class="value">
                                <%-- <textarea class="inputxt" id="summary" name="summary" style="width: 300px" datatype="*">${cmsArticlePage.summary}</textarea>
                                       <span class="Validform_checktip"></span>
                                       <label class="Validform_label" style="display: none;">行程天数</label> 
                                --%> 
                                <input class="inputxt" id="days" name="days" style="width: 40px" value="${cmsArticlePage.days}">天 <input class="inputxt" id="nights" name="nights" style="width: 40px" value="${cmsArticlePage.nights}">晚
                            </td>
                        </tr>
                    </table>
                </div>
            </div></div></div>
            </t:formvalid>
        </div>
        </div>
        
        <!-- 注意事项 -->
        <div id="data-notice" class="easyui-panel data-edit-layout" style="display:none">
            <%-- <textarea class="inputxt" id="notice" name="notice" style="margin:1px auto;width: 99%;height:220px"></textarea> --%>
            <script id="notice" name="notice" type="text/plain">
                ${cmsArticlePage.notice}
            </script>
        </div>
        
        <!-- 费用包含 -->
        <div id="data-expense-contain" class="easyui-panel data-edit-layout" style="display:none">
            <%-- <textarea class="inputxt" id="expense_contain" name="expense_contain" style="margin:1px auto;width: 99%;height:138px"></textarea> --%>
            <script id="expense_contain" name="expense_contain" type="text/plain">
                ${cmsArticlePage.expense_contain}
            </script>
        </div>
        
        <!-- 费用不包含 -->
        <div id="data-expense-ncontain" class="easyui-panel data-edit-layout" style="display:none">
            <%-- <textarea class="inputxt" id="expense_ncontain" name="expense_ncontain" style="margin:1px auto;width: 99%;height:138px"></textarea> --%>
            <script id="expense_ncontain" name="expense_ncontain" type="text/plain">
                ${cmsArticlePage.expense_ncontain}
            </script>
        </div>
        
    </div>
    </div>


    <%-- 编辑行程窗口 --%>
    <div id="routeWindow" class="easyui-window" data-options="title:'编辑行程',closed:true,collapsible:false,minimizable:false,maximizable:false,modal:true" style="width:740px;height:498px">
        <div class="appmsg_content">
            <form name="routeForm" action="./cmsRouteController.do?save" method="post">
                <input type="hidden" name="articleId" id="articleId" value="${cmsArticlePage.id}" /> <input type="hidden" name="id" /> <input type="hidden" name="routePhotosId" />
                <table cellpadding="0" cellspacing="0" class="formtable" style="background-color:transparent;">
                    <tr>
                        <td align="right" style="width:10em"><label class="Validform_label"> 行程: </label></td>
                        <td class="value"><input class="inputxt" name="traffic_place" style="width: 60px" placeholder="输入地点"> <span id="traffic_box"></span> <img src="./plug-in/easyui/themes/default/images/blank.gif" alt="添加地点" class="icon-add" style="width:16px;height:16px;margin-left:2px" onclick="preparePlace()" /></td>
                    </tr>
                    <tr>
                        <td align="right" style="width:10em"><label class="Validform_label"> 用餐: </label></td>
                        <td class="value trafficbox">
                                                                        早餐 <t:dictSelect field="breakfast" dictTable="t_s_type where typegroupid in (select id from t_s_typegroup where typegroupcode='ycap')" dictField="typecode" dictText="typename" defaultVal="0"></t:dictSelect> , 
                                                                        午餐 <t:dictSelect field="lunch" dictTable="t_s_type where typegroupid in (select id from t_s_typegroup where typegroupcode='ycap')" dictField="typecode" dictText="typename" defaultVal="0"></t:dictSelect> , 
                                                                        晚餐 <t:dictSelect field="dinner" dictTable="t_s_type where typegroupid in (select id from t_s_typegroup where typegroupcode='ycap')" dictField="typecode" dictText="typename" defaultVal="0"></t:dictSelect>
                        </td>
                    </tr>
                    <tr>
                        <td align="right" style="width:10em"><label class="Validform_label"> 住宿: </label></td>
                        <td class="value"><input class="inputxt" name="stay" style="width: 300px"></td>
                    </tr>
                    <tr>
                        <td align="right" style="width:10em">
                            <label class="Validform_label"> 图片<span class="uploadButtonWrapper"><input type="button" value="上传" />: <input id="cmsRoutePhotoupload" type="file" name="cmsRoutePhotoFile" class="uploadButton"></span></label>
                        </td>
                        <td class="value">
                            <div>
                                <ul id="cmsRoutePhotoList"></ul>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="right" style="width:10em"><label class="Validform_label"> 行程描述: </label></td>
                        <td class="value"><script id="routeDetail" name="detail" type="text/plain"></script></td>
                    </tr>
                </table>
                <div style="padding:2px 0;text-align:center;">
                    <input type="button" value="保存行程" class="ui_state_highlight" onclick="saveRoute()">
                </div>
            </form>
        </div>
    </div>
    
    <%-- 查看头部图片窗口 --%>
    <div id="viewPhotoWindow" class="easyui-window" data-options="title:'预览图片',closed:true,collapsible:false,minimizable:false,maximizable:true,modal:true" style="width:700px;height:450px">
        <img id="photoViewer" alt="" width="400" height="400" style="margin:0 auto;" />
    </div>

    <div id="cmsPhotoUploadButton">
        <input type="file" id="cmsPhotoFile" name="cmsPhotoFile" class="uploadButton" />
    </div>
</body>