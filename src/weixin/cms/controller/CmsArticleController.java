package weixin.cms.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.jeecgframework.core.common.controller.BaseController;
import org.jeecgframework.core.common.hibernate.qbc.CriteriaQuery;
import org.jeecgframework.core.common.model.json.AjaxJson;
import org.jeecgframework.core.common.model.json.DataGrid;
import org.jeecgframework.core.constant.Globals;
import org.jeecgframework.core.util.MyBeanUtils;
import org.jeecgframework.core.util.ResourceUtil;
import org.jeecgframework.core.util.StringUtil;
import org.jeecgframework.p3.core.utils.common.StringUtils;
import org.jeecgframework.tag.core.easyui.TagUtil;
import org.jeecgframework.web.system.service.SystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import weixin.cms.entity.CmsArticleEntity;
import weixin.cms.entity.CmsMenuEntity;
import weixin.cms.entity.CmsPhotoEntity;
import weixin.cms.entity.CmsRouteEntity;
import weixin.cms.service.CmsArticleServiceI;
import weixin.cms.service.CmsPhotoServiceI;
import weixin.cms.service.CmsRouteServiceI;

/**   
 * @Title: Controller
 * @Description: 后台管理：文章
 * @author zhangdaihao
 * @date 2014-06-10i 20:07:00
 * @version V1.0   
 *
 */
@Controller
@RequestMapping("/cmsArticleController")
public class CmsArticleController extends BaseController {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(CmsArticleController.class);

	@Autowired
	private CmsArticleServiceI cmsArticleService;
	
	@Autowired
	private SystemService systemService;

	@Autowired
	private CmsRouteServiceI cmsRouteServiceI;
	
	@Autowired
	private CmsPhotoServiceI cmsPhotoServiceI;

	private String message;
	
	
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}


	/**
	 * 信息列表 页面跳转
	 * 
	 * @return
	 */
	@RequestMapping(params = "cmsArticle")
	public ModelAndView cmsArticle(HttpServletRequest request) {
		request.setAttribute("accountid", ResourceUtil.getWeiXinAccountId());
		return new ModelAndView("weixin/cms/cmsArticleList");
	}

	/**
	 * easyui AJAX请求数据
	 * 
	 * @param request
	 * @param response
	 * @param dataGrid
	 * @param user
	 */

	@RequestMapping(params = "datagrid")
	public void datagrid(CmsArticleEntity cmsArticle,HttpServletRequest request, HttpServletResponse response, DataGrid dataGrid) {
		CriteriaQuery cq = new CriteriaQuery(CmsArticleEntity.class, dataGrid);
		cq.eq("accountid", ResourceUtil.getWeiXinAccountId());
		//查询条件组装器
		org.jeecgframework.core.extend.hqlsearch.HqlGenerateUtil.installHql(cq, cmsArticle, request.getParameterMap());
		this.cmsArticleService.getDataGridReturn(cq, true);
		TagUtil.datagrid(response, dataGrid);
	}
	/**
	 * 用于微信端取数据，通过url参数获取accountid ，无需登录
	 * @param cmsArticle
	 * @param request
	 * @param response
	 * @param dataGrid
	 * @param accountid 微信公众帐号
	 */
	@RequestMapping(params = "datagridwx")
	public void datagridwx(CmsArticleEntity cmsArticle,HttpServletRequest request, HttpServletResponse response, DataGrid dataGrid) {
		CriteriaQuery cq = new CriteriaQuery(CmsArticleEntity.class, dataGrid);
		cq.eq("columnId", cmsArticle.getColumnId());
		//查询条件组装器
		org.jeecgframework.core.extend.hqlsearch.HqlGenerateUtil.installHql(cq, cmsArticle, request.getParameterMap());
		this.cmsArticleService.getDataGridReturn(cq, true);
		TagUtil.datagrid(response, dataGrid);
	}

	/**
	 * 删除信息
	 * 
	 * @return
	 */
	@RequestMapping(params = "del")
	@ResponseBody
	public AjaxJson del(CmsArticleEntity cmsArticle, HttpServletRequest request) {
		AjaxJson j = new AjaxJson();
		cmsArticle = systemService.getEntity(CmsArticleEntity.class, cmsArticle.getId());
		message = "信息删除成功";
		cmsArticleService.delete(cmsArticle);
		systemService.addLog(message, Globals.Log_Type_DEL, Globals.Log_Leavel_INFO);
		
		j.setMsg(message);
		return j;
	}


	/**
	 * 添加信息
	 * 
	 * @param ids
	 * @return
	 */
	@RequestMapping(params = "save")
	@ResponseBody
	public AjaxJson save(CmsArticleEntity cmsArticle, HttpServletRequest request) {
		AjaxJson j = new AjaxJson();
		String accountId = ResourceUtil.getWeiXinAccountId();
		if(StringUtil.isEmpty(accountId)||"-1".equals(accountId)){
			j.setSuccess(false);
			message = "请添加一个公众帐号。";
		}else{
			if (StringUtil.isNotEmpty(cmsArticle.getId())) {
				message = "信息更新成功";
				CmsArticleEntity t = cmsArticleService.get(CmsArticleEntity.class, cmsArticle.getId());
				try {
					MyBeanUtils.copyBeanNotNull2Bean(cmsArticle, t);
					cmsArticleService.saveOrUpdate(t);
					systemService.addLog(message, Globals.Log_Type_UPDATE, Globals.Log_Leavel_INFO);
				} catch (Exception e) {
					e.printStackTrace();
					message = "信息更新失败";
				}
			} else {
				message = "信息添加成功";
				cmsArticle.setAccountid(accountId);
				cmsArticleService.save(cmsArticle);
				systemService.addLog(message, Globals.Log_Type_INSERT, Globals.Log_Leavel_INFO);
			}
			//更新新增头部图片的关联
			String photosId = request.getParameter("photosId");
			if(StringUtils.isNotBlank(photosId)) {
				String[] photosIds = photosId.split(",");
				for(String id : photosIds) {
					CmsPhotoEntity photo = cmsPhotoServiceI.get(CmsPhotoEntity.class, id);
					photo.setArticleId(cmsArticle.getId());
					cmsPhotoServiceI.updateEntitie(photo);
				}
			}
			//更新新增行程的关联
			String routesId = request.getParameter("routesId");
			if(StringUtils.isNotBlank(routesId)) {
				String[] routesIds = routesId.split(",");
				for(String id : routesIds) {
					CmsRouteEntity route = cmsRouteServiceI.get(CmsRouteEntity.class, id);
					route.setArticleId(cmsArticle.getId());
					cmsRouteServiceI.updateEntitie(route);
				}
			}
		}
		j.setMsg(message);
		return j;
	}

	/**
	 * 信息列表页面跳转
	 * 
	 * @return
	 */
	@RequestMapping(params = "addorupdate")
	public ModelAndView addorupdate(CmsArticleEntity cmsArticle, HttpServletRequest req) {
		if (StringUtil.isNotEmpty(cmsArticle.getId())) {
			cmsArticle = cmsArticleService.getEntity(CmsArticleEntity.class, cmsArticle.getId());
			req.setAttribute("cmsArticlePage", cmsArticle);
		}
		req.setAttribute("accountid", ResourceUtil.getWeiXinAccountId());
		return new ModelAndView("weixin/cms/cmsArticle");
	}
	@RequestMapping(params = "addorupdate0")
	public ModelAndView addorupdate0(CmsArticleEntity cmsArticle, HttpServletRequest req) {

		return new ModelAndView("weixin/cms/cmsArticle180203");
	}
	
	/**
	 * 信息列表(前台) 页面跳转
	 * 
	 * @return
	 */
	@RequestMapping(params = "cmsArticleListShow")
	public ModelAndView cmsArticleListShow(HttpServletRequest request) {
		if (StringUtil.isNotEmpty(request.getParameter("columnId"))) {
			request.setAttribute("column", cmsArticleService.getEntity(CmsMenuEntity.class,request.getParameter("columnId")));
		}
		return new ModelAndView("weixin/cms/cmsArticleListShow");
	}

	/**
	 * 信息展示(前台) 页面跳转
	 * 
	 * @return
	 */
	@RequestMapping(params = "cmsArticleShow")
	public ModelAndView cmsArticleShow(HttpServletRequest request) {
		if (StringUtil.isNotEmpty(request.getParameter("articleId"))) {
			CmsArticleEntity cmsArticle = cmsArticleService.getEntity(CmsArticleEntity.class, request.getParameter("articleId"));
			request.setAttribute("cmsArticlePage", cmsArticle);
		}
		return new ModelAndView("weixin/cms/cmsArticleShow");
	}
}
