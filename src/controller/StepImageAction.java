package controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import model.Model;
import model.RecipeDAO;
import model.StepDAO;

import org.genericdao.RollbackException;
import org.mybeans.form.FormBeanException;
import org.mybeans.form.FormBeanFactory;

import databeans.RecipeBean;
import databeans.StepBean;

import formbeans.StepIdForm;

public class StepImageAction extends Action {
	private FormBeanFactory<StepIdForm> formBeanFactory = FormBeanFactory
			.getInstance(StepIdForm.class);

	private StepDAO stepDAO;

	public StepImageAction(Model model) {
		stepDAO = model.getStepDAO();
	}

	public String getName() {
		return "stepImage.do";
	}

	public String perform(HttpServletRequest request) {
		// Set up the request attributes (the errors list and the form bean so
		// we can just return to the jsp with the form if the request isn't
		// correct)
		List<String> errors = new ArrayList<String>();
		request.setAttribute("errors", errors);

		try {
			StepIdForm form = formBeanFactory.create(request);

			// Any validation errors?
			errors.addAll(form.getValidationErrors());
			if (errors.size() != 0) {
				return "error.jsp";
			}

			StepBean p = stepDAO.read(form.getIdAsInt());
			if (p != null)
				request.setAttribute("step", p);

			return "stepimage";
		} catch (RollbackException e) {
			errors.add(e.getMessage());
			return "error.jsp";
		} catch (FormBeanException e) {
			errors.add(e.getMessage());
			return "error.jsp";
		}
	}
}
