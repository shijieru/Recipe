
package model;

import org.genericdao.ConnectionPool;
import org.genericdao.DAOException;
import org.genericdao.GenericDAO;
import org.genericdao.MatchArg;
import org.genericdao.RollbackException;
import org.genericdao.Transaction;

import databeans.FavoriteBean;

public class FavoriteDAO extends GenericDAO<FavoriteBean> {
	
	public FavoriteDAO(String tableName, ConnectionPool pool) throws DAOException {
		super(FavoriteBean.class, tableName, pool);
	}

	public void create(FavoriteBean newFavoriteBean) throws RollbackException {
		try {
			Transaction.begin();
			createAutoIncrement(newFavoriteBean);
			Transaction.commit();
		} finally {
			if (Transaction.isActive()) Transaction.rollback();
		}
	}

	public void delete(int id, int userId) throws RollbackException {
		try {
			Transaction.begin();
			FavoriteBean item = read(id);

    		if (item == null) {
				throw new RollbackException("Favorite does not exist: id="+id);
    		}

    		if (userId!=item.getUserId()) {
				throw new RollbackException("Favorite not owned by user id:"+userId);
    		}

			delete(id);
			Transaction.commit();
		} finally {
			if (Transaction.isActive()) Transaction.rollback();
		}
	}
	
	public FavoriteBean[] getFavorite(int userId) throws RollbackException {
		FavoriteBean[] list = match(MatchArg.equals("userId", userId));
		return list;
	}

}