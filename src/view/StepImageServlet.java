package view;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import databeans.StepBean;

@SuppressWarnings("serial")
public class StepImageServlet extends HttpServlet {
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {
		StepBean step = (StepBean) request.getAttribute("step");

		if (step == null) {
			response.sendError(HttpServletResponse.SC_NOT_FOUND);
			return;
		}

		response.setContentType(step.getContentType());

		ServletOutputStream out = response.getOutputStream();
		out.write(step.getStepPic());
	}
}
