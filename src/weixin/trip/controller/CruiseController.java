package weixin.trip.controller;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.jeecgframework.core.common.controller.BaseController;
import org.jeecgframework.core.common.model.json.AjaxJson;
import org.jeecgframework.core.constant.Globals;
import org.jeecgframework.core.util.ResourceUtil;
import org.jeecgframework.core.util.StringUtil;
import org.jeecgframework.web.system.pojo.base.TSType;
import org.jeecgframework.web.system.pojo.base.TSTypegroup;
import org.jeecgframework.web.system.service.SystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import weixin.cms.entity.CmsArticleEntity;
import weixin.cms.entity.CmsPhotoEntity;
import weixin.cms.entity.CmsRouteEntity;
import weixin.cms.service.CmsArticleServiceI;
import weixin.cms.service.CmsPhotoServiceI;
import weixin.cms.service.CmsRouteServiceI;
import weixin.guanjia.account.service.WeixinAccountServiceI;

/**   
 * 微信公众号读取线路信息  
 *
 */
@Controller
@RequestMapping("/cruiseController")
public class CruiseController extends BaseController {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(CruiseController.class);
    
    @Autowired
    private SystemService systemService;

	@Autowired
	private CmsArticleServiceI cmsArticleService;
	
	@Autowired
	private CmsRouteServiceI cmsRouteService;
	
	@Autowired
	private CmsPhotoServiceI cmsPhotoService;

	/**
	 * 信息列表 页面跳转
	 * 
	 * @return
	 */
	@RequestMapping(params = "detail")
	public ModelAndView detail(CmsArticleEntity cmsArticle, HttpServletRequest request) {
	    readDetailContent(cmsArticle, request);
	    
		return new ModelAndView("weixin_trip/cruise");
	}
    /**
     * 返回文章相关内容, json数据
     * @param entity
     * @param request
     * @return
     */
    @RequestMapping(params = "detailcontent")
    @ResponseBody
    public AjaxJson detailcontent(CmsArticleEntity cmsArticle, HttpServletRequest request) {
        AjaxJson j = new AjaxJson();

        readDetailContent(cmsArticle, request);
        Map<String, Object> content = new HashMap<String, Object>(3);
        List<String> itemsName = Arrays.asList("cmsArticle", "cmsPhotos", "cmsRoutes");
        for(String n : itemsName) {
            content.put(n, request.getAttribute(n));
        }
        j.setAttributes(content);
        
        return j;
    }
	/**
	 * 详细行程
	 * @param cmsArticle
	 * @param request
	 * @return
	 */
    @RequestMapping(params = "traveldetail")
    public ModelAndView traveldetail(CmsArticleEntity cmsArticle, HttpServletRequest request) {
        readDetailContent(cmsArticle, request);
        
        return new ModelAndView("weixin_trip/cruise_detail");
    }
    
    public void readDetailContent(CmsArticleEntity cmsArticle, HttpServletRequest request) {
        final String articleId = cmsArticle.getId();
        if (StringUtil.isNotEmpty(articleId)) {
            //读取线路
            cmsArticle = cmsArticleService.getEntity(CmsArticleEntity.class, articleId);
            request.setAttribute("cmsArticle", cmsArticle);
            //读取头部图片
            List<CmsPhotoEntity> photos = cmsPhotoService.findByProperty(CmsPhotoEntity.class, "articleId", articleId);
            request.setAttribute("cmsPhotos", photos);
            //读取行程
            List<CmsRouteEntity> routes = cmsRouteService.findByProperty(CmsRouteEntity.class, "articleId", articleId);
            request.setAttribute("cmsRoutes", routes);
            //用餐安排字典
            if(null != routes && !routes.isEmpty()) {
                TSTypegroup tg = systemService.getTypeGroupByCode("ycap");
                List<TSType> ts = tg.getTSTypes();
                if(null != ts) {
                    for(CmsRouteEntity route : routes) {
                        for(TSType t : ts) {
                            final String c = t.getTypecode(), n = t.getTypename();
                            route.setBreakfast(c.equals(route.getBreakfast())? n : route.getBreakfast());
                            route.setLunch(c.equals(route.getLunch())? n : route.getLunch());
                            route.setDinner(c.equals(route.getDinner())? n : route.getDinner());
                        }
                    }
                }
            }
        }
        request.setAttribute("accountid", ResourceUtil.getWeiXinAccountId());
    }
}
