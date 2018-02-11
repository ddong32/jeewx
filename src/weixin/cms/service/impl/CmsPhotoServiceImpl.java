package weixin.cms.service.impl;

import java.util.List;
import java.util.Map;

import org.jeecgframework.core.common.service.impl.CommonServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import weixin.cms.dao.CmsPhotoDao;
import weixin.cms.entity.CmsPhotoEntity;
import weixin.cms.service.CmsPhotoServiceI;

@Service("cmsPhotoService")
@Transactional
public class CmsPhotoServiceImpl extends CommonServiceImpl implements CmsPhotoServiceI {
	@Autowired
	private CmsPhotoDao dao;

	/*@Override
	public List<CmsPhotoEntity> list(Map params, int page, int rows) {
		return cmsAdDao.listByMap(params, page, rows);
	}

	@Override
	public List<CmsPhotoEntity> list(Map params) {
		return cmsAdDao.listByMap(params);
	}*/

	@Override
	public List<CmsPhotoEntity> list(CmsPhotoEntity entity) {
		return dao.list(entity);
	}

	@Override
	public List<CmsPhotoEntity> list(CmsPhotoEntity entity, int page, int rows) {
		// TODO Auto-generated method stub
		return dao.list(entity);
	}
}