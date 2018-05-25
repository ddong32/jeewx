/*遮罩 Overlay js 对象*/
function Overlay(options) { //{targetId:'',viewHtml:'',viewWidth:'',viewHeight:''}  
	try {
		this.state = false; //遮罩状态  true 激活，false 没有激活  
		this.bgElementId = 'overlay_bg';
		this.bgElement   = document.createElement('DIV');
		$(this.bgElement).attr('id', this.bgElementId);

		this.viewHtml   = options['viewHtml'];
		this.viewWidth  = options['viewWidth'] | 320;
		this.viewHeight = options['viewHeight'] | 25;
		
		this.viewPanel  = document.createElement('DIV');
		$(this.viewPanel).css({
			'background-color' : '#FFFFFF',
			'border' : '1px solid #237AD3',
			'width' : this.viewWidth + 'px',
			'height' : this.viewHeight + 'px',
			'z-index' : '1002',
			'position' : 'absolute',
			'top' : '0',
			'right' : '0'
		}); //先隐藏 
		$(this.viewPanel).append(this.viewHtml);
		$(this.bgElement).append(this.viewPanel);

		this.targetId = options['targetId'];
		this.targetElement = $(this.targetId);

		$(this.bgElement).css({ 'display' : 'none' }); //先隐藏  
		$(this.bgElement).attr( 'class', 'bgOverlay' );
		$(this.targetElement).css({'position' : 'relative'}); //覆盖目标position设置为relative，便于覆盖物相对定位  
		$(this.targetElement).append(this.bgElement);
		$(document.body).append(this.viewPanel);

	} catch (e) {
		alert('Overlay，初始化失败！');
	}

}

Overlay.prototype.show = function(obj) {
	var that = this;
	$(that.bgElement).css({
		'display' : 'block'
	});
	//设置覆盖物的高度与覆盖目标保证一直（IE6下需要这样做方能撑开覆盖物）  
	$(that.bgElement).css({
		'height' : $(that.targetElement).height() + 'px'
	});
	
	//获取鼠标点击坐标显示 可视面板 
	if (typeof(obj) != "undefined") {
		var vp  = $(obj).offset();
		var bgW = $(this.bgElement).width();
		var bgH = $(this.bgElement).height();
		var bgP = $(this.bgElement).offset();
		vp.top  = bgH/2 - that.viewHeight/2
		//vp.top  = vp.top - that.viewHeight - 2; //调整位置 
		
		//暂时只对左边界作调整处理  
		var isLeftOverstep = false;
		while ((vp.left + that.viewWidth) > (bgP.left + bgW)) {
			isLeftOverstep = true;
			vp.left--;
		}
		if (isLeftOverstep) { //如果越界并调整后，再调整5个像素，不至于挤在边上  
			vp.left -= 5;
		}
		
		$(this.viewPanel).css({
			'top' : vp.top + 'px',
			'left' : vp.left + 'px',
			'display' : 'block'
		});
	}

	that.state = true; //激活遮罩  
}

Overlay.prototype.hide = function() {
	var that = this;
	$(that.bgElement).css({
		'display' : 'none'
	});
	$(that.viewPanel).css({
		'display' : 'none'
	});
	that.state = true; //激活遮罩.state=false;//没有激活遮罩  
}