package weixin.cms.service;

import java.util.List;
import java.util.Map;

import org.jeecgframework.core.common.service.CommonService;

import weixin.cms.entity.CmsRouteEntity;

public interface CmsRouteServiceI extends CommonService {

	public List<CmsRouteEntity> list(CmsRouteEntity entity);

	public List<CmsRouteEntity> list(CmsRouteEntity entity, int page, int rows);

	/*public List<CmsRouteEntity> list(Map params, int page, int rows);

	public List<CmsRouteEntity> list(Map params);*/

}
