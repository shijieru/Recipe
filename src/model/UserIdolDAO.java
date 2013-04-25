
package model;

import org.genericdao.ConnectionPool;
import org.genericdao.DAOException;
import org.genericdao.GenericDAO;
import org.genericdao.MatchArg;
import org.genericdao.RollbackException;
import org.genericdao.Transaction;

import databeans.UserIdolBean;

public class UserIdolDAO extends GenericDAO<UserIdolBean> {
	
	public UserIdolDAO(String tableName, ConnectionPool pool) throws DAOException {
		super(UserIdolBean.class, tableName, pool);
	}

	public void create(UserIdolBean newUserIdolBean) throws RollbackException {
		try {
			Transaction.begin();
			createAutoIncrement(newUserIdolBean);
			Transaction.commit();
		} finally {
			if (Transaction.isActive()) Transaction.rollback();
		}
	}

	public void delete(int id, int idolId) throws RollbackException {
		try {
			Transaction.begin();
			UserIdolBean item = read(id);

    		if (item == null) {
				throw new RollbackException("UserIdol does not exist: id="+id);
    		}

    		if (idolId!=item.getIdolId()) {
				throw new RollbackException("UserIdol not exist:"+ idolId);
    		}

			delete(id);
			Transaction.commit();
		} finally {
			if (Transaction.isActive()) Transaction.rollback();
		}
	}
	
	//keli 423
	public UserIdolBean[] getIdols(int userId) throws RollbackException {
		UserIdolBean[] list = match(MatchArg.equals("userId", userId));
		return list;
	}
	
	//keli 423
	public UserIdolBean[] getFollowers(int idolId) throws RollbackException {
		UserIdolBean[] list = match(MatchArg.equals("idolId", idolId));
		return list;
	}

}