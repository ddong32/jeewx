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
		routeDetailEditor : "",
		noticeEditor : "", 
		expense_containEditor : "", 
		expense_ncontainEditor: ""
	};
}

//定义方法类
CmsAritcleInterval.prototype = {
	init : function() {
		this.initData();
		this.uploadfile();
	},
	
	/**
	 * 初始化界面
	 */
	initData : function() {
		var me = this;
		me.cacheData.articleId = $("#articleId").val();  //文章数据库编号
		//栏目菜单
        $('#menuentityTree').combotree({
            url : 'menuManagerController.do?treeMenu',
            onClick : function(node) {
            	$("#menuentityId").val(node.id);
            },
            onLoadSuccess:function(node,data){  
            	$("#menuentityTree").combotree('setValue',$("#menuentityId").val());
            },
            onBeforeSelect : function(node){  
                var t = $(this).tree;  
                var isLeaf = t('isLeaf', node.target);  
                if (!isLeaf) {//选择的不是叶子节点  
                    return false;  
                }
            }
        });
        
	},
	
	uploadfile : function() {
		'use strict';
		// Change this to the location of your server-side upload handler:
		var me  = this;
		var url = 'weixinArticleController.do?upload',
			uploadButton = $('<button/>')
				.addClass('btn btn-primary')
				.prop('disabled', true)
				.text('上传中...')
				.on('click', function() {
					var $this = $(this),
						data = $this.data();
					$this.off('click').text('正在上传...').on('click', function() {
						$this.remove();
						data.abort();
					});
					data.submit().always(function() {
						$this.remove();
					});
				});

		$('#fileupload').fileupload({
			url : url,
			dataType : 'json',
			autoUpload : false,
			acceptFileTypes : /(\.|\/)(gif|jpe?g|png)$/i,
			maxFileSize : 2000000, // 2 MB
			disableImageResize : /Android(?!.*Chrome)|Opera/.test(window.navigator.userAgent),
			previewMaxWidth : 290,
			previewMaxHeight : 160,
			previewCrop : true
		}).on('fileuploadadd', function(e, data) {
			$("#files").text("");
			data.context = $('<div/>').appendTo('#files');
			$.each(data.files, function(index, file) {
				//var node = $('<p/>').append($('<span/>').text(file.name));
				//fileupload
				var node = $('<p/>');
				if (!index) {
					node.append('<br>').append(uploadButton.clone(true).data(data));
				}
				node.appendTo(data.context);
			});
		}).on('fileuploadprocessalways', function(e, data) {
			var index = data.index,
				file = data.files[index],
				node = $(data.context.children()[index]);
			if (file.preview) {
				node.prepend('<br>').prepend(file.preview);
			}
			if (file.error) {
				node.append('<br>')
					.append($('<span class="text-danger"/>')
					.text(file.error));
			}
			if (index + 1 === data.files.length) {
				data.context.find('button')
					.text('上传')
					.prop('disabled', !!data.files.error);
			}
		}).on('fileuploadprogressall', function(e, data) {
			var progress = parseInt(data.loaded / data.total * 100, 10);
			$('#progress .progress-bar').css(
				'width',
				progress + '%'
			);
		}).on('fileuploaddone', function(e, data) {
			console.info(data);
			var file = data.files[0];
			//var delUrl = "<a class=\"js_removeCover\" onclick=\"return false;\" href=\"javascript:void(0);\">删除</a>";
			$("#imgName").text("").append(file.name);
			$("#imageName").val(file.name);
			$("#progress").hide();
			var d = data.result;
			if (d.success) {
				var link = $('<a>').attr('target', '_blank').prop('href', d.attributes.viewhref);
				$(data.context.children()[0]).wrap(link);
				console.info(d.attributes.viewhref);
				$("#imageHref").val(d.attributes.url);
			} else {
				var error = $('<span class="text-danger"/>').text(d.msg);
				$(data.context.children()[0]).append('<br>').append(error);
			}
		}).on('fileuploadfail', function(e, data) {
			$.each(data.files, function(index, file) {
				var error = $('<span class="text-danger"/>').text('File upload failed.');
				$(data.context.children()[index])
					.append('<br>')
					.append(error);
			});
		}).prop('disabled', !$.support.fileInput)
			.parent().addClass($.support.fileInput ? undefined : 'disabled');

		//在线编辑器通用配置
		var ueditorConfig = {
			elementPathEnabled : false,
			wordCount : false,
			autoHeightEnabled : false
		};
		//形成描述编辑
		me.cacheData.routeDetailEditor = UE.getEditor('routeDetail', $.extend({initialFrameHeight: 240}, ueditorConfig));
		//支持上传头部图片
		me.enableUploadPhoto();
		//行程图片
		me.enableRouteUploadPhoto();
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
	},
	
	/**
	  * 上传头部图片
	  */
	uploadPhoto : function() {
		 
	},
	
	/**
	  * 查看头部图片
	  */
	viewPhoto : function(rowi) {
		var me = this;
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
		me.openPhotoViewer(r['id']);
	},
	
	/**
	 * 打开图片查看窗口
	 */
	openPhotoViewer : function(id) {
		var imgSrc = './cmsPhotoController.do?view&fileid=' + id;
		var img = $('#photoViewer');
		img.css({width: 'auto', height: 'auto'}).attr('src', imgSrc);
		
		$('#viewPhotoWindow').window('open').window('center');
	},
	
	/**
	  * 删除头部图片
	  */
	delPhoto : function(rowi) {
		var me = this;
		var dg = $('#cmsPhotoList'), r = dg.datagrid('getRows')[rowi];
	 	me.affirmDelPhoto(r['id'], function() {dg.datagrid('deleteRow', rowi);});
	 	me.preparePreview();
	 	dg.datagrid('reload');
	},
	
	/**
	 * 确认删除
	 * @param id 图片id
	 * @param cb 回调
	 */
	affirmDelPhoto : function(id, cb) {
		$.messager.confirm('确认', '是否确定删除?', function(v) {
			if(v) {
				var ajaxOpts = {
					dataType: 'json'
					, success: function(rs) {
						if(rs && rs['success']) {
							cb();
						}
					}
				};
				$.ajax('./cmsPhotoController.do?del&id=' + id, ajaxOpts);
			}
		});
	},
	
	/**
	 * 删除行程图片
	 */
	delRoutePhoto : function(id) {
		this.affirmDelPhoto(id, function() {$('#cmsRoutePhotoList').find('[cache-id="' + id + '"]').remove();});
	},
	
	/**
	  * 重新布局页面
	  * @returns
	  */
	layoutThePage : function() {return;
		var panelLayoutOpts = {width: document.body.clientWidth - 4};
		$.each([1, 2, 3, 4, 5], function(i, n) {
			$('#s' + n).panel('resize', panelLayoutOpts)
		});
	},
	
	/**
	 * 支持上传头部图片
	 * @returns
	 */
	enableUploadPhoto : function() {
		//文件表单元素盖住'上传'按钮
		var dgtoolbtn = $('#cmsPhotoListtb a[icon="icon-add"]');
		var cmsPhotoUploadButton = $('#cmsPhotoUploadButton');
		dgtoolbtn.css('position', 'relative');
		var w = dgtoolbtn.width(), h = dgtoolbtn.height();
		cmsPhotoUploadButton.width(w).height(h).appendTo(dgtoolbtn).show();
		var articleId = $("#articleId").val(); 
		//
	    $('#cmsPhotoFile').fileupload({
	        url: './cmsPhotoController.do?save&articleId='+articleId,
	        dataType: 'json',
	        autoUpload: true,
	        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
	        maxNumberOfFiles: 4,
	        maxFileSize: 2000000, // 2 MB
	        disableImageResize: /Android(?!.*Chrome)|Opera/.test(window.navigator.userAgent),
	        previewMaxWidth: 290,
	        previewMaxHeight: 160,
	        previewCrop: true
	    }).on('fileuploadadd', function(e, data) {
	    	var acceptFileTypes = /^image\/(gif|jpe?g|png)$/i;
	    	//文件类型判断
	        if(data.originalFiles[0]['type'].length && !acceptFileTypes.test(data.originalFiles[0]['type'])) {
	            alert("上传文件类型不对");
	            return ;
	        }
	        data.submit();
	    }).on('fileuploaddone', function (e, data) {
	    	var rs = data? data['result'] : null, entity;
	    	if(rs && (entity = rs['obj'])) {
	    		$('#cmsPhotoList').datagrid('appendRow', entity);
	    	}
	    });
		
	},
	
	/**
	 * 支持上传行程图片
	 * @returns
	 */
	enableRouteUploadPhoto : function () {
		//
		var me = this;
		var articleId = $("#articleId").val(); 
		$('#cmsRoutePhotoupload').fileupload({
			url: './cmsPhotoController.do?save&articleId='+articleId,
			dataType: 'json',
			autoUpload: true,
			acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
			maxFileSize: 2000000, // 2 MB
			disableImageResize: /Android(?!.*Chrome)|Opera/.test(window.navigator.userAgent),
			previewMaxWidth: 290,
			previewMaxHeight: 160,
			previewCrop: true,
			add: function(e, data) {
		        var acceptFileTypes = /^image\/(gif|jpe?g|png)$/i;
		        //文件类型判断
		        if(data.originalFiles[0]['type'].length && !acceptFileTypes.test(data.originalFiles[0]['type'])) {
		            alert("上传文件类型不对");
		            return ;
		        }
		        data.submit();
			}
		}).on('fileuploaddone', function (e, data) {
			console.info(data);
			var rs = data? data['result'] : null, entity;
			if(rs && (entity = rs['obj'])) {
	    		me.buildRoutePhoto(entity, $('#cmsRoutePhotoList'));
			}
		});
		
	},
	
	//----------行程---------------行程----------------行程---------------------
	/**
	* 添加行程
	*/
	addRoute : function (evt) {
		/*evt = evt || window.event;
		if(evt.preventDefault) {
			evt.preventDefault();
		} else {
			evt.returnValue = false;
		}*/
		var me  = this;
		var frm = document.routeForm;
		frm.reset();
		//清空行程
		var traffic_box = $('#traffic_box').empty(), traffic_place = $(frm['traffic_place']).val('');
		//
		me.cacheData.routeDetailEditor.setContent('');
		me.openRouteDialog();
	},
	
	/**
	* 编辑行程
	* @param rowi 行号
	*/
	editRoute : function(rowi) {
		//
		var me = this;
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
				
				me.openRouteDialog();
				//
				$(frm).form('load', entity);
				//
				me.cacheData.routeDetailEditor.setContent(entity['detail'] || '');
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
								me.addPlace(e.substring(0, j), e.substring( j+ 1));
							}
						}
					}
				}
				//
				var photos = entity['photos'];
				if(photos && photos.length) {
					var ul = $('#cmsRoutePhotoList');
					for(var i = 0; i < photos.length; i ++) {
						me.buildRoutePhoto(photos[i], ul);
					}
				}
			}
		};
		$.ajax('./cmsRouteController.do?get&id=' + rid, ajaxOpts);
	},
	
	/**
	 * 删除行程图片
	 */
	delRoutePhoto : function(id) {
		this.affirmDelPhoto(id, function() {$('#cmsRoutePhotoList').find('[cache-id="' + id + '"]').remove();});
	},
	/**
	 * 行程图片列表
	 * @returns
	 */
	buildRoutePhoto : function(photo, ul) {
		var photo_id = photo['id'], photo_name = photo['attachmenttitle'];
		var itm = ['<li cache-id="' + photo_id + '">'];
		//itm.push('<img src="' + photo['attachmentcontent'] + '" alt="" rid="' + photo_id + '" />');
		itm.push('<span class="routePhotoItem" onclick="openPhotoViewer(\'' + photo_id + '\')" title=\"点击查看\">' + photo_name + '</span>');
		itm.push('<span class="routePhotoDel" onclick="delRoutePhoto(\'' + photo_id + '\')" title=\"点击删除\">X</span>');
		itm.push('</li>');
		return $(itm.join('')).appendTo(ul);
	},
	
	/**
	 * 确认删除
	 * @param id 图片id
	 * @param cb 回调
	 */
	affirmDelPhoto : function(id, cb) {
		$.messager.confirm('确认', '是否确定删除?', function(v) {
			if(v) {
				var ajaxOpts = {
						dataType: 'json'
						, success: function(rs) {
							if(rs && rs['success']) {
								cb();
							}
						}
				};
				$.ajax('./cmsPhotoController.do?del&id=' + id, ajaxOpts);
			}
		});
	},
	
	/**
	 * 删除
	 * @param rowi 行号
	 * @returns
	 */
	delRoute : function(rowi) {
		var dg = $('#cmsRouteList'), r = dg.datagrid('getRows')[rowi];
		$.messager.confirm('确认', '是否确定删除?', function(v) {
			if(v) {
				var ajaxOpts = {
						dataType: 'json'
						, success: function(rs) {
							if(rs && rs['success']) {
								dg.datagrid('deleteRow', rowi);
								
								preparePreview();
							}
						}
				};
				$.ajax('./cmsRouteController.do?del&id=' + r['id'], ajaxOpts);
			}
		});
	},
	
	/**
	 * 打开行程编辑窗口, 剧中
	 * @returns
	 */
	openRouteDialog : function() {
		$('#cmsRoutePhotoList').empty();
		
		return $('#routeWindow').window('open').window('center');
	},
	
	/**
	* 保存行程
	*/
	saveRoute : function() {
	     var me = this;
		 var frm = document.routeForm;
		 //
		 var routePhotosId = [], routePhotos = [];
		 $('#cmsRoutePhotoList').find('[cache-id]').each(function() {
			 var phoid = $(this).attr('cache-id');
			 routePhotosId.push(phoid);
			 //预览用
			 routePhotos.push({id: phoid});
		 });
		 frm['routePhotosId'].value = routePhotosId.join(',');
		 //提交
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
		        		entity['createDate']   = cd.getFullYear() + '-' + (cd.getMonth() + 1) + '-' + cd.getDate() + ' ' + cd.getHours() + ':' + cd.getMinutes() + ':' + cd.getSeconds();
		        		entity['traffic_trim'] = me.fmt_cmsRouteList_traffic(entity['traffic']);
		        	}
		        	//
		        	var dg = $('#cmsRouteList');
		        	if(!frm['id'].value) {
		        		dg.datagrid('appendRow', entity);
		        	} else {
		        		var rowi = dg.datagrid('getRowIndex', entity['id']);
		        		dg.datagrid('updateRow', {index: rowi, row: entity});
		        	}
		        	//更新预览
		        	entity['photos'] = routePhotos;
		        	//me.preparePreview();
		        	$('#routeWindow').window('close');
		        }
		    }
		});
	},
	
	/**
	* 查看行程
	*/
	viewRoute : function(evt) {
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
	},
	
	preparePlace : function() {
		this.addPlace();
	},
	
	/**
	 * 识别线路的目的地, 乘坐交通工具
	 * 将'南宁>1:北海'替换为'南宁>北海'显示
	 */
	fmt_cmsRouteList_traffic : function (val, row, rowi) {
		if(val) {
			var re_trimTraffic = /(\>|\&gt\;)[a-zA-Z0-9]+\:/g;
			re_trimTraffic.lastIndex = -1;
			if(re_trimTraffic.test(val)) {
				val = val.replace(re_trimTraffic, '$1');
			}
		}
		
		return val;
	},
	
	/**
	 * 添加地点
	 * @param tl 交通工具
	 * @param pla 地点
	 */
	addPlace : function(tl, pla) {
		//交通工具
		var me = this;
		var trafficTools = me.readTrafficTools();
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
	},
	
	/**
	 * 读取交通工具数据字典
	 * @returns
	 */
	readTrafficTools : function () {
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
}

var cmsAritcleInterval;
$(function() {
	cmsAritcleInterval = new CmsAritcleInterval();
	cmsAritcleInterval.init();
});

