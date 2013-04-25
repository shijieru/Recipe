package controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import model.Model;
import model.RecipeDAO;

import org.genericdao.RollbackException;
import org.mybeans.form.FormBeanException;
import org.mybeans.form.FormBeanFactory;

import databeans.RecipeBean;

import formbeans.RecipeIdForm;

public class RecipeImageAction extends Action {
	private FormBeanFactory<RecipeIdForm> formBeanFactory = FormBeanFactory
			.getInstance(RecipeIdForm.class);

	private RecipeDAO recipeDAO;

	public RecipeImageAction(Model model) {
		recipeDAO = model.getRecipeDAO();
	}

	public String getName() {
		return "recipeImage.do";
	}

	public String perform(HttpServletRequest request) {
		// Set up the request attributes (the errors list and the form bean so
		// we can just return to the jsp with the form if the request isn't
		// correct)
		List<String> errors = new ArrayList<String>();
		request.setAttribute("errors", errors);

		try {
			RecipeIdForm form = formBeanFactory.create(request);

			// Any validation errors?
			errors.addAll(form.getValidationErrors());
			if (errors.size() != 0) {
				return "error.jsp";
			}

			RecipeBean p = recipeDAO.read(form.getIdAsInt());
			if (p != null)
				request.setAttribute("recipe", p);

			return "recipeimage";
		} catch (RollbackException e) {
			errors.add(e.getMessage());
			return "error.jsp";
		} catch (FormBeanException e) {
			errors.add(e.getMessage());
			return "error.jsp";
		}
	}
}
