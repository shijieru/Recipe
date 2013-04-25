package model;

import java.util.Arrays;

import org.genericdao.ConnectionPool;
import org.genericdao.DAOException;
import org.genericdao.GenericDAO;
import org.genericdao.MatchArg;
import org.genericdao.RollbackException;
import org.genericdao.Transaction;

import databeans.StepBean;

public class StepDAO extends GenericDAO<StepBean> {

	public StepDAO(String tableName, ConnectionPool pool) throws DAOException {
		super(StepBean.class, tableName, pool);
	}

	public void create(StepBean newStepBean) throws RollbackException {
		try {
			Transaction.begin();
			createAutoIncrement(newStepBean);
			Transaction.commit();
		} finally {
			if (Transaction.isActive())
				Transaction.rollback();
		}
	}

	public void delete(int id, int rid) throws RollbackException {
		try {
			Transaction.begin();
			StepBean item = read(id);

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

	public StepBean[] getStep(int rid) throws RollbackException {
		StepBean[] list = match(MatchArg.equals("rid", rid));
		Arrays.sort(list);
		return list;
	}

}