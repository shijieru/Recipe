package controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import model.Model;
import model.UserDAO;


import databeans.UserBean;

public class IndexAction extends Action {

	private UserDAO userDAO;

	public IndexAction(Model model) {
		userDAO = model.getUserDAO();
	}

	public String getName() {
		return "index.do";
	}

	public String perform(HttpServletRequest request) {
		List<String> errors = new ArrayList<String>();
		request.setAttribute("errors", errors);
		//According to user, show the right panel
		
		UserBean user = (UserBean) request.getSession(false).getAttribute(
				"user");
		//Find Popuer recipe
		
		//Find Avid User
		
		//Find recent diary
		
		// set current user attribute
		request.setAttribute("user",user);
		
		return "index.jsp";
	}
}
