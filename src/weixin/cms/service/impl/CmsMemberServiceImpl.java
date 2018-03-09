package weixin.cms.service.impl;

import java.util.List;

import org.jeecgframework.core.common.service.impl.CommonServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import weixin.cms.dao.CmsMemberDao;
import weixin.cms.entity.CmsMemberEntity;
import weixin.cms.service.CmsMemberServiceI;

@Service("cmsMemberService")
@Transactional
public class CmsMemberServiceImpl extends CommonServiceImpl implements CmsMemberServiceI {
    @Autowired
    private CmsMemberDao dao;

	@Override
	public List<CmsMemberEntity> list(CmsMemberEntity entity) {
		return dao.list(entity);
	}

	@Override
	public List<CmsMemberEntity> list(CmsMemberEntity entity, int page, int rows) {
		return dao.list(entity);
	}
}