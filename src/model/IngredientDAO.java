package model;

import org.genericdao.ConnectionPool;
import org.genericdao.DAOException;
import org.genericdao.GenericDAO;
import org.genericdao.MatchArg;
import org.genericdao.RollbackException;
import org.genericdao.Transaction;

import databeans.IngredientBean;

public class IngredientDAO extends GenericDAO<IngredientBean> {

	public IngredientDAO(String tableName, ConnectionPool pool)
			throws DAOException {
		super(IngredientBean.class, tableName, pool);
	}

	public void create(IngredientBean newIngredientBean)
			throws RollbackException {
		try {
			Transaction.begin();
			createAutoIncrement(newIngredientBean);
			Transaction.commit();
		} finally {
			if (Transaction.isActive())
				Transaction.rollback();
		}
	}

	public void delete(int id, int rid) throws RollbackException {
		try {
			Transaction.begin();
			IngredientBean item = read(id);

			if (item == null) {
				throw new RollbackException("Ingredient does not exist: id="
						+ id);
			}

			if (rid != item.getRid()) {
				throw new RollbackException(
						"Ingredient not owned by recipe id:" + rid);
			}

			delete(id);
			Transaction.commit();
		} finally {
			if (Transaction.isActive())
				Transaction.rollback();
		}
	}

	public IngredientBean[] getIngredient(int rid, boolean isMain)
			throws RollbackException {
		IngredientBean[] list = match(MatchArg.equals("rid", rid),
				MatchArg.equals("main", isMain));
		return list;
	}

}