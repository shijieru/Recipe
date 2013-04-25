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
import model.ReviewDAO;
import model.StepDAO;
import model.TagDAO;
import model.UserDAO;

import org.genericdao.RollbackException;
import org.mybeans.form.FormBeanException;
import org.mybeans.form.FormBeanFactory;

import databeans.IngredientBean;
import databeans.RecipeBean;
import databeans.ReviewBean;
import databeans.StepBean;
import databeans.TagBean;
import databeans.UserBean;

import formbeans.RecipeIdForm;

public class ViewRecipeAction extends Action {
	private FormBeanFactory<RecipeIdForm> formBeanFactory = FormBeanFactory
			.getInstance(RecipeIdForm.class);

	private RecipeDAO recipeDAO;
	private StepDAO stepDAO;
	private IngredientDAO ingredientDAO;
	private TagDAO tagDAO;
	private UserDAO userDAO;
	private ReviewDAO reviewDAO;

	public ViewRecipeAction(Model model) {
		recipeDAO = model.getRecipeDAO();
		stepDAO = model.getStepDAO();
		ingredientDAO = model.getIngredientDAO();
		tagDAO = model.getTagDAO();
		userDAO = model.getUserDAO();
		reviewDAO = model.getReviewDAO();
	}

	public String getName() {
		return "viewRecipe.do";
	}

	public String perform(HttpServletRequest request) {
		List<String> errors = new ArrayList<String>();
		request.setAttribute("errors", errors);

		try {
			RecipeIdForm form = formBeanFactory.create(request);
			// Any validation errors?
			errors.addAll(form.getValidationErrors());
			if (errors.size() != 0) {
				return "error.jsp";
			}
			RecipeBean recipe = recipeDAO.read(form.getIdAsInt());
			if (recipe == null) {
				errors.add("Recipe not exists");
				return "error.jsp";
			}

			IngredientBean[] mainIngredient = ingredientDAO.getIngredient(
					recipe.getRid(), true);
			IngredientBean[] auxIngredient = ingredientDAO.getIngredient(
					recipe.getRid(), false);
			StepBean[] steps = stepDAO.getStep(recipe.getRid());
			TagBean[] tags = tagDAO.getTags(recipe.getRid());
			UserBean author = userDAO.read(recipe.getUserId());
			ReviewBean[] reviews = reviewDAO.getReview(recipe.getRid());

			request.setAttribute("recipe", recipe);
			request.setAttribute("steps", steps);
			request.setAttribute("mainIng", mainIngredient);
			request.setAttribute("auxIng", auxIngredient);
			request.setAttribute("tags", tags);
			request.setAttribute("author", author);
			request.setAttribute("reviews", reviews);

			return "viewRecipe.jsp";
		} catch (RollbackException e) {
			errors.add(e.getMessage());
			return "error.jsp";
		} catch (FormBeanException e) {
			errors.add(e.getMessage());
			return "error.jsp";
		}
	}
}
