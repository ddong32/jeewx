package weixin.cms.controller;

import java.util.Collections;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.jeecgframework.core.common.controller.BaseController;
import org.jeecgframework.core.common.hibernate.qbc.CriteriaQuery;
import org.jeecgframework.core.common.model.json.AjaxJson;
import org.jeecgframework.core.common.model.json.DataGrid;
import org.jeecgframework.core.constant.Globals;
import org.jeecgframework.core.util.MyBeanUtils;
import org.jeecgframework.core.util.ResourceUtil;
import org.jeecgframework.core.util.StringUtil;
import org.jeecgframework.tag.core.easyui.TagUtil;
import org.jeecgframework.web.system.pojo.base.TSType;
import org.jeecgframework.web.system.pojo.base.TSTypegroup;
import org.jeecgframework.web.system.service.SystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import weixin.cms.entity.CmsPhotoEntity;
import weixin.cms.entity.CmsRouteEntity;
import weixin.cms.service.AdServiceI;
import weixin.cms.service.CmsPhotoServiceI;
import weixin.cms.service.CmsRouteServiceI;

/**
 * 线路头部图片
 *
 */
@Controller
@RequestMapping("/cmsRouteController")
public class CmsRouteController extends BaseController {
    /**
     * Logger for this class
     */
    private static final Logger logger = Logger.getLogger(CmsRouteController.class);

    @Autowired
    private CmsRouteServiceI service;
    @Autowired
    private SystemService systemService;

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
     * easyui AJAX请求数据
     * 
     * @param request
     * @param response
     * @param dataGrid
     * @param user
     */

    @RequestMapping(params = "datagrid")
    public void datagrid(CmsRouteEntity entity, HttpServletRequest request, HttpServletResponse response, DataGrid dataGrid) {
        CriteriaQuery cq = new CriteriaQuery(CmsRouteEntity.class, dataGrid);
        // cq.eq("accountid", ResourceUtil.getWeiXinAccountId());
        // 查询条件组装器
        if (StringUtils.isNotBlank(entity.getArticleId())) {
            org.jeecgframework.core.extend.hqlsearch.HqlGenerateUtil.installHql(cq, entity, request.getParameterMap());
            this.service.getDataGridReturn(cq, true);
            //
            service.trans_TSType(dataGrid.getResults());
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
    public AjaxJson del(CmsRouteEntity entity, HttpServletRequest request) {
        logger.debug(entity);

        AjaxJson j = new AjaxJson();
        entity = systemService.getEntity(CmsRouteEntity.class, entity.getId());
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

        CmsRouteEntity entity = systemService.getEntity(CmsRouteEntity.class, id);
        j.setObj(entity);

        service.trans_TSType(java.util.Arrays.asList(entity));

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
    public AjaxJson save(CmsRouteEntity entity, HttpServletRequest request) {
        logger.debug(entity);

        //
        String[] traffic_places = request.getParameterValues("traffic_place"), traffic_tools = request.getParameterValues("traffic_tool");
        int len;
        if (null != traffic_places && (len = traffic_places.length) > 0 && (null == traffic_tools || null != traffic_tools && len - 1 == traffic_tools.length)) {
            String traffic = traffic_places[0];
            for (int i = 1; i < len; i++) {
                String pla = traffic_places[i];
                if (StringUtils.isBlank(pla)) {
                    // 没有地点, 当作无效
                    continue;
                }
                traffic += ">" + traffic_tools[i - 1] + ":" + pla;
            }
            entity.setTraffic(traffic);
        }

        AjaxJson j = new AjaxJson();
        if (StringUtil.isNotEmpty(entity.getId())) {
            message = "更新成功";
            CmsRouteEntity t = service.get(CmsRouteEntity.class, entity.getId());
            try {
                MyBeanUtils.copyBeanNotNull2Bean(entity, t);
                service.saveOrUpdate(t);
                systemService.addLog(message, Globals.Log_Type_UPDATE, Globals.Log_Leavel_INFO);
            } catch (Exception e) {
                e.printStackTrace();
                message = "更新失败";
            }
        } else {
            message = "添加成功";
            service.save(entity);
            systemService.addLog(message, Globals.Log_Type_INSERT, Globals.Log_Leavel_INFO);
        }
        entity.setDetail(null);
        j.setObj(entity);

        // 保存图片
        String routePhotosId = request.getParameter("routePhotosId");
        if (StringUtils.isNotBlank(routePhotosId)) {
            String[] routePhotosIds = routePhotosId.split(",");
            for (String id : routePhotosIds) {
                CmsPhotoEntity photo = cmsPhotoServiceI.get(CmsPhotoEntity.class, id);
                photo.setRouteId(entity.getId());
                cmsPhotoServiceI.updateEntitie(photo);
            }
        }

        j.setMsg(message);
        return j;
    }

    /**
     * 添加页面
     * 
     * @return
     */
    @RequestMapping(params = "addorupdate")
    public ModelAndView addorupdate(CmsRouteEntity entity, HttpServletRequest req) {
        if (StringUtil.isNotEmpty(entity.getId())) {
            entity = service.getEntity(CmsRouteEntity.class, entity.getId());
            req.setAttribute("adPage", entity);
        }
        return new ModelAndView("weixin/cms/cmsPhoto");
    }

    /**
     * 读取交通工具数据字典
     * 
     * @param entity
     * @param req
     * @return
     */
    @RequestMapping(params = "readTrafficTools")
    @ResponseBody
    public AjaxJson readTrafficTools(HttpServletRequest req) {
        AjaxJson j = new AjaxJson();
        // 交通字典分组
        TSTypegroup tg = systemService.getTypeGroupByCode("traffic");
        if (null != tg) {
            List<TSType> ts = tg.getTSTypes();// systemService.findByProperty(TSType.class,
                                              // "TSTypegroup", tg);
            if (null != ts) {
                for (TSType t : ts) {
                    t.setTSTypegroup(null);
                }
            }
            j.setObj(ts);
        }

        return j;
    }

}
