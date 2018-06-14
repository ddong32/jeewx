<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/context/mytags.jsp"%>
<!DOCTYPE html>
<html>
<head>
    <title>信息管理</title>
    <t:base type="jquery,easyui,tools"></t:base>
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
<body style="overflow-y: scroll" >
    <t:formvalid formid="formobj" dialog="true" usePlugin="password" layout="table" action="cmsArticleController.do?save">
    	<input id="id" name="id" type="hidden" value="${cmsArticlePage.id }">
    	<table cellpadding="0" cellspacing="1" class="formtable">
    		<tr>
    			<td align="right"><label class="Validform_label">标题:</label></td>
    			<td class="value">
    				<input class="inputxt" id="title" name="title" style="width: 300px" value="${cmsArticlePage.title}" datatype="*" >
    				<span class="Validform_checktip"></span>
    			</td>
    		</tr>
            <tr>
                <td align="right"><label class="Validform_label"> 行程天数: </label></td>
                <td class="value">
                    <input class="inputxt" id="days" name="days" style="width: 40px" value="${cmsArticlePage.days}">天 
                    <input class="inputxt" id="nights" name="nights" style="width: 40px" value="${cmsArticlePage.nights}">晚
                </td>
            </tr>
    		<tr>
    			<td align="right"><label class="Validform_label">所属栏目:</label></td>
    			<td class="value">
                    <input type="hidden" id="menuentityId" name="menuentityId" value="${cmsArticlePage.menuentityId}">
                    <input type="text" id="menuentityTree" name="menuentityTree" style="width: 305px;" value="" />
    				<span class="Validform_checktip"></span>
    			</td>
    		</tr>
    		<tr>
    			<td align="right"><label class="Validform_label">行程特色:</label></td>
    			<td class="value">
    				<textarea class="inputxt" id="summary" name="summary" style="width: 300px; height: 80px" datatype="*">${cmsArticlePage.summary}</textarea>
    				<span class="Validform_checktip"></span>
    			</td>
    		</tr>
    		<tr>
    			<td align="right"><label class="Validform_label">形象图:</label></td>
    			<td class="value" >
                    <table id="cmsPhotoList" class="easyui-datagrid" style="width:400px;height:150px"
                        data-options="
                            rownumbers:true,
                            singleSelect:true,
                            collapsible:true,
                            url:'cmsPhotoController.do?datagrid&articleId=${cmsArticlePage.id}',
                            method:'get',
                            toolbar:'#cmsPhotoListtb'" >
                        <thead>
                        <tr class="">
                            <th data-options="field:'id',hidden:true,width:100">编号</th>
                            <th data-options="field:'attachmenttitle',width:100">图片名称</th>
                            <th data-options="field:'createdate',width:100">创建时间</th>
                            <th data-options="field:'nvn',width:50,
                                formatter:function(value,rec,index){
                                    return '<a href=\'#\' onclick=\'cmsAritcleInterval.delPhoto('+index+')\'>[删除]</a>';
                                }">操作</th>
                        </tr>
                        </thead>
                    </table>
                    <div id="cmsPhotoListtb">  
                        <a href="#" class="easyui-linkbutton datagrid-toolbar" icon="icon-add" plain="true" onclick="cmsAritcleInterval.uploadPhoto()">上传</a>
                        <a href="#" class="easyui-linkbutton" icon="icon-search" plain="true" onclick="cmsAritcleInterval.viewPhoto()">查看</a>
                    </div>
    			</td>
    		</tr>
            <tr>
                <td align="right"><label class="Validform_label">排期价格:</label></td>
                <td class="value">
                    <table id="cmsSubscribeList" class="easyui-datagrid" style="width:400px;height:150px" 
                        data-options="
                            rownumbers:true,
                            singleSelect:true,
                            url:'cmsScheduleController.do?datagrid&articleId=${cmsArticlePage.id}',
                            method:'get',
                            toolbar:'#cmsSubscribeListtb'" >
                        <thead>
                        <tr class="datagrid-header-row">
                            <th data-options="field:'id',hidden:true,width:100">编号</th>
                            <th data-options="field:'gooff',width:100">出发时间</th>
                            <th data-options="field:'price',width:100">市场价</th>
                            <th data-options="field:'price_vip',width:100">同行返佣</th>
                            <th data-options="field:'price_room',width:100">单房差</th>
                            <th data-options="field:'nvn',width:50">操作</th>
                        </tr>
                        </thead>
                    </table>  
                    <div id="cmsSubscribeListtb">  
                        <a href="#" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="javascript:alert('录入')">录入</a>  
                        <a href="#" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="javascript:alert('Cut')">编辑</a>  
                    </div>
                </td>
            </tr>
            <tr>
                <td align="right"><label class="Validform_label">行程安排:</label></td>
                <td class="value">
                    <table id="cmsRouteList" class="easyui-datagrid" style="width:400px;height:150px" 
                        data-options="
                            rownumbers:true,
                            singleSelect:true,
                            url:'cmsRouteController.do?datagrid&articleId=${cmsArticlePage.id}',
                            method:'get',
                            toolbar:'#cmsRouteListtb'" >
                        <thead>
                        <tr class="datagrid-header-row">
                            <th data-options="field:'id',hidden:true,width:100">编号</th>
                            <th data-options="field:'traffic',width:150">行程</th>
                            <th data-options="field:'stay',width:100">酒店</th>
                            <th data-options="field:'breakfastLabel',width:50">早餐</th>
                            <th data-options="field:'lunchLabel',width:50">中餐</th>
                            <th data-options="field:'dinnerLabel',width:50">晚餐</th>
                            <th data-options="field:'nvn',width:50,
                                formatter:function(value,rec,index){
                                    return '<a href=\'#\' onclick=\'cmsAritcleInterval.delRoute('+index+')\'>[删除]</a>';
                                }">操作</th>
                        </tr>
                        </thead>
                    </table>  
                    <div id="cmsRouteListtb">  
                        <a href="#" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="javascript:cmsAritcleInterval.addRoute()">录入</a>  
                        <a href="#" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="javascript:cmsAritcleInterval.editRoute()">编辑</a>  
                    </div>  
                </td>
            </tr>
    		<tr>
    			<td align="right">
    				<label class="Validform_label">费用包含 :</label>
    			</td>
    			<td class="value">
                    <textarea class="inputxt" id="expense_contain" name="expense_contain" style="width: 300px; height: 80px" datatype="*">${cmsArticlePage.expense_contain}</textarea>
    			</td>
    		</tr>
    		<tr>
    			<td align="right">
    				<label class="Validform_label">费用不包含 :</label>
    			</td>
                <td class="value">
                    <textarea class="inputxt" id="expense_ncontain" name="expense_ncontain" style="width: 300px; height: 80px" datatype="*">${cmsArticlePage.expense_ncontain}</textarea>
                </td>
    		</tr>
            <tr>
                <td align="right">
                    <label class="Validform_label">购物说明:</label>
                </td>
                <td class="value">
                    <textarea class="inputxt" id="shopping_explanation" name="shopping_explanation" style="width: 300px; height: 80px" datatype="*">${cmsArticlePage.shopping_explanation}</textarea>
                </td>
            </tr>
            <tr>
                <td align="right">
                    <label class="Validform_label">自费说明:</label>
                </td>
                <td class="value">
                    <textarea class="inputxt" id="selfpaying_explanation" name="selfpaying_explanation" style="width: 300px; height: 80px" datatype="*">${cmsArticlePage.selfpaying_explanation}</textarea>
                </td>
            </tr>
            <tr>
                <td align="right">
                    <label class="Validform_label">补充协议:</label>
                </td>
                <td class="value">
                    <textarea class="inputxt" id="add_agreement" name="add_agreement" style="width: 300px; height: 80px" datatype="*">${cmsArticlePage.add_agreement}</textarea>
                </td>
            </tr>
    	</table>
    </t:formvalid>
    
    <%-- 编辑行程窗口 --%>
    <div id="routeWindow" class="easyui-window" data-options="title:'编辑行程',closed:true,collapsible:false,minimizable:false,maximizable:false,modal:true" style="width:740px;height:498px">
        <div class="appmsg_content">
            <form name="routeForm" action="./cmsRouteController.do?save" method="post">
                <input type="hidden" name="articleId" id="articleId" value="${cmsArticlePage.id}" /> 
                <input type="hidden" name="id" /> 
                <input type="hidden" name="routePhotosId" />
                <table cellpadding="0" cellspacing="0" class="formtable" style="background-color:transparent;">
                    <tr>
                        <td align="right" style="width:10em"><label class="Validform_label"> 行程: </label></td>
                        <td class="value">
                            <input class="inputxt" name="traffic_place" style="width: 60px" placeholder="输入地点"> 
                            <span id="traffic_box"></span>
                            <img src="./plug-in/easyui/themes/default/images/blank.gif" alt="添加地点" class="icon-add" style="width:16px;height:16px;margin-left:2px;margin-top:10px" onclick="cmsAritcleInterval.preparePlace()" />
                        </td>
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
                            <label class="Validform_label"><span class="uploadButtonWrapper"><input type="button" value="图片上传" class="ui_state_highlight"/> <input id="cmsRoutePhotoupload" type="file" name="cmsRoutePhotoFile" class="uploadButton"></span></label>
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
                    <input type="button" value="保存行程" class="ui_state_highlight" onclick="cmsAritcleInterval.saveRoute()">
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