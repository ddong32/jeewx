"use strict";

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
}
var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor)
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), Constructor
        }
    }(),
    _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
    };
! function(window) {
    window.$Ajax = function() {
        var _onStateChange = function(xhr, success, failure) {
                if (4 === xhr.readyState) {
                    var _s = xhr.status;
                    _s >= 200 && 300 > _s ? success(xhr) : failure(xhr)
                }
            },
            request = function(opt) {
                var _fn = function() {},
                    _url = opt.url || "",
                    _async = opt.async !== !1,
                    _method = opt.method || "GET",
                    _data = opt.data || null,
                    _success = opt.success || _fn,
                    _error = opt.failure || _fn;
                if (_method = _method.toUpperCase(), "GET" === _method && _data) {
                    var _args = "";
                    if ("string" == typeof _data) _args = _data;
                    else if ("object" === ("undefined" == typeof _data ? "undefined" : _typeof(_data))) {
                        var _arr = new Array;
                        for (var _k in _data) {
                            var _v = _data[_k];
                            _arr.push(_k + "=" + _v)
                        }
                        _args = _arr.join("&")
                    }
                    _url += (-1 === _url.indexOf("?") ? "?" : "&") + _args, _data = null
                }
                var _xhr = window.XMLHttpRequest ? new XMLHttpRequest : "";
                return _xhr.onreadystatechange = function() {
                    _onStateChange(_xhr, _success, _error)
                }, _xhr.open(_method, _url, _async), "POST" === _method && _xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;"), _xhr.send(_data), _xhr
            };
        return {
            request: request
        }
    }();
    var $cityname = void 0,
        $config = {
            getPoint: function() {
                navigator.geolocation && navigator.geolocation.getCurrentPosition($config.showPosition, $config.handleLocationError, {
                    enableHighAccuracy: !0,
                    timeout: 1e3,
                    maximumAge: 0
                })
            },
            initCity: function() {
                api.setCookie("uzmCity", encodeURI("北京-1-bj")), $cityname = "北京"
            },
            handleLocationError: function(error) {
                $config.initCity()
            },
            showPosition: function(position) {
                var latitude = position.coords.latitude,
                    longitude = position.coords.longitude,
                    point = new window.BMap.Point(longitude, latitude),
                    gc = new window.BMap.Geocoder;
                gc.getLocation(point, function(rs) {
                    try {
                        var locationCity = rs.addressComponents.province;
                        $cityname = locationCity, $cityname = $cityname.indexOf("省") > 0 ? $cityname.replace(/省/g, "") : $cityname.indexOf("市") > 0 ? $cityname.replace(/市/, "") : $cityname, api.setLocalStorage("uzmdepartureCityName", $cityname)
                    } catch (e) {
                        $config.initCity()
                    }
                })
            }
        },
        $cutDown = function(childPageName, ele) {
            var _getCord = $doc.getElementsByClassName(ele + " " + childPageName)[0],
                _that = _getCord;
            if (!_that.classList.contains("canclick")) {
                _that.innerHTML = "60s", _that.classList.remove("canclick");
                var _clickTime = (new Date).getTime(),
                    _Timer = setInterval(function() {
                        var _nowTime = (new Date).getTime(),
                            _second = Math.ceil(60 - (_nowTime - _clickTime) / 1e3);
                        return _second > 0 ? void(_that.innerHTML = _second + "s") : (_that.innerHTML = "获取验证码", _that.classList.add("canclick"), void clearInterval(_Timer))
                    }, 1e3)
            }
        },
        $setUsercookie = function(user) {
            var _userinfo = "userName=" + encodeURI(user.UserName) + "&realName=" + encodeURI(user.RealName) + "&Mobile=" + user.Mobile + "&Uzaitoken=" + user.UzaiToken + "&UtourID=" + user.UtourID + "&userid=" + user.UserId + "&PtengineUserId=" + user.PtengineUserId;
            api.setCookie("user", _userinfo, 10080)
        },
        $getAuthCodeEntity = function(hash) {
            var _entity = {};
            return "#/findPasswordVerification" === hash ? (_entity.Mobile = $doc.getElementById("fpv_mobile").value, _entity.AuthCode = $doc.getElementById("fpv_authCode").value, _entity.ImageCode = null === $doc.getElementById("fpv_imageCode") ? "" : $doc.getElementById("fpv_imageCode").value, _entity.AuthCodeType = "C") : "#/passwordlogin" === hash ? (_entity.Mobile = "", _entity.AuthCode = "", _entity.ImageCode = "", _entity.AuthCodeType = "") : (_entity.Mobile = $doc.getElementById("mobile").value, _entity.AuthCode = $doc.getElementById("authCode").value, _entity.ImageCode = null === $doc.getElementById("imageCode") ? "" : $doc.getElementById("imageCode").value, window.location.pathname.toLowerCase().indexOf("updatemobile") > 0 ? _entity.AuthCodeType = "B" : window.location.pathname.toLowerCase().indexOf("login") > 0 && (_entity.AuthCodeType = "D")), _entity
        },
        $doc = document,
        $My = {
            $pawBg: $doc.getElementsByClassName("uzai-password-login")[0],
            $loginBg: $doc.getElementsByClassName("uzai-login-bg")[0],
            $loginNow: $doc.querySelector(".uzai-tel-login .login-now"),
            $pawNow: $doc.querySelector(".uzai-password-login .paw-now"),
            $telBtn: $doc.querySelector(".uzai-tel-login .btn"),
            $nextBtn: $doc.querySelector(".uzai-find-password .paw-now"),
            $pawBtn: $doc.querySelector(".uzai-find-password .paw-btn"),
            $telPage: $doc.getElementsByClassName("uzai-tel-login")[0],
            $findPage: $doc.getElementsByClassName("uzai-find-password")[0],
            $setPage: $doc.getElementsByClassName("uzai-set-password")[0],
            $setNewPage: $doc.getElementsByClassName("uzai-set-newpassword")[0],
            $reurl: null === api.getQueryString("reurl") ? "/Member/index.html" : window.location.href.split("reurl=")[1],
            $vstoreid: null === api.getQueryString("vstoreid") ? "" : api.getQueryString("vstoreid"),
            $mobilePhone: null === api.getQueryString("mobilePhone") ? "" : api.getQueryString("mobilePhone"),
            $userName: null === $doc.getElementById("pwdLoginuserName") ? "" : $doc.getElementById("pwdLoginuserName").value,
            $userPassword: null === $doc.getElementById("pwdLoginuserPassword") ? "" : $doc.getElementById("pwdLoginuserPassword").value,
            $newPassword: null === $doc.getElementById("password") ? "" : $doc.getElementById("password").value,
            $enableImgCode: !1,
            $fpvEnableImgCode: !1,
            $tel: ""
        };
    window.$Variable = {};
    var $myApp = angular.module("myApp", []);
    $myApp.controller("myCtrl", function($http, $scope, $compile, $filter, $location, $timeout) {
        angular.element(document).ready(function() {
            api.router($http, $scope, $compile, 0)
        }), $scope.showImageCode = !1, $scope.fpv_showImageCode = !1, $scope.imageUrl = "randCodeImage?a=" + new Date().getTime();
        var _userId = null === api.getUserId() ? "" : api.getUserId();
        if (window.location.pathname.indexOf("index") > -1) {
            var _levelImage = "",
                _levelImagePath = "",
                _param = JSON.stringify({
                    UserId: _userId,
                    StartCity: 1,
                    StartCityName: "",
                    PhoneType: 20,
                    PhoneVersion: ""
                });
            "" !== _userId && ($scope.userName = api.getUser().userName.length > 11 ? api.getUser().userName.substr(0, 11) + "..." : api.getUser().userName), "" !== $My.$vstoreid ? ($scope.showVstoreNavigation = !0, $scope.mobilePhone = $My.$mobilePhone) : $scope.showVstoreNavigation = !1, api.post($http, $scope, api.path.mhomelogic, "User", "GetIndexUser", _param, function(data) {
                if (-3 === data.ErrorCode) return api.toast("网络不给力，请检查网络设置", 1500), !1;
                if (200 === data.ErrorCode) {
                    for (var result = JSON.parse(data.JsonResult), headImageUrl = "", column = {
                            FunctionList: [],
                            MemberStatusList: []
                        }, funcUrl = void 0, memStatuscUrl = void 0, entity = void 0, entityJson = void 0, i = 0; i < result.Column.FunctionList.length; i++) funcUrl = {
                        path: "",
                        "class": "",
                        title: "",
                        isNeedLogin: ""
                    }, entity = result.Column.FunctionList[i], entityJson = JSON.parse(entity.JumpUrl), funcUrl.title = entity.Title, funcUrl["class"] = entityJson["class"], funcUrl.path = entityJson.path, entityJson.isNeedLogin && "" === _userId && (funcUrl.path = "https://mhome.uzai.com/member/login.html"), "" !== $My.$vstoreid ? "全部订单" !== entity.Title && "常用信息" !== entity.Title || column.FunctionList.push(funcUrl) : column.FunctionList.push(funcUrl), "意见反馈" === entity.Title && (funcUrl.path = funcUrl.path + result.CustomerServiceTel);
                    for (var _i = 0; _i < result.Column.MemberStatusList.length; _i++) memStatuscUrl = {
                        path: "",
                        aclass: "",
                        "class": "",
                        title: "",
                        isNeedLogin: ""
                    }, entity = result.Column.MemberStatusList[_i], entityJson = JSON.parse(entity.JumpUrl), memStatuscUrl.title = entity.Title, memStatuscUrl.aclass = entityJson.aclass, memStatuscUrl["class"] = entityJson["class"], memStatuscUrl.path = entityJson.path, entityJson.isNeedLogin && "" === _userId && (memStatuscUrl.path = "https://mhome.uzai.com/member/login.html"), "coupon" === memStatuscUrl.aclass ? memStatuscUrl.value = result.UserInfo.CouponCount > 99 ? "99+张" : result.UserInfo.CouponCount + "张" : memStatuscUrl.value = result.UserInfo.Score > 9999999 ? "9999999+" : result.UserInfo.Score, column.MemberStatusList.push(memStatuscUrl);
                    if ("" !== _userId && "" !== result.UserInfo.UserName) {
                        if ($scope.isLogin = !0, $scope.userName = result.UserInfo.UserName.length > 11 ? result.UserInfo.UserName.substr(0, 11) + "..." : result.UserInfo.UserName, $scope.memberStatusList = column.MemberStatusList, result.UserInfo.UserLevelNum > 0) switch (result.UserInfo.UserLevelNum) {
                            case 1:
                                _levelImage = "a";
                                break;
                            case 2:
                                _levelImage = "b";
                                break;
                            case 3:
                                _levelImage = "c";
                                break;
                            case 4:
                                _levelImage = "d";
                                break;
                            case 5:
                                _levelImage = "e";
                                break;
                            default:
                                _levelImage = "a"
                        }
                        _levelImagePath = "https://r03.uzaicdn.com/content/hybrid/images/login/" + _levelImage + ".png", headImageUrl = "" !== result.UserInfo.HeadImg ? result.UserInfo.HeadImg : "https://r03.uzaicdn.com/content/hybrid/images/login/use.png", setTimeout(function() {
                            var _image = document.getElementById("headimage"),
                                _lvImage = document.getElementById("lvimage");
                            _image.style.display = "block", _lvImage.style.display = "block", _image.src = headImageUrl, _lvImage.src = _levelImagePath
                        }, 200)
                    }
                    $scope.funcList = column.FunctionList, $doc.getElementsByClassName("uzai-login-logining")[0] && ($doc.getElementsByTagName("body")[0].classList.remove("fixed-bg"), $doc.getElementsByTagName("html")[0].classList.remove("fixed-bg"), $doc.getElementsByClassName("uzai-login-logining")[0].style.cssText = "margin-bottom:2rem"), $doc.getElementsByClassName("uzai-login-nologin")[0] && ($doc.getElementsByTagName("body")[0].classList.remove("fixed-bg"), $doc.getElementsByTagName("html")[0].classList.remove("fixed-bg"), $doc.getElementsByClassName("uzai-login-nologin")[0].style.cssText = "margin-bottom:2rem"), $My.$tel = result.CustomerServiceTel
                }
            }, !1, !1, !1), api.setCookie("searchHistoryBackUrl", "https://mhome.uzai.com/Member/index.html", 300)
        } else if (window.location.pathname.indexOf("login") > -1 || window.location.pathname.indexOf("updatemobile") > -1) {
            if (window.location.pathname.indexOf("updatemobile") > -1) {
                var _hdmobile = $doc.getElementById("hd_mobile").value;
                "" === _userId && (api.toast("登录信息过期,请重新登录", 1500), setTimeout(function() {
                    window.location.href = "/Member/login.html"
                }, 2e3)), "" !== _hdmobile && (api.toast("当前用户已绑定手机号", 1500), setTimeout(function() {
                    window.location.href = "https://u.uzai.com/mobile/EditUser"
                }, 2e3))
            } else if (window.location.pathname.indexOf("login") > -1) {
                var _city = api.getCookie("uzmCity");
                null === _city || void 0 === _city || "" === _city ? $config.getPoint() : $cityname = _city.split("-")[0]
            }
            "#/passwordlogin" !== window.location.hash && "#/updatePassword" !== window.location.hash || ($My.$userName.length > 0 && $My.$userPassword.length >= 6 || $My.$newPassword.length >= 6) && $doc.getElementsByClassName("paw-now")[0].classList.add("active"), "" === $My.$tel ? api.post($http, $scope, api.path.mhomelogic, "User", "GetTel", JSON.stringify({
                PhoneType: 20
            }), function(data) {
                200 === data.ErrorCode && ($scope.tel = data.JsonResult)
            }, !1, !1, !1) : $scope.tel = $My.$tel
        }
        $scope.jumpVstoreIndex = function() {
            window.location.href = "http://vd.uzai.com?vstoreid=" + $My.$vstoreid
        }, $scope.jumpMyVstoreIndex = function() {
            window.location.href = "https://mhome.uzai.com/Member/index.html?vstoreid=" + $My.$vstoreid + "&mobilePhone=" + $My.$mobilePhone
        }, $scope.historyBack = function() {
            /(iPhone|iPad|iPod)/i.test(navigator.userAgent) ? window.location.href = window.document.referrer : window.history.go("-1")
        }, $scope.verificationCondition = function(value) {
            var _input = "",
                enableImgCode = !1,
                _hash = window.location.hash,
                _page = window.location.pathname,
                _entity = {};
            _entity = $getAuthCodeEntity(_hash), $My.$userName = null === $doc.getElementById("pwdLoginuserName") ? "" : $doc.getElementById("pwdLoginuserName").value, $My.$userPassword = null === $doc.getElementById("pwdLoginuserPassword") ? "" : $doc.getElementById("pwdLoginuserPassword").value, $My.$newPassword = null === $doc.getElementById("password") ? "" : $doc.getElementById("password").value, "" === _hash ? (_page.indexOf("login") > -1 ? _input = "login-now" : _page.indexOf("updatemobile") > -1 && (_input = "paw-now"), enableImgCode = $My.$enableImgCode) : "#/findPasswordVerification" === _hash ? (enableImgCode = $My.$fpvEnableImgCode, $My.$userName = "", $My.$userPassword = "", $My.$newPassword = "", _input = "paw-next") : "#/passwordlogin" === _hash ? ($My.$newPassword = "", _input = "paw-now") : "#/updatePassword" === _hash && ($My.$userName = "", $My.$userPassword = "", _input = "paw-sure"), (11 === _entity.Mobile.length && 4 === _entity.AuthCode.length || $My.$userName.length > 0 && $My.$userPassword.length >= 6 || $My.$newPassword.length >= 6) && (enableImgCode && _entity.ImageCode.length > 0 || !enableImgCode) ? $doc.getElementsByClassName(_input)[0].classList.add("active") : $doc.getElementsByClassName(_input)[0].classList.remove("active")
        }, $scope.verificationSubmit = function() {
            var _hash = window.location.hash,
                _page = window.location.pathname,
                _input = "submitButton";
            return "" === _hash ? _page.indexOf("login") > -1 ? _input = "login-now" : _page.indexOf("updatemobile") > -1 && (_input = "paw-now") : "#/findPasswordVerification" === _hash ? _input = "paw-next" : "#/passwordlogin" === _hash ? _input = "paw-now" : "#/updatePassword" === _hash && (_input = "paw-sure"), $doc.getElementsByClassName(_input)[0].classList.contains("active")
        }, $scope.passwordLogin = function(expiryDateModel) {
            var _pwdLoginuserName = $doc.querySelector("#pwdLoginuserName").value,
                _pwdLoginuserPassword = $doc.querySelector("#pwdLoginuserPassword").value,
                _param = JSON.stringify({
                    UserName: _pwdLoginuserName,
                    Password: _pwdLoginuserPassword
                });
            return $scope.verificationSubmit() ? "" === _pwdLoginuserName ? (api.toast("请输入账号", 1500), !1) : "" === _pwdLoginuserPassword ? (api.toast("请输入密码", 1500), !1) : (api.loading(), $doc.getElementById("loading").classList.remove("zHide"), void api.post($http, $scope, api.path.mhomelogic, "User", "UserLogin", _param, function(data) {
                if (api.endloading(), $doc.getElementById("loading").classList.add("zHide"), -3 === data.ErrorCode) return api.toast("网络不给力，请检查网络设置", 1500), !1;
                if (200 === data.ErrorCode) {
                    var result = JSON.parse(data.JsonResult);
                    $setUsercookie(result), document.referrer.indexOf("vstoreid") > -1 ? window.location.href = document.referrer : window.location.href = $My.$reurl
                } else api.toast(data.ErrorMsg, 1500)
            }, !1, !1, !0, !0)) : !1
        }, $scope.setAuthCodeBtnStyle = function(mobileValue, childPageName) {
            var entity = $getAuthCodeEntity(window.location.hash),
                showImageCode = "fpv" === childPageName ? $My.$fpvEnableImgCode : $My.$enableImgCode;
            childPageName = void 0 === childPageName ? "" : "-" + childPageName;
            var _getCord = $doc.getElementsByClassName("get-cord " + childPageName)[0];
            //return $scope.verificationCondition(mobileValue), 11 === entity.Mobile.length && (showImageCode && entity.ImageCode && entity.ImageCode.length > 0 || !showImageCode) ? void(-1 === _getCord.innerHTML.indexOf("s") && _getCord.classList.add("canclick")) : void _getCord.classList.remove("canclick")
        	return 11 === entity.Mobile.length && (showImageCode && entity.ImageCode && entity.ImageCode.length > 0 || !showImageCode) ? void(-1 === _getCord.innerHTML.indexOf("s") && _getCord.classList.add("canclick")) : void _getCord.classList.remove("canclick")
        }, $scope.getLoginAuthCode = function(childPageName) {
            childPageName = void 0 === childPageName ? "" : "-" + childPageName;
            var _getCord = $doc.getElementsByClassName("get-cord " + childPageName)[0];
            if (!_getCord.classList.contains("canclick")) return !1;
            if (window.location.pathname.indexOf("updatemobile") > -1) {
                var _hdmobile2 = $doc.getElementById("hd_mobile").value;
                "" === _userId && (api.toast("登录信息过期,请重新登录", 1500), setTimeout(function() {
                    window.location.href = "/Member/login.html"
                }, 2e3)), "" !== _hdmobile2 && (api.toast("当前用户已绑定手机号", 1500), setTimeout(function() {
                    window.location.href = "https://u.uzai.com/mobile/EditUser"
                }, 2e3))
            }
            var entity = $getAuthCodeEntity(window.location.hash),
                _mobile = entity.Mobile,
                _userToken = $doc.querySelector("#hd_userToken").value,
                _authCodeType = entity.AuthCodeType;
            if ("" === _mobile) return api.toast("请输入手机号", 1500), !1;
            var param = JSON.stringify({
                Phone: _mobile,
                AuthCodeType: _authCodeType,
                PhoneId: _userToken,
                EnableImgCode: "" === childPageName ? $My.$enableImgCode : $My.$fpvEnableImgCode,
                ImgCode: entity.ImageCode
            });
            _getCord.classList.remove("canclick"), api.post($http, $scope, api.path.mhomelogic, "User", "GetAuthCode", param, function(data) {
                if (-3 === data.ErrorCode) return _getCord.classList.add("canclick"), api.toast("网络不给力，请检查网络设置", 1500), !1;
                if (-2 === data.ErrorCode && "" === data.JsonResult) return api.toast(data.ErrorMsg, 1500), _getCord.classList.add("canclick"), !1;
                if (200 === data.ErrorCode && (api.toast(data.ErrorMsg, 1500), $cutDown(childPageName, "get-cord")), 201 === data.ErrorCode || -2 === data.ErrorCode) {
                    if ((-2 === data.ErrorCode || 201 === data.ErrorCode && "" === data.JsonResult) && _getCord.classList.add("canclick"), "" !== data.JsonResult) {
                        var _result = JSON.parse(data.JsonResult);
                        "" === childPageName ? ($scope.showImageCode = _result.EnableImgCode, $My.$enableImgCode = _result.EnableImgCode) : "-fpv" === childPageName && ($scope.fpv_showImageCode = _result.EnableImgCode, $My.$fpvEnableImgCode = _result.EnableImgCode), $scope.imageUrl = "/Member/GetCode?phone=" + _mobile + "&rnd=" + Math.random()
                    }
                    "" !== data.ErrorMsg && api.toast(data.ErrorMsg, 1500)
                }
            }, !1, !1, !1)
        }, $scope.switchImageCode = function() {
            //var _mobile = $doc.getElementById("mobile").value;
            //$scope.imageUrl = "/Member/GetCode?phone=" + _mobile + "&rnd=" + Math.random()
            $scope.imageUrl = "randCodeImage?rnd=" + Math.random()
        }, $scope.dynamicLogin = function() {
            var _name = $doc.getElementById("name").value,
	            _tel = $doc.getElementById("tel").value,
            	_corpName = $doc.getElementById("corpName").value,
                _imageCode = $doc.getElementById("imageCode").value;
            //if (!$scope.verificationSubmit()) return !1;
           	//if ("" === _mobile) return api.toast("请输入手机号", 1500), !1;
            if ("" === _imageCode) return api.toast("请输入姓名、手机号码、公司名称和验证码", 1500), !1;
            var param = {
            	name: _name,
            	tel: _tel,
            	corpName: _corpName,
            	imageCode: _imageCode
                /*Mobile: _name,
                AuthCode: _authCode,
                PhoneType: "20",
                StartCity: 0,
                StartCityName: $cityname*/
            };
            /*api.post($http, $scope, api.path.mhomelogic, "User", "DynamicLogin", param, function(data) {
                if (api.endloading(), $doc.getElementById("loading").classList.add("zHide"), 200 === data.ErrorCode) {
                    var result = JSON.parse(data.JsonResult);
                    $setUsercookie(result), document.referrer.indexOf("vstoreid") > -1 ? window.location.href = document.referrer : window.location.href = $My.$reurl
                } else {
                    if (-3 === data.ErrorCode) return api.toast("网络不给力，请检查网络设置", 1500), !1;
                    api.toast(data.ErrorMsg, 1500)
                }
            }, !1, !1)*/
            var successCallback = function(resp) {
            	//resp.data;
            	api.toast(resp['msg'], 6000);
            };
            /*$http.post("./cmsMemberController.do?save", param)
            	.then(successCallback, errorCallback);*/
            var u = "./cmsMemberController.do?save";
            var p = {
            		dataType: "JSON"
            		, type: "POST"
            		, data: param
            		, success: successCallback
            };
            $.ajax(u, p);
        }, $scope.passwordVerification = function() {
            var _mobile = $doc.getElementById("fpv_mobile").value,
                _authCode = $doc.getElementById("fpv_authCode").value,
                _hdMobile = $doc.getElementById("hd_mobile"),
                _hdAuthCode = $doc.getElementById("hd_authCode");
            if (!$scope.verificationSubmit()) return !1;
            if ("" === _mobile) return api.toast("请输入手机号", 1500), !1;
            if ("" === _authCode) return api.toast("请输入验证码", 1500), !1;
            var param = JSON.stringify({
                Phone: _mobile,
                AuthCode: _authCode,
                PhoneType: 20
            });
            api.post($http, $scope, api.path.mhomelogic, "User", "VerificationCode", param, function(data) {
                if (api.endloading(), $doc.getElementById("loading").classList.add("zHide"), 200 === data.ErrorCode) _hdMobile.value = _mobile, _hdAuthCode.value = _authCode, window.location.hash = "/updatePassword";
                else {
                    if (-3 === data.ErrorCode) return api.toast("网络不给力，请检查网络设置", 1500), !1;
                    api.toast(data.ErrorMsg, 1500)
                }
            }, !1, !1)
        }, $scope.updatePassword = function() {
            var _mobile = $doc.getElementById("hd_mobile").value,
                _authCode = $doc.getElementById("hd_authCode").value,
                _password = $doc.getElementById("password").value;
            if (!$scope.verificationSubmit()) return !1;
            if ("" === _password) return api.toast("请输入密码", 1500), !1;
            api.loading(), $doc.getElementById("loading").classList.remove("zHide");
            var param = JSON.stringify({
                UserName: _mobile,
                AuthCode: _authCode,
                PhoneType: 20,
                Password: _password,
                ImgCode: ""
            });
            api.post($http, $scope, api.path.mhomelogic, "User", "ChangeUserPassword", param, function(data) {
                if (api.endloading(), $doc.getElementById("loading").classList.add("zHide"), 200 === data.ErrorCode) api.toast("密码更新成功", 1500), setTimeout(function() {
                    window.location.href = "/Member/login.html#/passwordlogin"
                }, 2e3);
                else {
                    if (-3 === data.ErrorCode) return api.toast("网络不给力，请检查网络设置", 1500), !1;
                    api.toast(data.ErrorMsg, 1500)
                }
            }, !1, !1)
        }, $scope.updateMobile = function() {
            var _mobile = $doc.getElementById("mobile").value,
                _authCode = $doc.getElementById("authCode").value;
            if (!$scope.verificationSubmit()) return !1;
            if ("" === _mobile) return api.toast("请输入手机号", 1500), !1;
            if ("" === _authCode) return api.toast("请输入验证码", 1500), !1;
            "" === _userId && (api.toast("登录信息过期,请重新登录", 1500), setTimeout(function() {
                window.location.href = "/Member/login.html"
            }, 2e3));
            var param = JSON.stringify({
                Mobile: _mobile,
                AuthCode: _authCode,
                PhoneType: 20,
                UserId: _userId,
                ImgCode: ""
            });
            api.post($http, $scope, api.path.mhomelogic, "User", "UpdateMobile", param, function(data) {
                if (api.endloading(), $doc.getElementById("loading").classList.add("zHide"), 200 === data.ErrorCode) api.toast("手机号绑定成功", 1500), setTimeout(function() {
                    window.location.href = "/Member/index.html"
                }, 2e3);
                else {
                    if (-3 === data.ErrorCode) return api.toast("网络不给力，请检查网络设置", 1500), !1;
                    api.toast(data.ErrorMsg, 1500)
                }
            }, !1, !1)
        }
    }), $myApp.directive("script", function($compile) {
        return {
            restrict: "E",
            scope: !1,
            link: function(scope, elem, attr) {
                ("text/javascript-lazy" === attr.type || elem.text().indexOf("childrenFunction.") > -1) && setTimeout(function() {
                    if (attr.ngSrc) {
                        var _script = $doc.createElement("script");
                        return _script.setAttribute("type", "text/javascript"), _script.setAttribute("src", attr.ngSrc), void $doc.body.appendChild(_script)
                    }
                    var _code = elem.text(),
                        _f = new Function(_code);
                    _f()
                }, 800)
            }
        }
    });
    var $openEye = function(ele) {
        var _eye = $doc.getElementsByClassName(ele)[0];
        _eye.addEventListener("click", function() {
            if (_eye.classList.contains) {
                if (_eye.classList.contains("icon-yanjing")) return _eye.classList.remove("icon-yanjing"), _eye.classList.add("icon-biyan"), void _eye.previousElementSibling.setAttribute("type", "password");
                _eye.classList.add("icon-yanjing"), _eye.classList.remove("icon-biyan"), _eye.previousElementSibling.setAttribute("type", "text")
            }
        }, !1)
    };
    $myApp.filter("trustHtml", function($sce) {
        return function(input) {
            return $sce.trustAsHtml(input)
        }
    });
    var ChildrenFunction = function() {
            function ChildrenFunction() {
                _classCallCheck(this, ChildrenFunction)
            }
            return _createClass(ChildrenFunction, [{
                key: "passwordlogin",
                value: function() {
                    api.endloading(), $doc.getElementById("loading").classList.add("zHide"), $openEye("paw-eye"), $doc.getElementsByClassName("froget-paw")[0].onclick = function() {
                        window.navigator.onLine === !0 ? this.href = "#/findPasswordVerification" : (this.href = "javascript:void(0)", api.toast("网络链接失败，请重试", 1500))
                    }, $doc.getElementById("pwdLoginuserName").value.length > 0 && $doc.getElementsByClassName("paw-now")[0].classList.add("active")
                }
            }, {
                key: "findPasswordVerification",
                value: function() {
                    api.endloading(), $doc.getElementById("loading").classList.add("zHide")
                }
            }, {
                key: "updatePassword",
                value: function() {
                    api.endloading(), $doc.getElementById("loading").classList.add("zHide"), $openEye("paw-eye1"), $doc.getElementById("password").value = ""
                }
            }]), ChildrenFunction
        }(),
        childrenFunction = new ChildrenFunction;
    window.childrenFunction = window.childrenFunction || childrenFunction
}(window);