package weixin.cms.util;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.jeecgframework.core.common.service.CommonService;
import org.jeecgframework.core.util.ApplicationContextUtil;
import org.jeecgframework.core.util.ResourceUtil;
import org.jeecgframework.p3.core.utils.common.StringUtils;
import org.jeecgframework.web.system.pojo.base.TSType;
import org.jeecgframework.web.system.pojo.base.TSTypegroup;
import org.jeecgframework.web.system.service.SystemService;
import org.springframework.context.ApplicationContext;

import com.google.gson.Gson;

import weixin.guanjia.account.entity.WeixinAccountEntity;
import weixin.util.WeiXinConstants;

public class WeixinUserinfoUtils {
	
	private static final Log logger = LogFactory.getLog(WeixinUserinfoUtils.class);
	/**
	 * 调用微信接口获取客户端用户
	 * @param request
	 */
	public static String getUserInfo(HttpServletRequest request) {
	    String openid = ResourceUtil.getUserOpenId();
    	//session是否获得到
    	if(StringUtils.isNotBlank(openid)) {
    		return openid;
    	}
    	//上下文
    	ApplicationContext beanContext = ApplicationContextUtil.getContext();
    	//获取微信客户端用户信息要用到公众号原始id
    	String accountId = null;
        //从数据字典获取旅游的公众号原始ID, 数据字典类型"weixinmp", 字典项代码"trip_appid"
    	CommonService service = beanContext.getBean(SystemService.class);
        TSTypegroup tg = (TSTypegroup)service.findUniqueByProperty(TSTypegroup.class, "typegroupcode", "weixinmp");
        List<TSType> ts = null != tg? tg.getTSTypes() : null;
        if(null != ts) {
            for(TSType t : ts) {
                if("trip_appid".equals(t.getTypecode())) {
                    accountId = t.getTypename();
                    break;
                }
            }
        }
        
        if(StringUtils.isBlank(accountId)) {
            logger.warn("无法获取公众号原始ID, 确认是否绑定了公众账号或数据字典配置了公众号'weixinmp'.");
            return null;
        }
        
        WeixinAccountEntity wxae = (WeixinAccountEntity)service.findUniqueByProperty(WeixinAccountEntity.class, "weixin_accountid", accountId);
        if(null == wxae) {
            logger.warn("无法获取公众号信息.");
            return null;
        }
        
        StringBuilder rs = new StringBuilder();
        
        String targetUrl = request.getRequestURL().toString();
        int pos = targetUrl.lastIndexOf("/");
        targetUrl = targetUrl.substring(0, pos) + "/weixinUserinfoController.do?getUserinfo"
                + "&appid=" + wxae.getAccountappid() + "&scret=" + wxae.getAccountappsecret();
        
        try {
            URL url = new URL(targetUrl);
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
            
            if(rs.length() > 0) {
                Map<?, ?> rso = new Gson().fromJson(rs.toString(), Map.class);
                request.setAttribute(WeiXinConstants.USER_OPENID, rso.get("openid"));
            }
        } catch (Exception err) {
            logger.error(err, err);
        }
        
        return ResourceUtil.getUserOpenId();
	}
}
