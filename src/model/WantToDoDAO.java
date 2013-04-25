
package model;

import org.genericdao.ConnectionPool;
import org.genericdao.DAOException;
import org.genericdao.GenericDAO;
import org.genericdao.MatchArg;
import org.genericdao.RollbackException;
import org.genericdao.Transaction;

import databeans.WantToDoBean;

public class WantToDoDAO extends GenericDAO<WantToDoBean> {
	
	public WantToDoDAO(String tableName, ConnectionPool pool) throws DAOException {
		super(WantToDoBean.class, tableName, pool);
	}

	public void create(WantToDoBean newWantToDoBean) throws RollbackException {
		try {
			Transaction.begin();
			createAutoIncrement(newWantToDoBean);
			Transaction.commit();
		} finally {
			if (Transaction.isActive()) Transaction.rollback();
		}
	}

	public void delete(int id, int userId) throws RollbackException {
		try {
			Transaction.begin();
			WantToDoBean item = read(id);

    		if (item == null) {
				throw new RollbackException("WantToDo does not exist: id="+id);
    		}

    		if (userId!=item.getUserId()) {
				throw new RollbackException("WantToDo not owned by user id:"+userId);
    		}

			delete(id);
			Transaction.commit();
		} finally {
			if (Transaction.isActive()) Transaction.rollback();
		}
	}
	
	public WantToDoBean[] getWantToDo(int userId) throws RollbackException {
		WantToDoBean[] list = match(MatchArg.equals("userId", userId));
		return list;
	}

}