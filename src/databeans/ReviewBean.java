package databeans;

import java.util.Date;

import org.genericdao.PrimaryKey;

@PrimaryKey("reviewId")
public class ReviewBean implements Comparable<ReviewBean> {
	private int reviewId = -1;
	private int rid = -1;
	private int reviewUid = -1;
	private String userName = null;
	private String reviewText = null;
	private Date commentDate = null;

	@Override
	public int compareTo(ReviewBean o) {
		int com = rid - o.rid;
		if (com != 0)
			return com;
		return commentDate.compareTo(o.commentDate);
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Date getCommentDate() {
		return commentDate;
	}
	public void setCommentDate(Date commentDate) {
		this.commentDate = commentDate;
	}
	public int getReviewId() {
		return reviewId;
	}
	public void setReviewId(int reviewId) {
		this.reviewId = reviewId;
	}
	public int getRid() {
		return rid;
	}
	public void setRid(int rid) {
		this.rid = rid;
	}
	public int getReviewUid() {
		return reviewUid;
	}
	public void setReviewUid(int reviewUid) {
		this.reviewUid = reviewUid;
	}
	public String getReviewText() {
		return reviewText;
	}
	public void setReviewText(String reviewText) {
		this.reviewText = reviewText;
	}

}
