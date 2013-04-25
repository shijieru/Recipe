/* Name: Ke (Kirk) Li; Andrew ID: keli; Course number: 15637; Date: 03/04/2013 */
package model;

import org.genericdao.ConnectionPool;
import org.genericdao.DAOException;
import org.genericdao.GenericDAO;
import org.genericdao.MatchArg;
import org.genericdao.RollbackException;
import org.genericdao.Transaction;

import databeans.ColRecBean;

public class ColRecDAO extends GenericDAO<ColRecBean> {
	
	public ColRecDAO(String tableName, ConnectionPool pool) throws DAOException {
		super(ColRecBean.class, tableName, pool);
	}

	public void create(ColRecBean newColRecBean) throws RollbackException {
		try {
			Transaction.begin();
			createAutoIncrement(newColRecBean);
			Transaction.commit();
		} finally {
			if (Transaction.isActive()) Transaction.rollback();
		}
	}

	public void delete(int id, int rid) throws RollbackException {
		try {
			Transaction.begin();
			ColRecBean pair = read(id);

    		if (pair == null) {
				throw new RollbackException("ColRec does not exist: id="+id);
    		}

    		if (rid!=pair.getRid()) {
				throw new RollbackException("ColRec not owned by recipe id:"+rid);
    		}

			delete(id);
			Transaction.commit();
		} finally {
			if (Transaction.isActive()) Transaction.rollback();
		}
	}
	
	public ColRecBean[] getItems(int ColRecUid) throws RollbackException {
		ColRecBean[] list = match(MatchArg.equals("ColRecUid", ColRecUid));
		return list;
	}
}