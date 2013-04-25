package formbeans;

import java.util.ArrayList;
import java.util.List;

import org.mybeans.form.FormBean;

public class CommentForm extends FormBean {
	private String userId;
	private String recipeId;
	private String content;

	public int getUidasInt() {
		return Integer.valueOf(userId);
	}

	public int getRidasInt() {
		return Integer.valueOf(recipeId);
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getRecipeId() {
		return recipeId;
	}

	public void setRecipeId(String recipeId) {
		this.recipeId = recipeId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public List<String> getValidationErrors() {
		List<String> errors = new ArrayList<String>();

		if (userId == null || userId.length() == 0) {
			errors.add("User Id is required");
			return errors;
		}
		if (recipeId == null || recipeId.length() == 0) {
			errors.add("recipe Id is required");
			return errors;
		}
		if (content == null || content.length() == 0) {
			errors.add("content is required");
			return errors;
		}

		try {
			Integer.parseInt(userId);
		} catch (NumberFormatException e) {
			errors.add("User Id is not an integer");
		}

		try {
			Integer.parseInt(recipeId);
		} catch (NumberFormatException e) {
			errors.add("Recipe Id is not an integer");
		}

		return errors;
	}
}
