package weixin.cms.controller;
import java.util.Collections;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.jeecgframework.core.common.controller.BaseController;
import org.jeecgframework.core.common.hibernate.qbc.CriteriaQuery;
import org.jeecgframework.core.common.model.common.UploadFile;
import org.jeecgframework.core.common.model.json.AjaxJson;
import org.jeecgframework.core.common.model.json.DataGrid;
import org.jeecgframework.core.constant.Globals;
import org.jeecgframework.core.util.StringUtil;
import org.jeecgframework.core.util.oConvertUtils;
import org.jeecgframework.tag.core.easyui.TagUtil;
import org.jeecgframework.web.system.service.SystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import weixin.cms.entity.CmsPhotoEntity;
import weixin.cms.service.CmsPhotoServiceI;
import weixin.util.DateUtils;

/**   
 * 线路头部图片  
 *
 */
@Controller
@RequestMapping("/cmsPhotoController")
public class CmsPhotoController extends BaseController {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(CmsPhotoController.class);

	@Autowired
	private CmsPhotoServiceI service;
	@Autowired
	private SystemService systemService;

	private String message;
	
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
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
	public void datagrid(CmsPhotoEntity entity
			, HttpServletRequest request, HttpServletResponse response
			, DataGrid dataGrid) {
		CriteriaQuery cq = new CriteriaQuery(CmsPhotoEntity.class, dataGrid);
		//cq.eq("accountid", ResourceUtil.getWeiXinAccountId());
		//查询条件组装器
		if(StringUtils.isNotBlank(entity.getArticleId())) {
			org.jeecgframework.core.extend.hqlsearch.HqlGenerateUtil.installHql(cq, entity, request.getParameterMap());
			this.service.getDataGridReturn(cq, true);
		} else {
			dataGrid.setResults(Collections.emptyList());
		}
		TagUtil.datagrid(response, dataGrid);
	}

	/**
	 * 删除
	 * 
	 * @return
	 */
	@RequestMapping(params = "del")
	@ResponseBody
	public AjaxJson del(CmsPhotoEntity entity, HttpServletRequest request) {
		logger.debug(entity);

		AjaxJson j = new AjaxJson();
		entity = systemService.getEntity(CmsPhotoEntity.class, entity.getId());
		message = "删除成功";
		service.delete(entity);
		systemService.addLog(message, Globals.Log_Type_DEL, Globals.Log_Leavel_INFO);
		
		j.setMsg(message);
		return j;
	}


	/**
	 * 添加
	 * 
	 * @param ids
	 * @return
	 */
	@RequestMapping(params = "save")
	@ResponseBody
	public AjaxJson save(MultipartHttpServletRequest request) {
		AjaxJson j = new AjaxJson();
    	
		CmsPhotoEntity entity = new CmsPhotoEntity();
		entity.setCreatedate(DateUtils.gettimestamp());
		
		UploadFile uploadFile = new UploadFile(request, entity);
		//上传路径
		uploadFile.setCusPath("files");
		//上传并保存
		entity = systemService.uploadFile(uploadFile);
		
		j.setObj(entity);

		return j;
	}

	/**
	 * 添加页面
	 * 
	 * @return
	 */
	@RequestMapping(params = "addorupdate")
	public ModelAndView addorupdate(CmsPhotoEntity entity, HttpServletRequest req) {
		if (StringUtil.isNotEmpty(entity.getId())) {
			entity = service.getEntity(CmsPhotoEntity.class, entity.getId());
			req.setAttribute("adPage", entity);
		}
		return new ModelAndView("weixin/cms/cmsPhoto");
	}

	/**
	 * 附件预览读取
	 * 
	 * @return
	 */
	@RequestMapping(params = "view")
	public void view(HttpServletRequest request, HttpServletResponse response) {
		String fileid =oConvertUtils.getString(request.getParameter("fileid"));
		try {
			String clazzName = CmsPhotoEntity.class.getName();
			String imgSrc = "/commonController.do?viewFile&subclassname=" + clazzName + "&fileid=" + fileid;
			request.getRequestDispatcher(imgSrc).forward(request, response);
		} catch (Exception err) {
			logger.error(err, err);
		}
	}
}
