package formbeans;

import java.util.ArrayList;
import java.util.List;

import org.mybeans.form.FileProperty;
import org.mybeans.form.FormBean;

public class UploadRecipeForm extends FormBean {
	private String title;
	private String difficulty;
	private String time;
	private FileProperty finalpic;
	private String story;
	private String[] mainIngredient;
	private String[] mainAmount;
	private String[] auxIngredient;
	private String[] auxAmount;
	private ArrayList<FileProperty> stepPics = new ArrayList<FileProperty>();
	private String[] stepDescription;
	private String tips;
	private String[] tagname = null;

	private String button;

	public static int FILE_MAX_LENGTH = 1024 * 1024;

	public boolean isPresent() {
		return (button != null);
	}

	public List<String> getValidationErrors() {
		List<String> errors = new ArrayList<String>();
		// Requirement error
		if (title == null || title.length() == 0)
			errors.add("title is required");
		if (difficulty == null || difficulty.length() == 0)
			errors.add("difficulty is required");
		if (time == null || time.length() == 0)
			errors.add("time is required");

		if (finalpic == null || finalpic.getFileName().length() == 0) {
			errors.add("You must provide a final picture");
		}
		if (finalpic.getBytes().length == 0) {
			errors.add("Zero length file");
		}
		// Main ingredient
		int mainIngCnt = 0;
		int mainAmountCnt = 0;
		for (String mainEle : mainIngredient) {
			if (!mainEle.equals(""))
				mainIngCnt++;
		}
		for (String mainEle : mainAmount) {
			if (!mainEle.equals(""))
				mainAmountCnt++;
		}
		if (mainIngCnt != mainAmountCnt)
			errors.add("Main Ingredient number should be identical with its amount number");
		else if (mainIngCnt == 0)
			errors.add("There should be at least one main ingredient for each recipe");
		// Auxiliary ingredient
		int auxIngCnt = 0;
		int auxAmountCnt = 0;
		for (String mainEle : auxIngredient) {
			if (!mainEle.equals(""))
				auxIngCnt++;
		}
		for (String mainEle : auxAmount) {
			if (!mainEle.equals(""))
				auxAmountCnt++;
		}
		if (auxIngCnt != auxAmountCnt)
			errors.add("Auxiliary Ingredient number should be identical with its amount number");
		else if (mainIngCnt == 0)
			errors.add("There should be at least one Auxiliary ingredient for each recipe");

		// Step
		int stepDesCnt = 0;
		for (String sd : stepDescription) {
			if (!sd.equals(""))
				stepDesCnt++;
		}
		if (stepPics.size() != stepDesCnt)
			errors.add("Step picture number should be identical with its step description");
		else if (stepPics.size() == 0)
			errors.add("There should be at least one step for each recipe");

		// tags
		if (tagname == null || tagname.length == 0)
			errors.add("There should be at least one tag");

		if (button == null)
			errors.add("Button is required");

		if (errors.size() > 0)
			return errors;

		if (!button.equals("create"))
			errors.add("Invalid button");

		return errors;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDifficulty() {
		return difficulty;
	}

	public void setDifficulty(String difficulty) {
		this.difficulty = difficulty;
	}
	public String[] getTagname() {
		return tagname;
	}
	public void setTagname(String[] tagname) {
		this.tagname = tagname;
	}
	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public FileProperty getFinalpic() {
		return finalpic;
	}

	public void setFinalpic(FileProperty finalpic) {
		this.finalpic = finalpic;
	}

	public String getStory() {
		return story;
	}

	public void setStory(String story) {
		this.story = story;
	}

	public String[] getMainIngredient() {
		return mainIngredient;
	}

	public void setMainIngredient(String[] mainIngredient) {
		this.mainIngredient = mainIngredient;
	}

	public String[] getMainAmount() {
		return mainAmount;
	}

	public void setMainAmount(String[] mainAmount) {

		this.mainAmount = mainAmount;
	}

	public String[] getAuxIngredient() {
		return auxIngredient;
	}

	public void setAuxIngredient(String[] auxIngredient) {
		this.auxIngredient = auxIngredient;
	}

	public String[] getAuxAmount() {
		return auxAmount;
	}

	public void setAuxAmount(String[] auxAmount) {
		this.auxAmount = auxAmount;
	}

	public ArrayList<FileProperty> getStepPics() {
		return stepPics;
	}

	public void setStepPic(FileProperty stepPic) {
		if (stepPic.getFileName().length() != 0)
			this.stepPics.add(stepPic);
	}

	public String[] getStepDescription() {
		return stepDescription;
	}

	public void setStepDescription(String[] stepDescription) {
		this.stepDescription = stepDescription;
	}
	public String getTips() {
		return tips;
	}

	public void setTips(String tips) {
		this.tips = tips;
	}

	public String getButton() {
		return button;
	}

	public void setButton(String button) {
		this.button = button;
	}

}
