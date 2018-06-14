package weixin.cms.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.jeecgframework.core.common.controller.BaseController;
import org.jeecgframework.core.common.model.json.AjaxJson;
import org.jeecgframework.core.util.ResourceUtil;
import org.jeecgframework.p3.core.utils.common.StringUtils;
import org.jeecgframework.web.system.pojo.base.TSType;
import org.jeecgframework.web.system.pojo.base.TSTypegroup;
import org.jeecgframework.web.system.service.SystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.gson.Gson;

import net.sf.json.JSONObject;
import weixin.cms.service.WeixinUserinfoServiceI;
import weixin.guanjia.account.entity.WeixinAccountEntity;
import weixin.guanjia.core.util.WeixinUtil;
import weixin.p3.oauth2.def.WeiXinOpenConstants;
import weixin.p3.oauth2.util.OAuth2Util;
import weixin.util.WeiXinConstants;

/**
 * 获取微信标识
 * 
 */
@Controller
@RequestMapping("/weixinUserinfoController")
public class WeixinUserinfoController extends BaseController {
    /**
     * Logger for this class
     */
    private static final Logger logger = Logger.getLogger(WeixinUserinfoController.class);

    private static final String Charset_UTF8 = "UTF-8";

    @Autowired
    private SystemService systemService;

    /**
     * 获取微信客户端的用户
     * 
     * @param targetUrl
     *            获得用户openid后跳转的页面
     */
    @RequestMapping(params = "callWeixinAuthor2")
    public void callWeixinAuthor2(String targetUrl, HttpServletRequest request, HttpServletResponse response) throws Exception {

        if (returnTarget(request, response, null)) {
            return;
        }

        String accountId = null;
        // 从数据字典获取旅游的公众号原始ID, 数据字典类型"weixinmp", 字典项代码"trip_appid"
        TSTypegroup tg = (TSTypegroup) systemService.findUniqueByProperty(TSTypegroup.class, "typegroupcode", "weixinmp");
        List<TSType> ts = null != tg ? tg.getTSTypes() : null;
        if (null != ts) {
            for (TSType t : ts) {
                if ("trip_appid".equals(t.getTypecode())) {
                    accountId = t.getTypename();
                    break;
                }
            }
        }

        if (StringUtils.isBlank(accountId)) {
            returnTarget(request, response, "无法获取公众号原始ID, 确认是否绑定了公众账号或数据字典配置了公众号'weixinmp'.");
            return;
        }
        // 读取公众号配置信息, 获得appid和secret
        WeixinAccountEntity wxae = (WeixinAccountEntity) systemService.findUniqueByProperty(WeixinAccountEntity.class, "accountnumber", accountId);
        if (null == wxae) {
            returnTarget(request, response, "无法获取公众号信息.");
            return;
        }
        final String appid = wxae.getAccountappid(); // "wxd6048ada51587060";
        //
        String page = request.getRequestURL().toString();
        String redirect_uri = page + "?getOauth2AccessToken";
        if (StringUtils.isNotBlank(targetUrl)) {
            redirect_uri += "&targetUrl=" + URLEncoder.encode(targetUrl, Charset_UTF8);
        }
        // redirect_uri="http://full.ngrok.xiaomiqiu.cn/jeewx/cruiseController.do?callBack";
        // URL转码
        redirect_uri = URLEncoder.encode(redirect_uri, Charset_UTF8);
        // 微信接口地址
        final String addr = WeiXinOpenConstants.WEB_OAUTH_URL.replace("APPID", wxae.getAccountappid()).replace("REDIRECT_URI", redirect_uri).replace("SCOPE", OAuth2Util.SNSAPI_BASE);

        response.sendRedirect(addr);
    }

    /**
     * 获取微信客户端的用户
     * 
     * @param targetUrl
     *            获得用户openid后跳转的页面
     */
    @RequestMapping(params = "getOauth2AccessToken")
    public void getOauth2AccessToken(String targetUrl, HttpServletRequest request, HttpServletResponse response) throws Exception {

        if (returnTarget(request, response, null)) {
            return;
        }

        // 得到code
        String code = request.getParameter("code");
        logger.debug("code=" + code);
        // 获取微信客户端用户信息要用到公众号原始id
        String accountId = null;
        // 从数据字典获取旅游的公众号原始ID, 数据字典类型"weixinmp", 字典项代码"trip_appid"
        TSTypegroup tg = (TSTypegroup) systemService.findUniqueByProperty(TSTypegroup.class, "typegroupcode", "weixinmp");
        List<TSType> ts = null != tg ? tg.getTSTypes() : null;
        if (null != ts) {
            for (TSType t : ts) {
                if ("trip_appid".equals(t.getTypecode())) {
                    accountId = t.getTypename();
                    break;
                }
            }
        }
        // accountId = "gh_20419b74f848";
        //
        if (StringUtils.isBlank(accountId)) {
            returnTarget(request, response, "无法获取公众号原始ID, 确认是否绑定了公众账号或数据字典配置了公众号'weixinmp'.");
            return;
        }
        // 读取公众号配置信息, 获得appid和secret
        WeixinAccountEntity wxae = (WeixinAccountEntity) systemService.findUniqueByProperty(WeixinAccountEntity.class, "accountnumber", accountId);
        if (null == wxae) {
            returnTarget(request, response, "无法获取公众号信息.");
            return;
        }
        final String appid = wxae.getAccountappid(); // "wxd6048ada51587060";
        final String secret = wxae.getAccountappsecret();// "8984c42884c98580fe198c0124f62a44";

        if (null != code) {
            // 得到code
            // 换取access_token 其中包含了openid
            String addr = WeiXinOpenConstants.WEB_OAUTH_ACCESSTOKEN_URL.replace("APPID", appid).replace("SECRET", secret).replace("CODE", code);
            //
            StringBuilder rs = new StringBuilder();
            URL url = new URL(addr);
            URLConnection yc = url.openConnection();
            BufferedReader in = new BufferedReader(new InputStreamReader(yc.getInputStream()));
            try {
                String inputLine;
                while ((inputLine = in.readLine()) != null) {
                    rs.append(inputLine);
                }
            } finally {
                in.close();
            }
            logger.debug("step1: " + rs);
            // 放到session
            Map<?, ?> rso = new Gson().fromJson(rs.toString(), Map.class);
            request.getSession().setAttribute(WeiXinConstants.USER_OPENID, rso.get("openid"));
            // 回到
            returnTarget(request, response, null);
        }
    }

    /**
     * 返回请求获取openid的页面
     * 
     * @param request
     * @param response
     * @param error
     *            返回错误
     * @return
     * @throws Exception
     */
    private boolean returnTarget(HttpServletRequest request, HttpServletResponse response, String error) throws Exception {
        final String targetUrl = request.getParameter("targetUrl");
        //
        /*
         * if(StringUtils.isBlank(targetUrl)) { logger.warn("请输入访问的地址.");
         * return; }
         */
        // 是否返回错误
        if (StringUtils.isNotBlank(error)) {
            logger.warn(error);
            if (StringUtils.isNotBlank(targetUrl)) {
                throw new Exception(error);
            } else {
                response.setContentType("application/json");

                AjaxJson j = new AjaxJson();
                j.setSuccess(Boolean.FALSE);
                j.setMsg(error);
                response.getWriter().print(j.getJsonStr());
            }
            return Boolean.FALSE;
        }

        String openid = ResourceUtil.getUserOpenId();
        // session是否获得到
        if (StringUtils.isNotBlank(openid)) {
            if (StringUtils.isNotBlank(targetUrl)) {
                response.sendRedirect(targetUrl);
            } else {
                response.setContentType("application/json");

                AjaxJson j = new AjaxJson();
                j.setSuccess(Boolean.TRUE);
                j.setObj(openid);
                response.getWriter().print(j.getJsonStr());
            }

            return Boolean.TRUE;
        }

        return Boolean.FALSE;
    }

    @RequestMapping(params = "oauth2")
    public void oauth2(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String get_access_token_url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=gh_f296724964ae&secret=821cbbd8563b9d67e14c91f8eb23398c&code=CODE&grant_type=authorization_code";
        String get_userinfo = "https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN";

        // 将请求、响应的编码均设置为UTF-8（防止中文乱码）
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        String code = request.getParameter("code");

        System.out.println("******************code=" + code);

        get_access_token_url = get_access_token_url.replace("CODE", code);

        String json = WeixinUtil.doHttpsGetJson(get_access_token_url);

        JSONObject jsonObject = JSONObject.fromObject(json);
        String access_token = jsonObject.getString("access_token");
        String openid = jsonObject.getString("openid");

        get_userinfo = get_userinfo.replace("ACCESS_TOKEN", access_token);
        get_userinfo = get_userinfo.replace("OPENID", openid);

        String userInfoJson = WeixinUtil.doHttpsGetJson(get_userinfo);

        JSONObject userInfoJO = JSONObject.fromObject(userInfoJson);

        String user_openid = userInfoJO.getString("openid");
        String user_nickname = userInfoJO.getString("nickname");
        String user_sex = userInfoJO.getString("sex");
        String user_province = userInfoJO.getString("province");
        String user_city = userInfoJO.getString("city");
        String user_country = userInfoJO.getString("country");
        String user_headimgurl = userInfoJO.getString("headimgurl");

        // UserInfo_weixin userInfo=new UserInfo_weixin(user_openid,

        response.setContentType("text/html; charset=utf-8");
        PrintWriter out = response.getWriter();
        out.println("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">");
        out.println("<HTML>");
        out.println(" <HEAD><TITLE>A Servlet</TITLE></HEAD>");
        out.println(" <BODY>");
        out.print(" This is ");
        out.print(this.getClass());
        out.println(", using the POST method \n");
        out.println("openid:" + user_openid + "\n\n");
        out.println("nickname:" + user_nickname + "\n\n");
        out.println("sex:" + user_sex + "\n\n");
        out.println("province:" + user_province + "\n\n");
        out.println("city:" + user_city + "\n\n");
        out.println("country:" + user_country + "\n\n");
        out.println("<img src=/" + user_headimgurl + "/");
        out.println(">");
        out.println(" </BODY>");
        out.println("</HTML>");
        out.flush();
        out.close();
    }
}
