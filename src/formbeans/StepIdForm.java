package formbeans;

import java.util.ArrayList;
import java.util.List;

import org.mybeans.form.FormBean;

public class StepIdForm extends FormBean {
	private String stepId;

	public String getStepId() {
		return stepId;
	}

	public int getIdAsInt() {
		// Be sure to first call getValidationErrors() to ensure
		// that NullPointer exception or NumberFormatException will not be
		// thrown!
		return Integer.parseInt(stepId);
	}

	public void setStepId(String id) {
		this.stepId = id;
	}

	public List<String> getValidationErrors() {
		List<String> errors = new ArrayList<String>();

		if (stepId == null || stepId.length() == 0) {
			errors.add("Step Id is required");
			return errors;
		}

		try {
			Integer.parseInt(stepId);
		} catch (NumberFormatException e) {
			errors.add("Step Id is not an integer");
		}

		return errors;
	}
}
