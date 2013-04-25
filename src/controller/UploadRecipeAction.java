package controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import model.IngredientDAO;
import model.Model;
import model.RecipeDAO;
import model.StepDAO;
import model.TagDAO;

import org.genericdao.RollbackException;
import org.mybeans.form.FileProperty;
import org.mybeans.form.FormBeanException;
import org.mybeans.form.FormBeanFactory;

import databeans.IngredientBean;
import databeans.RecipeBean;
import databeans.StepBean;
import databeans.TagBean;
import databeans.UserBean;
import formbeans.UploadRecipeForm;

public class UploadRecipeAction extends Action {
	private FormBeanFactory<UploadRecipeForm> formBeanFactory = FormBeanFactory
			.getInstance(UploadRecipeForm.class);

	private RecipeDAO recipeDAO;
	private StepDAO stepDAO;
	private IngredientDAO ingredientDAO;
	private TagDAO tagDAO;

	public UploadRecipeAction(Model model) {
		recipeDAO = model.getRecipeDAO();
		stepDAO = model.getStepDAO();
		ingredientDAO = model.getIngredientDAO();
		tagDAO = model.getTagDAO();
	}

	public String getName() {
		return "uploadRecipe.do";
	}

	public String perform(HttpServletRequest request) {
		List<String> errors = new ArrayList<String>();
		request.setAttribute("errors", errors);

		try {

			UploadRecipeForm form = formBeanFactory.create(request);
			request.setAttribute("form", form);

			// If no params were passed, return with no errors so that the form
			// will be presented (we assume for the first time).
			if (!form.isPresent()) {
				return "uploadRecipe.jsp";
			}

			// Any validation errors?
			errors.addAll(form.getValidationErrors());
			if (errors.size() != 0) {
				return "uploadRecipe.jsp";
			}

			UserBean user = (UserBean) request.getSession(false).getAttribute(
					"user");
			// Recipe
			FileProperty filePicProp = form.getFinalpic();
			RecipeBean recipe = new RecipeBean();
			recipe.setFinalPic(filePicProp.getBytes());
			recipe.setContentType(filePicProp.getContentType());
			recipe.setTitle(fixBadChars(form.getTitle()));
			recipe.setCookTime(Integer.valueOf(form.getTime()));
			recipe.setDifficulty(Integer.valueOf(form.getDifficulty()));
			recipe.setListingDate(new Date());
			recipe.setStory(form.getStory());
			recipe.setUserId(user.getUserId());
			recipe.setTips(form.getTips());
			recipeDAO.create(recipe);

			// Main Ingredients
			String[] mainIng = form.getMainIngredient();
			for (int i = 0; i < mainIng.length; i++) {
				if (mainIng[i] != null && !mainIng[i].equals("")) {
					IngredientBean ib = new IngredientBean();
					ib.setIngredientName(mainIng[i]);
					ib.setIngredientAmount(form.getMainAmount()[i]);
					ib.setRid(recipe.getRid());
					ib.setMain(true);
					ingredientDAO.create(ib);
				}
			}
			// Auxiliary Ingredients
			String[] auxIng = form.getAuxIngredient();
			for (int i = 0; i < auxIng.length; i++) {
				if (auxIng[i] != null && !auxIng[i].equals("")) {
					IngredientBean ib = new IngredientBean();
					ib.setIngredientName(auxIng[i]);
					ib.setIngredientAmount(form.getAuxAmount()[i]);
					ib.setRid(recipe.getRid());
					ib.setMain(false);
					ingredientDAO.create(ib);
				}
			}
			// Steps
			ArrayList<FileProperty> stepPicProp = form.getStepPics();
			for (int i = 0; i < stepPicProp.size(); i++) {
				StepBean step = new StepBean();
				step.setStepIndex(i);
				step.setStepPic(stepPicProp.get(i).getBytes());
				step.setContentType(stepPicProp.get(i).getContentType());
				step.setRid(recipe.getRid());
				step.setStepDescription(form.getStepDescription()[i]);
				stepDAO.create(step);
			}
			// Tags
			String[] tags = form.getTagname();
			for (int i = 0; i < tags.length; i++) {
				TagBean tag = new TagBean();
				tag.setRid(recipe.getRid());
				tag.setTagName(tags[i]);
				tagDAO.create(tag);
			}

			return "viewRecipe.do?recipeId=" + recipe.getRid();
		} catch (RollbackException e) {
			errors.add(e.getMessage());
			return "error.jsp";
		} catch (FormBeanException e) {
			errors.add(e.getMessage());
			return "error.jsp";
		}
	}
	private String fixBadChars(String s) {
		if (s == null || s.length() == 0)
			return s;

		Pattern p = Pattern.compile("[<>\"&]");
		Matcher m = p.matcher(s);
		StringBuffer b = null;
		while (m.find()) {
			if (b == null)
				b = new StringBuffer();
			switch (s.charAt(m.start())) {
				case '<' :
					m.appendReplacement(b, "&lt;");
					break;
				case '>' :
					m.appendReplacement(b, "&gt;");
					break;
				case '&' :
					m.appendReplacement(b, "&amp;");
					break;
				case '"' :
					m.appendReplacement(b, "&quot;");
					break;
				default :
					m.appendReplacement(b, "&#" + ((int) s.charAt(m.start()))
							+ ';');
			}
		}

		if (b == null)
			return s;
		m.appendTail(b);
		return b.toString();
	}
}
