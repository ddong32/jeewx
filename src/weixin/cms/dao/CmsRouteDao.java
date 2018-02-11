package weixin.cms.dao;

import java.util.List;
import java.util.Map;

import org.jeecgframework.minidao.annotation.Arguments;
import org.jeecgframework.minidao.annotation.MiniDao;
import org.jeecgframework.minidao.annotation.ResultType;

import weixin.cms.entity.CmsRouteEntity;

@MiniDao
public interface CmsRouteDao {

	@Arguments( { "CmsRouteEntity"})
	@ResultType(CmsRouteEntity.class)
	public List<CmsRouteEntity> list(CmsRouteEntity entity);

	@Arguments( { "CmsRouteEntity", "page", "rows" })
	@ResultType(CmsRouteEntity.class)
	public List<CmsRouteEntity> list(CmsRouteEntity entity, int page, int rows);

	/*@Arguments( { "params"})
	@ResultType(CmsRouteEntity.class)
	public List<CmsRouteEntity> listByMap(Map params);

	@Arguments( { "params", "page", "rows" })
	@ResultType(CmsRouteEntity.class)
	public List<CmsRouteEntity> listByMap(Map params, int page, int rows);*/
	
}
