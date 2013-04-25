package controller;

import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

import model.Model;
import model.RecipeDAO;
import model.UserDAO;
import model.UserIdolDAO;

import org.genericdao.RollbackException;
import org.mybeans.form.FormBeanException;
import org.mybeans.form.FormBeanFactory;

import databeans.RecipeBean;
import databeans.UserBean;
import databeans.UserIdolBean;
import formbeans.UserForm;

public class FollowAction extends Action{
	private FormBeanFactory<UserForm> formBeanFactory = FormBeanFactory.getInstance(UserForm.class);
	
	private RecipeDAO recipeDAO;
	private UserDAO userDAO;
	private UserIdolDAO userIdolDAO;
	
	public FollowAction(Model model) {
		recipeDAO = model.getRecipeDAO();
		userDAO = model.getUserDAO();
		userIdolDAO = model.getUserIdolDAO();
	}
	
	public String getName() { return "follow.do"; }
	
	public String perform(HttpServletRequest request) {
		// Set up the errors list
		List<String> errors = new ArrayList<String>();
        request.setAttribute("errors",errors);
        
        try {   
        	
        	// obtain current user
        	UserBean user = (UserBean) request.getSession(false).getAttribute("user");
        	
        	// obtain object user
        	UserForm form = formBeanFactory.create(request);
        	
			String idolUserName = form.getUserName();
			if (idolUserName == null || idolUserName.length() == 0) {
				errors.add("idol User  must be specified");
				return "error.jsp";
			}
	        
        	UserBean thisUser = userDAO.readByUserName(idolUserName);
        	if (user == null) {
    			errors.add("Invalid User: "+idolUserName);
    			return "error.jsp";
    		}
	        
	        int thisUid = thisUser.getUserId();
        	
        	UserIdolBean idol = new UserIdolBean();
        	
        	// set current user's id
        	idol.setUserId(user.getUserId());
        	idol.setUserName(user.getUserName());
        	idol.setIdolId(thisUid);
        	idol.setIdolName(thisUser.getUserName());

        	// creat a new user idol
        	userIdolDAO.create(idol);
        	
        	UserBean idolUser = userDAO.read(thisUid);
 
        	// Get this user's recipes
        	RecipeBean[] recipeList = recipeDAO.getRecipes(thisUid);
	        request.setAttribute("recipeList",recipeList);
	        request.setAttribute("thisUser",user);
	        
	        // idol and follower
	        UserIdolBean[] idolList = userIdolDAO.getIdols(thisUid);
	        UserIdolBean[] followerList = userIdolDAO.getFollowers(thisUid);
	        request.setAttribute("idolList",idolList);
	        request.setAttribute("followerList",followerList);
	        request.setAttribute("idolUser",idolUser);
	        
	        return "profile.jsp";
	        
	 	} catch (RollbackException e) {
			errors.add(e.getMessage());
			return "viewUser.jsp";
	 	} catch (FormBeanException e) {
			errors.add(e.getMessage());
			return "viewUser.jsp";
	 	}
	   
	}            	
}
