package controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import model.Model;
import model.RecipeDAO;
import model.StepDAO;
import model.UserDAO;

import org.genericdao.RollbackException;
import org.mybeans.form.FormBeanException;
import org.mybeans.form.FormBeanFactory;

import databeans.RecipeBean;
import databeans.StepBean;
import databeans.UserBean;

import formbeans.UserIdForm;

public class UserImageAction extends Action {
	private FormBeanFactory<UserIdForm> formBeanFactory = FormBeanFactory
			.getInstance(UserIdForm.class);

	private UserDAO userDAO;

	public UserImageAction(Model model) {
		userDAO = model.getUserDAO();
	}

	public String getName() {
		return "userImage.do";
	}

	public String perform(HttpServletRequest request) {
		// Set up the request attributes (the errors list and the form bean so
		// we can just return to the jsp with the form if the request isn't
		// correct)
		List<String> errors = new ArrayList<String>();
		request.setAttribute("errors", errors);

		try {
			UserIdForm form = formBeanFactory.create(request);

			// Any validation errors?
			errors.addAll(form.getValidationErrors());
			if (errors.size() != 0) {
				return "error.jsp";
			}

			UserBean p = userDAO.read(form.getIdAsInt());
			if (p != null)
				request.setAttribute("user", p);

			return "userimage";
		} catch (RollbackException e) {
			errors.add(e.getMessage());
			return "error.jsp";
		} catch (FormBeanException e) {
			errors.add(e.getMessage());
			return "error.jsp";
		}
	}
}
