package weixin.trip.controller;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.hibernate.criterion.Restrictions;
import org.jeecgframework.core.common.controller.BaseController;
import org.jeecgframework.core.common.hibernate.qbc.CriteriaQuery;
import org.jeecgframework.core.common.model.json.AjaxJson;
import org.jeecgframework.core.util.ResourceUtil;
import org.jeecgframework.core.util.StringUtil;
import org.jeecgframework.web.system.service.SystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import weixin.cms.entity.CmsArticleEntity;
import weixin.cms.entity.CmsMemberEntity;
import weixin.cms.entity.CmsPhotoEntity;
import weixin.cms.entity.CmsRouteEntity;
import weixin.cms.service.CmsArticleServiceI;
import weixin.cms.service.CmsPhotoServiceI;
import weixin.cms.service.CmsRouteServiceI;
import weixin.cms.util.WeixinUserinfoUtils;

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
	    //readDetailContent(cmsArticle, request);
	    
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
    public AjaxJson detailcontent(CmsArticleEntity cmsArticle
    		, HttpServletRequest request, HttpServletResponse response) {
        AjaxJson j = new AjaxJson();
        //读取文章及头部图片, 行程信息, 放到request的attribute里
        readDetailContent(cmsArticle, request);
        //从request的attribute获取
        cmsArticle = (CmsArticleEntity)request.getAttribute("cmsArticle");
        //不是审核通过会员, 不提供会员价
        boolean isVip = Boolean.FALSE;
        try {
        	//
        	String openid = WeixinUserinfoUtils.getUserInfo(request);
        	if(null != openid) {
	    		CriteriaQuery cq = new CriteriaQuery(CmsMemberEntity.class);
	    		cq.add(Restrictions.eq("openid", openid));
	    		cq.add(Restrictions.eq("state", CmsMemberEntity.STATE_PASS));
	    		List<CmsMemberEntity> rows = systemService.getListByCriteriaQuery(cq, Boolean.FALSE);
	    		isVip = null != rows && !rows.isEmpty();
        	}
        } catch (Exception err) {
        	logger.error(err, err);
        }
        if(!isVip) {
        	cmsArticle.setPrice_vip(null);
        }
        //头部图片
        List<CmsPhotoEntity> photos = (List<CmsPhotoEntity>)request.getAttribute("cmsPhotos");
        cmsArticle.setPhotos(photos);
        //行程
        List<CmsRouteEntity> routes = (List<CmsRouteEntity>)request.getAttribute("cmsRoutes");
        cmsArticle.setRoutes(routes);
        
        j.setObj(cmsArticle);
        
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
        //readDetailContent(cmsArticle, request);
        
        return new ModelAndView("weixin_trip/cruise_detail");
    }
    /**
     * 读取文章, 头部图片, 线路
     * @param cmsArticle
     * @param request
     */
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
            //List<CmsRouteEntity> routes = cmsRouteService.getListByCriteriaQuery(cq, ispage)findByProperty(CmsRouteEntity.class, "articleId", articleId);
            List<CmsRouteEntity> routes = cmsRouteService.findHql("from CmsRouteEntity where articleId=? order by createDate", articleId);
            request.setAttribute("cmsRoutes", routes);
            //用餐安排字典
            cmsRouteService.trans_TSType(routes);
        }
        request.setAttribute("accountid", ResourceUtil.getWeiXinAccountId());
    }
}
