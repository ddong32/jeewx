function DetailInterval() {
	this.cacheData = {
		queryParam: null,
		ids: [], // 所有id
		id: null, // 选中的id
		sysconfig: {}, // 系统配置
		vioBehavours: {}, // 违法行为
		currentBean: null, // 当前的bean
	};
}

DetailInterval.prototype = {
	init: function() {
		this.Swiper_content();
		this.Bind_event();
		this.contentScroll_fixNav();
		this.contentScroll_fixNav2();
	},

	/**
	 * 绑定事件                  覃东梁
	 * 2017年12月12日   22:04:01
	 */
	Bind_event : function() {
		var me = this;
		$(".wrap-list-two .wrap-two").on("click", function() {
			var parents = void 0, _index = $(this).index();
			if($(this).parents(".wrap-box").is(":visible")) {
				parents = $(this).parents(".wrap-box"),
				me.isHidden({
					index: _index,
					btn: $(parents).find(".wrap-two"),
					ls: $(parents).find(".wrap-box-two")
				});
			} else {
				var fontSize = parseInt($("html").css("font-size")),
					scrollH = $(".scroll-head").height() + $(".head-bg").height() - $(".trip-header").height() - .36 * fontSize + $(".trip .red-bg").height();
				$(this).addClass("on"), $(this).siblings().removeClass("on"), $(".wrap-box").each(function() {
					$(this).is(":visible") && (parents = $(this).context, me.isHidden({
						index: _index,
						btn: $(parents).find(".wrap-two"),
						ls: $(parents).find(".wrap-box-two")
					}), me.scrollTop(scrollH))
				})
			}
		})
	},

	isHidden: function(options) {
		options.btn.removeClass("on"), 
		options.btn.eq(options.index).addClass("on"), 
		options.ls.addClass("hide"), 
		options.ls.eq(options.index).removeClass("hide")
	},

	Swiper_content: function() {
		var mySwiperHeadbg = new Swiper(".swiper-container-headbg", {
			autoplay: 3e3,
			lazyLoading: !0,
			loop: !0,
			speed: 500,
			observer: !0,
			observeParents: !0,
			autoplayDisableOnInteraction: !1
		});
	},
	
	contentScroll_fixNav : function () {
		$(".more-list").addClass("hide");
		var num = $(window).scrollTop(),
			tripOffsetTop = (parseInt($("html").css("font-size")), void 0);
		if($(".trip .tit-ls").each(function() {
				$(this).is(":visible") && (tripOffsetTop = $(this).offset().top)
			}), tripOffsetTop <= num + $(".detail .white-topbar").height()) {
			var _tripHeader = void 0;
			$(".trip-header").is(":hidden") && ($(".wrap-list-two").each(function() {
				$(this).is(":visible") && (_tripHeader = $($(this).context).clone(!0))
			}), $(".trip-header").empty().append(_tripHeader).removeClass("hide"))
		} else {
			$(".trip-header").addClass("hide");
		}
		
		10 > num ? $(".white-topbar").removeClass("bg-gradient") : $(".white-topbar").addClass("bg-gradient"), num > 500 ? $(".back-top").removeClass("hide") : $(".back-top").addClass("hide");
		for(var _img = $(".j-img-show .img-lazy"), _defauleImg = "https://r03.uzaicdn.com/content/hybrid/images/product/comment-default.jpg", i = 0; i < _img.length; i++) _img.eq(i).offset().top < $("#wrapper").height() && (_img.eq(i).attr("data-src", _img.eq(i).attr("data-self")), 3 > i && (_img.eq(i).error(function() {
			$(this).attr("src", _defauleImg)
		}), _img.eq(i).attr("src") !== _defauleImg && _img.eq(i).attr("src") !== _img.eq(i).attr("data-self") && _img.eq(i).attr("src", _img.eq(i).attr("data-self"))));
		
		for(var _imgTrip = $(".trip .img-list"), _lazyImgTrip = void 0, _defauleTripImg = "https://r03.uzaicdn.com/content/hybrid/images/product/trip-default.jpg", _i = 0; _i < _imgTrip.length; _i++){
			if(_imgTrip.eq(_i).offset().top < $("#wrapper").height()) {
				_lazyImgTrip = _imgTrip.eq(_i).find(".swiper-lazy");
				for(var j = 0; j < _lazyImgTrip.length; j++) _lazyImgTrip.eq(j).attr("data-src", _lazyImgTrip.eq(j).attr("data-self")), 2 > j && (_lazyImgTrip.eq(j).error(function() {
					$(this).attr("src", _defauleTripImg)
				}), _lazyImgTrip.eq(j).attr("src") !== _defauleTripImg && _lazyImgTrip.eq(j).attr("src") !== _lazyImgTrip.eq(j).attr("data-self") && _lazyImgTrip.eq(j).attr("src", _lazyImgTrip.eq(j).attr("data-self")))
			}
		}
		
		$(".white-topbar .more").click(function() {
			function touch(e) {
				var _con = $(".detail .white-topbar");
				_con.is(e.target) || 0 !== _con.has(e.target).length || ($(".more-list").addClass("hide"), document.removeEventListener("touchstart", touch))
			}
			var moreList = $(".more-list");
			document.addEventListener("touchstart", touch), moreList.hasClass("hide") ? moreList.removeClass("hide") : moreList.addClass("hide")
		});
	},
	
	contentScroll_fixNav2 : function() {
		var me = this;
		var contentScroll = document.getElementById("wrapper");
		window.contentScroll = contentScroll, $(window).scroll(function() {
			me.contentScroll_fixNav();
		}), $(".back-top").on("click", function() {
			$(window).scrollTop(0), $(".back-top").addClass("hide")
		})
	}, 
	
}

var Detail_content = {
	
}

var detailInterval;
jQuery(function() {
	//读取
	readDetail();

	detailInterval = new DetailInterval();
	detailInterval.init();
});

/**
 * 从地址栏获取id, 如果有就读取
 */
function readDetail() {
	var pat_id = /\bid=([^&]+)\b/, id = pat_id.test(location.search)? RegExp.$1 : null;
	if(!id) {
		return;
	}
	
	var ajaxUrl = './cruiseController.do?detailcontent';
	var ajaxOpts = {
			async: false
			, type: 'POSt'
			, dataType: 'json'
			, data: {id: id}
			, success: function(dat) {
				onLoadArticle(dat['obj']);
			}
	};
	$.ajax(ajaxUrl, ajaxOpts)
}
/**
 * angularjs
 */
try {
	/**
	 * 创建angularjs module
	 */
	var mainApp = angular.module("mainApp", []);
	/**
	 * 创建路由
	 */
	/**
	 * 创建angularjs controller
	 */
	mainApp.controller('content', ['$scope','$compile',function($scope, $compile) {
	   /*$scope.ProductInfo = {
	       ProductName: new Date()
	   };*/
		/**
		 * 读取详细行程
		 * @param articleId
		 * @returns
		 */
		$scope.JouneryInfo_init = function (articleId) {
			//
			$('#wrapper').hide();
			
			$('#detail_wrapper').show().css({left: 0});
			
			var td = $('#j_traveldetail_hd');
			if(td && td.length) {
				return;
			}
			
			$.get('./cruiseController.do?traveldetail', function(dat) {
					var tpl = angular.element(dat);
					var ele = $compile(tpl)($scope);
					angular.element('#detail_wrapper').append(ele);
					
					$scope.$apply();
			});
		};
		
		/**
		 * 详细行程 展开顶部每天行程
		 * @param index
		 * @returns
		 */
		$scope.JouneryInfo_days = function(index) {
            0 === index ? document.getElementById("t-wrapper").scrollTop = 1 : document.getElementById("t-wrapper").scrollTop = document.getElementsByClassName("tsection")[index].offsetTop + 10;
            var showday = document.getElementById("showday"),
                j_drop_wrapper = document.getElementById("j-drop-wrapper"),
                j_t_wrapper = document.getElementById("t-wrapper");
            showday.innerHTML = index + 1, j_drop_wrapper.classList.remove("hover"), j_t_wrapper.classList.remove("t-wrapper-scroll")		
        };
		/**
		 * 详细行程返回
		 */
		$scope.routerGoBack = function() {
			$('#wrapper').show();
			var dw = $('#detail_wrapper');
			dw.css({left: dw.width() + 'px'});
			
		};
		
	}]);
	/**
	 * html实体转码
	 */
	mainApp.filter("trustHtml",function($sce){
		return function(input){
			if(void 0!==input){
				var txt=input.replace(/\r/g,"</br>");
				return txt.replace(/\n/g,"&nbsp;"),$sce.trustAsHtml(txt)
			}
			return $sce.trustAsHtml(input)}
	});
} catch (err) {
	console.log(err);
}
/**
 * 更新angularjs model
 */
function onLoadArticle(cmsArticle) {
    //获得module
    var app = getAppScope();
    if(!app) {
    	console.log('获取angularjs失败')
    	return;
    }
    //通知angularjs更新绑定
    app.$apply(function() {
    	//将cmsArticle转换
    	//基本信息
    	var ProductInfo = {
    			'ProductName': cmsArticle['title']
    			, 'BenefitedPrice': cmsArticle['price']
    			, 'Price': cmsArticle['price_vip']
    	};
    	app.ProductInfo = ProductInfo;
    	//头部图片
    	var ProductImgs = [];
    	var photos = cmsArticle['photos'];
    	if(photos && photos.length) {
    		for(var i = 0, itm; i < photos.length; i ++) {
    			itm = photos[i];
    			ProductImgs.push({
    				'ImgUrl': './cmsPhotoController.do?view&fileid=' + itm['id']
    			});
    		}
    	}
    	app.ProductImgs = ProductImgs;
    	//行程分组
    	var JouneryGroups = [];
    	//行程天数
    	var JouneryGroupInfo = {
    			'Days': cmsArticle['days']
    			, 'Nights': cmsArticle['nights']
    	};
        //app.JouneryGroupInfo = JouneryGroupInfo;
        //行程安排
        var JouneryDetail = [];
        var routes = cmsArticle['routes'];
        if(routes && routes.length) {
        	var pat_traffic = new RegExp('(?:\\>(\\d+)\\:)?([\\w\\W]+?(?=\\>\\d+\\:)|[\\w\\W]+?$)', 'gi');
    		for(var i = 0, itm, tt, travelTypes, travelPhotos; i < routes.length; i ++) {
    			itm = routes[i];
    			//交通, 地点
    			travelTypes = [];
    			pat_traffic.lastIndex = -1;
    			while((tt = pat_traffic.exec(itm['traffic']))) {
    				travelTypes.push({
    					'Type': tt[1]
    					, 'TreeName': tt[2]
    				});
    			}
    			//图片
    			travelPhotos = [];
    			tt = itm['photos'];
    			if(tt && tt.length) {
    				for(var j = 0; j < tt.length; j ++) {
    					travelPhotos.push({
    						'ImgUrl': './cmsPhotoController.do?view&fileid=' + tt[j]['id']
    					});
    				}
    			}
    			//
    			JouneryDetail.push({
    				'Days': (1 + i)
    				, 'ProductTravelTypes': travelTypes
    				, 'Breakfast': itm['breakfastLabel']
    				, 'HaveLunch': itm['lunchLabel']
    				, 'Dinner': itm['dinnerLabel']
    				, 'HotelList': itm['stay']
    				, 'Content': itm['detail']
    				, 'JouneryImgInfo': travelPhotos
    			});
    		}
        }
        JouneryGroupInfo['JouneryDetail'] = JouneryDetail;
        //注意事项
        JouneryGroupInfo['Notice'] = cmsArticle['notice'];
        //费用
        JouneryGroupInfo['CostInclude'] = cmsArticle['expense_contain'];
        JouneryGroupInfo['CostNotInclude'] = cmsArticle['expense_ncontain'];
        //添加到行程分组
        JouneryGroups.push(JouneryGroupInfo);
        //
        app.JouneryGroups = JouneryGroups;
        //详细行程
        buildJouneryDayInfo();
        
    });
}
/**
 * 生成详细行程
 */
function buildJouneryDayInfo() {
	var app = getAppScope();
	var JouneryGroups = app.JouneryGroups;
    /*
     * 取出文章的行程, 拷贝
     * 
     */
    var JouneryDayInfo = [], JouneryInfo, ProductTravelTypes;
    var JouneryGroupInfo, JouneryDetail, Detail;
    for(var i = 0; i < JouneryGroups.length; i ++) {
    	JouneryGroupInfo = JouneryGroups[i];
    	JouneryDetail = JouneryGroupInfo['JouneryDetail'];
    	for(var j = 0; j < JouneryDetail.length; j ++) {
    		Detail = JouneryDetail[j];
    		//
    		JouneryInfo = {};
    		for(var k in Detail) {
    			if(/(?:Breakfast|HaveLunch|Dinner)$/.test(k)) {
    				continue;
    			}
    			JouneryInfo[k] = Detail[k];
    		}
    		//用餐
    		JouneryInfo['Lunch'] = '早餐(' + Detail['Breakfast'] + ')午餐(' + Detail['HaveLunch'] + ')晚餐(' + Detail['Dinner'] + ')';
    		
    		JouneryDayInfo.push(JouneryInfo);
    	}
    	//设计缺陷只支持一个行程
    	break;
    }
    
    app.JouneryDayInfo = JouneryDayInfo;
}
/**
 * 
 */
function getAppScope() {
	return angular.element("body").scope();
}