package databeans;

import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import org.genericdao.PrimaryKey;

@PrimaryKey("rid")
public class RecipeBean {
	public static final List<String> EXTENSIONS = Collections
			.unmodifiableList(Arrays
					.asList(new String[]{".jpg", ".gif", ".JPG"}));

	private int rid = -1;
	private int userId = -1;
	private Date listingDate = null;
	private String title = null;
	private String ministory = null;
	private String fullstory = null;
	private int difficulty = -1;
	private int cookTime = -1;
	private double popularity = 0;
	private byte[] finalPic = null;
	private String contentType = null;
	private String tips = null;

	public void setMinistory(String ministory) {
		this.ministory = ministory;
	}
	public void setFullstory(String fullstory) {
		this.fullstory = fullstory;
	}
	public String getTips() {
		return tips;
	}
	public void setTips(String tips) {
		this.tips = tips;
	}
	public int getRid() {
		return rid;
	}
	public void setRid(int rid) {
		this.rid = rid;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public Date getListingDate() {
		return listingDate;
	}
	public void setListingDate(Date listingDate) {
		this.listingDate = listingDate;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getMinistory() {
		return ministory;
	}
	public String getFullstory() {
		return fullstory;
	}
	public void setStory(String story) {
		if (story.length() < 20) {
			this.ministory = story;
			this.fullstory = story;
		} else {
			this.ministory = story.substring(0, 20) + "...";
			this.fullstory = story;
		}
	}
	public int getDifficulty() {
		return difficulty;
	}
	public void setDifficulty(int difficulty) {
		this.difficulty = difficulty;
	}
	public int getCookTime() {
		return cookTime;
	}
	public void setCookTime(int cookTime) {
		this.cookTime = cookTime;
	}
	public double getPopularity() {
		return popularity;
	}
	public void setPopularity(double popularity) {
		this.popularity = popularity;
	}
	public byte[] getFinalPic() {
		return finalPic;
	}
	public void setFinalPic(byte[] finalPic) {
		this.finalPic = finalPic;
	}
	public String getContentType() {
		return contentType;
	}
	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

}
