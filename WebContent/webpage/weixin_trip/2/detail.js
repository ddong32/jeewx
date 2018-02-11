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
	detailInterval = new DetailInterval();
	detailInterval.init();
	
});
/**
 * 读取详细行程
 * @param articleId
 * @returns
 */
function JouneryInfo_init(articleId) {
	$('#wrapper').hide();
	$('#detail_wrapper').show().css({left: 0}).load('./cruiseController.do?traveldetail', {'id': articleId}, function() {
		$('#ondays_title').click(function() {
			//$('#j-drop-wrapper').show();//.toggle('fast');
			var jdw = $('#j-drop-wrapper'), t;
			if(jdw.offset().top >= 0) {
				t = -15;//jdw.height();
			} else {
				t = 0;
			}
			jdw.animate({'top': t + 'rem'});//.toggle('fast');
		});
	});
}
/**
 * 详细行程 展开顶部每天行程
 * @param index
 * @returns
 */
function JouneryInfo_days(index){
	//0===index?document.getElementById("t-wrapper").scrollTop=1:document.getElementById("t-wrapper").scrollTop=document.getElementsByClassName("tsection")[index].offsetTop+10;
	var showday=document.getElementById("showday")
		, j_drop_wrapper=document.getElementById("j-drop-wrapper")
		, j_t_wrapper=document.getElementById("t-wrapper");
	
	var jdw = $(j_drop_wrapper), h = jdw.height();
	jdw.animate({'top': (0 - h) + 'px'});
	
	j_t_wrapper.scrollTop = 0===index? 1 : document.getElementsByClassName("tsection")[index].offsetTop+10;

	showday.innerHTML=index+1;
	j_drop_wrapper.classList.remove("hover");
	j_t_wrapper.classList.remove("t-wrapper-scroll");
}
/**
 * 详细行程返回
 */
function routerGoBack() {
	$('#wrapper').show();
	var dw = $('#detail_wrapper');
	dw.css({left: dw.width() + 'px'});
	
}