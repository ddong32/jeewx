package weixin.guanjia.core.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jeecgframework.p3.core.common.utils.DateUtil;
import org.jeewx.api.core.util.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import weixin.guanjia.account.entity.WeixinAccountEntity;
import weixin.guanjia.account.service.WeixinAccountServiceI;
import weixin.guanjia.core.service.impl.WechatService;
import weixin.guanjia.core.util.SignUtil;

@Controller
@RequestMapping("/wechatController")
public class WechatController {
    @Autowired
    private WechatService wechatService;
    @Autowired
    private WeixinAccountServiceI weixinAccountService;

    /** 作者： qindl
     *  时间：2018-05-09 22：58
     *  
     *  signature 微信加密签名
     *  timestamp 时间戳
     *  nonce     随机数
     *  echostr   随机字符串
     */
    @RequestMapping(params = "wechat", method = RequestMethod.GET)
    public void wechatGet(HttpServletRequest request, HttpServletResponse response, 
            @RequestParam(value = "signature", required = true) String signature, 
            @RequestParam(value = "timestamp", required = true) String timestamp,
            @RequestParam(value = "nonce", required = true) String nonce, 
            @RequestParam(value = "echostr", required = true) String echostr) {
        List<WeixinAccountEntity> weixinAccountEntities = weixinAccountService.getList(WeixinAccountEntity.class);
        for (WeixinAccountEntity account : weixinAccountEntities) {
            if (SignUtil.checkSignature(account.getAccounttoken(), signature, timestamp, nonce)) {
                try {
                    response.getWriter().print(echostr);
                    break;
                } catch (IOException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            }
        }
    }

    @RequestMapping(params = "wechat", method = RequestMethod.POST)
    public void wechatPost(HttpServletResponse response, HttpServletRequest request) throws IOException {
        String respMessage = wechatService.coreService(request);
        PrintWriter out = response.getWriter();
        out.print(respMessage);
        out.close();
    }

    @RequestMapping(value = "security", method = RequestMethod.POST)
    // post 方法用于接收微信服务端消息 
    public void DoPost() {
        System.out.println("这是 post 方法！");
    }
}
