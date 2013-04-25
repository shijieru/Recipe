package controller;

import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

import model.Model;
import model.RecipeDAO;
import model.UserDAO;
import model.UserIdolDAO;

import org.genericdao.MatchArg;
import org.genericdao.RollbackException;
import org.mybeans.form.FormBeanException;
import org.mybeans.form.FormBeanFactory;

import databeans.RecipeBean;
import databeans.UserBean;
import databeans.UserIdolBean;
import formbeans.UserForm;

public class ViewUserAction extends Action {
	private FormBeanFactory<UserForm> formBeanFactory = FormBeanFactory.getInstance(UserForm.class);

	private RecipeDAO recipeDAO;
	private UserDAO  userDAO;
	private UserIdolDAO userIdolDAO;

    public ViewUserAction(Model model) {
    	recipeDAO = model.getRecipeDAO();
    	userDAO  = model.getUserDAO();
		userIdolDAO = model.getUserIdolDAO();
	}

    public String getName() { return "viewUser.do"; }

    public String perform(HttpServletRequest request) {

        List<String> errors = new ArrayList<String>();
        request.setAttribute("errors",errors);
        
		try {
			request.setAttribute("userList",userDAO.getUsers());

			// obtain user name from url - userForm
			UserForm form = formBeanFactory.create(request);
	    	
			String userName = form.getUserName();
			if (userName == null || userName.length() == 0) {
				errors.add("User must be specified");
				return "error.jsp";
			}
	
        	UserBean user = userDAO.readByUserName(userName);
        	if (user == null) {
    			errors.add("Invalid User: "+userName);
    			return "error.jsp";
    		}

        	int thisUid = user.getUserId();
        	
        	// Get this user's recipes
        	RecipeBean[] recipeList = recipeDAO.getRecipes(thisUid);
	        request.setAttribute("recipeList",recipeList);
	        request.setAttribute("thisUser",user);
	        
	        // idol and follower
	        UserIdolBean[] idolList = userIdolDAO.getIdols(thisUid);
	        UserIdolBean[] followerList = userIdolDAO.getFollowers(thisUid);
	        request.setAttribute("idolList",idolList);
	        request.setAttribute("followerList",followerList);
	        
	        return "profile.jsp";
        } catch (RollbackException e) {
        	errors.add(e.getMessage());
        	return "error.jsp";
        } catch (FormBeanException e) {
        	errors.add(e.getMessage());
        	return "error.jsp";
        }
    }
}