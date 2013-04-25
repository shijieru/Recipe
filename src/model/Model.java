package model;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;

import org.genericdao.ConnectionPool;
import org.genericdao.DAOException;

public class Model {
	private RecipeDAO recipeDAO;
	private UserDAO userDAO;
	private FavoriteDAO favoriteDAO;
	private WantToDoDAO wantToDoDAO;
	private HaveDoneDAO haveDoneDAO;
	private IngredientDAO ingredientDAO;
	private ReviewDAO reviewDAO;
	private StepDAO stepDAO;
	private UserIdolDAO userIdolDAO;
	private TagDAO tagDAO;

	public Model(ServletConfig config) throws ServletException {
		try {
			String jdbcDriver = config.getInitParameter("jdbcDriverName");
			String jdbcURL = config.getInitParameter("jdbcURL");

			ConnectionPool pool = new ConnectionPool(jdbcDriver, jdbcURL);
			userDAO = new UserDAO("user", pool);
			recipeDAO = new RecipeDAO("recipe", pool);
			favoriteDAO = new FavoriteDAO("favorite", pool);
			haveDoneDAO = new HaveDoneDAO("haveDone", pool);
			wantToDoDAO = new WantToDoDAO("wantToDo", pool);
			ingredientDAO = new IngredientDAO("ingredient", pool);
			stepDAO = new StepDAO("step", pool);
			reviewDAO = new ReviewDAO("review", pool);
			userIdolDAO = new UserIdolDAO("userIdol", pool);
			tagDAO = new TagDAO("tag", pool);

		} catch (DAOException e) {
			throw new ServletException(e);
		}
	}

	public RecipeDAO getRecipeDAO() {
		return recipeDAO;
	}
	public UserDAO getUserDAO() {
		return userDAO;
	}
	public FavoriteDAO getFavoriteDAO() {
		return favoriteDAO;
	}
	public HaveDoneDAO getHaveDoneDAO() {
		return haveDoneDAO;
	}
	public WantToDoDAO getWantToDoDAO() {
		return wantToDoDAO;
	}
	public IngredientDAO getIngredientDAO() {
		return ingredientDAO;
	}
	public StepDAO getStepDAO() {
		return stepDAO;
	}
	public ReviewDAO getReviewDAO() {
		return reviewDAO;
	}
	public UserIdolDAO getUserIdolDAO() {
		return userIdolDAO;
	}
	public TagDAO getTagDAO() {
		return tagDAO;
	}

}
