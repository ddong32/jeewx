package weixin.cms.controller;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.jeecgframework.core.common.controller.BaseController;
import org.jeecgframework.web.system.service.SystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import weixin.cms.service.CmsMemberServiceI;
import weixin.p3.oauth2.def.WeiXinOpenConstants;
import weixin.p3.oauth2.util.OAuth2Util;

/**   
 * 会员管理
 *
 */
@Controller
@RequestMapping("/weixinUserinfoController")
public class WeixinUserinfoController extends BaseController {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(WeixinUserinfoController.class);

	@Autowired
	private CmsMemberServiceI service;
	
	@Autowired
	private SystemService systemService;
    
	/**
	 * 获取微信客户段的用户
	 */
    @RequestMapping(params = "getUserinfo")
	public void getUserinfo(HttpServletRequest request, HttpServletResponse response) throws Exception {
        //得到code
        String code = request.getParameter("code");
        logger.debug("code=" + code);
        final String appid = request.getParameter("appid");//"wxd6048ada51587060";
        final String secret = request.getParameter("secret");//"8984c42884c98580fe198c0124f62a44";
        
        if(null == code || code.isEmpty()) {
            //
            String page = request.getRequestURL().toString();
            String redirect_uri = page + "?getUserinfo&appid=" + appid + "&secret=" + secret;
            //URL转码
            redirect_uri = URLEncoder.encode(redirect_uri, "UTF8");
            //微信接口地址
            final String addr = WeiXinOpenConstants.WEB_OAUTH_URL
                    .replace("APPID", appid).replace("REDIRECT_URI", redirect_uri).replace("SCOPE", OAuth2Util.SNSAPI_BASE);
            response.sendRedirect(addr);
         } else {
            //得到code
            //换取access_token 其中包含了openid
            String addr = WeiXinOpenConstants.WEB_OAUTH_ACCESSTOKEN_URL
                    .replace("APPID", appid).replace("SECRET", secret).replace("CODE", code);
            //
            StringBuilder rs = new StringBuilder();
            URL url = new URL(addr);
            URLConnection yc = url.openConnection();
            BufferedReader in = new BufferedReader(new InputStreamReader(yc.getInputStream()));
            try {
                String inputLine;
                while ((inputLine = in.readLine()) != null){
                    rs.append(inputLine);
                }
            } finally {
                in.close();
            }
            logger.debug("step1: " + rs);
            
            //StringBuilder rs = new StringBuilder("{\"access_token\":\"7_BzRTdnj88tCNgqMyP1dSSi16dVT1gEP7JdclP1rNLCbSM9Ev6tPcF5HOV0hACfoqtXmqqVeocd_bD6SvKjJ6sjG-GnXE7Rp0k-QaSER-iVI\",\"expires_in\":7200,\"refresh_token\":\"7_dRexzFQkya-TTKZIxwsgPH0DRuYPUfuCa03ns4lJOjsuDW2vhqIoYbFr94A1H5LIxdKuNZ28Q2R35ldyWFpQoYpCyrD4z7ofBqvNQ4lXejY\",\"openid\":\"oYZzU1VBxYrXZBuU-FdTx6Qm6UF0\",\"scope\":\"snsapi_base\"}");
            /*String access_token = null, openid = null;
            Pattern pat = Pattern.compile("\"([^\"]+)\"\\:\"([^\"]+)\"", Pattern.CASE_INSENSITIVE);
            Matcher mat = pat.matcher(rs.toString());
            while(mat.find()) {
                String k = mat.group(1), v = mat.group(2);
                if("access_token".equals(k)) {
                    access_token = v;
                } else if("openid".equals(k)){
                    openid = v;
                }
            }
            logger.debug("access_token=" + access_token + ", openid=" + openid);*/
            response.setContentType("application/json");
            response.getWriter().print(rs);
        }
	}
}
