
package weixin.cms.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;

/**   
 * 线路行程 
 *
 */
@Entity
@Table(name = "weixin_cms_member", schema = "")
@DynamicUpdate(true)
@DynamicInsert(true)
@SuppressWarnings("serial")
public class CmsMemberEntity implements java.io.Serializable {
	/**主键*/
	private java.lang.String id;
	/**微信账号*/
	private java.lang.String openid;
	/**姓名*/
	private java.lang.String name;
	/**电话号码*/
	private java.lang.String tel;
	/**公司名称*/
	private java.lang.String corpName;
	/**账号状态*/
	private java.lang.String state;
	/**创建时间 审核时间*/
	private java.util.Date createDate, approvalDate;
	
	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  主键
	 */
	@Id
	@GeneratedValue(generator = "paymentableGenerator")
	@GenericGenerator(name = "paymentableGenerator", strategy = "uuid")
	@Column(name ="ID",nullable=false,length=36)
	public java.lang.String getId(){
		return this.id;
	}
	public void setId(java.lang.String id){
		this.id = id;
	}
	
	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  
	 */
	@Column(name ="OPENID",nullable=true)
	public java.lang.String getOpenid(){
		return this.openid;
	}
	public void setOpenid(java.lang.String openid){
		this.openid = openid;
	}
	
	/**
	 *方法: 取得java.util.Date
	 *@return: java.util.Date  创建日期
	 */
	@Column(name ="CREATE_DATE",nullable=true)
	public java.util.Date getCreateDate(){
		return this.createDate;
	}
	public void setCreateDate(java.util.Date createDate){
		this.createDate = createDate;
	}
	
	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  
	 */
	@Column(name ="NAME",nullable=true)
	public java.lang.String getName() {
		return name;
	}

	public void setName(java.lang.String name) {
		this.name = name;
	}

	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  
	 */
	@Column(name ="TEL",nullable=true)
	public java.lang.String getTel() {
		return tel;
	}
	public void setTel(java.lang.String tel) {
		this.tel = tel;
	}

	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  
	 */
	@Column(name ="CORP_NAME",nullable=true)
	public java.lang.String getCorpName() {
		return corpName;
	}

	public void setCorpName(java.lang.String corpName) {
		this.corpName = corpName;
	}

	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  
	 */
	@Column(name ="STATE",nullable=true)
	public java.lang.String getState() {
		return state;
	}
	public void setState(java.lang.String state) {
		this.state = state;
	}
	
	
	/**
	 *方法: 取得java.util.Date
	 *@return: java.util.Date  创建日期
	 */
	@Column(name ="APPROVAL_DATE",nullable=true)
	public java.util.Date getApprovalDate(){
		return this.approvalDate;
	}
	public void setApprovalDate(java.util.Date approvalDate){
		this.approvalDate = approvalDate;
	}
	
	/**
	 * 会员审核状态, 审核中, 通过, 不通过
	 */
	@Transient
	public static final String STATE_APPLY = "0", STATE_PASS = "1", STATE_REJECT = "-1";
}
