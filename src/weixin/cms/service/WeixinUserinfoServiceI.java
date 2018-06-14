package weixin.cms.service;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jeecgframework.core.common.service.CommonService;

public interface WeixinUserinfoServiceI extends CommonService {
	
    /**
     * 调用微信author2.0 通用方法
     * @param request    前台请求
     * @param accountId    微信公众账号信息ID
     * @return
     */
    public String callWeixinAuthor2ReturnUrl(HttpServletRequest request, HttpServletResponse response) throws Exception;
    
    public void getUserinfo(HttpServletRequest request, HttpServletResponse response) throws Exception;
}
