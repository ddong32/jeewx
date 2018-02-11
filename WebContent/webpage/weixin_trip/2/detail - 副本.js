! function(modules) {
	function __webpack_require__(moduleId) {
		if(installedModules[moduleId]) return installedModules[moduleId].exports;
		var module = installedModules[moduleId] = {
			exports: {},
			id: moduleId,
			loaded: !1
		};
		return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), module.loaded = !0, module.exports
	}
	var installedModules = {};
	return __webpack_require__.m = modules, 
	       __webpack_require__.c = installedModules, 
	       __webpack_require__.p = "", __webpack_require__(0)
}({
	0: function(module, exports, __webpack_require__) {
		"use strict";

		function VisaInfo_Click(url) {
			Config.Isapp ? bridge.openActivity(url, "0") : location.href = url
		}

		function goBack() {
			var url = api.getCookie("backUrl"),
				subjectUrl = document.referrer;
			subjectUrl.indexOf("subject") >= 0 && (url = subjectUrl), bridge.goBackForProductdetail(url, !0, !1)
		}

		function androidGoBack() {
			var viewName = window.location.hash.replace("#/", "");
			"" !== $.trim(viewName) ? api.routerGoBack() : bridge.goBack("", !0, !1, 1)
		}
		var _vstoresdk = __webpack_require__(7);
		api.backUrl = "javascript:goBack()", api.loading(), null !== api.getQueryString("vstoreid") && "null" !== api.getQueryString("vstoreid") && "" !== api.getQueryString("vstoreid") && (api.__asyncLoadingCode__ = "0"), api.serverVirtualDir = "product";
		var uzai = angular.module("uzai", []);
		window.androidGoBack = androidGoBack, window.VisaInfo_Click = VisaInfo_Click, uzai.filter("trustHtml", function($sce) {
			return function(input) {
				if(void 0 !== input) {
					var txt = input.replace(/\r/g, "</br>");
					return txt.replace(/\n/g, "&nbsp;"), $sce.trustAsHtml(txt)
				}
				return $sce.trustAsHtml(input)
			}
		});
		var Detail_config = {
				create: function() {
					var Detail_config = {};
					return Detail_config.Isapp = api.isApp(), Detail_config.IsappIos = "ios" === api.devicetype, Detail_config.productId = api.getQueryString("productid"), Detail_config.vstoreid = api.getQueryString("vstoreid"), Detail_config.telephone = api.getQueryString("telephone"), Detail_config.userId = "0", Detail_config.userName = "", Detail_config.userInit = function() {
						var user = api.getCookie("user"),
							self = this;
						!user || "undefined" == typeof user || user.length < 5 ? self.userId = 0 : (self.userId = api.getValue("userid", user), self.userName = api.getValue("userName", user), "undefined" != typeof self.userName && "undefined" !== self.userName || (self.userName = ""))
					}, Detail_config.userInit(), Detail_config
				}
			},
			Purchase_notice = {
				create: function() {
					var Purchase_notice = {};
					return Purchase_notice.clickShoworHide = function() {
						$(".icon").unbind("click").click(function() {
							"none" === $(this).next().css("display") ? ($(".editorcon").hide(), $(".tubiao").removeClass("icon-top"), $(".tubiao").addClass("icon-bottom"), $(this).next().show(), $(this).find(".tubiao").removeClass("icon-bottom"), $(this).find(".tubiao").addClass("icon-top")) : ($(this).next().hide(), $(this).find(".tubiao").removeClass("icon-top"), $(this).find(".tubiao").addClass("icon-bottom"))
						})
					}, Purchase_notice._pimgloading = function() {
						for(var _imglazy = $("#j-purchase-wrapper .img-lazy"), i = 0; i < _imglazy.length; i++) _imglazy.eq(i).offset().top < window.scrollY + window.innerHeight && _imglazy.eq(i).attr("src", _imglazy.eq(i).attr("data-self"))
					}, Purchase_notice._pinchImg = function() {
						function resetElement() {
							el.addClass("animate"), transform = {
								translate: {
									x: 0,
									y: 0
								},
								scale: 1,
								angle: 0,
								rx: 0,
								ry: 0,
								rz: 0
							}, requestElementUpdate()
						}

						function updateElementTransform() {
							var value = ["translate3d(" + transform.translate.x + "px, " + transform.translate.y + "px, 0)", "scale(" + transform.scale + ", " + transform.scale + ")", "rotate3d(" + transform.rx + "," + transform.ry + "," + transform.rz + "," + transform.angle + "deg)"];
							value = value.join(" "), "" != _eImg && (_eImg.style.webkitTransform = value, _eImg.style.mozTransform = value, _eImg.style.transform = value), ticking = !1
						}

						function requestElementUpdate() {
							ticking || (reqAnimationFrame(updateElementTransform), ticking = !0)
						}

						function onPan(ev) {
							el.removeClass("animate"), transform.translate = {
								x: ev.deltaX,
								y: ev.deltaY
							}
						}

						function onPinch(ev) {
							return "pinchstart" == ev.type && (initScale = transform.scale || 1), el.removeClass("animate"), transform.scale = initScale * ev.scale, requestElementUpdate(), _eImg = ev.target
						}

						function onSwipe(ev) {
							var angle = 10;
							return transform.ry = ev.direction & Hammer.DIRECTION_HORIZONTAL ? 1 : 0, transform.rx = ev.direction & Hammer.DIRECTION_VERTICAL ? 1 : 0, transform.angle = ev.direction & (Hammer.DIRECTION_RIGHT | Hammer.DIRECTION_UP) ? angle : -angle, requestElementUpdate(), _eImg = ev.target
						}
						for(var transform, reqAnimationFrame = function() {
								return window[Hammer.prefixed(window, "requestAnimationFrame")] || function(callback) {
									window.setTimeout(callback, 1e3 / 60)
								}
							}(), el = $(".img-view img"), ticking = !1, initScale = 1, _eImg = "", m = 0; m < el.length; m++) {
							var mc = new Hammer.Manager(el[m]);
							mc.add(new Hammer.Pan({
								threshold: 0,
								pointers: 0
							})), mc.add(new Hammer.Swipe).recognizeWith(mc.get("pan")), mc.add(new Hammer.Pinch({
								threshold: 0
							})).recognizeWith(mc.get("pan")), mc.on("panstart panmove", onPan), mc.on("pinchstart pinchmove", onPinch), mc.on("swipe", onSwipe)
						}
						resetElement()
					}, Purchase_notice
				}
			},
			Detail_comment = {
				create: function() {
					var Detail_comment = {};
					return Detail_comment.mySwiperShowimg = new Swiper(".swiper-container-Showimg", {
						speed: 500,
						lazyLoading: !0,
						autoplayDisableOnInteraction: !1,
						pagination: ".swiper-pagination",
						paginationType: "fraction",
						observer: !0,
						observeParents: !0,
						onSlideChangeStart: function(swiper) {
							$(".img-view .number").html(swiper.activeIndex + 1)
						}
					}), Detail_comment.mySwiperComment = function() {
						window.mySwiperComment = new Swiper(".swiper-container-comment", {
							slidesPerView: 2.78,
							speed: 500,
							initialSlide: 0,
							lazyLoading: !0,
							threshold: 25,
							autoplayDisableOnInteraction: !1
						})
					}, Detail_comment.commentPopImg = function() {
						var self = this;
						$(".j-img-show li").on("click", function() {
							var _index = $(this).index(),
								_img = $(this).parents(".j-img-show").find("img"),
								_htmlImg = "";
							_img.each(function(index) {
								_htmlImg += index === _index ? '<li class="swiper-slide"><img src="' + this.getAttribute("data-large") + '"></li>' : '<li class="swiper-slide"><div class="swiper-lazy-preloader"></div><img class="swiper-lazy" data-src="' + this.getAttribute("data-large") + '"></li>'
							}), $(".img-view li").remove(), $(".img-view ul").append(_htmlImg), $(".img-view .sumnumber").html(_img.length), self.mySwiperShowimg.slideTo(_index), $(".img-view").show();
							var height = $(window).height() - 1.5 * parseInt($("html").css("font-size")),
								width = $(window).width();
							$(".img-view li").css({
								height: height,
								width: width
							}), self.mySwiperShowimg.update(), $(this).parent().hasClass("j-img-pinch") && Purchase._pinchImg(), $(".img-view .close-btn").unbind("click").click(function() {}), $(".img-view .close-btn").click(function() {
								$(".img-view").hide()
							})
						})
					}, Detail_comment.startIndex = 1, Detail_comment.init = function() {
						var fontSize = (document.getElementById("J_router_linereviews"), parseInt($("html").css("font-size")));
						document.getElementById("j_linereviews_wrapper").style.height = window.innerHeight - .88 * fontSize + "px", new ScrollIOS("j_linereviews_wrapper", "linereviews")
					}, Detail_comment.linereviewsImgLazy = function() {
						for(var _img = $("#J_router_linereviews .j-img-show"), _lazyImg = void 0, _defauleImg = "https://r03.uzaicdn.com/content/hybrid/images/product/comment-default.jpg", i = 0; i < _img.length; i++)
							if(_img.eq(i).offset().top < $("#j_linereviews_wrapper").height()) {
								_lazyImg = _img.eq(i).find(".img-lazy");
								for(var j = 0; j < _lazyImg.length; j++) _lazyImg.eq(j).attr("data-src", _lazyImg.eq(j).attr("data-self")), 3 > j && (_lazyImg.eq(j).error(function() {
									$(this).attr("src", _defauleImg)
								}), _lazyImg.eq(j).attr("src") !== _defauleImg && _lazyImg.eq(j).attr("src") !== _lazyImg.eq(j).attr("data-self") && _lazyImg.eq(j).attr("src", _lazyImg.eq(j).attr("data-self")))
							}
					}, Detail_comment
				}
			},
			Detail_content = {
				create: function() {
					var Detail_content = {};
					return Detail_content.headHeight = $(".head-bg").height(), Detail_content.historyClick = function() {
						$(".history-view .close-btn").on("click", function() {
							$(".detail-content").removeClass("left"), setTimeout(function() {
								$(".detail .wrapper-scroll").css({
									position: "static",
									height: "auto"
								}), $(".cal-mask").addClass("hide")
							}, 200)
						})
					}, Detail_content.mySwiperHeadbg = function() {
						var mySwiperHeadbg = new Swiper(".swiper-container-headbg", {
							autoplay: 3e3,
							lazyLoading: !0,
							loop: !0,
							speed: 500,
							observer: !0,
							observeParents: !0,
							autoplayDisableOnInteraction: !1
						});
						return mySwiperHeadbg
					}, Detail_content.mySwiperPeriphery = function() {
						var mySwiperPeriphery = new Swiper(".swiper-container-periphery", {
							slidesPerView: 1.15,
							speed: 500,
							lazyLoading: !0,
							autoplayDisableOnInteraction: !1
						});
						return mySwiperPeriphery
					}, Detail_content.showMore = function() {
						$(".j-show-more").unbind("click").click(function() {}), $(".j-show-more").click(function() {
							var box = $(this).prev();
							box.hasClass("auto") ? (box.removeClass("auto"), $(this).find(".iconfont").addClass("icon-bottom").removeClass("icon-top")) : (box.addClass("auto"), $(this).find(".iconfont").removeClass("icon-bottom").addClass("icon-top"))
						})
					}, $.fn.isHidden = function(options) {
						options.btn.removeClass("on"), options.btn.eq(options.index).addClass("on"), options.ls.addClass("hide"), options.ls.eq(options.index).removeClass("hide")
					}, Detail_content.documentReady = function() {
						function contentScroll_fixNav() {
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
							} else $(".trip-header").addClass("hide");
							10 > num ? $(".white-topbar").removeClass("bg-gradient") : $(".white-topbar").addClass("bg-gradient"), num > 500 ? $(".back-top").removeClass("hide") : $(".back-top").addClass("hide");
							for(var _img = $(".j-img-show .img-lazy"), _defauleImg = "https://r03.uzaicdn.com/content/hybrid/images/product/comment-default.jpg", i = 0; i < _img.length; i++) _img.eq(i).offset().top < $("#wrapper").height() && (_img.eq(i).attr("data-src", _img.eq(i).attr("data-self")), 3 > i && (_img.eq(i).error(function() {
								$(this).attr("src", _defauleImg)
							}), _img.eq(i).attr("src") !== _defauleImg && _img.eq(i).attr("src") !== _img.eq(i).attr("data-self") && _img.eq(i).attr("src", _img.eq(i).attr("data-self"))));
							for(var _imgTrip = $(".trip .img-list"), _lazyImgTrip = void 0, _defauleTripImg = "https://r03.uzaicdn.com/content/hybrid/images/product/trip-default.jpg", _i = 0; _i < _imgTrip.length; _i++)
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
						var contentScroll = document.getElementById("wrapper");
						window.contentScroll = contentScroll, $(window).scroll(function() {
							contentScroll_fixNav()
						}), $(".back-top").on("click", function() {
							$(window).scrollTop(0), $(".back-top").addClass("hide")
						})
					}, Detail_content
				}
			},
			Detail_history = {
				create: function() {
					var Detail_history = {},
						historyScroll = document.getElementById("historywrapper");
					parseInt($("html").css("font-size"));
					return Detail_history.init = function() {
						function historyImgLazy() {
							for(var _img = $(".history-view img"), i = 0; i < _img.length; i++) _img.eq(i).offset().top < historyScroll.scrollTop + $("header").height() + window.innerHeight && _img.eq(i).attr("src", _img.eq(i).attr("data-src"))
						}
						historyScroll.onscroll = function() {
							historyImgLazy()
						}, historyImgLazy()
					}, Detail_history
				}
			},
			Detail_zaixiankefu = {
				create: function() {
					if(api.isApp()) {
						var appversion = api.getQueryString("appversion"),
							versionnum = appversion.replace(/\./g, "");
						return api.isApp() && versionnum >= 556 ? self.flag = !0 : self.flag = !1
					}
					return self.flag = !0
				}
			},
			Config = Detail_config.create(),
			Comment = Detail_comment.create(),
			Content = Detail_content.create(),
			Purchase = Purchase_notice.create(),
			UserHistory = Detail_history.create(),
			Zaixiankefu = Detail_zaixiankefu.create();
		! function(window, document, $, uzai, Config, Content, UserHistory) {
			uzai.controller("content", function($http, $scope, $sce, $compile) {
				$scope.isApp = Config.Isapp, $scope.zaixiankefu = Zaixiankefu, $scope.isAppIos = Config.IsappIos;
				var param = JSON.stringify({
					ProductID: Config.productId
				});
				api.post($http, $scope, api.path.mproductlogic, "UzaiProduct", "GetProductInfo", param, function(obj) {
					if($(".detail").css("display", "block"), (-3 !== obj.ErrorCode || (api.toast(obj.ErrorMsg), api.isApp())) && (200 === obj.ErrorCode || (api.toast("获取数据出现问题,请稍后重试!"), api.isApp()))) {
						null === obj.JsonResult && api.toast("获取数据出现问题,请稍后重试!");
						var Product = JSON.parse(obj.JsonResult),
							PrdouctInfoJump = Product.PrdouctInfoJump;
						if(null === PrdouctInfoJump || "undefined" == typeof PrdouctInfoJump || "" === PrdouctInfoJump) {
							var typeparam = JSON.stringify({
								ProductID: Config.productId
							});
							api.post($http, $scope, api.path.mproductlogic, "UzaiProduct", "GetPrdouctInfoJump", typeparam, function(obj) {
								if(200 !== obj.ErrorCode && -3 !== obj.ErrorCode || -3 !== obj.ErrorCode || (api.toast(obj.ErrorMsg), $(".detail").css("display", "block"), api.isApp())) {
									var respones = JSON.parse(obj.JsonResult);
									if(null === respones || "undefined" == typeof respones || "" === respones) return void api.toast("该产品不存在！");
									if(0 === respones.JumpType) {
										var _endUrl = "https://m.uzai.com/waptour-" + Config.productId + ".html";
										return void(window.location.href = _endUrl)
									}
									return 20 === respones.JumpType ? (endUrl = "https://m.uzai.com/trip/wap/" + Config.productId + ".html", void(window.location.href = endUrl)) : void 0
								}
							}, 2, !1)
						} else {
							if(0 === PrdouctInfoJump.JumpType) {
								var _endUrl2 = "https://m.uzai.com/waptour-" + Config.productId + ".html";
								return void(window.location.href = _endUrl2)
							}
							if(20 === PrdouctInfoJump.JumpType) return endUrl = "https://m.uzai.com/trip/wap/" + Config.productId + ".html", void(window.location.href = endUrl)
						}
						if($scope.ProductInfo = Product, Product.BenefitedPrice > 0 ? ($("title").html("￥" + $scope.ProductInfo.BenefitedPrice + "  " + $scope.ProductInfo.ProductName), $("meta[name=keywords]").attr("content", "￥" + $scope.ProductInfo.BenefitedPrice + "  " + $scope.ProductInfo.ProductName), $("meta[name=description]").attr("content", "￥" + $scope.ProductInfo.BenefitedPrice + "  " + $scope.ProductInfo.ProductName)) : ($("title").html($scope.ProductInfo.ProductName), $("meta[name=keywords]").attr("content", $scope.ProductInfo.ProductName), $("meta[name=description]").attr("content", $scope.ProductInfo.ProductName)), $scope.ProductImgs = Product.ProductImgInfo, $scope.ProductTourDates = Product.ProductTourDate, $scope.JouneryGroups = Product.JouneryGroup, $scope.TalkBackInfos = Product.TalkBackInfo, $scope.Title = Product.CityName + "出发-跟团游", 14 === Product.ProductType && 1 === Product.UzaiTravelClassID ? $scope.Title = Product.CityName + "出发-自由行" : 2 === Product.ProductType && ($scope.Title = Product.CityName + "出发-半自助"), null !== Config.vstoreid && "null" !== Config.vstoreid && "" !== Config.vstoreid && "" !== Config.telephone && null !== Config.telephone && "null" !== Config.telephone) $scope.Telephone = Config.telephone, $("#productfooter").hide(), $("#vstorefooter").removeClass("hide"), $scope.Vstoreid = Config.vstoreid, setTimeout(function() {
							_vstoresdk.weixinsdk.init(document.title + "-众信旅游悠哉网", location.href, "", document.getElementsByName("description")[0].content)
						}, 800);
						else {
							var devicetype = api.getQueryString("devicetype");
							"ios" === devicetype ? $scope.Telephone = Product.IOSTelephone : "android" === devicetype ? $scope.Telephone = Product.AndroidTelephone : $scope.Telephone = Product.WapTelephone, Config.telephone = $scope.Telephone, $("#productfooter").show(), $("#vstorefooter").addClass("hide")
						}
						$scope.QuestionPop = function() {
							function touch(e) {
								var _con = $("#cal-pop .container");
								_con.is(e.target) || 0 !== _con.has(e.target).length || ($("#cal-pop").addClass("hide"), $(".cal-mask").addClass("hide"), document.removeEventListener("touchstart", touch))
							}
							$("#cal-pop").removeClass("hide"), $(".cal-mask").removeClass("hide"), document.addEventListener("touchstart", touch)
						};
						var imgpic = "";
						$scope.ProductImgs.length > 0 && (imgpic = $scope.ProductImgs.length > 2 ? $scope.ProductImgs[2].ImgUrl : $scope.ProductImgs[0].ImgUrl), $scope.productImgUrl = imgpic, $scope.ProductURL = "https://m.uzai.com/product/detail.html?productid=" + Config.productId, $scope.scheduleLink = function(a, b) {
							var url = "calendar.html?productid=" + a;
							null !== b && (url += "&seldate=" + b), null !== Config.vstoreid && Config.vstoreid > 0 && (url += "&vstoreid=" + Config.vstoreid), window.location.href = url
						}, $scope.VisaExtendUrl_init = function(UzaiJouneryGroupID) {
							if(api.setSessionStorage("UzaiJouneryGroupID", UzaiJouneryGroupID), null !== $scope.JouneryGroups)
								for(var i = 0; i < $scope.JouneryGroups.length; i++)
									if($scope.JouneryGroups[i].UzaiJouneryGroupID === UzaiJouneryGroupID) {
										var Info = $scope.JouneryGroups[i].VisaInfo.toString(),
											VisaInfo = $scope.JouneryGroups[i].VisaInfo.toString(),
											result = void 0,
											pattReg = new RegExp(/href=\"([^\"]*)\"/g);
										do result = pattReg.exec(Info), null !== result && (VisaInfo = VisaInfo.replace(result[0], "onclick=VisaInfo_Click('" + result[1] + "')")); while (null !== result);
										$scope.VisaInfo = VisaInfo
									}
						}, $scope.JouneryInfo_init = function(UzaiJouneryGroupID) {
							if(api.setSessionStorage("UzaiJouneryGroupID", UzaiJouneryGroupID), null !== $scope.JouneryGroups)
								for(var i = 0; i < $scope.JouneryGroups.length; i++) $scope.JouneryGroups[i].UzaiJouneryGroupID === UzaiJouneryGroupID && ($scope.JouneryDayInfo = $scope.JouneryGroups[i].JouneryDetail)
						}, $scope.JouneryInfo_days = function(index) {
							0 === index ? document.getElementById("t-wrapper").scrollTop = 1 : document.getElementById("t-wrapper").scrollTop = document.getElementsByClassName("tsection")[index].offsetTop + 10;
							var showday = document.getElementById("showday"),
								j_drop_wrapper = document.getElementById("j-drop-wrapper"),
								j_t_wrapper = document.getElementById("t-wrapper");
							showday.innerHTML = index + 1, j_drop_wrapper.classList.remove("hover"), j_t_wrapper.classList.remove("t-wrapper-scroll")
						}, $scope.Shopping_init = function(UzaiJouneryGroupID, JouneryDetailID) {
							if(api.setSessionStorage("UzaiJouneryGroupID", UzaiJouneryGroupID), api.setSessionStorage("JouneryDetailID", JouneryDetailID), null !== $scope.JouneryGroups)
								for(var i = 0; i < $scope.JouneryGroups.length; i++)
									if($scope.JouneryGroups[i].UzaiJouneryGroupID === UzaiJouneryGroupID)
										for(var j = 0; j < $scope.JouneryGroups[i].JouneryDetail.length; j++) $scope.JouneryGroups[i].JouneryDetail[j].JouneryDetailID === JouneryDetailID && null !== $scope.JouneryGroups[i].JouneryDetail[j].JouneryShopping && ($scope.ShoppingInfo = $scope.JouneryGroups[i].JouneryDetail[j].JouneryShopping)
						}, $scope.PurchaseNotice_init = function(UzaiJouneryGroupID) {
							if(api.setSessionStorage("UzaiJouneryGroupID", UzaiJouneryGroupID), null !== $scope.JouneryGroups)
								for(var i = 0; i < $scope.JouneryGroups.length; i++) $scope.JouneryGroups[i].UzaiJouneryGroupID === UzaiJouneryGroupID && ($scope.JouneryPurchaseNotice = $scope.JouneryGroups[i])
						};
						var UzaiJouneryGroupID = api.getSessionStorage("UzaiJouneryGroupID"),
							JouneryDetailID = api.getSessionStorage("JouneryDetailID");
						null !== UzaiJouneryGroupID && ($scope.JouneryInfo_init(UzaiJouneryGroupID), $scope.PurchaseNotice_init(UzaiJouneryGroupID), $scope.VisaExtendUrl_init(UzaiJouneryGroupID), null !== JouneryDetailID && $scope.Shopping_init(UzaiJouneryGroupID, JouneryDetailID)), $scope.IsAlreadytFavorites = 0, Content.historyClick(), Config = Detail_config.create(), null !== Config.userId && "undefined" != typeof Config.userId && "" !== Config.userId && "0" !== Config.userId && 0 !== Config.userId && setTimeout(function() {
							var isFavriteParam = JSON.stringify({
								UserID: Config.userId,
								UzaiProductID: Config.productId
							});
							api.post($http, $scope, api.path.mproductlogic, "UzaiUserProductFavorites", "IsAlreadytFavorites", isFavriteParam, function(obj) {
								if(200 !== obj.ErrorCode && -3 !== obj.ErrorCode || -3 !== obj.ErrorCode || (api.toast(obj.ErrorMsg), api.isApp())) {
									var msg = JSON.parse(obj.JsonResult);
									if($scope.IsAlreadytFavorites = msg, 1 === $scope.ProductInfo.Enable && $scope.ProductInfo.ProductTourDate.length > 0) {
										var insertHistoyParam = JSON.stringify({
											UserID: Config.userId,
											UserName: Config.userName,
											ProductID: Config.productId,
											ProductPrice: $scope.ProductInfo.BenefitedPrice,
											ProductName: $scope.ProductInfo.ProductName,
											ProdcutNameExtension: $scope.ProductInfo.ProductNameExtension,
											ProductURL: window.location.href,
											ProductPicURL: imgpic
										});
										api.post($http, $scope, api.path.mproductlogic, "UzaiScanRecords", "InsertUzaiScanRecords", insertHistoyParam, function(obj) {
											if(200 !== obj.ErrorCode && -3 !== obj.ErrorCode || -3 !== obj.ErrorCode || (api.toast(obj.ErrorMsg), api.isApp())) {
												JSON.parse(obj.JsonResult)
											}
										}, 3, !1, !1)
									}
								}
							}, 0, !1, !1)
						}, 0)
					}
				}, 10, !1), $scope.history_init = function() {
					if($(".cal-mask").removeClass("hide"), $(".detail-content").addClass("left"), $(".detail .wrapper-scroll").css({
							position: "absolute",
							height: $(window).height()
						}), null === Config.userId || "undefined" == typeof Config.userId || "" === Config.userId || "0" === Config.userId || 0 === Config.userId) $scope.needLogin = !0;
					else {
						$scope.needLogin = !1;
						var _param = JSON.stringify({
							UserId: Config.userId,
							ProductID: Config.productId,
							PhoneType: 20
						});
						api.post($http, $scope, api.path.mproductlogic, "UzaiScanRecords", "GetUzaiScanRecords", _param, function(obj) {
							(200 !== obj.ErrorCode && -3 !== obj.ErrorCode || -3 !== obj.ErrorCode || (api.toast(obj.ErrorMsg), api.isApp())) && ($scope.scanRecordsList = JSON.parse(obj.JsonResult), UserHistory.init())
						}, 3, !1)
					}
				}, $scope.goLoginIn = function() {
					api.login(window.location.href, window.location.href)
				}, $scope.AddFavorites = function() {
					if(Config = Detail_config.create(), null !== Config.userId && "undefined" != typeof Config.userId && "" !== Config.userId && "0" !== Config.userId && 0 !== Config.userId) {
						var favoritesParam = JSON.stringify({
							UserID: Config.userId,
							UzaiProductID: $scope.ProductInfo.ProductID,
							ProductCode: $scope.ProductInfo.ProductCode,
							ProductName: $scope.ProductInfo.ProductName,
							MinPrice: $scope.ProductInfo.BenefitedPrice,
							UzaiTravelClassID: $scope.ProductInfo.UzaiTravelClassID
						});
						api.post($http, $scope, api.path.mproductlogic, "UzaiUserProductFavorites", "UpdateMyFavouriteProductByUserIDAndProductID", favoritesParam, function(obj) {
							if(200 === obj.ErrorCode || -3 === obj.ErrorCode)
								if(-3 === obj.ErrorCode) {
									if(api.toast(obj.ErrorMsg), !api.isApp()) return
								} else api.toast("已加入收藏！", 800), $scope.IsAlreadytFavorites = 1
						}, 0, !1)
					} else api.login(location.href, location.href)
				}, $scope.CancelFavorites = function() {
					if(Config = Detail_config.create(), null !== Config.userId && "undefined" != typeof Config.userId && "" !== Config.userId && "0" !== Config.userId && 0 !== Config.userId) {
						var cancelFavoritesParam = JSON.stringify({
							UserID: Config.userId,
							UzaiProductID: $scope.ProductInfo.ProductID
						});
						api.post($http, $scope, api.path.mproductlogic, "UzaiUserProductFavorites", "DelelteProductFavoritesByUserIDAndProductID", cancelFavoritesParam, function(obj) {
							if(200 === obj.ErrorCode || -3 === obj.ErrorCode)
								if(-3 === obj.ErrorCode) {
									if(api.toast(obj.ErrorMsg), !api.isApp()) return
								} else api.toast("已取消收藏！", 800), $scope.IsAlreadytFavorites = 0
						}, 0, !1)
					} else api.login(location.href, location.href)
				}, $scope.SharaProduct = function(title, content, imgUrl, pageUrl) {
					if(content.length + pageUrl.length > 136) {
						var allowedLength = 136 - pageUrl.length - 6;
						pageUrl.length < 136 && content.length > allowedLength && (content = content.substring(0, allowedLength) + "...")
					}
					bridge.shareSubject(title, content, imgUrl, pageUrl)
				}, $scope.GoMyOrder = function() {
					bridge.openMyOrderList()
				}, $scope.GoMyFavorites = function() {
					bridge.openMyFavorites()
				}, $scope.history_init_app = function() {
					bridge.openHistory()
				}, $scope.GoIndex = function() {
					bridge.openIndex()
				}, $scope.GoProductDetail = function(ProductID, UzaiTravelClassID, ProductType) {
					var isHistory = "true";
					bridge.openProduct(UzaiTravelClassID, ProductID, ProductType, isHistory)
				}, $scope.goBack = function() {
					goBack()
				}, angular.element(document).ready(function() {
					api.router($http, $scope, $compile, "0"), Content.documentReady()
				})
			}), uzai.directive("findHeadBg", function() {
				return {
					restrict: "AE",
					link: function(scope) {
						scope.$last === !0 && setTimeout(function() {
							Content.mySwiperHeadbg()
						}, 100)
					}
				}
			}), uzai.directive("findTrip", function($timeout) {
				return {
					restrict: "AE",
					link: function(scope) {
						scope.$last === !0 && $timeout(function() {
							$(".red-bg-li").on("click", function() {
								var index = $(this).index(),
									self = $(this);
								self.addClass("on").siblings().removeClass("on"), $(".wrap-box").removeClass("on").addClass("hide"), $(".wrap-box").eq(index).removeClass("hide").addClass("on")
							})
						}, 100)
					}
				}
			}), uzai.directive("findTripCenter", function($timeout) {
				return {
					restrict: "AE",
					link: function(scope) {
						scope.$last === !0 && $timeout(function() {
							$(".wrap-list-two .wrap-two").on("click", function() {
								var parents = void 0,
									_index = $(this).index();
								if($(this).parents(".wrap-box").is(":visible")) parents = $(this).parents(".wrap-box"), $(window).isHidden({
									index: _index,
									btn: $(parents).find(".wrap-two"),
									ls: $(parents).find(".wrap-box-two")
								});
								else {
									var fontSize = parseInt($("html").css("font-size")),
										scrollH = $(".scroll-head").height() + $(".head-bg").height() - $(".trip-header").height() - .36 * fontSize + $(".trip .red-bg").height();
									$(this).addClass("on"), $(this).siblings().removeClass("on"), $(".wrap-box").each(function() {
										$(this).is(":visible") && (parents = $(this).context, $(window).isHidden({
											index: _index,
											btn: $(parents).find(".wrap-two"),
											ls: $(parents).find(".wrap-box-two")
										}), $(window).scrollTop(scrollH))
									})
								}
							}), Content.mySwiperPeriphery(), $(".notice-info .trip-ls-tit").on("click", function() {
								var next = $(this).next(),
									rightBtn = $(this).find(".right-btn");
								next.hasClass("hide") ? (next.removeClass("hide"), rightBtn.removeClass("icon-bottom").addClass("icon-top")) : (next.addClass("hide"), rightBtn.removeClass("icon-top").addClass("icon-bottom"))
							}), Content.showMore()
						}, 100)
					}
				}
			}), uzai.directive("findRecommend", function() {
				return {
					restrict: "AE",
					link: function() {
						Content.showMore()
					}
				}
			}), uzai.directive("findCommentImg", function() {
				return {
					restrict: "AE",
					link: function(scope) {
						scope.$last === !0 && setTimeout(function() {
							Comment.mySwiperComment()
						}, 100)
					}
				}
			}), uzai.directive("findPurchase", function() {
				return {
					restrict: "AE",
					link: function() {
						var winh = $(window).height();
						$(".J-router").height(winh)
					}
				}
			}), uzai.directive("findPurchase1", function() {
				return {
					restrict: "AE",
					link: function() {
						var winh = $(window).height();
						$(".J-router").height(winh), setTimeout(function() {
							$(".J-router-content").height(winh - .88 * parseInt($("html").css("font-size")))
						}, 100)
					}
				}
			}), uzai.directive("findPurchase2", function() {
				return {
					restrict: "AE",
					link: function(scope) {
						scope.$last === !0 && setTimeout(function() {
							Purchase.clickShoworHide(), Purchase._pimgloading(), $("#j-purchase-wrapper").scroll(function() {
								Purchase._pimgloading()
							})
						}, 0)
					}
				}
			}), uzai.directive("findPurchase3", function() {
				return {
					restrict: "AE",
					link: function() {
						setTimeout(function() {
							Purchase.clickShoworHide()
						}, 0)
					}
				}
			}), uzai.directive("findCommentPop", function() {
				return {
					restrict: "AE",
					link: function(scope) {
						scope.$last === !0 && Comment.commentPopImg()
					}
				}
			}), uzai.directive("findHistory", function($timeout) {
				return {
					restrict: "AE",
					link: function(scope) {
						scope.$last === !0 && $timeout(function() {
							UserHistory.init()
						}, 100)
					}
				}
			})
		}(window, document, jQuery, uzai, Config, Content, UserHistory),
		function(window, document, $, uzai, Config, Comment) {
			uzai.controller("mreviewController", function($http, $scope) {
				var busy = !1;
				$scope.loadMorere = function() {
					if("block" !== $(".img-view").css("display")) {
						var param = JSON.stringify({
							ProductID: Config.productId,
							StartIndex: Comment.startIndex,
							PageCount: 10
						});
						if(busy) return !1;
						busy = !0, api.post($http, $scope, api.path.mproductlogic, "UzaiTalkBack", "GetUzaiTalkBackByProductId", param, function(obj) {
							if(200 === obj.ErrorCode || -3 === obj.ErrorCode) {
								if(-3 === obj.ErrorCode && (api.toast(obj.ErrorMsg), !api.isApp())) return;
								if(0 === JSON.parse(obj.JsonResult).length) return busy = !0, api.toast("没有更多点评啦～", 3e3), document.getElementById("j_linereviews_wrapper").onscroll = null, !1;
								busy = !1;
								for(var items = JSON.parse(obj.JsonResult).talkList, i = 0; i < items.length; i++) $scope.remarkList.push(items[i]);
								"$apply" !== $scope.$root.$$phase && "$digest" !== $scope.$root.$$phase && $scope.$apply()
							} else -2 === obj.ErrorCode && (busy = !0, api.toast("没有更多点评啦～", 3e3), document.getElementById("j_linereviews_wrapper").onscroll = null)
						}, 3, !1)
					}
				}, $scope.loadpage = function() {
					var param = JSON.stringify({
						ProductID: Config.productId,
						StartIndex: Comment.startIndex,
						PageCount: 10
					});
					api.post($http, $scope, api.path.mproductlogic, "UzaiTalkBack", "GetUzaiTalkBackByProductId", param, function(obj) {
						if(200 === obj.ErrorCode || -3 === obj.ErrorCode) {
							if(-3 === obj.ErrorCode && (api.toast(obj.ErrorMsg), !api.isApp())) return;
							0 === JSON.parse(obj.JsonResult).length ? api.toast("暂无点评!", 3e3) : ($scope.remarkList = JSON.parse(obj.JsonResult).talkList, setTimeout(function() {
								Comment.linereviewsImgLazy()
							}, 100))
						} else -2 === obj.ErrorCode ? (api.toast("没有更多点评啦～", 3e3), document.getElementById("j_linereviews_wrapper").onscroll = null) : api.toast(obj.ErrorMsg)
					}, 3, !1)
				}
			}), uzai.directive("loadMorereview", function($timeout) {
				return {
					restrict: "AE",
					link: function(scope) {
						$timeout(function() {
							Comment.init(), scope.loadpage();
							var tmyScroll = document.getElementById("j_linereviews_wrapper");
							tmyScroll.onscroll = function() {
								tmyScroll.scrollTop + $("#j_linereviews_wrapper").height() - $("#j_linereviews_wrapper .hd").height() + 5 >= document.querySelector("#j_linereviews_wrapper").scrollHeight && (Comment.startIndex++, scope.loadMorere()), Comment.linereviewsImgLazy()
							}, Comment.mySwiperComment()
						}, 200)
					}
				}
			}), uzai.directive("findRe", function($timeout) {
				return {
					restrict: "AE",
					link: function(scope) {
						scope.$last === !0 && $timeout(function() {
							Comment.mySwiperComment()
						}, 0)
					}
				}
			})
		}(window, document, jQuery, uzai, Config, Comment), $.fn.ownitemfunction = function() {
			function init_height() {
				var windowh = $(window).height();
				$("#J_router_ownitem").height(windowh)
			}
			init_height()
		}, $.fn.ownitemjounery = function() {
			function init_height() {
				$("#J_router_ownitemjounery").height(windowh)
			}
			var windowh = $(window).height();
			$(".shopdatas").height(windowh - $(".hd").height() - 100), init_height()
		}, $.fn.visa = function() {
			function init_height() {
				var windowh = $(window).height();
				$("#J_router_visa").height(windowh)
			}
			init_height()
		};
		var childrenFunction = {
			detailcost: function() {
				api.endloading();
				var winh = $(window).height();
				$(".J-router").height(winh), setTimeout(function() {
					$(".J-router-content").height(winh - .88 * parseInt($("html").css("font-size")))
				}, 100)
			},
			detailinfo: function() {
				api.endloading();
				var winh = $(window).height();
				$(".J-router").height(winh), setTimeout(function() {
					$(".J-router-content").height(winh - .88 * parseInt($("html").css("font-size")))
				}, 100)
			},
			purchasenotice: function() {
				Purchase.clickShoworHide(), api.endloading(), setTimeout(function() {
					$(".buynoticecon").each(function() {
						$(this).hasClass("ng-hide") || $(this).addClass("active-show")
					}), $(".active-show").each(function(i) {
						i >= 1 ? $(this).find(".tubiao").removeClass("icon-top").addClass("icon-bottom") : $(this).find(".tubiao").removeClass("icon-bottom").addClass("icon-top")
					})
				}, 800)
			},
			purchasenoticejounery: function() {
				Purchase.clickShoworHide(), api.endloading(), setTimeout(function() {
					$(".buynoticecon").each(function() {
						$(this).hasClass("ng-hide") || $(this).addClass("active-show")
					}), $(".active-show").each(function(i) {
						i >= 1 ? $(this).find(".tubiao").removeClass("icon-top").addClass("icon-bottom") : $(this).find(".tubiao").removeClass("icon-bottom").addClass("icon-top")
					})
				}, 800)
			},
			ownitem: function() {
				function init() {
					null !== $("#j_own_wrapper .shopline") && setTimeout(function() {
						$("#j_own_wrapper").ownitemfunction(), ownitemWrapper.removeEventListener("DOMNodeInserted", init), api.endloading()
					}, 100)
				}
				var ownitemWrapper = document.getElementById("j_own_wrapper");
				ownitemWrapper.addEventListener("DOMNodeInserted", init)
			},
			ownitemjounery: function() {
				function init() {
					null !== $("#j_ownitem_wrapper .shopline") && (ownitemJt++, 1 === ownitemJt && setTimeout(function() {
						$("#j_ownitem_wrapper").ownitemjounery(), ownitemWrapper.removeEventListener("DOMNodeInserted", init), api.endloading()
					}, 100))
				}
				var ownitemWrapper = document.getElementById("j_ownitem_wrapper"),
					ownitemJt = 0;
				ownitemWrapper.addEventListener("DOMNodeInserted", init)
			},
			traveldetail: function() {
				var windowh = $(window).height();
				$("#J_router_traveldetail ").height(windowh), $(".traveldetail .days").height(.8 * windowh), setTimeout(function() {
					api.endloading(), new ScrollIOS("t-wrapper", "traveldetail"), new ScrollIOS("j-t-scroller", "traveldetail"), new ScrollIOS("j-drop-wrapper", "traveldetail")
				}, 1e3)
			},
			linereviews: function() {},
			shoppinginformation: function() {},
			visa: function() {
				$("#j_visa_wrapper").visa(), api.endloading()
			},
			boradlocation: function() {}
		};
		window.childrenFunction = childrenFunction;
		var ScrollIOS = function(scrollName, routerName) {
			var element = document.getElementById(scrollName),
				router = document.getElementById("J_router_" + routerName);
			element && router && element.addEventListener("touchstart", function() {
				var startTopScroll = element.scrollTop;
				0 >= startTopScroll && (element.scrollTop = 1), startTopScroll + element.offsetHeight >= element.scrollHeight && (element.scrollTop = element.scrollHeight - element.offsetHeight - 1)
			})
		};
		window.onload = function() {
			api.isApp() || (document.getElementById("mPhone").addEventListener("click", function() {
				var productId = api.getQueryString("productid");
				window.ga("send", "event", "m_product_" + productId, "phone", Config.telephone)
			}), document.getElementById("vdPhone").addEventListener("click", function() {
				var productId = api.getQueryString("productid"),
					phone = api.getQueryString("telephone");
				window.ga("send", "event", "vd_product_" + productId, "phone", phone)
			}))
		}
	},
	7: function(module, exports) {
		"use strict";
		Object.defineProperty(exports, "__esModule", {
			value: !0
		});
		var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
				return typeof obj
			} : function(obj) {
				return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
			},
			Ajax = function() {
				function request(opt) {
					function fn() {}
					var url = opt.url || "",
						async = opt.async !== !1,
						method = opt.method || "GET",
						data = opt.data || null,
						success = opt.success || fn,
						error = opt.failure || fn;
					if(method = method.toUpperCase(), "GET" == method && data) {
						var args = "";
						if("string" == typeof data) args = data;
						else if("object" == ("undefined" == typeof data ? "undefined" : _typeof(data))) {
							var arr = new Array;
							for(var k in data) {
								var v = data[k];
								arr.push(k + "=" + v)
							}
							args = arr.join("&")
						}
						url += (-1 == url.indexOf("?") ? "?" : "&") + args, data = null
					}
					var xhr = window.XMLHttpRequest ? new XMLHttpRequest : "";
					return xhr.onreadystatechange = function() {
						_onStateChange(xhr, success, error)
					}, xhr.open(method, url, async), "POST" == method && xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;"), xhr.send(data), xhr
				}

				function _onStateChange(xhr, success, failure) {
					if(4 == xhr.readyState) {
						var s = xhr.status;
						s >= 200 && 300 > s ? success(xhr) : failure(xhr)
					}
				}
				return {
					request: request
				}
			}(),
			weixinsdk = {
				init: function(title, link, imgUrl, desc) {
					var _this = this;
					Ajax.request({
						url: "https://vd.uzai.com/VStoreAuthen/SignatureGet",
						method: "post",
						data: {},
						success: function(xhr) {
							if(api.endloading(), null != xhr.response && "" != xhr.response.replace(/\s+/g, "")) {
								var data = JSON.parse(xhr.response);
								data = JSON.parse(data), 200 === data.ErrorCode ? (data = JSON.parse(data.JsonResult), wx.config({
									debug: !1,
									appId: data.appId,
									timestamp: data.timestamp,
									nonceStr: data.nonceStr,
									signature: data.signature,
									jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone"]
								}), null != desc && "undefined" != typeof desc && (desc = desc.replace(/&lt;/g, "<").replace(/&gt;/g, ">")), _this.ready(title, link, imgUrl, desc)) : api.toast(data.ErrorMsg)
							} else api.toast("js-sdk初始化失败")
						},
						failure: function(xhr) {}
					})
				},
				ready: function(title, link, imgUrl, desc) {
					wx.ready(function() {
						wx.onMenuShareTimeline({
							title: title,
							link: link,
							imgUrl: imgUrl,
							success: function() {
								console.log("分享成功")
							},
							cancel: function() {
								console.log("取消分享")
							}
						}), wx.onMenuShareAppMessage({
							title: title,
							desc: desc,
							link: location.href,
							imgUrl: imgUrl,
							type: "",
							dataUrl: "",
							success: function() {
								console.log("分享到朋友")
							},
							cancel: function() {
								console.log("取消分享到朋友")
							}
						}), wx.onMenuShareQQ({
							title: title,
							desc: desc,
							link: link,
							imgUrl: imgUrl,
							success: function() {
								console.log("分享到QQ成功")
							},
							cancel: function() {
								console.log("取消分享到QQ")
							}
						}), wx.onMenuShareWeibo({
							title: title,
							desc: desc,
							link: link,
							imgUrl: imgUrl,
							success: function() {
								console.log("分享到腾讯微博成功")
							},
							cancel: function() {
								console.log("取消分享到腾讯微博")
							}
						}), wx.onMenuShareQZone({
							title: title,
							desc: desc,
							link: link,
							imgUrl: imgUrl,
							success: function() {
								console.log("分享到QQ空间成功")
							},
							cancel: function() {
								console.log("取消分享到QQ空间")
							}
						})
					})
				}
			};
		exports.weixinsdk = weixinsdk
	}
});