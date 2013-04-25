package model;

import org.genericdao.ConnectionPool;
import org.genericdao.DAOException;
import org.genericdao.GenericDAO;
import org.genericdao.MatchArg;
import org.genericdao.RollbackException;
import org.genericdao.Transaction;

import databeans.UserBean;

public class UserDAO extends GenericDAO<UserBean> {

	public UserDAO(String tableName, ConnectionPool pool) throws DAOException {
		super(UserBean.class, tableName, pool);
	}
	/* Create a new user */
	public void create(UserBean user) throws RollbackException {
		try {
			Transaction.begin();
			createAutoIncrement(user);

			Transaction.commit();
		} finally {
			if (Transaction.isActive())
				Transaction.rollback();
		}
	}

	public UserBean[] getUsers() throws RollbackException {
		UserBean[] users = match();
		return users;
	}

	public UserBean readByUserName(String name) throws RollbackException {
		UserBean[] u = match(MatchArg.equals("userName", name));
		if (u.length == 0)
			return null;
		else
			return u[0];
	}

	public UserBean readByEmail(String email) throws RollbackException {
		UserBean[] u = match(MatchArg.equals("userEmail", email));
		if (u.length == 0)
			return null;
		else
			return u[0];
	}

	public void setPassword(String userName, String password)
			throws RollbackException {
		try {
			Transaction.begin();
			UserBean[] dbUser = match(MatchArg.equals("userName", userName));

			if (dbUser.length == 0) {
				throw new RollbackException("User " + userName
						+ " no longer exists");
			}

			dbUser[0].setPassword(password);
			update(dbUser[0]);

			Transaction.commit();
		} finally {
			if (Transaction.isActive())
				Transaction.rollback();
		}
	}
}
