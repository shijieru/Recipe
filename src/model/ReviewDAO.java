package model;

import java.util.Arrays;

import org.genericdao.ConnectionPool;
import org.genericdao.DAOException;
import org.genericdao.GenericDAO;
import org.genericdao.MatchArg;
import org.genericdao.RollbackException;
import org.genericdao.Transaction;

import databeans.ReviewBean;

public class ReviewDAO extends GenericDAO<ReviewBean> {

	public ReviewDAO(String tableName, ConnectionPool pool) throws DAOException {
		super(ReviewBean.class, tableName, pool);
	}

	public void create(ReviewBean newReviewBean) throws RollbackException {
		try {
			Transaction.begin();
			createAutoIncrement(newReviewBean);
			Transaction.commit();
		} finally {
			if (Transaction.isActive())
				Transaction.rollback();
		}
	}

	public void delete(int id, int userId) throws RollbackException {
		try {
			Transaction.begin();
			ReviewBean item = read(id);

			if (item == null) {
				throw new RollbackException("Review does not exist: id=" + id);
			}

			if (userId != item.getReviewUid()) {
				throw new RollbackException("Review not owned by user id:"
						+ userId);
			}

			delete(id);
			Transaction.commit();
		} finally {
			if (Transaction.isActive())
				Transaction.rollback();
		}
	}

	public ReviewBean[] getReview(int recipeId) throws RollbackException {
		ReviewBean[] list = match(MatchArg.equals("rid", recipeId));
		Arrays.sort(list);
		return list;
	}

}
