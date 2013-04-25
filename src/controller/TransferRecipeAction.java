package controller;

import javax.servlet.http.HttpServletRequest;

import model.Model;

public class TransferRecipeAction extends Action {

	public TransferRecipeAction(Model model) {
	}

	public String getName() {
		return "transferRecipe.do";
	}

	public String perform(HttpServletRequest request) {

		return "uploadRecipe.jsp";
	}
}
