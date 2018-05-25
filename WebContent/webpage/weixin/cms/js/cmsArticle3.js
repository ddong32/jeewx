/**
文件名: cmsAritcle.js
功能:  网站页面管理
作者:  qindl
时间:  2018-05-15
*/
function CmsAritcleInterval() {
	this.cacheData = {
		articleId    : "",  //文章数据库编号
		timerPreview : "",
	};
}

//定义方法类
CmsAritcleInterval.prototype = {
	init : function() {
		this.initData();
	},
	
	/**
	 * 初始化界面
	 */
	initData : function() {
		var me = this;
		me.cacheData.articleId = $("#articleId").val();  //文章数据库编号
	},
	
	/**
	 * 1头部图片
	 */
	edit_cmsPhoto : function() {
		$('.data-edit-layout').css("display","none");
		$('#data-list-cmsPhotoList').css("display","block");
		
		$('#layout-center').panel({ title: '头部图片' });
		
		var urljson = 'cmsPhotoController.do?datagrid';
		var queryParams = {  
            "articleId":$("#articleId").val(),
	    };
	    
	    var col = [[
	          {field:'id',title:'编号',width:60,hidden:true },
	          {field:'attachmenttitle', title:'图片名称', width:160, align:'left'},
	          {field:'createdate',title:'创建时间',width:160,align:'left', formatter: "yyyy-MM-dd hh:mm:ss"},
	          {field:'opt',title:'操作',width:80,align:'left'}
	    ]];
	    
	    _queryGrid = $("#data-list").datagrid({
	        url:urljson,  
	        queryParams:queryParams,  
	        fitColumns:true,
	        rownumbers:true, 
	        loadMsg:"玩命加载中。。。",  
	        fit:false,  
	        columns:col  
	    });  
	    _queryGrid.datagrid("reload");
	},
	
	
	/**
	 * 2基本信息
	 */
	edit_cmsArticle : function() {
		$('.data-edit-layout').css("display","none");
		$('#edit_cmsArticle').css("display","block");
	},
	
	/**
	 * 3行程列表
	 */
	edit_cmsRoute : function() {
		$('.data-edit-layout').css("display","none");
		$('#data-list-cmsRouteList').css("display","block");
	},
	
	/**
	 * 4注意事项
	 */
	edit_notice : function() {
		$('.data-edit-layout').css("display","none");
		$('#data-notice').css("display","block");
	},
	
	/**
	 * 5费用包含
	 */
	edit_expense_contain : function() {
		$('.data-edit-layout').css("display","none");
		$('#data-expense-contain').css("display","block");
	},
	
	/**
	 * 6费用不包含
	 */
	edit_expense_ncontain : function() {
		$('.data-expense-ncontain').css("display","none");
		$('#data-expense-ncontain').css("display","block");
	},
	
	/**
	 * 图片列表加载完成触发
	 */
	onLoad_cmsPhotoList : function(dat) {
		//this.preparePreview();
	},
	
	/**
	 * 延迟触发预览
	 */
	preparePreview : function() {
		var me = this;
		var timerPreview = me.cacheData.timerPreview;
		if(timerPreview) {
			clearTimeout(timerPreview);
		}

		timerPreview = setTimeout(me.preview, 800);
	}
}

var cmsAritcleInterval;
jQuery(function() {
	cmsAritcleInterval = new CmsAritcleInterval();
	cmsAritcleInterval.init();
});

