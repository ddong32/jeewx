package weixin.cms.service.impl;

import java.util.List;
import java.util.Map;

import org.jeecgframework.core.common.service.impl.CommonServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import weixin.cms.dao.CmsPhotoDao;
import weixin.cms.dao.CmsRouteDao;
import weixin.cms.entity.CmsRouteEntity;
import weixin.cms.service.CmsPhotoServiceI;
import weixin.cms.service.CmsRouteServiceI;

@Service("cmsRouteService")
@Transactional
public class CmsRouteServiceImpl extends CommonServiceImpl implements CmsRouteServiceI {
	@Autowired
	private CmsRouteDao dao;

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
}