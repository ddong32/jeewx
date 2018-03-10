package weixin.cms.controller;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.criterion.Restrictions;
import org.jeecgframework.core.common.controller.BaseController;
import org.jeecgframework.core.common.hibernate.qbc.CriteriaQuery;
import org.jeecgframework.core.common.model.json.AjaxJson;
import org.jeecgframework.core.common.model.json.DataGrid;
import org.jeecgframework.core.constant.Globals;
import org.jeecgframework.core.util.ResourceUtil;
import org.jeecgframework.tag.core.easyui.TagUtil;
import org.jeecgframework.tag.vo.datatable.SortDirection;
import org.jeecgframework.web.system.pojo.base.TSType;
import org.jeecgframework.web.system.pojo.base.TSTypegroup;
import org.jeecgframework.web.system.service.SystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import weixin.cms.entity.CmsMemberEntity;
import weixin.cms.service.CmsMemberServiceI;
import weixin.cms.util.WeixinUserinfoUtils;

/**   
 * 会员管理
 *
 */
@Controller
@RequestMapping("/cmsMemberController")
public class CmsMemberController extends BaseController {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(CmsMemberController.class);

	@Autowired
	private CmsMemberServiceI service;
	
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
	 * 信息列表 页面跳转
	 * 
	 * @return
	 */
	@RequestMapping(params = "list")
	public ModelAndView list(HttpServletRequest request) {
		return new ModelAndView("weixin/cms/cmsMemberList");
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
	public void datagrid(CmsMemberEntity entity
			, HttpServletRequest request, HttpServletResponse response
			, DataGrid dataGrid) {
		CriteriaQuery cq = new CriteriaQuery(CmsMemberEntity.class, dataGrid);
		//cq.eq("accountid", ResourceUtil.getWeiXinAccountId());
		//查询条件组装器
		org.jeecgframework.core.extend.hqlsearch.HqlGenerateUtil.installHql(cq, entity, request.getParameterMap());
		this.service.getDataGridReturn(cq, true);
		//
		List<?> rows = dataGrid.getResults();
		if(null != rows) {
            TSTypegroup tg = (TSTypegroup)systemService.findUniqueByProperty(TSTypegroup.class, "typegroupcode", "memberstat");
            List<TSType> ts = tg.getTSTypes();
            if(null != ts) {
                for(Object r : rows) {
                	CmsMemberEntity row = (CmsMemberEntity)r;
                    for(TSType t : ts) {
                        final String c = t.getTypecode(), n = t.getTypename();
                        row.setState(c.equals(row.getState())? n : row.getState());
                    }
                }
            }
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
	public AjaxJson del(CmsMemberEntity entity, HttpServletRequest request) {
		logger.debug(entity);

		AjaxJson j = new AjaxJson();
		entity = systemService.getEntity(CmsMemberEntity.class, entity.getId());
		message = "删除成功";
		service.delete(entity);
		systemService.addLog(message, Globals.Log_Type_DEL, Globals.Log_Leavel_INFO);
		
		j.setMsg(message);
		return j;
	}

	/**
	 * 读取指定id记录
	 * 
	 * @return
	 */
	@RequestMapping(params = "get")
	@ResponseBody
	public AjaxJson get(String id, HttpServletRequest request) {
		AjaxJson j = new AjaxJson();
		
		CmsMemberEntity entity = systemService.getEntity(CmsMemberEntity.class, id);
		j.setObj(entity);
		
		return j;
	}

	/**
	 * 读取当前微信会员信息
	 * @see weixin.cms.controller.WeixinUserinfoController
	 * @return
	 */
	@RequestMapping(params = "getCurrent")
	@ResponseBody
	public AjaxJson getCurrent(String id, HttpServletRequest request) {
		AjaxJson j = new AjaxJson();
		
		String openid = ResourceUtil.getUserOpenId();//WeixinUserinfoUtils.getUserInfo(request);
		
		/*
		 * 是否存在审批中或已通过的, 存在则返回
		 */
		CriteriaQuery cq = new CriteriaQuery(CmsMemberEntity.class);
		cq.add(Restrictions.eq("openid", openid));
		cq.addOrder("createDate", SortDirection.desc);
		List<CmsMemberEntity> rows = service.getListByCriteriaQuery(cq, Boolean.FALSE);
		if(null != rows && !rows.isEmpty()) {
			j.setObj(rows.get(0));
		}
		
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
	public AjaxJson save(CmsMemberEntity entity, String imageCode
	        , HttpServletRequest request) {
		logger.debug(entity);
		
		AjaxJson j = new AjaxJson();
		
		HttpSession session = request.getSession();
		if(null == imageCode || !imageCode.equalsIgnoreCase((String)session.getAttribute("randCode"))) {
			j.setSuccess(Boolean.FALSE);
			j.setMsg("验证码错误！");
			return j;
			
		}
		
		String openid = ResourceUtil.getUserOpenId();//WeixinUserinfoUtils.getUserInfo(request);
		if(null == openid) {
			j.setSuccess(Boolean.FALSE);
			j.setMsg("获取微信号失败,请确认是在微信打开网页进行注册.");
			return j;
		}
		/*
		 * 是否存在审批中或已通过的, 存在则返回
		 */
		CriteriaQuery cq = new CriteriaQuery(CmsMemberEntity.class);
		cq.add(Restrictions.eq("openid", openid));
		cq.add(Restrictions.in("state", new Object[] {CmsMemberEntity.STATE_APPLY, CmsMemberEntity.STATE_PASS}));//审批中或已通过的
		List<?> rows = service.getListByCriteriaQuery(cq, Boolean.FALSE);
		if(null != rows && !rows.isEmpty()) {
			j.setSuccess(Boolean.FALSE);
			j.setMsg("您的注册正在审核中或已审核通过.");
			return j;
		}
		
		entity.setOpenid(openid);
		entity.setCreateDate(new Date());
		entity.setState("0");
		service.save(entity);
		
		systemService.addLog("提交成功", Globals.Log_Type_INSERT, Globals.Log_Leavel_INFO);
		
		return j;
	}

	/**
	 * 注册
	 * 
	 * @return
	 */
	@RequestMapping(params = "signup")
	public ModelAndView signup(CmsMemberEntity entity, HttpServletRequest req, HttpServletResponse res) {

		return new ModelAndView("weixin_trip/signup");
	}
	/**
	 * 审核
	 * @param ids 审核的记录id, 多条逗号间隔
	 * @param state 审核的结果, '1'-通过, '-1'-不通过
	 * @param request
	 * @return
	 */
	@RequestMapping(params = "approval")
	@ResponseBody
	public AjaxJson approval(String[] ids, String state, HttpServletRequest request) {
		
		AjaxJson j = new AjaxJson();
		
		if(null != ids && ids.length > 0) {
		    //查询注册的记录
			CriteriaQuery cq = new CriteriaQuery(CmsMemberEntity.class);
			cq.add(Restrictions.eq("state", CmsMemberEntity.STATE_APPLY));
			cq.add(Restrictions.in("id", ids));
			List<CmsMemberEntity> rows = service.getListByCriteriaQuery(cq, Boolean.FALSE);
			if(null != rows && !rows.isEmpty()) {
				Date now = new Date();
				for(CmsMemberEntity row : rows) {
				    //更新状态和审核时间
					row.setState(state);
					row.setApprovalDate(now);
				}
				service.batchSave(rows);
			}
		}
		
		j.setSuccess(Boolean.FALSE);
		j.setMsg("审核完成.");
		
		return j;
	}
}
