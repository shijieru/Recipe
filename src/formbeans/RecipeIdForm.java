package formbeans;

import java.util.ArrayList;
import java.util.List;

import org.mybeans.form.FormBean;

public class RecipeIdForm extends FormBean {
	private String recipeId;

	public String getRecipeId() {
		return recipeId;
	}

	public int getIdAsInt() {
		// Be sure to first call getValidationErrors() to ensure
		// that NullPointer exception or NumberFormatException will not be
		// thrown!
		return Integer.parseInt(recipeId);
	}

	public void setRecipeId(String id) {
		this.recipeId = id;
	}

	public List<String> getValidationErrors() {
		List<String> errors = new ArrayList<String>();

		if (recipeId == null || recipeId.length() == 0) {
			errors.add("Recipe Id is required");
			return errors;
		}

		try {
			Integer.parseInt(recipeId);
		} catch (NumberFormatException e) {
			errors.add("Recipe Id is not an integer");
		}

		return errors;
	}
}
