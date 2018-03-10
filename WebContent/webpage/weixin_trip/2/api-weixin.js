/**
 * 要求微信用户标识, 再提交注册信息
 */
(function() {
	function run(fx) {
        var u = "./weixinUserinfoController.do?getUserinfo";
        var p = {
        		dataType: "JSON"
        		, success: function(resp) {
        			//
        			if(resp && resp['obj']) {
        				fx(resp);
        			} else if(resp && resp['msg']) {
        				api.toast(resp['msg'], 6000);
        			} else {
        				apii.toast('无法获取微信标识.', 6000);
        			}
        		}
        };
        $.ajax(u, p);
	}
	
	window['api_weixin'] = {
			'run': run
	};
})();