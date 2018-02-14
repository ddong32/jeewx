package weixin.cms.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.jeecgframework.web.system.pojo.base.TSAttachment;

/**   
 * 线路头部图片   
 *
 */
@Entity
@Table(name = "weixin_cms_photo", schema = "")
@DynamicUpdate(true)
@DynamicInsert(true)
@SuppressWarnings("serial")
public class CmsPhotoEntity extends TSAttachment implements java.io.Serializable {
	/**主键*/
	private java.lang.String articleId, routeId;
	
	private Date createDate;

	@Column(name = "article_id")
	public java.lang.String getArticleId() {
		return articleId;
	}

	public void setArticleId(java.lang.String articleId) {
		this.articleId = articleId;
	}
	
	@Column(name = "create_date")
	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

    @Column(name = "route_id")
    public java.lang.String getRouteId() {
        return routeId;
    }

    public void setRouteId(java.lang.String routeId) {
        this.routeId = routeId;
    }
}
