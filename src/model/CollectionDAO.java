/* Name: Ke (Kirk) Li; Andrew ID: keli; Course number: 15637; Date: 03/04/2013 */
package model;

import org.genericdao.ConnectionPool;
import org.genericdao.DAOException;
import org.genericdao.GenericDAO;
import org.genericdao.MatchArg;
import org.genericdao.RollbackException;
import org.genericdao.Transaction;

import databeans.CollectionBean;

public class CollectionDAO extends GenericDAO<CollectionBean> {
	
	public CollectionDAO(String tableName, ConnectionPool pool) throws DAOException {
		super(CollectionBean.class, tableName, pool);
	}

	public void create(CollectionBean newItemBean) throws RollbackException {
		try {
			Transaction.begin();
			createAutoIncrement(newItemBean);
			Transaction.commit();
		} finally {
			if (Transaction.isActive()) Transaction.rollback();
		}
	}

	public void delete(int id, int userId) throws RollbackException {
		try {
			Transaction.begin();
			CollectionBean item = read(id);

    		if (item == null) {
				throw new RollbackException("Collection does not exist: id="+id);
    		}

    		if (userId!=item.getCollectionUid()) {
				throw new RollbackException("Collection not owned by user id:"+userId);
    		}

			delete(id);
			Transaction.commit();
		} finally {
			if (Transaction.isActive()) Transaction.rollback();
		}
	}
	
	public CollectionBean[] getItems(int collectionUid) throws RollbackException {
		CollectionBean[] list = match(MatchArg.equals("collectionUid", collectionUid));
		return list;
	}
}