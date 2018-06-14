<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/context/mytags.jsp"%>
<t:base type="jquery,easyui,tools,DatePicker"></t:base>
<div class="easyui-layout" fit="true">
	<div region="center" style="padding:1px;">
        <t:datagrid name="cmsArticleList" title="信息管理" actionUrl="cmsArticleController.do?datagrid" idField="id" fit="true" sortName="createDate" sortOrder="desc" queryMode="group">
            <t:dgCol title="编号" field="id" hidden="true"></t:dgCol>
            <t:dgCol title="所属栏目" field="menuentityId" dictionary="weixin_menuentity,id,name" width="80"></t:dgCol>
            <t:dgCol title="标题" field="title" query="false" width="140"></t:dgCol>
            <t:dgCol title="创建时间" field="createDate" formatter="yyyy-MM-dd hh:mm:ss" width="120"></t:dgCol>
            <t:dgCol title="操作" field="opt"></t:dgCol>
            <t:dgDelOpt title="删除" url="cmsArticleController.do?del&id={id}" urlclass="ace_button" urlfont="fa-trash" urlStyle="background-color:red" />
        </t:datagrid>
	    <div id="cmsArticleListtb" style="padding:3px; height: auto" class="datagrid-toolbar">
	       <div name="searchColums" id="searchColums">
	           <span>
                    <span style="vertical-align:middle;display:-moz-inline-box;display:inline-block;width: 80px;text-align:right;" title="订单号 ">标题：</span>
                    <input type="text" name="title" style="width: 100px; height: 24px;"/>
                    <span style="vertical-align:middle;display:-moz-inline-box;display:inline-block;width: 80px;text-align:right;" title="客户姓名">所属栏目: </span>
                    <input type="text" name="menuentityId" id="menuentityId" style="width: 180px; height: 24px;"/>
	           </span>
               <span style="float:right;">
                   <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="cmsArticleListsearch();" >查询</a>
                   <a href="javascript:void(0)" class="easyui-linkbutton l-btn" iconcls="icon-reload" onclick="searchReset('cmsArticleList')" >重 置</a>
               </span>
            </div>
            <div style="border-bottom-width:0;" class="datagrid-toolbar">
                <span style="float:left;">
                    <a href="#" class="easyui-linkbutton" plain="true" icon="icon-add" onclick="add('录入','cmsArticleController.do?addorupdate','cmsArticleList','100%','100%')">录入</a>
                    <a href="#" class="easyui-linkbutton" plain="true" icon="icon-edit" onclick="update('编辑','cmsArticleController.do?addorupdate','cmsArticleList','100%','100%')">编辑</a>
                    <a href="#" class="easyui-linkbutton" plain="true" icon="icon-search" onclick="detail('查看','cruiseController.do?detail','cmsArticleList','400px','650px')">查看</a>
                </span>
                <div style="clear:both"></div>
            </div>
        </div>

    </div>
</div>
<script type="text/javascript">
    $(function() {
        $('#menuentityId').combotree({
            url : 'menuManagerController.do?treeMenu',
            onClick : function(node) {
                
            }
        });
    });
</script>