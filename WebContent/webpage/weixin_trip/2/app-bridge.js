"use strict";
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
		return typeof obj
	} : function(obj) {
		return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
	},
	bridge = function(window) {
		if("undefined" == typeof api) return console.error("warning,please load api.js first!"), !1;
		var pageBaseParam = {
				Url: "",
				IsTabBar: !1,
				Content: {},
				TabBarIndex: 0,
				ServicesInfo: {},
				ClassInfo: {},
				GA: api.getLocalStorage("GA"),
				IsNav: !0
			},
			bridge = {};
		return bridge.openIndex = function() {
			var pageParam = deepClone(pageBaseParam);
			api.isApp() ? ("ios" === devicetype ? (pageParam.ClassInfo = {
				ClassName: "UZHomeVC",
				cocoaPodName: "UZHomeModule",
				isXib: !1
			}, pageParam.IsTabBar = !0) : "android" === devicetype && (pageParam.ClassInfo = {
				ClassName: "com.uzai.app.activity.fragment.MainActivityFragment"
			}, pageParam.IsTabBar = !0), api.invoke("open.page", encodeURI(JSON.stringify(pageParam)))) : window.location = "https://m.uzai.com"
		}, bridge.openUser = function() {
			var pageParam = deepClone(pageBaseParam);
			if(api.isApp()) {
				if("ios" === devicetype) pageParam.ClassInfo = {
					ClassName: "UZHomeVC",
					cocoaPodName: "UZHomeModule",
					isXib: !1
				}, pageParam.TabBarIndex = 4, pageParam.IsTabBar = !0;
				else if("android" === devicetype) {
					var appversion = api.getCookie("appversion");
					"undefined" != typeof appversion && null !== appversion && appversion >= "6.0.0" ? pageParam.ClassInfo = {
						ClassName: "com.uzai.app.mvp.module.home.myuzai.fragment.MyUzaiProFragment.class"
					} : pageParam.ClassInfo = {
						ClassName: "com.uzai.app.activity.fragment.MainActivityFragment"
					}, pageParam.TabBarIndex = 4, pageParam.IsTabBar = !0
				}
				api.invoke("open.page", encodeURI(JSON.stringify(pageParam)))
			} else window.location = "https://mhome.uzai.com/Member/index.html"
		}, bridge.openActivity = function(url, isShare) {
			var pageParam = deepClone(pageBaseParam);
			if(api.isApp()) {
				if("ios" === devicetype) {
					var share = isShare || "1";
					"0" === share && (pageParam.Content = {
						isShare: "0"
					}), pageParam.Url = url, pageParam.IsNav = !0
				} else "android" === devicetype && (pageParam.Url = url, pageParam.IsNav = !0);
				api.invoke("open.page", encodeURI(JSON.stringify(pageParam)))
			} else;
		}, bridge.openMemberLevel = function(memlevel) {
			var pageParam = deepClone(pageBaseParam),
				gaInfo = "->会员等级页";
			if(api.isApp()) {
				if("ios" === devicetype) pageParam.ClassInfo = {
					ClassName: "UZMemberLevelVC",
					isStoryBoard: "0",
					storyBoardIdentifier: "",
					cocoaPodName: "UZPersonCenterModule",
					isXib: !1
				}, pageParam.ServicesInfo = {
					serviceClass: "UZLoginService",
					serviceName: "",
					serviceMethod: "initWithService:"
				}, pageParam.GA += gaInfo;
				else if("android" === devicetype) {
					var hybridversion = api.getQueryString("hybridversion");
					hybridversion >= 1 ? pageParam.ClassInfo = {
						ClassName: "com.uzai.app.mvp.module.login.MemberLevelActivity"
					} : pageParam.ClassInfo = {
						ClassName: "com.uzai.app.activity.MemberLevelActivity"
					}, pageParam.Content = {
						userLevel: memlevel
					}, pageParam.GA += gaInfo
				}
				api.invoke("open.page", encodeURI(JSON.stringify(pageParam)))
			}
		}, bridge.contactList = function() {
			api.isApp() && api.invoke("action.openAddress", "")
		}, bridge.openProduct = function(travelType, productId, productType, isHistoryPage, productlink) {
			var pageParam = deepClone(pageBaseParam);
			"undefined" == typeof isHistoryPage && api.setCookie("backUrl", window.location.href);
			var lineType = 0,
				travelTypeName = "跟团游";
			null !== productType && "" !== productType && "undefined" != typeof productType && ("15" === travelType.toString() || "16" === travelType.toString() || "29" === travelType.toString() || "10" === travelType.toString() ? (lineType = 20, travelTypeName = "自由行") : "1" !== travelType.toString() && "2" !== travelType.toString() && "3" !== travelType.toString() || "1" !== productType.toString() && "2" !== productType.toString() && "14" !== productType.toString() ? "17" !== productType.toString() && "18" !== productType.toString() && "19" !== productType.toString() && "20" !== productType.toString() && "21" !== productType.toString() && "22" !== productType.toString() && "23" !== productType.toString() || (lineType = 30, travelTypeName = "通用单项") : (lineType = 10, travelTypeName = "跟团游"));
			var gaInfo = "->" + travelTypeName + "产品页";
			if(api.isApp()) {
				var hybridversion = api.getQueryString("hybridversion");
				"ios" === devicetype ? "3" === hybridversion && 10 === lineType ? (pageParam.ClassInfo = {
					ClassName: "UZProductDetailVC",
					cocoaPodName: "UZProductDetailModule",
					isXib: !1
				}, pageParam.Content = {
					productId: productId.toString()
				}, pageParam.GA += gaInfo) : (pageParam.ClassInfo = {
					ClassName: "UZProductInfoVC",
					isStoryBoard: "1",
					storyBoardIdentifier: "ProductInfoVC",
					cocoaPodName: "UZProductDetailModule",
					isXib: !1
				}, pageParam.Content = {
					productId: productId,
					uzaiProductClassId: travelTypeName
				}, pageParam.ServicesInfo = {
					serviceClass: "UZProductService",
					serviceName: "service",
					serviceMethod: ""
				}, pageParam.GA += gaInfo) : "android" === devicetype && (10 === lineType ? ("1" === hybridversion ? pageParam.ClassInfo = {
					ClassName: "com.uzai.app.mvp.module.product.activity.ProductDetailUi540"
				} : "3" === hybridversion ? pageParam.ClassInfo = {
					ClassName: "com.uzai.app.mvp.module.hybrid.activity.ProductDetail548Activity"
				} : pageParam.ClassInfo = {
					ClassName: "com.uzai.app.activity.ProductDetailUi540"
				}, pageParam.Content = {
					ProductID: productId,
					UzaiTravelClass: travelTypeName
				}, pageParam.GA += gaInfo) : ("1" === hybridversion ? pageParam.ClassInfo = {
					ClassName: "com.uzai.app.mvp.module.product.activity.ProductDetailUi540"
				} : "3" === hybridversion ? pageParam.ClassInfo = {
					ClassName: "com.uzai.app.mvp.module.product.activity.ProductDetailUi540"
				} : pageParam.ClassInfo = {
					ClassName: "com.uzai.app.activity.ProductDetailUi540"
				}, pageParam.Content = {
					ProductID: productId,
					UzaiTravelClass: travelTypeName
				}, pageParam.GA += gaInfo)), api.invoke("open.page", encodeURI(JSON.stringify(pageParam)))
			} else {
				var productlink_url, baseUrl = "https://m.uzai.com/",
					endUrl = "waptour-" + productId + ".html",
					source = api.getQueryString("source");
				if(productlink) productlink_url = productlink;
				else {
					var productlink_ = window.location.pathname.split("/");
					productlink_url = productlink_[1], "hybrid" === productlink_[1] && (productlink_url = productlink_[2])
				}
				source ? (20 === lineType ? (endUrl = "trip/wap/" + productId + ".html", endUrl += "?/AppDetail/" + productId + "/" + productType) : endUrl += 10 === lineType ? "?/AppDetail/" + productId + "/" + productType : "?/AppDetail/" + productId + "/" + productType, endUrl.indexOf("?") > 0 ? window.location = baseUrl + endUrl + "&subject_focus_" + productlink_url : window.location = baseUrl + endUrl + "?subject_focus_" + productlink_url) : (20 === lineType ? endUrl = "trip/wap/" + productId + ".html" : 10 === lineType ? endUrl = "product/detail.html?productid=" + productId : 30 === lineType && (endUrl = "singleproduct/detail.html?productid=" + productId), endUrl.indexOf("?") > 0 ? window.location = baseUrl + endUrl + "&subject_focus_" + productlink_url : window.location = baseUrl + endUrl + "?subject_focus_" + productlink_url)
			}
		}, bridge.openDingzhi = function(udingzhitype) {
			var pageParam = deepClone(pageBaseParam),
				gaInfo = "->私人定制";
			api.isApp() ? ("ios" === devicetype ? (pageParam.ClassInfo = {
				ClassName: "UZDingzhiYouVC",
				isStoryBoard: "0",
				storyBoardIdentifier: "",
				cocoaPodName: "UZDingZhiYouModule",
				isXib: !1
			}, pageParam.ServicesInfo = {
				serviceClass: "UZHomeService",
				serviceName: "service"
			}, pageParam.Content = {
				webUrl: "https://mdingzhi.uzai.com/hybrid/order/index.html?udingzhitype=" + udingzhitype
			}, pageParam.GA += gaInfo) : "android" === devicetype && (pageParam.IsNav = !1, pageParam.Url = "https://mdingzhi.uzai.com/hybrid/order/index.html?udingzhitype=" + udingzhitype, pageParam.GA += gaInfo), api.invoke("open.page", encodeURI(JSON.stringify(pageParam)))) : window.location.href = "https://mdingzhi.uzai.com/order/index.html?udingzhitype=" + udingzhitype
		}, bridge.openMyFavorites = function() {
			var pageParam = deepClone(pageBaseParam),
				userId = api.getUserId();
			if(null != userId && "undefined" != typeof userId && "" !== userId && "0" != userId) {
				var gaInfo = "->跟团游产品详情页";
				api.isApp() && ("ios" === devicetype ? (pageParam.ClassInfo = {
					ClassName: "UZMyAttentionVC",
					isStoryBoard: "0",
					storyBoardIdentifier: "",
					cocoaPodName: "UZPersonCenterModule",
					isXib: !1
				}, pageParam.ServicesInfo = {
					serviceClass: "UZMyHomeService",
					serviceName: "service",
					serviceMethod: ""
				}, pageParam.GA += gaInfo) : "android" === devicetype && (pageParam.ClassInfo = {
					ClassName: "com.uzai.app.mvp.module.home.myuzai.activity.MyCollectionsActivity"
				}), api.invoke("open.page", encodeURI(JSON.stringify(pageParam))))
			} else api.login(window.location.href, window.location.href)
		}, bridge.openMyOrderList = function() {
			var pageParam = deepClone(pageBaseParam),
				gaInfo = "->我的订单";
			if(api.isApp()) {
				var userId = api.getUserId();
				null != userId && "undefined" != typeof userId && "" != userId && "0" != userId ? ("ios" === devicetype ? (pageParam.ClassInfo = {
					ClassName: "UZOrdersPageVC",
					isStoryBoard: "0",
					storyBoardIdentifier: "",
					cocoaPodName: "UZOrdersPageModule",
					isXib: !1
				}, pageParam.ServicesInfo = {
					serviceClass: "UZMyHomeService",
					serviceName: "service",
					serviceMethod: ""
				}, pageParam.GA += gaInfo) : "android" === devicetype && (pageParam.ClassInfo = {
					ClassName: "com.uzai.app.mvp.module.order.activity.OrderListNewActivity"
				}), api.invoke("open.page", encodeURI(JSON.stringify(pageParam)))) : api.login(window.location.href, window.location.href)
			} else window.location.href = "https://u.uzai.com/mobile/order"
		}, bridge.openSearch = function(keyword, traveclass, day, price, city, preferential, play, appPriceId, appDayId, scenic, date, pageindex, sort, destination, company, cruises) {
			var params = "";
			if(api.isApp()) {
				var appversion = api.getCookie("appversion");
				if("undefined" != typeof appversion && null !== appversion && appversion > "5.5.4") {
					var param = {
						UserID: api.getUserId(),
						city: city,
						keyword: keyword,
						traveclass: traveclass,
						preferential: preferential,
						play: play,
						price: price,
						scenic: scenic,
						day: day,
						date: date,
						pageindex: pageindex,
						sort: sort,
						destination: destination,
						company: company,
						cruises: cruises
					};
					api.invoke("open.search", encodeURI(JSON.stringify(param)))
				} else if("ios" == devicetype) {
					var paramIos = {
						UserID: api.getUserId(),
						SearchContent: keyword,
						Keyword: "",
						GoDate: "",
						Days: appDayId,
						Price: appPriceId,
						Diamond: "",
						Count: 15,
						ProductType: "",
						TravelClassID: 0,
						StartIndex: 1,
						OrderBy: "3"
					};
					api.invoke("open.search", encodeURI(JSON.stringify(paramIos)))
				} else if("android" == devicetype) {
					switch(appPriceId) {
						case 0:
							price = "";
							break;
						case 1:
							price = "1-500";
							break;
						case 2:
							price = "501-1000";
							break;
						case 3:
							price = "1001-3000";
							break;
						case 4:
							price = "3001-5000";
							break;
						case 5:
							price = "5001-8000";
							break;
						case 6:
							price = "8001-10000";
							break;
						case 7:
							price = "10001-?";
							break;
						default:
							price = ""
					}
					4 === appDayId ? day = "9-11" : 11 === appDayId ? day = "11-?" : 0 === appDayId && (day = "");
					var paramAndroid = {
						userID: api.getUserId(),
						searchContent: keyword,
						keyword: "",
						goDate: "",
						days: day,
						price: price,
						diamond: "",
						count: 15,
						productType: "",
						travelClassID: 0,
						startIndex: 1,
						orderBy: "3"
					};
					api.invoke("open.search", encodeURI(JSON.stringify(paramAndroid)))
				}
			} else {
				params += "" !== city && null !== city && "undefined" != typeof city && 0 !== city && "0" !== city ? "city=" + city : "city=2", "" !== keyword && null !== keyword && "undefined" != typeof keyword && 0 !== keyword && "0" !== keyword && (params += "&keyword=" + keyword), "" !== traveclass && null !== traveclass && "undefined" != typeof traveclass && 0 !== traveclass && "0" !== traveclass && (params += "&traveclass=" + traveclass), "" !== preferential && null !== preferential && "undefined" != typeof preferential && 0 !== preferential && "0" !== preferential && (params += "&preferential=" + preferential), "" !== play && null !== play && "undefined" != typeof play && 0 !== play && "0" !== play && (params += "&play=" + play), "" !== price && null !== price && "undefined" != typeof price && 0 !== price && "0" !== price && (params += "&price=" + price), "" !== scenic && null !== scenic && "undefined" != typeof scenic && 0 !== scenic && "0" !== scenic && (params += "&scenic=" + scenic), "" !== day && null !== day && "undefined" != typeof day && 0 !== day && "0" !== day && (params += "&day=" + day), "" !== date && null !== date && "undefined" != typeof date && 0 !== date && "0" !== date && (params += "&date=" + date), "" !== pageindex && null !== pageindex && "undefined" != typeof pageindex && 0 !== pageindex && "0" !== pageindex && (params += "&pageindex=" + pageindex), "" !== sort && null !== sort && "undefined" != typeof sort && 0 !== sort && "0" !== sort && (params += "&sort=" + sort), "" !== destination && null !== destination && "undefined" != typeof destination && 0 !== destination && "0" !== destination && (params += "&destination=" + destination), "" !== company && null !== company && "undefined" != typeof company && 0 !== company && "0" !== company && (params += "&company=" + company), "" !== cruises && null !== cruises && "undefined" != typeof cruises && 0 !== cruises && "0" !== cruises && (params += "&cruises=" + cruises);
				var url = "https://m.uzai.com/search/list?" + params;
				window.location.href = url
			}
		}, bridge.openOrderDetail = function(orderID, orderType) {
			if("ios" === devicetype) {
				var pageParam = {
					orderID: orderID,
					orderType: orderType
				};
				api.invoke("open.orderdetail", encodeURI(JSON.stringify(pageParam)))
			} else if("android" === devicetype) {
				var pageParam = deepClone(pageBaseParam);
				pageParam.ClassInfo = {
					ClassName: "com.uzai.app.activity.OrderDetailNewActivity"
				}, pageParam.Content = {
					orderID: orderID,
					orderType: orderType
				}, api.invoke("open.page", encodeURI(JSON.stringify(pageParam)))
			}
		}, bridge.addSubjectToFavorite = function() {
			api.isApp() && api.invoke("action.collect", "")
		}, bridge.cancelSubjectFavorite = function(favoriteid) {
			if(api.isApp()) {
				var param = {
					favoriteid: favoriteid
				};
				api.invoke("action.cancelfavorite", encodeURI(JSON.stringify(param)))
			}
		}, bridge.shareSubject = function(title, content, imageUrl, pageUrl) {
			var div = document.createElement("div");
			div.innerHTML = title, title = div.innerText || div.textContent, div.innerHTML = content, content = div.innerText || div.textContent, div.setAttribute("style", "display:none;"), div.setAttribute("height", "0px"), div.setAttribute("width", "0px"), div.setAttribute("frameborder", "0"), document.body.appendChild(div), div.parentNode.removeChild(div);
			var param = {
				Title: title,
				Content: content,
				ImageUrl: imageUrl,
				Url: pageUrl,
				GACategory: ""
			};
			div = null, api.isApp() && api.invoke("action.share", encodeURI(JSON.stringify(param)))
		}, bridge.copyExpress = function(code) {
			var copyParam = {
				Content: code
			};
			api.isApp() && api.invoke("action.copy", encodeURI(JSON.stringify(copyParam)))
		}, bridge.saveAlbum = function(strurl) {
			var copyParam = {
				Content: strurl
			};
			api.isApp() && api.invoke("action.saveAlbum", encodeURI(JSON.stringify(copyParam)))
		}, bridge.invokeBankPay = function(options) {
			if(api.isApp()) {
				var payParam = {
					payType: options.payType,
					IsSSL: 0,
					IsUtour: 0,
					godate: options.godate,
					nums: options.nums,
					ordercode: options.orderCode,
					orderid: options.orderId,
					pname: options.productName,
					prepayment: options.prepayment
				};
				api.invoke("action.pay", encodeURI(JSON.stringify(payParam)))
			}
		}, bridge.goBack = function(url, islastpage, isrootpage, calltype) {
			if(1 == calltype) {
				var backParam = {
					ClassInfo: {},
					GA: api.getLocalStorage("GA")
				};
				api.isApp() ? ("ios" == devicetype ? backParam.ClassInfo = {
					ClassName: "",
					isLastPage: islastpage,
					isRootPage: isrootpage
				} : "android" == devicetype && (backParam.ClassInfo = {
					ClassName: "",
					isLastPage: islastpage,
					isRootPage: isrootpage
				}), api.invoke("go.back", encodeURI(JSON.stringify(backParam)))) : window.location.href = url
			} else window.location.href = url
		}, bridge.goBackForProductdetail = function(url, islastpage, isrootpage) {
			var backParam = {
				ClassInfo: {},
				GA: api.getLocalStorage("GA")
			};
			if(api.isApp()) "ios" == devicetype ? backParam.ClassInfo = {
				ClassName: "",
				isLastPage: islastpage,
				isRootPage: isrootpage
			} : "android" == devicetype && (backParam.ClassInfo = {
				ClassName: "",
				isLastPage: islastpage,
				isRootPage: isrootpage
			}), api.invoke("go.back", encodeURI(JSON.stringify(backParam)));
			else if("undefined" != typeof url && "undefined" !== url && url.length > 0) try {
				url = decodeURIComponent(url), url = url.replace(/\+/g, "%2b")
			} catch(e) {
				console.log(e.message)
			} finally {
				window.location.href = url
			} else window.location.href = "https://m.uzai.com"
		}, bridge.openLive = function(defaultUrl, videoId) {
			var param = {};
			api.isApp() ? ("ios" === devicetype ? param.videoId = videoId : "android" === devicetype && (param.videoId = videoId), api.invoke("open.live", encodeURI(JSON.stringify(param)))) : window.location = defaultUrl
		}, bridge.openHistory = function() {
			api.isApp() && api.invoke("action.openHistory", "")
		}, bridge.openPayDetail = function(orderID, orderType, isSonOrder) {
			if(api.isApp()) {
				var payDetailParam = {
					orderID: orderID,
					orderType: orderType,
					isSonOrder: isSonOrder
				};
				"ios" === devicetype ? api.invoke("go.payback", encodeURI(JSON.stringify(payDetailParam))) : "android" === devicetype && api.invoke("go.payback", encodeURI(JSON.stringify(payDetailParam)))
			}
		}, bridge
	}(window, document),
	deepClone = function deepClone(obj) {
		var str, newobj = obj.constructor === Array ? [] : {};
		if("object" === ("undefined" == typeof obj ? "undefined" : _typeof(obj))) {
			if(window.JSON) str = JSON.stringify(obj), newobj = JSON.parse(str);
			else
				for(var i in obj) newobj[i] = "object" === _typeof(obj[i]) ? deepClone(obj[i]) : obj[i];
			return newobj
		}
	};