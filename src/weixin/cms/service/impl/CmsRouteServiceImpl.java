package weixin.cms.service.impl;

import java.util.List;
import org.jeecgframework.core.common.dao.impl.CommonDao;
import org.jeecgframework.core.common.service.impl.CommonServiceImpl;
import org.jeecgframework.web.system.pojo.base.TSType;
import org.jeecgframework.web.system.pojo.base.TSTypegroup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import weixin.cms.dao.CmsRouteDao;
import weixin.cms.entity.CmsRouteEntity;
import weixin.cms.service.CmsRouteServiceI;

@Service("cmsRouteService")
@Transactional
public class CmsRouteServiceImpl extends CommonServiceImpl implements CmsRouteServiceI {
    @Autowired
    private CmsRouteDao dao;
    
    @Autowired
    private CommonDao commonDao;

	/*@Override
	public List<CmsRouteEntity> list(Map params, int page, int rows) {
		return cmsAdDao.listByMap(params, page, rows);
	}

	@Override
	public List<CmsRouteEntity> list(Map params) {
		return cmsAdDao.listByMap(params);
	}*/

	@Override
	public List<CmsRouteEntity> list(CmsRouteEntity entity) {
		return dao.list(entity);
	}

	@Override
	public List<CmsRouteEntity> list(CmsRouteEntity entity, int page, int rows) {
		// TODO Auto-generated method stub
		return dao.list(entity);
	}
	/**
	 * 字典值转换
	 * @param routes
	 */
	public void trans_TSType(List<CmsRouteEntity> routes) {
        if(null != routes && !routes.isEmpty()) {
            TSTypegroup tg = (TSTypegroup)commonDao.findUniqueByProperty(TSTypegroup.class, "typegroupcode", "ycap");
            List<TSType> ts = tg.getTSTypes();
            if(null != ts) {
                for(CmsRouteEntity route : routes) {
                    for(TSType t : ts) {
                        final String c = t.getTypecode(), n = t.getTypename();
                        route.setBreakfastLabel(c.equals(route.getBreakfast())? n : route.getBreakfastLabel());
                        route.setLunchLabel(c.equals(route.getLunch())? n : route.getLunchLabel());
                        route.setDinnerLabel(c.equals(route.getDinner())? n : route.getDinnerLabel());
                    }
                }
            }
        }
	}
}