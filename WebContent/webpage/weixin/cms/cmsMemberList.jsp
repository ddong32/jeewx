<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/context/mytags.jsp"%>
<t:base type="jquery,easyui,tools,DatePicker"></t:base>
<div class="easyui-layout" fit="true">
  <div region="center" style="padding:1px;">
  <t:datagrid name="datasheet" title="会员管理" actionUrl="cmsMemberController.do?datagrid" idField="id" fit="true" sortName="createDate" sortOrder="desc" queryMode="group">
   <t:dgCol title="编号" field="id" hidden="false"></t:dgCol>
   <t:dgCol title="微信账号" field="openid" width="120"></t:dgCol>
   <t:dgCol title="姓名" field="name" width="100"></t:dgCol>
   <t:dgCol title="电话号码" field="tel" width="120"></t:dgCol>
   <t:dgCol title="公司名称" field="corpName" width="120"></t:dgCol>
   <t:dgCol title="注册时间" field="createDate" formatter="yyyy-MM-dd hh:mm:ss" width="120"></t:dgCol>
   <t:dgCol title="审核状态" field="state" width="80"></t:dgCol>
   <t:dgCol title="审核时间" field="approvalDate" formatter="yyyy-MM-dd hh:mm:ss" width="120"></t:dgCol>

   <t:dgCol title="操作" field="opt"></t:dgCol>
   <t:dgFunOpt title="通过" funname="past" />
   <t:dgFunOpt title="不通过" funname="reject" />

   <t:dgToolBar title="通过" icon="icon-edit" url="cmsMemberController.do?addorupdate" funname="past" width="100%" height="100%"></t:dgToolBar>
   <t:dgToolBar title="不通过" icon="icon-edit" url="cmsMemberController.do?addorupdate" funname="reject" width="100%" height="100%"></t:dgToolBar>

  </t:datagrid>
  </div>
 </div>
 <script type="text/javascript">
 function past(o) {
	 approval(o, 1);
 }
 
 function reject(o) {
	 approval(o, -1);
 }
 
 function approval(o, stat) {
	 var rowi = parseInt(o);
	 var datasheet = $('#datasheet'), params = ['state=' + stat];
	 if(!isNaN(rowi)) {
		 params.push('ids=' + datasheet.datagrid('getRows')[rowi]['id'])
	 } else {
		 var rows = datasheet.datagrid('getSelections');
		 for(var i = 0; null != rows && i < rows.length; i ++) {
			 params.push('ids=' + rows[i]['id'])
		 }
	 }
	 
	 if(params.length <= 1) {
		 $.messager.alert('提示', '请选择记录.'); 
		 return;
	 }
	 
	 $.messager.confirm('确认', '是否确定审核?', function(v) {
		 if(v) {
			 var successCallback = function(resp) {
				$.messager.alert('提示', resp['msg']); 
				datasheet.datagrid('reload');
			 };
		     var u = "./cmsMemberController.do?approval";
		     var p = {
		     		dataType: "JSON"
		     		, type: "POST"
		     		, data: params.join('&')
		     		, success: successCallback
		     };
		     $.ajax(u, p);
		 }
	 }); 
 }
 </script>