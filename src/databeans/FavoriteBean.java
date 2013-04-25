package databeans;

import org.genericdao.PrimaryKey;

@PrimaryKey("fid")
public class FavoriteBean {
    private int fid;
    private int userId;
    private int rid;

	public int getFid()            { return fid;          }
    public int getUserId()			{ return userId;    }
	public int getRid()            { return rid;          }

    public void setFid(int i)        { fid = i;           }
   	public void setUserId(int id)    { userId = id;   }
    public void setRid(int i)        { rid = i;           }
}

