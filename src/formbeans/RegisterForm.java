package formbeans;

import java.util.ArrayList;
import java.util.List;

import org.mybeans.form.FormBean;

public class RegisterForm extends FormBean {
	private String userName;
	private String email;
	private String password;
	private String confirm;
	private String button;

	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = trimAndConvert(userName, "<>\"");
	}
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
		this.password = password.trim();
	}
	public String getConfirm() {
		return confirm;
	}
	public void setConfirm(String confirm) {
		this.confirm = confirm.trim();
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
		// Requirement Error
		if (userName == null || userName.length() == 0)
			errors.add("User Name is required");
		if (email == null || email.length() == 0)
			errors.add("Email Address is required");
		if (password == null || password.length() == 0)
			errors.add("Password is required");
		if (confirm == null || confirm.length() == 0)
			errors.add("Confirm Password is required");
		if (button == null)
			errors.add("Button is required");

		if (errors.size() > 0)
			return errors;

		if (!button.equals("register"))
			errors.add("Invalid button");
		if (!email.matches(".+@.+"))
			errors.add("Invalid Format for E-mail Address");
		if (!password.equals(confirm))
			errors.add("Password should be identical");
		return errors;
	}
}
