package controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import model.Model;

/*
 * Andrew Id: jierus
 * Name: Jieru Shi
 * Date:02/28/2013
 * Course #:15-637
 */
public class LogoutAction extends Action {

	public LogoutAction(Model model) {
	}

	public String getName() {
		return "logout.do";
	}

	public String perform(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		session.setAttribute("user", null);

		return "index.jsp";
	}
}
