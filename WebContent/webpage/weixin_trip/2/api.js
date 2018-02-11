"use strict";
var api = function(window, document) {
	try {
		document.domain = "uzai.com"
	} catch(e) {
		console.log(e.message)
	}
	var version = "1.0.3",
		devicetype = "",
		postTimes = 0,
		iosGetTimes = 0,
		apiUrlPre = "MobileCommon/RequestWebApi/544",
		path = {
			dingzhilogic: "http://mdingzhilogic.uzai.com/api/",
			msitelogic: "http://msitelogic.uzai.com/api/",
			mhomelogic: "http://mhomelogic.uzai.com/api/",
			mcurrencylogic: "http://mcurrencylogic.uzai.com/api/",
			mproductlogic: "http://mproductlogic.uzai.com/api/",
			mbuylogic: "http://mbuylogic.uzai.com/api/",
			mpaylogic: "http://mpaylogic.uzai.com/api/",
			msearchlogic: "http://msearchlogic.uzai.com/api/"
		},
		loginConfig = {
			from: document.referrer,
			forword: location.href
		},
		backUrl = "javascript:history.go(-1)",
		serverVirtualDir = "",
		mvcVersion = "",
		api = {},
		ios = {},
		weixin = "micromessenger" == navigator.userAgent.toLowerCase().match(/micromessenger/i),
		android = {},
		api = {
			version: version,
			appCurrentVersion: "6.0.5",
			path: path,
			backUrl: backUrl,
			serverVirtualDir: serverVirtualDir,
			mvcVersion: mvcVersion,
			__callback__: [],
			__iosCallback__: [],
			__asyncLoadingCode__: "0",
			loginConfig: loginConfig,
			__scrolltop__: 0,
			init: function() {
				function asyncLoadScripts() {
					for(var $array = ["r03.uzaicdn.com/content/hybrid/scripts/common/pagestatistics.js"], $arrayScript = ["r03.uzaicdn.com/content/hybrid/scripts/common/gmlinks.js"], $hasScripts = document.getElementsByTagName("script"), $frgmentGa = document.createDocumentFragment(), $frgmentGmlinks = document.createDocumentFragment(), _arrayHasScripts = [], a = 0; a < $hasScripts.length; a++) _arrayHasScripts = _arrayHasScripts.concat($hasScripts[a].getAttribute("src"));
					_arrayHasScripts = _arrayHasScripts.toString();
					for(var _a = 0; _a < $array.length; _a++)
						if(_arrayHasScripts.indexOf($array[_a]) < 0) {
							var _scripts = document.createElement("script");
							_scripts.setAttribute("async", "async"), _scripts.setAttribute("src", "https://" + $array[_a]), $frgmentGa.appendChild(_scripts)
						}
					document.body.appendChild($frgmentGa);
					var source = api.getQueryString("source");
					if(api.isApp() || "iphone" === source || "android" === source) return !1;
					var hasMlinkCookie = api.getCookie("uzmGdownloadTip"),
						hasMlinkURL = api.getQueryString("uzmGdownloadTip");
					if(hasMlinkURL && "0" !== hasMlinkURL) api.setCookie("uzmGdownloadTip", "1", 2592e3);
					else if(!(hasMlinkURL && "0" !== hasMlinkURL || hasMlinkCookie && "0" !== hasMlinkURL)) {
						for(var _a2 = 0; _a2 < $arrayScript.length; _a2++)
							if(_arrayHasScripts.indexOf($arrayScript[_a2]) < 0) {
								var _scripts2 = document.createElement("script");
								_scripts2.setAttribute("async", "async"), _scripts2.setAttribute("src", "https://" + $arrayScript[_a2]), $frgmentGmlinks.appendChild(_scripts2)
							}
						document.body.appendChild($frgmentGmlinks)
					}
				}
				return asyncLoadScripts(), this
			},
			getQueryString: function(key, func, caseSensitive) {
				if(!key || "undefined" == typeof key) return key = "", null;
				key = key.toLowerCase();
				var r, reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
				return r = "1" == caseSensitive ? window.location.search.substr(1).match(reg) : window.location.search.toLowerCase().substr(1).match(reg), null === r ? null : func && "" !== func && "decodeURI" != func && "undefined" != typeof func ? "unescape" == func ? unescape(r[2]) : "decodeURIComponent" == func ? decodeURIComponent(r[2]) : void 0 : decodeURI(r[2])
			},
			getValue: function(key, str, func) {
				if(!str || "undefined" == typeof str) return str;
				var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)"),
					r = str.substr(0).match(reg);
				return null === r ? null : func && "" !== func && "decodeURI" != func && "undefined" != typeof func ? "unescape" == func ? unescape(r[2]) : "decodeURIComponent" == func ? decodeURIComponent(r[2]) : void 0 : decodeURI(r[2])
			},
			getCookie: function(key, func) {
				if("ios" == devicetype) return ios.getCookie(key);
				if("android" == devicetype) return android.getCookie(key);
				var bikky = document.cookie;
				key += "=";
				for(var i = 0; i < bikky.length;) {
					var offset = i + key.length;
					if(bikky.substring(i, offset) == key) {
						var endstr = bikky.indexOf(";", offset); - 1 == endstr && (endstr = bikky.length);
						var r = bikky.substring(offset, endstr);
						if(null === r) return null;
						if(!func || "" === func || "decodeURI" == func || "undefined" == typeof func) return decodeURI(r);
						if("unescape" == func) return unescape(r);
						if("decodeURIComponent" == func) return decodeURIComponent(r)
					}
					if(i = bikky.indexOf(" ", i) + 1, 0 === i) return
				}
				return null
			},
			setCookie: function(key, value, timeout) {
				if(timeout = timeout && "undefined" != typeof timeout ? parseInt(timeout, 10) : 0, "ios" == devicetype) ios.setCookie(key, value, timeout);
				else if("android" == devicetype) android.setCookie(key, value, timeout);
				else if(0 === timeout) document.cookie = key + "=" + value + ";domain=.uzai.com;path=/";
				else {
					var exp = new Date;
					exp.setTime(exp.getTime() + 1e3 * timeout), document.cookie = key + "=" + value + ";expires=" + exp.toGMTString() + ";domain=.uzai.com;path=/"
				}
			},
			removeCookie: function(key) {
				if("ios" == devicetype) ios.removeCookie(key);
				else if("android" == devicetype) android.removeCookie(key);
				else {
					var exp = new Date;
					exp.setTime(exp.getTime() - 86400);
					var value = "";
					document.cookie = key + "=" + value + ";expires=" + exp.toGMTString() + ";domain=.uzai.com;path=/"
				}
			},
			setSessionStorage: function(key, value) {
				try {
					return sessionStorage.removeItem(key), sessionStorage.setItem(key, value), 1
				} catch(_) {
					return 0
				}
			},
			getSessionStorage: function(key) {
				try {
					return sessionStorage.getItem(key)
				} catch(e) {
					return console.log(e.message), 0
				}
			},
			removeSessionStorage: function(key) {
				try {
					sessionStorage.removeItem(key)
				} catch(e) {
					return console.log(e.message), 0
				}
			},
			getLocalStorage: function(key) {
				try {
					return localStorage.getItem(key)
				} catch(e) {
					return console.log(e.message), 0
				}
			},
			setLocalStorage: function(key, value) {
				try {
					return localStorage.removeItem(key), localStorage.setItem(key, value), 1
				} catch(_) {
					return 0
				}
			},
			removeLocalStorage: function(key) {
				localStorage.removeItem(key)
			},
			loading: function loading(options) {
				var oldloading = document.getElementById("loading"),
					loading = document.createElement("div"),
					loader = document.createElement("div"),
					content = document.createElement("p"),
					backBtn = document.createElement("a");
				if(options && options.txt && "" !== options.txt.trim()) content.innerHTML = options.txt;
				else try {
					var _text = document.getElementById("loading").getElementsByClassName("loader")[0].getElementsByTagName("p")[0].textContent;
					document.getElementById("loading") && "正在加载..." !== _text && (content.innerHTML = _text)
				} catch(e) {
					content.innerHTML = "正在加载..."
				}
				return null !== oldloading && "undefined" != typeof oldloading ? (document.getElementById("loading").getElementsByClassName("loader")[0].getElementsByTagName("p")[0].textContent = content.innerHTML, void(oldloading.classList && oldloading.classList.contains("endloading-opacity-0") && oldloading.classList.remove("endloading-opacity-0"))) : (loading.id = "loading", loading.className = "loading", backBtn.className = "loading-return-btn", backBtn.setAttribute("href", api.backUrl), loader.className = "loader", loading.appendChild(backBtn), loading.appendChild(loader), loader.appendChild(content), document.body.appendChild(loading), void 0)
			},
			endloading: function() {
				var loading = document.getElementById("loading");
				null !== loading && "undefined" != typeof loading && loading.classList.add("endloading-opacity-0")
			},
			toast: function(value, timeout) {
				var oldToast = document.getElementById("toast-pop");
				if(null === oldToast || "undefined" == typeof oldToast) {
					timeout && "undefined" != typeof timeout && 0 !== parseInt(timeout, 10) || (timeout = 3e3);
					var pop = document.createElement("div");
					pop.className = "common-pop", pop.id = "toast-pop", pop.innerHTML = value, document.body.appendChild(pop), setTimeout(function() {
						var pop = document.getElementById("toast-pop");
						null !== pop && "undefined" != typeof pop && document.body.removeChild(pop)
					}, timeout)
				}
			},
			post: function($http, $scope, path, controller, action, param, callback, timeout, needLogin, loading, postOnline) {
				var useCache = !0;
				if(timeout && "undefined" != typeof timeout && 0 !== parseInt(timeout, 10) || (timeout = 0, useCache = !1), loading = "" === loading || "undefined" == typeof loading || 1 === loading || null === loading || loading === !0 ? 1 : 0, postOnline && "undefined" != typeof postOnline && 0 !== parseInt(timeout, 10) || (postOnline = 0), "ios" == devicetype && 0 == postOnline) ios.post($http, $scope, path, controller, action, param, useCache, callback, timeout, needLogin, loading);
				else if("android" == devicetype && 0 == postOnline) android.post($http, $scope, path, controller, action, param, useCache, callback, timeout, needLogin, loading);
				else {
					1 == loading && api.loading();
					var user = api.getCookie("user");
					if(needLogin || "undefined" != typeof needLogin ? needLogin === !1 && (needLogin = !1) : needLogin = param.toLowerCase().indexOf("user") > -1 && (!user || "" === user || "0" === user || "undefined" == typeof user), needLogin) location.href = "https://mhome.uzai.com/Member/login.html?reurl=" + location.href;
					else {
						postTimes++, api.__callback__.push([postTimes, callback, $scope]);
						var url = "/data/post";
						"" !== api.serverVirtualDir && (url = "/" + api.serverVirtualDir + url);
						var sessionData, apiParam = {
								path: path,
								controller: controller,
								action: action,
								param: param,
								useCache: useCache
							},
							config = {
								timeout: 2e4,
								headers: {}
							},
							sParam = JSON.stringify(apiParam);
						try {
							sessionData = sessionStorage.getItem(sParam)
						} catch(e) {
							console.error("No trace mode can not be used sessionStorage and ...")
						}
						if(null !== sessionData && "" !== sessionData) {
							sessionData = JSON.parse(sessionData);
							var sessionTime = sessionData.sTime,
								localTime = new Date;
							sessionTime = new Date(Date.parse(sessionData.sTime));
							var timeResult = localTime - sessionTime;
							if(6e4 * timeout >= timeResult) {
								api.endloading();
								try {
									sessionData.JsonResult = decodeURIComponent(sessionData.JsonResult).replace(/\+/g, " ").replace(/@plus@/g, "+")
								} catch(e) {
									sessionData.JsonResult = unescape(sessionData.JsonResult).replace(/\+/g, " ").replace(/@plus@/g, "+"), console.log(e.message)
								}
								return void callback(sessionData)
							}
						}
						"2.0" === api.mvcVersion && (config.headers = {
							params: sParam
						}), $http.post(url, apiParam, config).success(function(data) {
							if(api.endloading(), 200 === data.ErrorCode && timeout > 0) {
								var sTime = new Date;
								data.sTime = sTime;
								var sData = JSON.stringify(data);
								try {
									sessionStorage.setItem(sParam, sData)
								} catch(e) {
									console.error("No trace mode can not be used sessionStorage and ...")
								}
							}
							try {
								data.JsonResult = decodeURIComponent(data.JsonResult).replace(/\+/g, " ").replace(/@plus@/g, "+"), data.ErrorMsg = decodeURIComponent(data.ErrorMsg)
							} catch(e) {
								data.JsonResult = unescape(data.JsonResult).replace(/\+/g, " ").replace(/@plus@/g, "+"), console.log(e.message)
							} finally {
								callback(data)
							}
						}).error(function(data) {
							api.endloading(), data = {
								ErrorCode: -3,
								ErrorMsg: "服务请求超时，请重试"
							};
							try {
								data.JsonResult = decodeURIComponent(data.JsonResult).replace(/\+/g, " ").replace(/@plus@/g, "+")
							} catch(e) {
								data.JsonResult = unescape(data.JsonResult).replace(/\+/g, " ").replace(/@plus@/g, "+"), console.log(e.message)
							} finally {
								callback(data)
							}
						})
					}
				}
			},
			callback: function(index, data) {
				try {
					data.JsonResult = decodeURIComponent(data.JsonResult).replace(/\+/g, " ").replace(/@plus@/g, "+"), data.ErrorMsg = decodeURIComponent(data.ErrorMsg)
				} catch(e) {
					console.error(e.message)
				}
				for(var currentArray = [], i = 0; i < api.__callback__.length; i++)
					if(api.__callback__[i][0] == index) {
						currentArray = api.__callback__[i], api.__callback__.splice(i, 1);
						break
					}
				if(currentArray.length > 2) try {
					currentArray[2].$apply(function() {
						currentArray[1](data)
					})
				} catch(e) {
					currentArray[1](data), console.log(e.message)
				}
				api.endloading()
			},
			iosCallback: function(action, key, value, index, callbackData) {
				ios.callback(action, key, value, index, callbackData)
			},
			getUserId: function() {
				if("ios" == devicetype) return "2" === api.getQueryString("hybridversion") ? api.getCookie("userid") : api.getQueryString("userid") ? api.getQueryString("userid") : api.getLocalStorage("userid");
				if("android" == devicetype) return window.cookie.getUserId();
				var user = api.getCookie("user");
				return !user || "undefined" == typeof user || user.length < 5 ? null : api.getValue("userid", user)
			},
			login: function(from, forword) {
				from && (api.loginConfig.from = from), forword && (api.loginConfig.forword = forword);
				var loginParam = JSON.stringify(api.loginConfig);
				if(api.isApp()) "ios" == devicetype ? ios.invokeApp("action.login", encodeURI(loginParam)) : "android" == devicetype ? window.action.exec("login", loginParam) : location.href = "https://mhome.uzai.com/member/login.html?reurl=" + forword;
				else {
					var source = api.getQueryString("source"),
						loginUrl = "",
						loginDomain = "http:u.uzai.com";
					if("iphone" == source || "android" == source) return loginUrl = "/AppLogin?loginSucceedUrl=" + loginDomain + "/mobile/AppAutoLogin", loginUrl += "?refUrl=" + forword, location.href = loginUrl, !1;
					location.href = "https://mhome.uzai.com/member/login.html?reurl=" + forword
				}
			},
			checkLogin: function(callback) {
				if("ios" == devicetype) ios.checkLogin(callback);
				else if("android" == devicetype) android.checkLogin(callback);
				else {
					var user = api.getCookie("user");
					!user || "undefined" == typeof user || user.length < 5 ? location.href = "https://mhome.uzai.com/Member/login.html?reurl=" + location.href : callback()
				}
			},
			logout: function() {
				"ios" == devicetype ? ios.logout() : "android" == devicetype ? android.logout() : (api.removeCookie("user"), location.href = "https://mhome.uzai.com/Member/login.html")
			},
			invoke: function(action, param) {
				if("ios" == devicetype) ios.invokeApp(action, param);
				else if("android" === devicetype) try {
					window.action.exec(action, param)
				} catch(e) {
					console.log(e.message)
				}
			},
			isApp: function() {
				return "ios" === devicetype || "android" === devicetype
			},
			isweixin: function() {
				return !!weixin
			},
			router: function($http, $scope, $compile, online) {
				_router.init($http, $scope, $compile, online), window.addEventListener("hashchange", function() {
					_router.init($http, $scope, $compile, online)
				})
			},
			__routerArray__: [],
			routerCallback: function(viewName, data) {
				"android" === devicetype && (data = encodeURIComponent(data));
				for(var currentArray = [], i = 0; i < api.__routerArray__.length; i++)
					if(api.__routerArray__[i][0] == viewName) {
						currentArray = api.__routerArray__[i];
						break
					}
				if(currentArray.length > 3) try {
					currentArray[2].$apply(function() {
						_router.append(viewName, data, currentArray[1], currentArray[2], currentArray[3])
					})
				} catch(e) {
					_router.append(viewName, data, currentArray[1], currentArray[2], currentArray[3]), console.log(e.message)
				}
			},
			routerGoBack: function(viewName) {
				var section;
				api.isApp() && ("" !== viewName && "undefined" != typeof viewName && null !== viewName || (viewName = window.location.hash.replace("#/", "")), section = document.getElementById("J_router_" + viewName), section.classList.remove("J-router-show")), document.getElementsByClassName("uzai-wrapper")[0].classList.remove("hide"), api.endloading(), window.location.hash = "";
				var ua = window.navigator.userAgent.toLowerCase();
				ua.indexOf("ucbrowser") > -1 ? setTimeout(function() {
					document.body.scrollTop = api.__scrolltop__
				}, 100) : document.body.scrollTop = api.__scrolltop__
			},
			getUser: function() {
				var user, user_data = {};
				return "ios" === devicetype && api.getQueryString("hybridversion") < "3" && !api.getQueryString("hybridversion") ? (user = api.getUserId(), user = JSON.parse(user), user_data.userId = user.value) : user = api.getCookie("user"), !user || "undefined" == typeof user || user.length < 5 || "" === user ? (user_data.userId = "", user_data) : (user_data.userName = api.getValue("userName", user), user_data.email = api.getValue("Email", user), user_data.realname = api.getValue("realname", user), user_data.userId = api.getValue("userid", user), user_data.nickname = api.getValue("nickname", user), user_data.userGrade = api.getValue("userGrade", user), user_data.utourid = api.getValue("utourid", user), user_data)
			}
		},
		_router = {
			init: function($http, $scope, $compile, online) {
				var url = decodeURIComponent(window.location.href),
					viewName = url.replace(/\//g, "").split("#")[1],
					self = this;
				if("android" == devicetype) {
					var param = {
						has: "1"
					};
					"" !== viewName && "/" !== viewName && "undefined" != typeof viewName && viewName ? param.has = "0" : param.has = "1", api.invoke("action.hasChildrenPages", JSON.stringify(param))
				}
				var div = document.getElementById("J_router_" + viewName);
				if(viewName && null === div) api.__routerArray__.push([viewName, $http, $scope, $compile]), self.result(viewName, $http, $scope, $compile, online);
				else {
					if(0 === api.__routerArray__.length) return;
					var routerElements = document.querySelectorAll(".J-router");
					routerElements.length > 0 && ([].filter.call(routerElements, function(el) {
						el.classList.remove("J-router-show")
					}), document.getElementsByClassName("uzai-wrapper")[0].classList.remove("hide")), "undefined" != typeof viewName && "" != viewName && (api.__scrolltop__ = document.body.scrollTop, document.getElementsByClassName("uzai-wrapper")[0].classList.add("hide"), div.classList.add("J-router-show"))
				}
			},
			result: function(viewName, $http, $scope, $compile, online) {
				api.loading();
				var path = window.location.origin + window.location.pathname,
					getURL = "",
					urlArray = [],
					self = this;
				if(path.indexOf(".html") > -1) {
					urlArray = path.split("/"), path = "";
					for(var x = 0; x < urlArray.length - 1; x++) path += urlArray[x] + "/"
				}
				if("" !== path && "/" !== path.substr(path.length - 1, 1) && (path += "/"), getURL = path + viewName + ".html", "2.0" === api.mvcVersion && (getURL = path + viewName), api.isApp()) {
					var param = JSON.stringify({
						online: online.toString(),
						url: getURL.toString(),
						viewName: viewName.toString()
					});
					api.invoke("action.getfile", param)
				} else {
					var config = {
						timeout: 2e4
					};
					$http.get(getURL, {}, config).success(function(data) {
						self.append(viewName, data, $http, $scope, $compile), document.getElementsByClassName("uzai-member-noload")[0] && document.getElementById("loading").classList.remove("zHide")
					}).error(function() {
						return window.location.hash = "", api.endloading(), document.getElementsByClassName("uzai-member-noload")[0] && document.getElementById("loading").classList.add("zHide"), api.toast("网络链接失败，请重试", 1500), "false"
					})
				}
			},
			append: function(viewName, data, $http, $scope, $compile) {
				var elementObj, el, htmlData, angular = window.angular,
					createElement = document.createElement("section"),
					scriptsData = '<script type="text/javascript">childrenFunction.' + viewName + "();</script>";
				if(api.isApp()) {
					if("string" == typeof data && ("android" === devicetype ? (htmlData = decodeURIComponent(data), data = {
							ErrorCode: 200,
							JsonResult: htmlData
						}) : data = JSON.parse(data)), (200 != data.ErrorCode || "" == data.JsonResult.trim()) && (api.endloading(), "android" === devicetype ? console.log("安卓子页面错误:" + data) : api.toast(data.ErrorMsg), "" == data.JsonResult.trim())) return void(window.location.hash = "");
					if("ios" == devicetype) elementObj = angular.element(decodeURIComponent(data.JsonResult) + scriptsData);
					else {
						var html = decodeURIComponent(data.JsonResult).replace(/&acute;/g, "'");
						html = html.replace(/&quot;/g, '"'), elementObj = angular.element(html + scriptsData)
					}
				} else elementObj = angular.element(data + scriptsData);
				createElement.id = "J_router_" + viewName, createElement.className += "J-router J-router-" + viewName, angular.element(document.body).append(createElement), el = $compile(elementObj)($scope), angular.element(createElement).append(el);
				var routerElements = document.querySelectorAll(".J-router");
				routerElements.length > 0 && (api.__scrolltop__ = document.body.scrollTop, [].filter.call(routerElements, function(el) {
					el.classList.remove("J-router-show")
				})), setTimeout(function() {
					document.getElementsByClassName("uzai-wrapper")[0].classList.add("hide"), createElement.classList.add("J-router-show")
				}, 500)
			}
		};
	return window.devicetype = devicetype = api.devicetype = api.getQueryString("devicetype"), android = {
		getCookie: function(key) {
			var value = "";
			if("userid" == key) try {
				value = window.cookie.getUserId()
			} catch(e) {
				console.log(e.message)
			} else try {
				value = window.cookie.getCookie(key)
			} catch(e) {
				console.log(e.message)
			}
			return value
		},
		setCookie: function(key, value, timeout) {
			timeout && "undefined" != typeof timeout || (timeout = 0), window.cookie.setCookie(key, value, timeout)
		},
		removeCookie: function(key) {
			try {
				window.cookie.removeCookie(key)
			} catch(e) {
				console.log(e.message)
			}
		},
		checkLogin: function(callback) {
			var userid = android.getCookie("userid");
			if(userid && "undefined" != typeof userid) callback();
			else {
				var loginParam = JSON.stringify({
					from: location.href
				});
				window.action.exec("login", loginParam)
			}
		},
		logout: function() {
			android.removeCookie("user");
			var loginParam = JSON.stringify({
				from: location.href,
				forward: location.href
			});
			try {
				window.action.exec("login", loginParam)
			} catch(e) {
				console.log(e.message)
			}
		},
		post: function($http, $scope, path, controller, action, param, useCache, callback, timeout, needLogin, loading) {
			1 == loading && api.loading(), postTimes++, api.__callback__.push([postTimes, callback, $scope]);
			var userid = android.getCookie("userid");
			if(needLogin || "undefined" != typeof needLogin ? needLogin === !1 && (needLogin = !1) : needLogin = param.toLowerCase().indexOf("user") > -1 && (!userid || "" === userid || "0" === userid || "undefined" == typeof userid), needLogin === !0) {
				var loginParam = JSON.stringify(api.loginConfig);
				try {
					window.action.exec("login", loginParam), callback({
						ErrorCode: -2,
						ErrorMsg: "未登录"
					})
				} catch(e) {
					console.log("调用Android登录失败，" + e.message)
				}
			} else {
				var apiParam = "";
				apiParam = param && "undefined" != typeof param ? JSON.stringify({
					Path: path.replace(/:/g, "："),
					ControllerName: controller,
					ActionName: action,
					PostData: JSON.parse(param)
				}) : JSON.stringify({
					Path: path.replace(/:/g, "："),
					ControllerName: controller,
					ActionName: action,
					PostData: {}
				});
				try {
					window.action.invoke(postTimes, apiUrlPre, apiParam, timeout)
				} catch(e) {
					console.log(e.message)
				}
			}
		}
	}, ios = {
		invokeApp: function(action, param) {
			if("3" === api.getQueryString("hybridversion")) try {
				var iframe;
				iframe = document.createElement("iframe"), iframe.setAttribute("src", action + "://uzai?" + param), iframe.setAttribute("style", "display:none;"), iframe.setAttribute("height", "0px"), iframe.setAttribute("width", "0px"), iframe.setAttribute("frameborder", "0"), document.body.appendChild(iframe), iframe.parentNode.removeChild(iframe), iframe = null
			} catch(e) {
				console.log(e.message)
			} else if("2" === api.getQueryString("hybridversion")) try {
				window.action.execParam(action, param)
			} catch(e) {
				console.log(e.message)
			} else {
				var iframe;
				iframe = document.createElement("iframe"), iframe.setAttribute("src", action + "://" + param), iframe.setAttribute("style", "display:none;"), iframe.setAttribute("height", "0px"), iframe.setAttribute("width", "0px"), iframe.setAttribute("frameborder", "0"), document.body.appendChild(iframe), iframe.parentNode.removeChild(iframe), iframe = null
			}
		},
		callback: function(action, key, value, index) {
			for(var currentArray = [], i = 0; i < api.__iosCallback__.length; i++)
				if(api.__iosCallback__[i][0] == index) {
					currentArray = api.__iosCallback__[i], api.__iosCallback__.splice(i, 1);
					break
				}
			currentArray.length > 3 && currentArray[3](value)
		},
		getCookie: function(key) {
			var values = "";
			try {
				if(values = "2" === api.getQueryString("hybridversion") ? window.cookie.getCookie(key) : api.getLocalStorage(key), null !== values && "undefined" != typeof values && "" !== values) try {
					var nowTime = (new Date).getTime(),
						obj = JSON.parse(values);
					return 0 === obj.expireTime ? obj.value : nowTime <= obj.expireTime ? obj.value : ""
				} catch(e) {
					return values
				}
			} catch(e) {
				console.log("ios cookie" + e.message)
			}
		},
		setCookie: function(key, value, timeout) {
			var nowTime = new Date,
				expireTime = 0,
				values = {
					value: value,
					expireTime: expireTime
				};
			timeout > 0 && (values.expireTime = new Date(nowTime.getTime() + 6e4 * timeout).getTime()), "2" === api.getQueryString("hybridversion") ? window.cookie.setCookieValue(key, JSON.stringify(values)) : api.setLocalStorage(key, JSON.stringify(values))
		},
		removeCookie: function(key, index) {
			var param;
			"user" == key ? (param = JSON.stringify({
				index: index
			}), ios.invokeApp("user.remove", index)) : (param = JSON.stringify({
				index: index,
				key: key
			}), ios.invokeApp("cookie.remove", param))
		},
		checkLogin: function(callback) {
			var userid = api.getLocalStorage("userid");
			if(userid && "" !== userid && "undefined" != typeof userid) callback();
			else {
				var loginParam = JSON.stringify({
					from: location.href
				});
				ios.invokeApp("action.login", loginParam)
			}
		},
		logout: function() {
			iosGetTimes++, api.__iosCallback__.push([iosGetTimes, "removeMemberID", "user", function() {
				var loginParam = JSON.stringify({
					action: "login",
					from: location.href,
					forward: location.href
				});
				ios.invokeApp("action.exec", loginParam)
			}]), ios.removeCookie("user", iosGetTimes)
		},
		post: function($http, $scope, path, controller, action, param, useCache, callback, timeout, needLogin, loading) {
			1 == loading && api.loading(), postTimes++, api.__callback__.push([postTimes, callback, $scope]);
			var invokeParam, url = "/api/" + apiUrlPre;
			if(param && "undefined" != typeof param) {
				try {
					var apiParam = {
						Path: path.replace(/:/g, "："),
						ControllerName: controller,
						ActionName: action,
						PostData: JSON.parse(param)
					}
				} catch(e) {
					var apiParam = {
						Path: path.replace(/:/g, "："),
						ControllerName: controller,
						ActionName: action,
						PostData: param
					};
					console.log(e.message)
				}
				invokeParam = encodeURI(JSON.stringify({
					index: postTimes,
					url: url,
					param: apiParam,
					usecache: timeout
				}))
			} else invokeParam = encodeURI(JSON.stringify({
				index: postTimes,
				url: url,
				param: {},
				usecache: timeout
			}));
			needLogin || "undefined" != typeof needLogin ? needLogin === !1 && (needLogin = !1) : needLogin = param.toLowerCase().indexOf("user") > -1;
			var userid = api.getUserId();
			if(needLogin !== !0 || userid && "" !== userid && "undefined" != typeof userid) ios.invokeApp("action.invoke", invokeParam);
			else {
				var loginParam = JSON.stringify(api.loginConfig);
				ios.invokeApp("action.login", loginParam)
			}
		}
	}, "complete" == document.readyState ? setTimeout(function() {
		api.init()
	}, 0) : (document.addEventListener("DOMContentLoaded", function() {
		api.init()
	}, !1), window.addEventListener("load", function() {
		api.init()
	}, !1)), api
}(window, document);