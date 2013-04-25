package model;

import org.genericdao.ConnectionPool;
import org.genericdao.DAOException;
import org.genericdao.GenericDAO;
import org.genericdao.MatchArg;
import org.genericdao.RollbackException;
import org.genericdao.Transaction;

import databeans.RecipeBean;

public class RecipeDAO extends GenericDAO<RecipeBean> {

	public RecipeDAO(String tableName, ConnectionPool pool) throws DAOException {
		super(RecipeBean.class, tableName, pool);
	}

	public void create(RecipeBean newItemBean) throws RollbackException {
		try {
			Transaction.begin();
			createAutoIncrement(newItemBean);

			Transaction.commit();
		} finally {
			if (Transaction.isActive())
				Transaction.rollback();
		}
	}

	public void delete(int id, int userId) throws RollbackException {
		try {
			Transaction.begin();
			RecipeBean item = read(id);

			if (item == null) {
				throw new RollbackException("Recipe does not exist: id=" + id);
			}

			if (userId != item.getUserId()) {
				throw new RollbackException("Recipe not owned by user id:"
						+ userId);
			}

			delete(id);
			Transaction.commit();
		} finally {
			if (Transaction.isActive())
				Transaction.rollback();
		}
	}

	public RecipeBean[] getRecipes(int userId) throws RollbackException {
		RecipeBean[] list = match(MatchArg.equals("userId", userId));
		return list;
	}

	public RecipeBean[] getAllItem() throws RollbackException {
		RecipeBean[] list = match(MatchArg.greaterThan("userId", 0));
		return list;
	}

	public RecipeBean[] getSearchItem(String keyword) throws RollbackException {
		RecipeBean[] list = match(MatchArg.contains("description", keyword));
		return list;
	}
}