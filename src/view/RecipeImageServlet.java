package view;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import databeans.RecipeBean;

@SuppressWarnings("serial")
public class RecipeImageServlet extends HttpServlet {
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {
		RecipeBean recipe = (RecipeBean) request.getAttribute("recipe");

		if (recipe == null) {
			response.sendError(HttpServletResponse.SC_NOT_FOUND);
			return;
		}

		response.setContentType(recipe.getContentType());

		ServletOutputStream out = response.getOutputStream();
		out.write(recipe.getFinalPic());
	}
}
