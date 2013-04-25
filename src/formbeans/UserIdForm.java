package formbeans;

import java.util.ArrayList;
import java.util.List;

import org.mybeans.form.FormBean;

public class UserIdForm extends FormBean {
	private String userId;

	public String getUserId() {
		return userId;
	}

	public int getIdAsInt() {
		// Be sure to first call getValidationErrors() to ensure
		// that NullPointer exception or NumberFormatException will not be
		// thrown!
		return Integer.parseInt(userId);
	}

	public void setUserId(String id) {
		this.userId = id;
	}

	public List<String> getValidationErrors() {
		List<String> errors = new ArrayList<String>();

		if (userId == null || userId.length() == 0) {
			errors.add("User Id is required");
			return errors;
		}

		try {
			Integer.parseInt(userId);
		} catch (NumberFormatException e) {
			errors.add("User Id is not an integer");
		}

		return errors;
	}
}
