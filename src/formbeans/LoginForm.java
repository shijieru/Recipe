package formbeans;

import java.util.ArrayList;
import java.util.List;

import org.mybeans.form.FormBean;

public class LoginForm extends FormBean {
	private String email;
	private String password;
	private String button;

	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = trimAndConvert(email, "<>\"");
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getButton() {
		return button;
	}
	public void setButton(String button) {
		this.button = button;
	}

	public boolean isPresent() {
		return (button != null);
	}

	public List<String> getValidationErrors() {
		List<String> errors = new ArrayList<String>();
		// Requirement error
		if (email == null || email.length() == 0)
			errors.add("Email Address is required");
		if (password == null || password.length() == 0)
			errors.add("Password is required");
		if (button == null)
			errors.add("Button is required");

		if (errors.size() > 0)
			return errors;

		if (!button.equals("login"))
			errors.add("Invalid button");
		if (email.matches(".*[<>\"].*") || (!email.matches(".+@.+")))
			errors.add("Invalid Format for E-mail Address");
		return errors;
	}
}
