  //编写自定义JS代码
  /*jslint unparam: true, regexp: true */
  /*global window, $ */
  $(function () {
      'use strict';
      // Change this to the location of your server-side upload handler:
      var url = 'weixinArticleController.do?upload',uploadButton = $('<button/>')
	      .addClass('btn btn-primary')
	      .prop('disabled', true)
	      .text('上传中...')
	      .on('click', function () {
	          var $this = $(this), data = $this.data();
	          $this.off('click').text('正在上传...').on('click', function () {
	                  $this.remove();
	                  data.abort();
	          });
	          data.submit().always(function () {
	              $this.remove();
	          });
	      });
      $('#fileupload').fileupload({
          url: url,
          dataType: 'json',
          autoUpload: false,
          acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
          maxFileSize: 2000000, // 2 MB
          disableImageResize: /Android(?!.*Chrome)|Opera/
              .test(window.navigator.userAgent),
          previewMaxWidth: 290,
          previewMaxHeight: 160,
          previewCrop: true
      }).on('fileuploadadd', function (e, data) {
          $("#files").text("");
          data.context = $('<div/>').appendTo('#files');
          $.each(data.files, function (index, file) {
              //var node = $('<p/>').append($('<span/>').text(file.name));
              //fileupload
              var node = $('<p/>');
              if (!index) {
                  node.append('<br>').append(uploadButton.clone(true).data(data));
              }
              node.appendTo(data.context);
          });
      }).on('fileuploadprocessalways', function (e, data) {
          var index = data.index,
              file = data.files[index],
              node = $(data.context.children()[index]);
          if (file.preview) {
              node.prepend('<br>').prepend(file.preview);
          }
          if (file.error) {
              node.append('<br>')
                  .append($('<span class="text-danger"/>').text(file.error));
          }
          if (index + 1 === data.files.length) {
              data.context.find('button')
                  .text('上传')
                  .prop('disabled', !!data.files.error);
          }
      }).on('fileuploadprogressall', function (e, data) {
          var progress = parseInt(data.loaded / data.total * 100, 10);
          $('#progress .progress-bar').css(
              'width',
              progress + '%'
          );
      }).on('fileuploaddone', function (e, data) {
          console.info(data);
          var  file = data.files[0];
          //var delUrl = "<a class=\"js_removeCover\" onclick=\"return false;\" href=\"javascript:void(0);\">删除</a>";
          $("#imgName").text("").append(file.name);
          $("#imageName").val(file.name);
          $("#progress").hide();
          var d =data.result;
          if (d.success) {
			  var link = $('<a>').attr('target', '_blank').prop('href', d.attributes.viewhref);
		      $(data.context.children()[0]).wrap(link);
		      console.info(d.attributes.viewhref);
		      $("#imageHref").val(d.attributes.url);
          }else{
			  var error = $('<span class="text-danger"/>').text(d.msg);
			  $(data.context.children()[0]).append('<br>').append(error);
          }
      }).on('fileuploadfail', function (e, data) {
          $.each(data.files, function (index, file) {
              var error = $('<span class="text-danger"/>').text('File upload failed.');
              $(data.context.children()[index])
                  .append('<br>')
                  .append(error);
          });
      }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
      
      //编辑时初始化图片预览
      var frm = document.formobj;
      //var name = "${cmsArticlePage.title}", imageHref = "${cmsArticlePage.imageHref}";
      var name = frm["title"].value, imageHref = frm["imageHref"].value;
      if(name != ""){
          $("#imageTitle").html(name);
      }
      if(imageHref != ""){
          $("#imageShow").html('<img src="' + imageHref + '" width="100%" height="160" />');
      }
      //重新布局
      setTimeout(layoutThePage, 512)
      //在线编辑器通用配置
      var ueditorConfig = {elementPathEnabled: false, wordCount: false, autoHeightEnabled: false};
      //注意事项编辑
      UE.getEditor('notice', $.extend({initialFrameHeight: 240}, ueditorConfig));
      //购买须知编辑
      $.each(['expense_contain', 'expense_ncontain'], function(i, e) {
	      UE.getEditor(e, $.extend({initialFrameHeight: 158}, ueditorConfig));
      });
      //形成描述编辑
      routeDetailEditor = UE.getEditor('routeDetail', $.extend({initialFrameHeight: 240}, ueditorConfig));
      //支持上传头部图片
      enableUploadPhoto();
      //行程图片
      //enableRouteUploadPhoto();
  });
  function setimageTitle(obj){
	  $("#imageTitle").html($(obj).val());
  }
/**
  * 重新布局页面
  * @returns
  */
function layoutThePage() {
	var panelLayoutOpts = {width: document.body.clientWidth - 4};
	$.each([1, 2, 3, 4, 5], function(i, n) {
		$('#s' + n).panel('resize', panelLayoutOpts)
	});
}
/**
 * 支持上传头部图片
 * @returns
 */
function enableUploadPhoto() {
	//文件表单元素盖住'上传'按钮
	var dgtoolbtn = $('#cmsPhotoListtb .datagrid-toolbar a[icon="icon-add"]');
	var cmsPhotoUploadButton = $('#cmsPhotoUploadButton');
	dgtoolbtn.css('position', 'relative');
	var w = dgtoolbtn.width(), h = dgtoolbtn.height();
	cmsPhotoUploadButton.width(w).height(h).appendTo(dgtoolbtn).show();
	//
    $('#cmsPhotoFile').fileupload({
        url: './cmsPhotoController.do?save',
        dataType: 'json',
        autoUpload: true,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
        maxFileSize: 2000000, // 2 MB
        disableImageResize: /Android(?!.*Chrome)|Opera/
            .test(window.navigator.userAgent),
        previewMaxWidth: 290,
        previewMaxHeight: 160,
        previewCrop: true
    }).on('fileuploaddone', function (e, data) {
    	console.info(data);
        /*var files = data? data['files'] : null;
        if(files && files.length) {
        	var dg = $('#cmsPhotoList');
        	for(var i = 0, f, r; i < files.length; i ++) {
        		f = files[i];
        		r = {attachmenttitle: f['name'], createdate: new Date(f['lastModified']).fmt2Str()};
        		dg.datagrid('appendRow', r);
        	}
        }*/
    	var rs = data? data['result'] : null, entity;
    	if(rs && (entity = rs['obj'])) {
    		entity['createdate'] = new Date(entity['createdate']).fmt2Str();
    		$('#cmsPhotoList').datagrid('appendRow', entity);
    	}
    });
	
}
/**
 * 支持上传行程图片
 * @returns
 */
function enableRouteUploadPhoto() {
	//
	$('#cmsPhotoFile').fileupload({
		url: './cmsPhotoController.do?save',
		dataType: 'json',
		autoUpload: true,
		acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
		maxFileSize: 2000000, // 2 MB
		disableImageResize: /Android(?!.*Chrome)|Opera/
			.test(window.navigator.userAgent),
			previewMaxWidth: 290,
			previewMaxHeight: 160,
			previewCrop: true
	}).on('fileuploaddone', function (e, data) {
		console.info(data);
		var rs = data? data['result'] : null, entity;
		if(rs && (entity = rs['obj'])) {
			var ls = $('#cmsRoutePhotoList');
			entity['createdate'] = new Date(entity['createdate']).fmt2Str();
			ls.datagrid('appendRow', entity);
		}
	});
	
}
/**
  * 上传头部图片
  */
function uploadPhoto() {
	 
}
/**
  * 查看头部图片
  */
function viewPhoto(rowi) {
	var dg = $('#cmsPhotoList'), r;
	if(!isNaN(rowi = parseInt(rowi))) {
		r = dg.datagrid('getRows')[rowi];
	} else {
		r = dg.datagrid('getSelected');
	}
	if(!r) {
		$.messager.alert('提示', '请选择浏览的一张图片.');
		return;
	}
	var imgSrc = './cmsPhotoController.do?view&fileid=' + r['id'];
	var img = $('#photoViewer');
	img.css({width: 'auto', height: 'auto'}).attr('src', imgSrc);
	
	$('#viewPhotoWindow').window('open').window('center');
}
function resizePhotoViewer() {return;
	var img = $('#photoViewer');
	var ori = new Image();
	ori.src = img.attr('src');
	ori.onload = function() {
		//var mw = 680, mh = 430;
		img.width(ori.width).height(ori.height);
	}
}
/**
  * 删除头部图片
  */
function delPhoto(rowi) {
	var dg = $('#cmsPhotoList'), r = dg.datagrid('getRows')[rowi];
	$.messager.confirm('确认', '是否确定删除?', function(v) {
		if(v) {
			var ajaxOpts = {
					dataType: 'json'
					, success: function(rs) {
						if(rs && rs['success']) {
							dg.datagrid('deleteRow', rowi);
						}
					}
			};
			$.ajax('./cmsPhotoController.do?del&id=' + r['id'], ajaxOpts);
		}
	});
 	 
}
//
var routeDetailEditor;
/**
* 添加行程
*/
function addRoute(evt) {
	/*evt = evt || window.event;
	if(evt.preventDefault) {
		evt.preventDefault();
	} else {
		evt.returnValue = false;
	}*/
	
	var frm = document.routeForm;
	frm.reset();
	//清空行程
	var traffic_box = $('#traffic_box').empty(), traffic_place = $(frm['traffic_place']).val('');
	//
	routeDetailEditor.setContent('');
	
	openRouteDialog();
}
/**
* 编辑行程
* @param rowi 行号
*/
function editRoute(rowi) {
	//
	var dg = $('#cmsRouteList'), selectRow;
	if(!isNaN(rowi = parseInt(rowi))) {
		selectRow = dg.datagrid('getRows')[rowi];
	} else {
		selectRow = dg.datagrid('getSelected');
	}
	if(!selectRow) {
		$.messager.alert('提示','请选择编辑的一条行程.');
		return ;
	}
	var rid = selectRow['id'];
	
	var frm = document.routeForm;
	frm.reset();
	//清空行程
	var traffic_box = $('#traffic_box').empty(), traffic_place = $(frm['traffic_place']).val('');
	//读取编辑的行程
	var ajaxOpts = {
			dataType: 'json'
			, success: function(dat) {
				var entity = dat? dat['obj'] : null;
				if(!entity) {
					$.messager.alert('注意', '行程不存在或已经被删除.');
					return;
				}
				
				openRouteDialog();
				//
				$(frm).form('load', entity);
				//
				routeDetailEditor.setContent(entity['detail'] || '');
				//traffic_box
				var trff = entity['traffic'];
				if(trff) {
					var segm = trff.split('>');
					if(segm.length) {
						traffic_place.val(segm[0]);
						for(var i = 1, e, j; i < segm.length; i ++) {
							e = segm[i];
							//交通工具和地点'1:南宁'
							if(-1 != (j = e.indexOf(':'))) {
								addPlace(e.substring(0, j), e.substring( j+ 1));
							}
						}
					}
				}
			}
	};
	$.ajax('./cmsRouteController.do?get&id=' + rid, ajaxOpts);
}
/**
 * 删除
 * @param rowi 行号
 * @returns
 */
function delRoute(rowi) {
	var dg = $('#cmsRouteList'), r = dg.datagrid('getRows')[rowi];
	$.messager.confirm('确认', '是否确定删除?', function(v) {
		if(v) {
			var ajaxOpts = {
					dataType: 'json'
					, success: function(rs) {
						if(rs && rs['success']) {
							dg.datagrid('deleteRow', rowi);
						}
					}
			};
			$.ajax('./cmsRouteController.do?del&id=' + r['id'], ajaxOpts);
		}
	});
}
/**
 * 打开行程编辑窗口, 剧中
 * @returns
 */
function openRouteDialog() {
	return $('#routeWindow').window('open').window('center');
}
/**
* 保存行程
*/
function saveRoute() {
	 var frm = document.routeForm;//.submit();
	 $(frm).form('submit', {
	    url: frm.action
	    , onSubmit: function(){
	        
	    }
	    , success: function(rs){
	        if(!rs) {
	        	return;
	        }
	        rs = 'string' == $.type(rs)? eval('(' + rs + ')') : rs;
	        if(rs['success']) {
	        	var entity = rs['obj'], cd = parseInt(entity['createDate']);
	        	if(cd) {
	        		cd = new Date(cd);
	        		entity['createDate'] = cd.getFullYear() + '-' + (cd.getMonth() + 1) + '-' + cd.getDate()
	        			+ ' ' + cd.getHours() + ':' + cd.getMinutes() + ':' + cd.getSeconds();
	        		entity['traffic_trim'] = fmt_cmsRouteList_traffic(entity['traffic']);
	        	}
	        	$('#cmsRouteList').datagrid('appendRow', entity);
	        	$('#routeWindow').window('close');
	        }
	    }
	});
	/*var postData = serializeObject($(frm));
	var ajaxOpts = {
			dataType: 'json'
			, data: postData
			, success: function(rs){
		        if(!rs) {
		        	return;
		        }
		        //rs = 'string' == $.type(rs)? eval('(' + rs + ')') : rs;
		        if(rs['success']) {
		        	//$('#cmsRouteList').datagrid('reload');
		        	var entity = rs['obj'], cd = parseInt(entity['createDate']);
		        	if(cd) {
		        		cd = new Date(cd);
		        		entity['createDate'] = cd.getFullYear() + '-' + (cd.getMonth() + 1) + '-' + cd.getDate()
		        			+ ' ' + cd.getHours() + ':' + cd.getMinutes() + ':' + cd.getSeconds();
		        	}
		        	entity['traffic_trim'] = fmt_cmsRouteList_traffic(entity['traffic']);
		        	$('#cmsRouteList').datagrid('appendRow', entity);
		        	$('#routeWindow').window('close');
		        }
		    }
	};
	$.ajax(frm.action, ajaxOpts);*/
}
/**
* 查看行程
*/
function viewRoute(evt) {
	evt = evt || window.event;
	if(evt.preventDefault) {
		evt.preventDefault();
	} else {
		evt.returnValue = false;
	}
	
	var selectRow = $('#cmsRouteList').datagrid('getSelected');
	if(!selectRow) {
		$.messager.alert('提示','请选择一条行程.');
		return ;
	}
	
	
}
/**
 * 
 * @param dat
 * @returns
 */
function onLoad_cmsRouteList(dat) {
	var rows = dat? dat['rows'] : null;
	if(!rows || !rows.length) {
		return;
	}
	var dg = $('#cmsRouteList');
	for(var i = 0, r; i < rows.length; i ++) {
		r = rows[i];
		r['traffic_trim'] = fmt_cmsRouteList_traffic(r['traffic']);
		dg.datagrid('updateRow', {index: i, row: r});
	}
}

var re_trimTraffic = /(\>|\&gt\;)[a-zA-Z0-9]+\:/g;
function fmt_cmsRouteList_traffic(val, row, rowi) {
	if(val) {
		re_trimTraffic.lastIndex = -1;
		if(re_trimTraffic.test(val)) {
			val = val.replace(re_trimTraffic, '$1');
		}
	}
	
	return val;
}
/**
 * 添加地点
 * @param tl 交通工具
 * @param pla 地点
 */
function addPlace(tl, pla) {
	//交通工具
	var trafficTools = readTrafficTools();
	if(!trafficTools || !trafficTools.length) {
		return;
	}
	var htm = ['<select name="traffic_tool" style="margin:0 2px;width:68px">'];
	htm.push('<option value="">乘坐</option>');
	for(var i = 0, e, sed; i < trafficTools.length; i ++) {
		e = trafficTools[i];
		//是否选中
		sed = 'undefined' != $.type(tl) && tl == e['typecode']? ' selected="selected"' : '';
		
		htm.push('<option value="' + e['typecode'] + '"' + sed + '>' + e['typename'] + '</option>');
	}
	//地点
	htm.push('<input class="inputxt" name="traffic_place" style="width: 60px" placeholder="输入地点" value="' + (pla || '') + '" >');
	//
	$(htm.join('')).appendTo($('#traffic_box'));
}
function preparePlace() {
	addPlace();
}
/**
 * 读取交通工具数据字典
 * @returns
 */
function readTrafficTools() {
	//是否已经读取了, 有就不读了
	var cacheName = 'routeTrafficTools', tools = window[cacheName];
	if(tools && tools.length) {
		return tools;
	}
	
	var ajaxOpts = {
			async: false
			, dataType: 'json'
			, success: function(dat) {
				if(dat) {
					window[cacheName] = tools = dat['obj'] || null;
				}
			}
	};
	$.ajax('./cmsRouteController.do?readTrafficTools', ajaxOpts);
	
	return tools;
}
/**
 * 
 * @returns
 */
function beforeSubmit_formobj() {
	var frm = $('#formobj').get(0);
	//新增的图片
	var photoRows = $('#cmsPhotoList').datagrid('getRows');
	if(photoRows && photoRows.length) {
		var photosId = [];//
		for(var i = 0, r; i < photoRows.length; i ++) {
			r = photoRows[i];
			if(r['articleId']) {
				continue;
			}
			photosId.push(r['id']);
		}
		frm['photosId'].value = photosId.join(',');
	}
	//新增的行程
	var routeRows = $('#cmsRouteList').datagrid('getRows');
	if(routeRows && routeRows.length) {
		var routesId = [];//
		for(var i = 0, r; i < routeRows.length; i ++) {
			r = routeRows[i];
			if(r['articleId']) {
				continue;
			}
			routesId.push(r['id']);
		}
		frm['routesId'].value = routesId.join(',');
	}
}

