package org.jeecgframework.web.system.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.jeecgframework.core.common.hibernate.qbc.CriteriaQuery;
import org.jeecgframework.core.common.service.impl.CommonServiceImpl;
import org.jeecgframework.core.constant.Globals;
import org.jeecgframework.core.util.BrowserUtils;
import org.jeecgframework.core.util.ContextHolderUtils;
import org.jeecgframework.core.util.DataUtils;
import org.jeecgframework.core.util.ResourceUtil;
import org.jeecgframework.core.util.StringUtil;
import org.jeecgframework.core.util.oConvertUtils;
import org.jeecgframework.web.system.dao.JeecgDictDao;
import org.jeecgframework.web.system.pojo.base.DictEntity;
import org.jeecgframework.web.system.pojo.base.TSFunction;
import org.jeecgframework.web.system.pojo.base.TSIcon;
import org.jeecgframework.web.system.pojo.base.TSLog;
import org.jeecgframework.web.system.pojo.base.TSOperation;
import org.jeecgframework.web.system.pojo.base.TSRole;
import org.jeecgframework.web.system.pojo.base.TSRoleFunction;
import org.jeecgframework.web.system.pojo.base.TSRoleUser;
import org.jeecgframework.web.system.pojo.base.TSType;
import org.jeecgframework.web.system.pojo.base.TSTypegroup;
import org.jeecgframework.web.system.pojo.base.TSUser;
import org.jeecgframework.web.system.service.SystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("systemService")
@Transactional
public class SystemServiceImpl extends CommonServiceImpl implements SystemService {
	@Autowired
	private JeecgDictDao jeecgDictDao;
	
	public TSUser checkUserExits(TSUser user) throws Exception {
		return this.commonDao.getUserByUserIdAndUserNameExits(user);
	}
	
	public List<DictEntity> queryDict(String dicTable, String dicCode,String dicText){
		List<DictEntity> dictList = null;
		//step.1 如果没有字典表则使用系统字典表
		if(StringUtil.isEmpty(dicTable)){
			dictList = jeecgDictDao.querySystemDict(dicCode);
		}else {
			dicText = StringUtil.isEmpty(dicText, dicCode);
			dictList = jeecgDictDao.queryCustomDict(dicTable, dicCode, dicText);
		}
		return dictList;
	}

	/**
	 * 添加日志
	 */
	public void addLog(String logcontent, Short loglevel, Short operatetype) {
		HttpServletRequest request = ContextHolderUtils.getRequest();
		String broswer = BrowserUtils.checkBrowse(request);
		TSLog log = new TSLog();
		log.setLogcontent(logcontent);
		log.setLoglevel(loglevel);
		log.setOperatetype(operatetype);
		log.setNote(oConvertUtils.getIp());
		log.setBroswer(broswer);
		log.setOperatetime(DataUtils.gettimestamp());
	    /* end dangzhenghui 201703016TASK #1784 【online bug】Online 表单保存的时候，报错*/
		//      log.setTSUser(ResourceUtil.getSessionUser());
        /*start chenqian 201708031TASK #2317 【改造】系统日志表，增加两个字段，避免关联查询 [操作人账号] [操作人名字]*/
	    TSUser u = ResourceUtil.getSessionUserName();
        if(u!=null){
            log.setUserid(u.getId());
            log.setUsername(u.getUserName());
            log.setRealname(u.getRealName());
        }
		
		commonDao.save(log);
	}

	/**
	 * 根据类型编码和类型名称获取Type,如果为空则创建一个
	 * 
	 * @param typecode
	 * @param typename
	 * @return
	 */
	public TSType getType(String typecode, String typename, TSTypegroup tsTypegroup) {
		TSType actType = commonDao.findUniqueByProperty(TSType.class, "typecode", typecode);
		if (actType == null) {
			actType = new TSType();
			actType.setTypecode(typecode);
			actType.setTypename(typename);
			actType.setTSTypegroup(tsTypegroup);
			commonDao.save(actType);
		}
		return actType;

	}

	/**
	 * 根据类型分组编码和名称获取TypeGroup,如果为空则创建一个
	 * 
	 * @param typecode
	 * @param typename
	 * @return
	 */
	public TSTypegroup getTypeGroup(String typegroupcode, String typgroupename) {
		TSTypegroup tsTypegroup = commonDao.findUniqueByProperty(TSTypegroup.class, "typegroupcode", typegroupcode);
		if (tsTypegroup == null) {
			tsTypegroup = new TSTypegroup();
			tsTypegroup.setTypegroupcode(typegroupcode);
			tsTypegroup.setTypegroupname(typgroupename);
			commonDao.save(tsTypegroup);
		}
		return tsTypegroup;
	}

	
	public TSTypegroup getTypeGroupByCode(String typegroupCode) {
		TSTypegroup tsTypegroup = commonDao.findUniqueByProperty(TSTypegroup.class, "typegroupcode", typegroupCode);
		return tsTypegroup;
	}

	
    public void initAllTypeGroups() {
        List<TSTypegroup> typeGroups = this.commonDao.loadAll(TSTypegroup.class);
        for (TSTypegroup tsTypegroup : typeGroups) {
            ResourceUtil.allTypeGroups.put(tsTypegroup.getTypegroupcode().toLowerCase(), tsTypegroup);
            List<TSType> types = this.commonDao.findByProperty(TSType.class, "TSTypegroup.id", tsTypegroup.getId());
            ResourceUtil.allTypes.put(tsTypegroup.getTypegroupcode().toLowerCase(), types);
        }
    }

    public void refleshTypesCach(TSType type) {
        TSTypegroup tsTypegroup = type.getTSTypegroup();
        TSTypegroup typeGroupEntity = this.commonDao.get(TSTypegroup.class, tsTypegroup.getId());
        List<TSType> types = this.commonDao.findByProperty(TSType.class, "TSTypegroup.id", tsTypegroup.getId());
        ResourceUtil.allTypes.put(typeGroupEntity.getTypegroupcode().toLowerCase(), types);
    }

    public void refleshTypeGroupCach() {
        ResourceUtil.allTypeGroups.clear();
        List<TSTypegroup> typeGroups = this.commonDao.loadAll(TSTypegroup.class);
        for (TSTypegroup tsTypegroup : typeGroups) {
            ResourceUtil.allTypeGroups.put(tsTypegroup.getTypegroupcode().toLowerCase(), tsTypegroup);
        }
    }
	
	public Set<String> getOperationCodesByRoleIdAndFunctionId(String roleId, String functionId) {
		Set<String> operationCodes = new HashSet<String>();
		TSRole role = commonDao.get(TSRole.class, roleId);
		CriteriaQuery cq1 = new CriteriaQuery(TSRoleFunction.class);
		cq1.eq("TSRole.id", role.getId());
		cq1.eq("TSFunction.id", functionId);
		cq1.add();
		List<TSRoleFunction> rFunctions = getListByCriteriaQuery(cq1, false);
		if (null != rFunctions && rFunctions.size() > 0) {
			TSRoleFunction tsRoleFunction = rFunctions.get(0);
			if (null != tsRoleFunction.getOperation()) {
				String[] operationArry = tsRoleFunction.getOperation().split(",");
				for (int i = 0; i < operationArry.length; i++) {
					operationCodes.add(operationArry[i]);
				}
			}
		}
		return operationCodes;
	}

	
	public Set<String> getOperationCodesByUserIdAndFunctionId(String userId, String functionId) {
		Set<String> operationCodes = new HashSet<String>();
		List<TSRoleUser> rUsers = findByProperty(TSRoleUser.class, "TSUser.id", userId);
		for (TSRoleUser ru : rUsers) {
			TSRole role = ru.getTSRole();
			CriteriaQuery cq1 = new CriteriaQuery(TSRoleFunction.class);
			cq1.eq("TSRole.id", role.getId());
			cq1.eq("TSFunction.id", functionId);
			cq1.add();
			List<TSRoleFunction> rFunctions = getListByCriteriaQuery(cq1, false);
			if (null != rFunctions && rFunctions.size() > 0) {
				TSRoleFunction tsRoleFunction = rFunctions.get(0);
				if (null != tsRoleFunction.getOperation()) {
					String[] operationArry = tsRoleFunction.getOperation().split(",");
					for (int i = 0; i < operationArry.length; i++) {
						operationCodes.add(operationArry[i]);
					}
				}
			}
		}
		return operationCodes;
	}
	
	public void flushRoleFunciton(String id, TSFunction newFunction) {
		TSFunction functionEntity = this.getEntity(TSFunction.class, id);
		if (functionEntity.getTSIcon() == null || !StringUtil.isNotEmpty(functionEntity.getTSIcon().getId())) {
			return;
		}
		TSIcon oldIcon = this.getEntity(TSIcon.class, functionEntity.getTSIcon().getId());
		if (!oldIcon.getIconClas().equals(newFunction.getTSIcon().getIconClas())) {
			// 刷新缓存
			HttpSession session = ContextHolderUtils.getSession();
			TSUser user = ResourceUtil.getSessionUserName();
			List<TSRoleUser> rUsers = this.findByProperty(TSRoleUser.class, "TSUser.id", user.getId());
			for (TSRoleUser ru : rUsers) {
				TSRole role = ru.getTSRole();
				session.removeAttribute(role.getId());
			}
		}
	}

   public Set<String> getOperationCodesByRoleIdAndruleDataId(String roleId, String functionId) {
        Set<String> operationCodes = new HashSet<String>();
        TSRole role = commonDao.get(TSRole.class, roleId);
        CriteriaQuery cq1 = new CriteriaQuery(TSRoleFunction.class);
        cq1.eq("TSRole.id", role.getId());
        cq1.eq("TSFunction.id", functionId);
        cq1.add();
        List<TSRoleFunction> rFunctions = getListByCriteriaQuery(cq1, false);
        if (null != rFunctions && rFunctions.size() > 0) {
            TSRoleFunction tsRoleFunction = rFunctions.get(0);
            if (null != tsRoleFunction.getDataRule()) {
                String[] operationArry = tsRoleFunction.getDataRule().split(",");
                for (int i = 0; i < operationArry.length; i++) {
                    operationCodes.add(operationArry[i]);
                }
            }
        }
        return operationCodes;
    }
	
	/**
     * 加载所有图标
     * @return
     */
    public  void initAllTSIcons() {
        List<TSIcon> list = this.loadAll(TSIcon.class);
        for (TSIcon tsIcon : list) {
            ResourceUtil.allTSIcons.put(tsIcon.getId(), tsIcon);
        }
    }
    /**
     * 更新图标
     * @param icon
     */
    public  void upTSIcons(TSIcon icon) {
        ResourceUtil.allTSIcons.put(icon.getId(), icon);
    }
    /**
     * 更新图标
     * @param icon
     */
    public  void delTSIcons(TSIcon icon) {
        ResourceUtil.allTSIcons.remove(icon.getId());
    }
    
    /**
     * 获取页面控件权限控制的
     * JS片段
     * @param out
     */
    public String getAuthFilterJS() {
        StringBuilder out = new StringBuilder();
        out.append("<script type=\"text/javascript\">");
        out.append("$(document).ready(function(){");
        if(ResourceUtil.getSessionUserName().getUserName().equals("admin")|| !Globals.BUTTON_AUTHORITY_CHECK){
            return "";
        }else{
            HttpServletRequest request = ContextHolderUtils.getRequest();
            Set<String> operationCodes = (Set<String>) request.getAttribute(Globals.OPERATIONCODES);
            if (null!=operationCodes) {
                for (String MyoperationCode : operationCodes) {
                    if (oConvertUtils.isEmpty(MyoperationCode))
                        break;
                    TSOperation operation = this.getEntity(TSOperation.class, MyoperationCode);
                    if (operation.getOperationcode().startsWith(".") || operation.getOperationcode().startsWith("#")){
                        if (operation.getOperationType().intValue()==Globals.OPERATION_TYPE_HIDE){
                            //out.append("$(\""+name+"\").find(\"#"+operation.getOperationcode().replaceAll(" ", "")+"\").hide();");
                            out.append("$(\""+operation.getOperationcode().replaceAll(" ", "")+"\").hide();");
                        }else {
                            //out.append("$(\""+name+"\").find(\"#"+operation.getOperationcode().replaceAll(" ", "")+"\").find(\":input\").attr(\"disabled\",\"disabled\");");
                            out.append("$(\""+operation.getOperationcode().replaceAll(" ", "")+"\").attr(\"disabled\",\"disabled\");");
                            out.append("$(\""+operation.getOperationcode().replaceAll(" ", "")+"\").find(\":input\").attr(\"disabled\",\"disabled\");");
                        }
                    }
                }
            }else{
                return "";
            }
            
        }
        out.append("});");
        out.append("</script>");
        return out.toString();
    }
}
