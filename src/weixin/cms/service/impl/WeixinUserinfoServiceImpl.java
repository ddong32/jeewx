package weixin.cms.service.impl;
import weixin.cms.service.WeixinUserinfoServiceI;
import weixin.guanjia.account.entity.WeixinAccountEntity;
import weixin.guanjia.account.service.WeixinAccountServiceI;
import weixin.p3.oauth2.def.WeiXinOpenConstants;
import weixin.p3.oauth2.pojo.oauth2.Oauth2CodePojo;
import weixin.p3.oauth2.rule.RemoteWeixinMethod;
import weixin.p3.oauth2.util.OAuth2Util;
import weixin.util.WeiXinConstants;

import org.apache.log4j.Logger;
import org.jeecgframework.core.common.model.json.AjaxJson;
import org.jeecgframework.core.common.service.impl.CommonServiceImpl;
import org.jeecgframework.core.util.LogUtil;
import org.jeecgframework.core.util.ResourceUtil;
import org.jeecgframework.core.util.StringUtil;
import org.jeecgframework.core.util.oConvertUtils;
import org.jeecgframework.p3.core.utils.common.StringUtils;
import org.jeecgframework.web.system.pojo.base.TSType;
import org.jeecgframework.web.system.pojo.base.TSTypegroup;
import org.jeecgframework.web.system.service.SystemService;

import weixin.cms.controller.WeixinUserinfoController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.gson.Gson;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;

@Service("WeixinUserinfoService")
@Transactional
public class WeixinUserinfoServiceImpl extends CommonServiceImpl implements WeixinUserinfoServiceI {

    /**
     * Logger for this class
     */
    private static final Logger logger = Logger.getLogger(WeixinUserinfoController.class);
    
    private static final String Charset_UTF8 = "UTF-8";
    
    @Autowired
    private WeixinAccountServiceI weixinAccountService;
    
    @Autowired
    private SystemService systemService;
    
    /**
     * 调用微信author2.0 通用方法
     * @param request    前台请求
     * @param accountId    微信公众账号信息ID
     * @return
     */
    public String callWeixinAuthor2ReturnUrl(HttpServletRequest request, HttpServletResponse response) throws Exception {
        /**通过Oauth2.0获取openid_end**/
        String openId = ResourceUtil.getOpenid(request);
        if(oConvertUtils.isNullOrEmpty(openId)){
            openId = ResourceUtil.getUserOpenId();
        }
        
        String page = request.getRequestURL().toString();
        String redirect_uri = page + "?getUserinfo";
        //URL转码
        redirect_uri = URLEncoder.encode(redirect_uri, Charset_UTF8);
        
        if(StringUtil.isEmpty(openId)){
          //获取微信客户端用户信息要用到公众号原始id
            String accountId = null;
            //从数据字典获取旅游的公众号原始ID, 数据字典类型"weixinmp", 字典项代码"trip_appid"
            TSTypegroup tg = (TSTypegroup)systemService.findUniqueByProperty(TSTypegroup.class, "typegroupcode", "weixinmp");
            List<TSType> ts = null != tg? tg.getTSTypes() : null;
            if(null != ts) {
                for(TSType t : ts) {
                    if("trip_appid".equals(t.getTypecode())) {
                        accountId = t.getTypename();
                        break;
                    }
                }
            }
            
            //读取公众号配置信息, 获得appid和secret
            WeixinAccountEntity account = (WeixinAccountEntity)systemService.findUniqueByProperty(WeixinAccountEntity.class, "weixin_accountid", accountId);
            String code = request.getParameter("code");
            LogUtil.info("-----author2.0--------code的值--------------"+code);
            //1.模式一：需要授权页面，则判断是否有code值,没有则跳转到授权地址
            if(StringUtil.isEmpty(code)){
                LogUtil.info("-----------author2.0-------------targetURL的值-------------"+redirect_uri);
                String redirectURL = OAuth2Util.obtainWeixinOAuth2Url(redirect_uri, account.getAccountappid(), OAuth2Util.SNSAPI_BASE);
                response.sendRedirect(redirectURL);
            }
            // 2.模式一：用户已经关注微信公众账号，不需要授权页面，即可获取了code的值
            if (!"authdeny".equals(code)) {
                Map<String,Object> map = new RemoteWeixinMethod().getOauth2AccessToken(new Oauth2CodePojo(account.getAccountappid(), account.getAccountappsecret(), code));
                openId = (String)map.get("openid");
            }
            request.getSession().setAttribute(WeiXinConstants.USER_OPENID, openId);
        }
        return null;
    }
    
    public void getUserinfo(HttpServletRequest request, HttpServletResponse response) throws Exception {
        //request.getSession().setAttribute(WeiXinConstants.USER_OPENID, "oYZzU1VBxYrXZBuU-FdTx6Qm6UF1");
        //
        String targetUrl = "";
        if(returnTarget(request, response, null)) {
            return;
        }
        
        //得到code
        String code = request.getParameter("code");
        logger.debug("code=" + code);
        //获取微信客户端用户信息要用到公众号原始id
        String accountId = null;
        //从数据字典获取旅游的公众号原始ID, 数据字典类型"weixinmp", 字典项代码"trip_appid"
        TSTypegroup tg = (TSTypegroup)systemService.findUniqueByProperty(TSTypegroup.class, "typegroupcode", "weixinmp");
        List<TSType> ts = null != tg? tg.getTSTypes() : null;
        if(null != ts) {
            for(TSType t : ts) {
                if("trip_appid".equals(t.getTypecode())) {
                    accountId = t.getTypename();
                    break;
                }
            }
        }
        //accountId = "gh_20419b74f848";
        accountId = "gh_f296724964ae";
        //
        if(StringUtils.isBlank(accountId)) {
            returnTarget(request, response, "无法获取公众号原始ID, 确认是否绑定了公众账号或数据字典配置了公众号'weixinmp'.");
            return ;
        }
        //读取公众号配置信息, 获得appid和secret
        WeixinAccountEntity wxae = (WeixinAccountEntity)systemService.findUniqueByProperty(WeixinAccountEntity.class, "weixin_accountid", accountId);
        if(null == wxae) {
            returnTarget(request, response, "无法获取公众号信息.");
            return ;
        }
        final String appid = wxae.getAccountappid();     //"wxd6048ada51587060";
        final String secret = wxae.getAccountappsecret();//"8984c42884c98580fe198c0124f62a44";
        
        if(null == code || code.isEmpty()) {
            //
            String page = request.getRequestURL().toString();
            String redirect_uri = page + "?getUserinfo";
            if(StringUtils.isNotBlank(targetUrl)) {
                redirect_uri += "&targetUrl=" + URLEncoder.encode(targetUrl, Charset_UTF8);
            }
            //URL转码
            redirect_uri = URLEncoder.encode(redirect_uri, Charset_UTF8);
            //微信接口地址
            final String addr = WeiXinOpenConstants.WEB_OAUTH_URL.replace("APPID", appid).replace("REDIRECT_URI", redirect_uri).replace("SCOPE", OAuth2Util.SNSAPI_BASE);
            response.sendRedirect(addr);
         } else {
            //得到code
            //换取access_token 其中包含了openid
            String addr = WeiXinOpenConstants.WEB_OAUTH_ACCESSTOKEN_URL.replace("APPID", appid).replace("SECRET", secret).replace("CODE", code);
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
            //放到session
            Map<?, ?> rso = new Gson().fromJson(rs.toString(), Map.class);
            request.getSession().setAttribute(WeiXinConstants.USER_OPENID, rso.get("openid"));
            //回到
            returnTarget(request, response, null);
        }
    }
    
    /**
     * 返回请求获取openid的页面
     * @param request
     * @param response
     * @param error 返回错误
     * @return
     * @throws Exception
     */
    private boolean returnTarget(HttpServletRequest request, HttpServletResponse response, String error) throws Exception {
        final String targetUrl = request.getParameter("targetUrl");
        //
        /*if(StringUtils.isBlank(targetUrl)) {
            logger.warn("请输入访问的地址.");
            return;
        }*/
        //是否返回错误
        if(StringUtils.isNotBlank(error)) {
            logger.warn(error);
            if(StringUtils.isNotBlank(targetUrl)) {
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
        //session是否获得到
        if(StringUtils.isNotBlank(openid)) {
            if(StringUtils.isNotBlank(targetUrl)) {
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
 	
}