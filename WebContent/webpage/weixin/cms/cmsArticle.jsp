<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/context/mytags.jsp"%>
<!DOCTYPE html>
<html>
<head>
    <title>信息管理</title>
    <t:base type="jquery,easyui,tools"></t:base>
    <link type="text/css" rel="stylesheet" href="plug-in/weixin/css/appmsg_edit.css" />
    <link type="text/css" rel="stylesheet" href="plug-in/weixin/css/jquery.fileupload.css" />
    <link type="text/css" rel="stylesheet" href="plug-in/kindeditor/themes/default/default.css" />
    <script type="text/javascript" src="plug-in/ckfinder/ckfinder.js"></script>
    <!--fileupload-->
    <script type="text/javascript" src="plug-in/weixin/js/vendor/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="plug-in/weixin/js/load-image.min.js"></script>
    <script type="text/javascript" src="plug-in/weixin/js/jquery.fileupload.js"></script>
    <script type="text/javascript" src="plug-in/weixin/js/jquery.fileupload-process.js"></script>
    <script type="text/javascript" src="plug-in/weixin/js/jquery.fileupload-image.js"></script>
    <script type="text/javascript" src="plug-in/weixin/js/jquery.iframe-transport.js"></script>
    <!--UEditor -->
    <script type="text/javascript" charset="utf-8" src="plug-in/ueditor/ueditor.config.js"></script>
    <script type="text/javascript" charset="utf-8" src="plug-in/ueditor/ueditor.all.min.js"></script>
    <!--建议手动加在语言，避免在ie下有时因为加载语言失败导致编辑器加载失败-->
    <!--这里加载的语言文件会覆盖你在配置项目里添加的语言类型，比如你在配置项目里配置的是英文，这里加载的中文，那最后就是中文-->
    <script type="text/javascript" charset="utf-8" src="plug-in/ueditor/lang/zh-cn/zh-cn.js"></script>
    
    <!-- kindeditor 
    <script type="text/javascript" charset="utf-8" src="plug-in/kindeditor/kindeditor-min.js"></script>
    <script type="text/javascript" charset="utf-8" src="plug-in/kindeditor/lang/zh_CN.js"></script>
    -->
    <script type="text/javascript" src="webpage/weixin/cms/js/cmsArticle.js"></script>
    <style type="text/css">
    @charset "utf-8";
    /* CSS 全局 */
    body,div,form,img,p,ul,ol,li,table,th,td,dl,dt,dd,h1,h2,h3,h4,h5,h6,pre,input,button,select,textarea,fieldset {margin:0;padding:0;}
    table {border-collapse:collapse;border-spacing:0}
    ul,ol,li {list-style:none;}
    ul li{zoom:1; vertical-align:baseline;}
    input,label,select,option,textarea,button,fieldset,legend,textarea {font:12px Arial,Simsun,Helvetica,sans-serif;} 
    a img,img{border:0;}
    a {color:#333; text-decoration:none;}
    a:hover {color:#F00; text-decoration:none;}
    body {background:#EBEBEB; font-family:"宋体"; font-size:12px;}
    
    td.trafficbox select{width:68px;}
    #cmsPhotoUploadButton{position:absolute;top:0;left:0;z-index:9;opacity:0;filter:alpha(opacity=0);}
    #cmsPhotoUploadButton,#cmsPhotoUploadButton input{overflow:hidden;width:64px;height:32px;}
    .uploadButtonWrapper{position:relative;overflow:hidden;width:48px;height:20px;}
    .uploadButtonWrapper input{margin:0;padding:0;width:48px;heigh:20px;}
    input.uploadButton{position:absolute;top:0;left:0;z-index:9;padding:0;width:48px!important;height:20px;opacity:0;filter:alpha(opacity=0);}
    #cmsRoutePhotoList,#cmsRoutePhotoList li{margin:0;padding:2px;list-style:inside decimal;}
    .routePhotoItem{cursor:pointer;}
    .routePhotoItem:hover{text-decoration:underline;}
    .routePhotoDel{margin-left:16px;color:red;font-weight:700;cursor:default;}
    
    /* 通用CSS样式 */
    .fb {font-weight:bold;}
    .f14 {font-size:14px;}
    .red {color:#F00;}.blue{color:#00F;}.green{color:#090;}
    .grayBC {background-color:#CCC;}
    .w20 {width:20px;}.w30{width:30px;}.w40{width:40px;}.w50{width:50px;}.w60{width:60px;}.w70{width:70px;}.w80{width:80px;}.w90{width:90px;}
    .w100{width:100px;}.w120{width:120px;}.w130{width:130px;}.w150{width:150px;}.w160{width:160px;}.w200{width:200px;}.w220{width:220px;}.w250{width:250px;}.w270{width:270px;}
    .h10 {height:10px;}.h18 {height:18px;}.h20{height:20px;}.h22{height:22px;}.h80{height:80px;}
    .h200{height:200px;}
    .w40p {width:40%;}.w50p {width:50%;}.w60p {width:60%;}.w70p {width:70%;}.w80p {width:80%;}.w95p {width:95%;}.w100p {width:100%;}
    
    /* 主区域CSS */
    .main_td {border:1px #CCC solid; background-color:#FFF; padding:10px; margin: 0px}
    .main_table {margin:5px 0; border:solid 1px #CCC;}
    .main_table th {height:18px; background-color:#EFEFEF; font-size:12px; font-weight:normal; border:solid 1px #CCC; padding:5px;}
    .main_table td {height:18px; border:solid 1px #CCC; padding:5px; line-height:21px;}
    .main_table_tr:hover {background-color:#FFFFCC;}
    .main_table input {border:#000 1px solid; padding:1px;}
    .main_table select {border:#000 1px solid;}
    .main_table textarea {resize:none; border:#000 1px solid;}
    .txtmenu {width:100%; margin:0 auto; height:31px; border-bottom:3px solid #0198C8;}
    .txtmenu a {line-height:31px; padding-left:8px; margin-right:5px; float:left; color:#000; background:url(../imagesd/tab_li.gif) left top no-repeat; text-decoration:none;}
    .txtmenu a b {display:block; padding-right:8px; float:left;background:url(../imagesd/tab_li.gif) right top no-repeat; text-decoration:none; font-weight:normal; cursor:pointer;}
    .txtmenu a:hover,.txtmenu a.cur {background:url(../imagesd/tab_hover.jpg) left top no-repeat; color:#FFF;}
    .txtmenu a:hover b,.txtmenu a.cur b {background:url(../imagesd/tab_hover.jpg) right top no-repeat; color:#FFF;}
    
    /* addTour,xxxc */
    .addTour .ke-button-common {margin-top:5px;}
    .addTour .ke-button-common .ke-button {margin-top:0 !important; border:0 !important;}
    .addTour .photo {width:178px !important; float:left !important; height:19px !important; margin-top:5px !important;}
    .addTour img {width:178px; height:98px; border:1px solid #CCC;padding:2px;}
    .addTour .ke-button {border:0 !important;}
    </style>
</head>
<body style="overflow-y: scroll">
    <table clas="body_table" width="100%"><tbody><tr><td class="main_td" width="99%">
    <t:formvalid formid="formobj" dialog="true" usePlugin="password" layout="table" action="cmsArticleController.do?save" beforeSubmit="cmsAritcleInterval.beforeSubmit_formobj">
        <input type="hidden" name="tdays" value="5" autocomplete="off">
        <table class="main_table addTour" width="100%">
            <tbody>
               <colgroup>
                    <col width="10%"/>
                    <col width="70%"/>
                    <col width="20%"/>
                </colgroup>
                <tr>
                    <td align="right"><label class="Validform_label">所属栏目：</label></td>
                    <td class="value">
                        <input type="hidden" id="menuentityId" name="menuentityId" value="${cmsArticlePage.menuentityId}">
                        <input class="easyui-combotree" id="menuentityTree" name="menuentityTree" style="width: 305px;" value="" />
                        <span class="Validform_checktip"></span>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td align="right"><label class="Validform_label">状态：</label></td>
                    <td>
                        <select id="checked" name="checked" class="easyui-combotree">
                            <option value="0">上架</option>
                            <option value="1">下架</option>              
                        </select>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td align="right"><label class="Validform_label">线路标题：</label></td>
                    <td><input type="text" name="title" class="w70p h18" maxlength="20" autocomplete="off" value="${cmsArticlePage.title}"> <span class="red">*</span> 20个字符内</td>
                    <td>如：北京纯玩双飞六日游</td>
                </tr>
                <tr>
                    <td align="right"><label class="Validform_label">行程特色：</td>
                    <td><textarea class="inputxt" id="summary" name="summary" style="width: 718px;height:50px;">${cmsArticlePage.summary}</textarea></td>
                    <td>如：全程零购物、五星住宿，观升旗仪式，赏香山枫情，品老北京特色美食</td>
                </tr>
                <tr id="tr3" style="display:none;">
                    <td>出团日期：</td>
                    <td>
                        <input type="text" id="TxtDateDesc" name="TxtDateDesc" class="w70p h18" readonly="" autocomplete="off">
                        <input type="button" id="btnDate" name="btnDate" value=" 选 择 " class="h22" onclick="SelectDate(document.frmMain,'60','document.frmMain.TxtDateDesc');" autocomplete="off"> <span class="red">*</span>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td align="right"><label class="Validform_label">标题图片：</label></td>
                    <td>
                        <table id="cmsPhotoList" class="easyui-datagrid" style="width:720px;height:220px"
                            data-options="rownumbers:true,singleSelect:true,collapsible:true,method:'get',
                                url:'cmsPhotoController.do?datagrid&articleId=${cmsArticlePage.id}', toolbar:'#cmsPhotoListtb'" >
                            <thead>
                            <tr class="">
                                <th data-options="field:'id',hidden:true,width:100">编号</th>
                                <th data-options="field:'nva',width:50,
                                    formatter:function(value,rec,index) {
                                        return '<img style=\'width:30px;height:24px;margin:0\' border=\'1\' src=\'' + rec.realpath + '\'/>';
                                    }">图片</th>
                                <th data-options="field:'createdate',width:140">创建时间</th>
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
                    <td><span class="red">*</span> 最多可上传四张标题图片。</td>
                </tr>
                <tr id="tr4">
                    <td align="right"><label class="Validform_label">排期价格：</label></td>
                    <td>
                        <table id="cmsScheduleList" class="easyui-datagrid" style="width:720px;height:170px"
                            data-options="rownumbers:true,singleSelect:true,collapsible:true,method:'get',
                                url:'cmsScheduleController.do?datagrid&articleId=${cmsArticlePage.id}', toolbar:'#cmsScheduleListtb'" >
                            <thead>
                            <tr class="">
                                <th data-options="field:'id',hidden:true,width:100">序</th>
                                <th data-options="field:'gooff',width:100">排期</th>
                                <th data-options="field:'price',width:100">价格</th>
                                <th data-options="field:'priceVip',width:100">会员价格</th>
                                <th data-options="field:'createDate',width:140">创建时间</th>
                                <th data-options="field:'nvn',width:50,
                                    formatter:function(value,rec,index){
                                        return '<a href=\'#\' onclick=\'cmsAritcleInterval.delSchedule('+index+')\'>[删除]</a>';
                                    }">操作</th>
                            </tr>
                            </thead>
                        </table>
                        <div id="cmsScheduleListtb">
                            <a href="javascript:void(0)" class="easyui-linkbutton datagrid-toolbar" icon="icon-add" plain="true" onclick="cmsAritcleInterval.addSchedule()">录入</a>
                            <a href="javascript:void(0)" class="easyui-linkbutton datagrid-toolbar" icon="icon-edit" plain="true" onclick="cmsAritcleInterval.editSchedule()">编辑</a>
                        </div>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td align="right"><label class="Validform_label">功能选项：</label></td>
                    <td>行程 <input type="text" value="5" class="w30 h18 grayBC" readonly="" autocomplete="off"> 天 <input type="text" name="tdaysIn" value="4" class="w30 h18" maxlength="2" onkeyup="value=value.replace(/[^\d]/g,'')" onblur="value=value.replace(/[^\d]/g,'')" autocomplete="off"> 晚 <span class="red">*</span>&nbsp; 
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td align="right"><label class="Validform_label">详细行程：</label></td>
                    <td>
                        <t:datagrid name="cmsRouteList" actionUrl="cmsRouteController.do?datagrid&articleId=${cmsArticlePage.id}" idField="id" fit="true" sortName="createDate" sortOrder="asc" queryMode="group" pagination="false" >
                            <t:dgCol title="编号" field="id" hidden="true"></t:dgCol>
                            <t:dgCol title="行程" field="traffic" width="160"></t:dgCol>
                            <t:dgCol title="早" field="breakfastLabel" hidden="false"></t:dgCol>
                            <t:dgCol title="中" field="lunchLabel" hidden="false"></t:dgCol>
                            <t:dgCol title="晚" field="dinnerLabel" hidden="false"></t:dgCol>
                            <t:dgCol title="stay" field="stay" hidden="false"></t:dgCol>
                            <t:dgCol title="录入时间" field="createDate" width="120" formatter="yyyy-MM-dd hh:mm:ss"></t:dgCol>
                            <t:dgCol title="操作" field="opt" width="80"></t:dgCol>
                            <%-- <t:dgFunOpt title="编辑" funname="editRoute" /> --%>
                            <t:dgFunOpt title="删除" funname="cmsAritcleInterval.delRoute" />
                            <t:dgToolBar title="录入" icon="icon-add" onclick="cmsAritcleInterval.addRoute()" width="100%" height="100%"></t:dgToolBar>
                            <t:dgToolBar title="编辑" icon="icon-edit" onclick="cmsAritcleInterval.editRoute()" width="100%" height="100%"></t:dgToolBar>
                            <%-- <t:dgToolBar title="查看" icon="icon-search" onclick="viewRoute()" width="100%" height="100%"></t:dgToolBar> --%>
                        </t:datagrid>
                    </td>
                    <td>请在有效景点行程中上传景点图片，否则无法通过审核。</td>
                </tr>
                <tr>
                    <td align="right"><label class="Validform_label">费用包含：</label></td>
                    <td>
                        <%-- <textarea id="expense_contain" name="expense_contain" style="width:718px; height:200px;"></textarea> --%>
                        <script id="expense_contain" name="expense_contain" type="text/plain">
                            ${cmsArticlePage.expense_contain}
                        </script>
                    </td>
                    <td><span class="red">*</span></td>
                </tr>
                <tr>
                    <td align="right"><label class="Validform_label">费用不含：</label></td>
                    <td>
                        <%-- <textarea id="expense_nocontain" name="expense_nocontain" style="width:718px; height:200px;">${cmsArticlePage.expense_ncontain}</textarea>--%>
                        <script id="expense_ncontain" name="expense_ncontain" type="text/plain">
                            ${cmsArticlePage.expense_ncontain}
                        </script>
                    </td>
                    <td><span class="red">*</span></td>
                </tr>
                <tr>
                    <td align="right"><label class="Validform_label">出团须知：</label></td>
                    <td>
                        <%-- <textarea id="notice" name="notice" style="width:718px; height:200px;">${cmsArticlePage.notice}</textarea> --%>
                        <script id="notice" name="notice" type="text/plain">
                            ${cmsArticlePage.notice}
                        </script>
                    </td>
                    <td><span class="red">*</span></td>
                </tr>
                <tr style="display:none;">
                    <td align="right"><label class="Validform_label">购 物 店：</label></td>
                    <td>
                        <table id="shopBody" class="tabLineDate" cellspacing="0" cellpadding="2" border="0" style="width:100%;">
                            <tbody>
                                <tr>
                                    <th colspan="5" align="left"><input type="button" value="添加购物店" class="h22" onclick="javascript:addShopRow();" autocomplete="off"></th>
                                </tr>
                                <tr>
                                    <th class="w80">地点</th>
                                    <th class="w200">场所名称</th>
                                    <th>主要商品</th>
                                    <th class="w120">停留时间(分钟)</th>
                                    <th class="w50">操作</th>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td>若行程有购物店，必须填写。<span class="red">购物店的每一个小项均必须填写。</span></td>
                </tr>
                <tr style="display:none;">
                    <td align="right"><label class="Validform_label">自费项目：</label></td>
                    <td>
                        <table id="zfxmBody" class="tabLineDate" cellspacing="0" cellpadding="2" border="0" style="width:100%;">
                            <tbody>
                                <tr>
                                    <th colspan="5" align="left"><input type="button" value="添加自费项目" class="h22" onclick="javascript:addZfxmRow();" autocomplete="off"></th>
                                </tr>
                                <tr>
                                    <th class="w80">地点</th>
                                    <th class="w80">费用(元)</th>
                                    <th>名称和内容</th>
                                    <th class="w120">停留时间(分钟)</th>
                                    <th class="w50">操作</th>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td>若行程有自费项目，必须填写。<span class="red">自费项目的每一个小项均必须填写。</span></td>
                </tr>
            </tbody>
        </table>
        <input id="id" name="id" type="hidden" value="${cmsArticlePage.id }"> 
        <input type="hidden" name="accountid" value="${cmsArticlePage.accountid}"> 
        <input type="hidden" name="imageName" id="imageName" value="${cmsArticlePage.imageName}"> 
        <input type="hidden" name="photosId"> 
        <input type="hidden" name="routesId">
    </t:formvalid>
    </td></tr></tbody></table>
    <%-- 结束  --%>
    
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
                            <img src="./plug-in/easyui/themes/default/images/blank.gif" alt="添加地点" class="icon-add" style="width:16px;height:16px;margin-left:2px;cursor:pointer;" onclick="cmsAritcleInterval.preparePlace()" /></td>
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
                            <label class="Validform_label"> 图片<span class="uploadButtonWrapper"></label>
                        </td>
                        <td class="value">
                            <i class="fa fa-plus"></i><input type="button" value="上传" class="btn btn-normal btn-xs" icon="icon-add"/>: <input id="cmsRoutePhotoupload" type="file" name="cmsRoutePhotoFile" class="uploadButton"></span>
                            <button class="btn btn-normal btn-xs" onclick="addFun('接口权限录入','interfaceController.do?addorupdate','interfaceList',null,400)"><i class="fa fa-plus"></i><span class="bigger-110 no-text-shadow">接口权限录入</span></button>
                        </td>
                    </tr>
                    <tr>
                        <td align="right" style="width:10em"></td>
                        <td class="value">
                            <div>
                                <ul id="cmsRoutePhotoList"></ul>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="right" style="width:10em"><label class="Validform_label"> 行程描述: </label></td>
                        <td class="value">
                            <%-- <textarea id="routeDetail" name="routeDetail" style="width:550px; height:200px;"></textarea> --%>
                            <script id="routeDetail" name="routeDetail" type="text/plain"></script>
                        </td>
                    </tr>
                </table>
                <div style="padding:2px 0;text-align:center;">
                    <input type="button" icon="icon-save" value="保存行程" class="ui_state_highlight" onclick="cmsAritcleInterval.saveRoute()">
                </div>
            </form>
        </div>
    </div>
    
    <%-- 编辑行程窗口 --%>
    <div id="scheduleWindow" class="easyui-window" data-options="title:'编辑行程',closed:true,collapsible:false,minimizable:false,maximizable:false,modal:true" style="width:740px;height:498px">
        <div class="appmsg_content">
            <form name="scheduleForm" action="./cmsScheduleController.do?save" method="post">
                <input type="hidden" name="articleId" id="articleId" value="${cmsArticlePage.id}" /> 
                <input type="hidden" name="id" /> 
                <input type="hidden" name="routePhotosId" />
                <table cellpadding="0" cellspacing="0" class="formtable" style="background-color:transparent;">
                    <tr>
                        <td align="right" style="width:10em"><label class="Validform_label"> 排期: </label></td>
                        <td class="value">
                            <input class="inputxt" name="gooff" style="width: 60px" placeholder="">
                        </td>
                    </tr>
                    <tr>
                        <td align="right" style="width:10em"><label class="Validform_label"> 价格: </label></td>
                        <td class="value trafficbox">
                            <input class="inputxt" name="print" style="width: 300px">
                        </td>
                    </tr>
                    <tr>
                        <td align="right" style="width:10em"><label class="Validform_label"> 会员价: </label></td>
                        <td class="value"><input class="inputxt" name="vipPrint" style="width: 300px"></td>
                    </tr>
                </table>
                <div style="padding:2px 0;text-align:center;">
                    <input type="button" icon="icon-save" value="保存行程" class="ui_state_highlight" onclick="cmsAritcleInterval.saveRoute()">
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
