package weixin.cms.dao;

import java.util.List;
import java.util.Map;

import org.jeecgframework.minidao.annotation.Arguments;
import org.jeecgframework.minidao.annotation.MiniDao;
import org.jeecgframework.minidao.annotation.ResultType;

import weixin.cms.entity.CmsPhotoEntity;

@MiniDao
public interface CmsPhotoDao {

	@Arguments( { "CmsPhotoEntity"})
	@ResultType(CmsPhotoEntity.class)
	public List<CmsPhotoEntity> list(CmsPhotoEntity entity);

	@Arguments( { "CmsPhotoEntity", "page", "rows" })
	@ResultType(CmsPhotoEntity.class)
	public List<CmsPhotoEntity> list(CmsPhotoEntity entity, int page, int rows);

	/*@Arguments( { "params"})
	@ResultType(CmsPhotoEntity.class)
	public List<CmsPhotoEntity> listByMap(Map params);

	@Arguments( { "params", "page", "rows" })
	@ResultType(CmsPhotoEntity.class)
	public List<CmsPhotoEntity> listByMap(Map params, int page, int rows);*/
	
}
