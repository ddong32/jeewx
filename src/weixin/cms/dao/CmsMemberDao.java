package weixin.cms.dao;

import java.util.List;

import org.jeecgframework.minidao.annotation.Arguments;
import org.jeecgframework.minidao.annotation.MiniDao;
import org.jeecgframework.minidao.annotation.ResultType;

import weixin.cms.entity.CmsMemberEntity;

@MiniDao
public interface CmsMemberDao {

	@Arguments( { "CmsMember"})
	@ResultType(CmsMemberEntity.class)
	public List<CmsMemberEntity> list(CmsMemberEntity entity);

	@Arguments( { "CmsMember", "page", "rows" })
	@ResultType(CmsMemberEntity.class)
	public List<CmsMemberEntity> list(CmsMemberEntity entity, int page, int rows);
}
