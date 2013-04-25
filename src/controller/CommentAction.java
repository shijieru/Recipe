package controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import model.Model;
import model.ReviewDAO;
import model.UserDAO;

import org.genericdao.RollbackException;
import org.mybeans.form.FormBeanException;
import org.mybeans.form.FormBeanFactory;

import databeans.ReviewBean;
import databeans.UserBean;
import formbeans.CommentForm;

public class CommentAction extends Action {
	private FormBeanFactory<CommentForm> formBeanFactory = FormBeanFactory
			.getInstance(CommentForm.class);
	private ReviewDAO reviewDAO;
	private UserDAO userDAO;

	public CommentAction(Model model) {
		reviewDAO = model.getReviewDAO();
		userDAO = model.getUserDAO();
	}

	public String getName() {
		return "comment.do";
	}

	public String perform(HttpServletRequest request) {
		List<String> errors = new ArrayList<String>();
		request.setAttribute("errors", errors);

		try {

			CommentForm form = formBeanFactory.create(request);
			request.setAttribute("form", form);

			// Any validation errors?
			errors.addAll(form.getValidationErrors());
			if (errors.size() != 0) {
				return "error.jsp";
			}
			ReviewBean review = new ReviewBean();
			review.setCommentDate(new Date());
			review.setReviewText(form.getContent());
			review.setReviewUid(form.getUidasInt());
			review.setRid(form.getRidasInt());
			UserBean user = userDAO.read(form.getUidasInt());
			review.setUserName(user.getUserName());
			reviewDAO.create(review);

			return "viewRecipe.do?recipeId=" + form.getRecipeId();
		} catch (FormBeanException e) {
			errors.add(e.getMessage());
			return "error.jsp";
		} catch (RollbackException e) {
			e.printStackTrace();
			return "error.jsp";
		}
	}
}
