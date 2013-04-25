
package model;

import org.genericdao.ConnectionPool;
import org.genericdao.DAOException;
import org.genericdao.GenericDAO;
import org.genericdao.MatchArg;
import org.genericdao.RollbackException;
import org.genericdao.Transaction;

import databeans.HaveDoneBean;

public class HaveDoneDAO extends GenericDAO<HaveDoneBean> {
	
	public HaveDoneDAO(String tableName, ConnectionPool pool) throws DAOException {
		super(HaveDoneBean.class, tableName, pool);
	}

	public void create(HaveDoneBean newHaveDoneBean) throws RollbackException {
		try {
			Transaction.begin();
			createAutoIncrement(newHaveDoneBean);
			Transaction.commit();
		} finally {
			if (Transaction.isActive()) Transaction.rollback();
		}
	}

	public void delete(int id, int userId) throws RollbackException {
		try {
			Transaction.begin();
			HaveDoneBean item = read(id);

    		if (item == null) {
				throw new RollbackException("HaveDone does not exist: id="+id);
    		}

    		if (userId!=item.getUserId()) {
				throw new RollbackException("HaveDone not owned by user id:"+userId);
    		}

			delete(id);
			Transaction.commit();
		} finally {
			if (Transaction.isActive()) Transaction.rollback();
		}
	}
	
	public HaveDoneBean[] getHaveDone(int userId) throws RollbackException {
		HaveDoneBean[] list = match(MatchArg.equals("userId", userId));
		return list;
	}

}