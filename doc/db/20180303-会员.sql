#会员信息
#drop table WEIXIN_CMS_MEMBER
create table WEIXIN_CMS_MEMBER(
  `id` varchar(100) NOT NULL COMMENT 'Id',
	`openid` varchar(100) not null comment '微信openid',
  `name` varchar(200) DEFAULT NULL COMMENT '姓名',
  `tel` varchar(100) DEFAULT NULL COMMENT '电话号码',
  `corp_name` varchar(50) DEFAULT NULL COMMENT '公司名称',
  `state` varchar(4) DEFAULT NULL COMMENT '审核状态, ',
  `create_date` datetime DEFAULT NULL COMMENT '更新日期',
  `approval_date` datetime DEFAULT NULL COMMENT '审核日期',
  PRIMARY KEY (`id`)
  
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

#字典-会员状态
INSERT INTO `t_s_typegroup`(`ID`, `typegroupcode`, `typegroupname`)
 VALUES ('4028ab3d61ea89b40161eaaf4cd70006', 'memberstat', '会员账号状态');

INSERT INTO `t_s_type`(`ID`, `typecode`, `typename`, `typepid`, `typegroupid`)
 VALUES ('4028ab3d61ea89b40161eaafe0630008', '0', '审核中', NULL, '4028ab3d61ea89b40161eaaf4cd70006');
INSERT INTO `t_s_type`(`ID`, `typecode`, `typename`, `typepid`, `typegroupid`)
 VALUES ('4028ab3d61ea89b40161eab01f73000a', '1', '通过', NULL, '4028ab3d61ea89b40161eaaf4cd70006');
INSERT INTO `t_s_type`(`ID`, `typecode`, `typename`, `typepid`, `typegroupid`)
 VALUES ('4028ab3d61ea89b40161eab0ce7c000c', '-1', '不通过', NULL, '4028ab3d61ea89b40161eaaf4cd70006');

#字典-公众号配置
INSERT INTO `t_s_typegroup`(`ID`, `typegroupcode`, `typegroupname`)
 VALUES ('4028ab3d61ea89b40161eaaf4cd70026', 'weixinmp', '公众号配置');

INSERT INTO `t_s_type`(`ID`, `typecode`, `typename`, `typepid`, `typegroupid`)
 VALUES ('4028ab3d61ea89b40161eaafe0630028', 'trip_appid', 'gh_bbc000000000', null, '4028ab3d61ea89b40161eaaf4cd70026');


#会员管理菜单
#select * from t_s_function where functionname='微信网站'
INSERT INTO `t_s_function` (`ID`, `functioniframe`, `functionlevel`, `functionname`, `functionorder`, `functionurl`, `parentfunctionid`, `iconid`, `desk_iconid`)
 select '297e7eb6469a4a8901469a54eff60116', NULL, '2', '会员管理', '6', 'cmsMemberController.do?list', (select id from t_s_function where functionname='微信网站' limit 0,1), '4028d881436d514601436d5214b30002', NULL

#管理员权限
INSERT INTO `t_s_role_function` (`ID`, `operation`, `functionid`, `roleid`)
 VALUES ('4028ef8156b0d8e00156b0dcdd720121', NULL, '297e7eb6469a4a8901469a54eff60116', (select id from t_s_role where rolecode='admin' limit 0,1));


