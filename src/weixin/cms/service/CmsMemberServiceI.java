package weixin.cms.service;

import java.util.List;

import org.jeecgframework.core.common.service.CommonService;

import weixin.cms.entity.CmsMemberEntity;

public interface CmsMemberServiceI extends CommonService {

	public List<CmsMemberEntity> list(CmsMemberEntity entity);

	public List<CmsMemberEntity> list(CmsMemberEntity entity, int page, int rows);
}
