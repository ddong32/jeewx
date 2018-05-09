<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html lang="en">

<head>
	<title>南宁市公安局交通警察支队</title><!-- ${pd.SYSNAME} -->
	<base href="<%=basePath%>">
	<meta charset="UTF-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=8, chrome=1" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="renderer" content="webkit">
	<link rel="stylesheet" href="plug-in/login/bootstrap.min.css" />
	<link rel="stylesheet" href="plug-in/login/css/camera.css" />
	<link rel="stylesheet" href="plug-in/login/bootstrap-responsive.min.css" />
	<link rel="stylesheet" href="plug-in/login/matrix-login.css" />
	<link rel="stylesheet" href="plug-in/login/font-awesome.css" />
	<link rel="stylesheet" href="plug-in/login/login.css" />
	
	<!--[if lte IE 9]>
	<link rel="stylesheet" href="plug-in/css/ace-part2.css" />
	<![endif]-->
	
	<link rel="stylesheet" href="plug-in/css/ace-rtl.css" />

	<!--[if lte IE 9]>
	<link rel="stylesheet" href="plug-in/css/ace-ie.min.css" />
	<![endif]-->

	<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->

	<!--[if lt IE 9]>
	<script src="plug-in/js/html5/html5shiv.js"></script>
	<script src="plug-in/js/html5/respond.js"></script>
	<![endif]-->
</head>
<body>
	<div style="width:100%;text-align:center;margin:0 auto;position:absolute; z-index: 999">
		<div id="loginbox">
			<div class="log" title=""></div> 
			<div style="height: 1px; background-color: #ccc;clear: both;"></div>
			<form action="#" method="post" name="loginForm" id="loginForm">
				<div class="control-group normal_text"></div>
				<div class="logomage" ><img src="plug-in/login/nn/login_logo.png" ></div>
				<div class="login-input-box"> 
					<span class="icon icon-user"></span>
					<input type="text" name="loginname" id="loginname" placeholder="请输入用户名" value="" />
				</div>
				<div class="login-input-box">
            		<span class="icon icon-password"></span>
            		<input type="password" name="password" id="password" placeholder="请输入密码" value="" />
        		</div>
        		<div class="login-input-box" >
        			<div class="login-input-box-yan" >
	           			<input type="text" name="code" id="code" class="input-small" placeholder="请输入验证码">
						<span><img id="codeImg" alt="点击更换" title="点击更换" src=""></span>
					</div>
        		</div>
        		<div class="remember-box">
        			<label><input name="form-field-checkbox" id="saveid" type="checkbox" onclick="savePaw();" style="padding-top:0px;" />&nbsp;记住密码</label>
    			</div>
    			<div class="login-button-box">
       				<a onclick="severCheck();" class="btn btn-info" id="to-recover">登&nbsp;&nbsp;录</a>
    			</div>
				<div class="form-actions">
					<div style="width:86%;padding-left:8%;"></div>
				</div>
			</form>
			<div class="controls" >
				<div class="main_input_box">
					<font color="white"><span id="nameerr"></span></font>
				</div>
			</div>
		</div>
	</div>
	<div class="copyright"> 为展现最佳效果建议使用1280*1024以上分辨率，IE8以上浏览器    ©CopyRight 2018 广西南宁喜洋洋国际旅行有限公司 </div> 
	<div id="templatemo_banner_slide" class="container_wapper">
		<div class="camera_wrap camera_emboss" id="camera_slide">
			<div data-src="plug-in/login/nn/login_bg_01.png"></div>
			<div data-src="plug-in/login/nn/login_bg_02.png"></div>
            <div data-src="plug-in/login/nn/login_bg_03.png"></div>
			<!--
			<div data-src="plug-in/login/images/banner_slide_02.jpg"></div>
			<div data-src="plug-in/login/images/banner_slide_03.jpg"></div> 
			-->
		</div>
		<!-- #camera_wrap_3 -->
	</div>
</body>

<script type="text/javascript" src="plug-in/jquery/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="plug-in/js/bootstrap.min.js"></script>
<script type="text/javascript" src="plug-in/js/jquery.tips.js"></script>
<script type="text/javascript" src="plug-in/js/jquery.cookie.js"></script>
<script type="text/javascript" src="plug-in/login/js/jquery.easing.1.3.js"></script>
<script type="text/javascript" src="plug-in/login/js/jquery.mobile.customized.min.js"></script>
<script type="text/javascript" src="plug-in/login/js/camera.min.js"></script>
<script type="text/javascript" src="plug-in/login/js/templatemo_script.js"></script>
<script type="text/javascript">

	//服务器校验
	function severCheck(){
		if(check()){
			var loginname = $("#loginname").val();
			var password = $("#password").val();
			var code = "qq313596790fh"+loginname+",fh,"+password+"QQ978336446fh"+",fh,"+$("#code").val();
			$.ajax({
				type: "POST",
				url: 'login_login',
		    	data: {KEYDATA:code,tm:new Date().getTime()},
				dataType:'json',
				cache: false,
				success: function(data){
					if("success" == data.result){
						saveCookie();
						window.location.href="main/index";
					}else if("usererror" == data.result){
						$("#loginname").tips({
							side : 1,
							msg : "用户名或密码有误",
							bg : '#FF5080',
							time : 15
						});
						$("#loginname").focus();
					}else if("codeerror" == data.result){
						$("#code").tips({
							side : 1,
							msg : "验证码输入有误",
							bg : '#FF5080',
							time : 15
						});
						$("#code").focus();
					}else if("error" == data.result){
						$("#loginname").tips({
							side : 1,
							msg : "缺少参数",
							bg : '#FF5080',
							time : 15
						});
						$("#loginname").focus();
					}else{
                        $("#loginname").tips({
                          side : 1,
                          msg : data.result,
                          bg : '#FF5080',
                          time : 15
                        });
						$("#loginname").focus();
					}
				}
			});
		}
	}

	$(document).ready(function() {
		changeCode();
		$("#codeImg").bind("click", changeCode);
	});

	$(document).keyup(function(event) {
		if (event.keyCode == 13) {
			$("#to-recover").trigger("click");
		}
	});

	function genTimestamp() {
		var time = new Date();
		return time.getTime();
	}

	function changeCode() {
		$("#codeImg").attr("src", "code.do?t=" + genTimestamp());
	}

	//客户端校验
	function check() {
		if ($("#loginname").val() == "") {
			$("#loginname").tips({
				side : 2,
				msg : '用户名不得为空',
				bg : '#AE81FF',
				time : 3
			});
			$("#loginname").focus();
			return false;
		} else {
			$("#loginname").val(jQuery.trim($('#loginname').val()));
		}

		if ($("#password").val() == "") {
			$("#password").tips({
				side : 2,
				msg : '密码不得为空',
				bg : '#AE81FF',
				time : 3
			});
			$("#password").focus();
			return false;
		}
		
		if ($("#code").val() == "") {
			$("#code").tips({
				side : 1,
				msg : '验证码不得为空',
				bg : '#AE81FF',
				time : 3
			});
			$("#code").focus();
			return false;
		}

		$("#loginname").tips({
			side : 1,
			msg : '正在登录 , 请稍后 ...',
			bg : '#68B500',
			time : 10
		});

		return true;
	}

	function savePaw() {
		if (!$("#saveid").attr("checked")) {
			$.cookie('loginname', '', {
				expires : -1
			});
			$.cookie('password', '', {
				expires : -1
			});
			$("#loginname").val('');
			$("#password").val('');
		}
	}

	function saveCookie() {
		if ($("#saveid").attr("checked")) {
			$.cookie('loginname', $("#loginname").val(), {
				expires : 7
			});
			$.cookie('password', $("#password").val(), {
				expires : 7
			});
		}
	}
	
	function quxiao() {
		$("#loginname").val('');
		$("#password").val('');
	}
	
	jQuery(function() {
		var loginname = $.cookie('loginname');
		var password = $.cookie('password');
		if (typeof(loginname) != "undefined" && typeof(password) != "undefined") {
			$("#loginname").val(loginname);
			$("#password").val(password);
			$("#saveid").attr("checked", true);
			$("#code").focus();
		}
	});

	//TOCMAT重启之后 点击左侧列表跳转登录首页 
	if (window != top) {
		top.location.href = location.href;
	}
</script>
</html>