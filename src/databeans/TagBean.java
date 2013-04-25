package databeans;

import org.genericdao.PrimaryKey;

@PrimaryKey("tagId")
public class TagBean {
	private int tagId = -1;
	private int rid = -1;
	private String tagName = null;

	public int getTagId() {
		return tagId;
	}
	public void setTagId(int tagId) {
		this.tagId = tagId;
	}
	public int getRid() {
		return rid;
	}
	public void setRid(int rid) {
		this.rid = rid;
	}
	public String getTagName() {
		return tagName;
	}
	public void setTagName(String tagName) {
		this.tagName = tagName;
	}

}