"use strict";
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
function(a) {
	return typeof a
} : function(a) {
	return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a
};
!
function() {
	function getQueryString(a, b) {
		if (!a || "undefined" == typeof a) return a = "", null;
		a = a.toLowerCase();
		var c = new RegExp("(^|&)" + a + "=([^&]*)(&|$)"),
			r = window.location.search.toLowerCase().substr(1).match(c);
		return null === r ? null : b && "" !== b && "decodeURI" != b && "undefined" != typeof b ? "unescape" == b ? unescape(r[2]) : "decodeURIComponent" == b ? decodeURIComponent(r[2]) : void 0 : decodeURI(r[2])
	}
	var d = getQueryString("devicetype"),
		source = getQueryString("source"),
		hasmeiqia = document.getElementsByClassName("j-uzai-meiqia")[0];
	if ("ios" === d || "android" === d || "iphone" === source || "android" === source) null !== hasmeiqia && void 0 !== hasmeiqia && "" !== hasmeiqia && (hasmeiqia.onclick = function() {
		api.invoke("action.openMQ", "")
	}), console.info("devicetype" + d), console.info("source" + source);
	else {
		!
		function(i, s, o, g, r, a, m) {
			i.GoogleAnalyticsObject = r, i[r] = i[r] ||
			function() {
				(i[r].q = i[r].q || []).push(arguments)
			}, i[r].l = 1 * new Date, a = s.createElement(o), m = s.getElementsByTagName(o)[0], a.async = 1, a.src = g, m.parentNode.insertBefore(a, m)
		}(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga"), ga("create", "UA-27817301-10", "uzai.com"), ga("send", "pageview"), window._pt_lt = (new Date).getTime(), window._pt_sp_2 = [], _pt_sp_2.push("setAccount,49512ddd");
		var e = "https:" == document.location.protocol ? " https://" : " http://";
		if (api.getCookie("user")) {
			var f = api.getCookie("user"),
				user_PtengineUserId = f.substring(f.indexOf("PtengineUserId=") + 15, f.length);
			_pt_sp_2.push("setCustomVar,def01,svid,value," + user_PtengineUserId + ",0")
		}!
		function() {
			var a = document.createElement("script");
			a.type = "text/javascript", a.async = !0, a.src = e + "js.ptengine.cn/js/pta.js";
			var b = document.createElement("script");
			b.type = "text/javascript", b.async = !0, b.src = e + "js.ptengine.cn/js/pts.js";
			var s = document.getElementsByTagName("script")[0];
			s.parentNode.insertBefore(a, s), s.parentNode.insertBefore(b, s)
		}();
		if (function() {
			var a = document.createElement("script");
			a.src = "https://hm.baidu.com/hm.js?c0fb73081cbc7d5e7d68bbcc113343e9";
			var s = document.getElementsByTagName("script")[0];
			s.parentNode.insertBefore(a, s)
		}(), null !== hasmeiqia && void 0 !== hasmeiqia && "" !== hasmeiqia) {
			!
			function(m, b, q, i, a, j, s) {
				m[i] = m[i] ||
				function() {
					(m[i].a = m[i].a || []).push(arguments)
				}, j = b.createElement(q), s = b.getElementsByTagName(q)[0], j.async = !0, j.charset = "UTF-8", j.src = "//static.meiqia.com/dist/meiqia.js", s.parentNode.insertBefore(j, s)
			}(window, document, "script", "_MEIQIA"), _MEIQIA("entId", 48931), _MEIQIA("withoutBtn");
			var f = api.getCookie("user");
			if (f) {
				var h = api.getValue("realname", f);
				_MEIQIA("metadata", {
					name: h
				});
				var k = api.getValue("PtengineUserId", f);
				_MEIQIA("clientId", k)
			} else _MEIQIA("metadata", {
				name: "游客"
			});
			hasmeiqia.onclick = function() {
				_MEIQIA("showPanel")
			};
			var l = window.location.pathname,
				uzmCityID = api.getCookie("uzmCityID");
			"/" !== l && l.length > 4 && "2" != uzmCityID && "57" != uzmCityID && "60" != uzmCityID && "19" != uzmCityID && "22" != uzmCityID && "58" != uzmCityID && "68" != uzmCityID && setTimeout(function() {
				_MEIQIA("showPanel")
			}, 5e4)
		}
	}
}(), function() {
	var c = location.href.toLowerCase(),
		ckName = "uzmCooperateSource";
	try {
		c = decodeURIComponent(c)
	} catch (e) {
		c = unescape(c)
	} finally {
		var d = document.referrer;
		if (c = c.replace(location.hash, "").replace("#", ""), c = c.split("?")[1], c = "?" + c, d || c || api.removeCookie(ckName), !c || 0 == c.length || "undefined" == typeof c) return !1
	}
	var f = function(a) {
			api.setCookie(ckName, a.a + ":" + a.d + ":" + a.e)
		},
		unitEvt = function() {
			var a = document.createElement("script");
			a.type = "text/javascript", a.src = "https://wapi.uzai.com/api/UzaiHotline/GetUzaiHotline?callback=jsonpDone", document.getElementsByTagName("head")[0].appendChild(a)
		},
		urlsid = api.getQueryString("sourceid");
	urlsid && api.setCookie("uzmCooperateSource", "::" + urlsid), window.jsonpDone = function(a) {
		if (a && "undefined" != typeof JSON) try {
			"object" == ("undefined" == typeof a ? "undefined" : _typeof(a)) && api.setLocalStorage(ckName, JSON.stringify(a))
		} catch (e) {
			console.log(e.messages)
		}
		if (a) {
			var i, j, k, nt, ntArr, ntc, urlsid, iMin, lst = a.listUzaiDicTable,
				items = [];
			if (urlsid = api.getQueryString("sourceid")) for (i = 0; i < lst.length; i++) {
				var b = lst[i].e;
				if (b && b.toLowerCase() === urlsid.toLowerCase()) return void f(lst[i])
			}
			for (i = 0, k = 0; i < lst.length; i++) for (nt = decodeURIComponent(lst[i].b).toLowerCase(), ntArr = nt.split("|"), j = 0; j < ntArr.length; j++) if (ntc = ntArr[j], c.indexOf(ntc) > -1 && c.toLowerCase().indexOf("reurl") < 0) {
				items[k] = lst[i], k++;
				break
			}
			if (iMin = items[0]) {
				for (i = 0; i < items.length - 1; i++) iMin = items[i].c < items[i + 1].c ? items[i] : items[i + 1];
				return void f(iMin)
			}
		}
	}, unitEvt()
}();