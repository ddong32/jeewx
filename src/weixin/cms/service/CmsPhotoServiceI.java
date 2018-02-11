package weixin.cms.service;

import java.util.List;
import java.util.Map;

import org.jeecgframework.core.common.service.CommonService;

import weixin.cms.entity.CmsPhotoEntity;

public interface CmsPhotoServiceI extends CommonService {

	public List<CmsPhotoEntity> list(CmsPhotoEntity entity);

	public List<CmsPhotoEntity> list(CmsPhotoEntity entity, int page, int rows);

	/*public List<CmsPhotoEntity> list(Map params, int page, int rows);

	public List<CmsPhotoEntity> list(Map params);*/

}
