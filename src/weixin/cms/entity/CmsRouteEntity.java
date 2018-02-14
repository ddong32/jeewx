
package weixin.cms.entity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
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
@Table(name = "weixin_cms_route", schema = "")
@DynamicUpdate(true)
@DynamicInsert(true)
@SuppressWarnings("serial")
public class CmsRouteEntity implements java.io.Serializable {
	/**主键*/
	private java.lang.String id, articleId;
	/**交通*/
	private java.lang.String traffic;
	/**早餐*/
	private java.lang.String breakfast;
	/**午餐*/
	private java.lang.String lunch;
	/**晚餐*/
	private java.lang.String dinner;
	/**特色酒店_参考酒店*/
	private java.lang.String stay;
	/**行程详细*/
	private java.lang.String detail;
	/**创建日期*/
	private java.util.Date createDate;
	
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

	/**
	 *方法: 设置java.lang.String
	 *@param: java.lang.String  主键
	 */
	public void setId(java.lang.String id){
		this.id = id;
	}
	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  线路id
	 */
	@Column(name ="ARTICLE_ID",nullable=true,length=36)
	public java.lang.String getArticleId(){
		return this.articleId;
	}

	/**
	 *方法: 设置java.lang.String
	 *@param: java.lang.String  线路id
	 */
	public void setArticleId(java.lang.String articleId){
		this.articleId = articleId;
	}
	
	/**
	 *方法: 取得java.util.Date
	 *@return: java.util.Date  创建日期
	 */
	@Column(name ="CREATE_DATE",nullable=true)
	public java.util.Date getCreateDate(){
		return this.createDate;
	}

	/**
	 *方法: 设置java.util.Date
	 *@param: java.util.Date  创建日期
	 */
	public void setCreateDate(java.util.Date createDate){
		this.createDate = createDate;
	}
	
	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  
	 */
	@Column(name ="TRAFFIC",nullable=true,length=254)
	public java.lang.String getTraffic() {
		return traffic;
	}

	public void setTraffic(java.lang.String traffic) {
		this.traffic = traffic;
	}

	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  
	 */
	@Column(name ="BREAKFAST",nullable=true,length=254)
	public java.lang.String getBreakfast() {
		return breakfast;
	}

	public void setBreakfast(java.lang.String breakfast) {
		this.breakfast = breakfast;
	}

	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  
	 */
	@Column(name ="LUNCH",nullable=true,length=254)
	public java.lang.String getLunch() {
		return lunch;
	}

	public void setLunch(java.lang.String lunch) {
		this.lunch = lunch;
	}

	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  
	 */
	@Column(name ="DINNER",nullable=true,length=254)
	public java.lang.String getDinner() {
		return dinner;
	}

	public void setDinner(java.lang.String dinner) {
		this.dinner = dinner;
	}

	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  
	 */
	@Column(name ="STAY",nullable=true,length=254)
	public java.lang.String getStay() {
		return stay;
	}

	public void setStay(java.lang.String stay) {
		this.stay = stay;
	}

	/**
	 *方法: 取得java.lang.String
	 *@return: 
	 */
	@Column(name ="DETAIL",nullable=true,length=254)
	public java.lang.String getDetail() {
		return detail;
	}

	public void setDetail(java.lang.String detail) {
		this.detail = detail;
	}
	/**
	 * 地点和交通
	 */
	private List<Map<String, String>> trafficLine;
	/**
	 * 解析行程交通, 地点
	 * @return
	 */
	@Transient
	public List<?> getTrafficLine() {
	    if(null != trafficLine || null == traffic) {
	        return trafficLine;
	    }
	    Pattern pat = Pattern.compile("(?:\\>(\\d+)\\:)?([\\w\\W]+?(?=\\>\\d+\\:)|[\\w\\W]+?$)"
	            , Pattern.CASE_INSENSITIVE);
	    Matcher mat = pat.matcher(traffic);
	    
	    trafficLine = new ArrayList<Map<String, String>>();
	    while(mat.find()) {
	        String tool = mat.group(1), place = mat.group(2);
	        Map<String, String> itm = new HashMap<String, String>(2);
	        itm.put("tool", tool);
	        itm.put("place", place);
	        trafficLine.add(itm);
	    }
	    return trafficLine;
	}
	/**
	 * 图片
	 */
	private List<CmsPhotoEntity> photos;
	//@Transient
	@OneToMany
	@JoinColumn(name="ROUTE_ID", referencedColumnName="ID")
	public List<CmsPhotoEntity> getPhotos() {
		return photos;
	}
	public void setPhotos(List<CmsPhotoEntity> photos) {
		this.photos = photos;
	}
	
    /**
     * 早 中 晚餐
     */
    private String breakfastLabel, lunchLabel, dinnerLabel;
    @Transient
    public String getBreakfastLabel() {
        return breakfastLabel;
    }
    public void setBreakfastLabel(String breakfastLabel) {
        this.breakfastLabel = breakfastLabel;
    }
    
    @Transient
    public String getLunchLabel() {
        return lunchLabel;
    }
    public void setLunchLabel(String lunchLabel) {
        this.lunchLabel = lunchLabel;
    }
    
    @Transient
    public String getDinnerLabel() {
        return dinnerLabel;
    }
    public void setDinnerLabel(String dinnerLabel) {
        this.dinnerLabel = dinnerLabel;
    }
}
