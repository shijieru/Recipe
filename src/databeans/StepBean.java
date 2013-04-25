package databeans;

import org.genericdao.PrimaryKey;

@PrimaryKey("stepId")
public class StepBean implements Comparable<StepBean> {
	private int stepId = -1;
	private int rid = -1;
	private int stepIndex = -1;
	private String stepDescription = null;
	private byte[] stepPic = null;
	private String contentType = null;

	@Override
	public int compareTo(StepBean o) {
		int c = rid - o.rid;
		if (c != 0)
			return c;
		return stepIndex - o.stepIndex;
	}

	public int getStepId() {
		return stepId;
	}
	public void setStepId(int stepId) {
		this.stepId = stepId;
	}
	public int getRid() {
		return rid;
	}
	public void setRid(int rid) {
		this.rid = rid;
	}
	public int getStepIndex() {
		return stepIndex;
	}
	public void setStepIndex(int stepIndex) {
		this.stepIndex = stepIndex;
	}
	public String getStepDescription() {
		return stepDescription;
	}
	public void setStepDescription(String stepText) {
		this.stepDescription = stepText;
	}
	public byte[] getStepPic() {
		return stepPic;
	}
	public void setStepPic(byte[] stepPic) {
		this.stepPic = stepPic;
	}
	public String getContentType() {
		return contentType;
	}
	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

}
