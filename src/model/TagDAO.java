package model;
import org.genericdao.ConnectionPool;
import org.genericdao.DAOException;
import org.genericdao.GenericDAO;
import org.genericdao.MatchArg;
import org.genericdao.RollbackException;
import org.genericdao.Transaction;

import databeans.TagBean;

public class TagDAO extends GenericDAO<TagBean> {

	public TagDAO(String tableName, ConnectionPool pool) throws DAOException {
		super(TagBean.class, tableName, pool);
	}

	public void create(TagBean newTagBean) throws RollbackException {
		try {
			Transaction.begin();
			createAutoIncrement(newTagBean);
			Transaction.commit();
		} finally {
			if (Transaction.isActive())
				Transaction.rollback();
		}
	}

	public void delete(int id, int rid) throws RollbackException {
		try {
			Transaction.begin();
			TagBean item = read(id);

			if (item == null) {
				throw new RollbackException("Step does not exist: id=" + id);
			}

			if (rid != item.getRid()) {
				throw new RollbackException("Step not owned by recipe id:"
						+ rid);
			}

			delete(id);
			Transaction.commit();
		} finally {
			if (Transaction.isActive())
				Transaction.rollback();
		}
	}
	public TagBean[] getTags(int rid) throws RollbackException {
		TagBean[] list = match(MatchArg.equals("rid", rid));
		return list;
	}

}