package view;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import databeans.UserBean;

@SuppressWarnings("serial")
public class UserImageServlet extends HttpServlet {
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {
		UserBean user = (UserBean) request.getAttribute("user");

		if (user == null) {
			response.sendError(HttpServletResponse.SC_NOT_FOUND);
			return;
		}

		response.setContentType(user.getContentType());

		ServletOutputStream out = response.getOutputStream();
		out.write(user.getPhoto());
	}
}
