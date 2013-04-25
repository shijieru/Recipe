package databeans;

import org.genericdao.PrimaryKey;

@PrimaryKey("hdId")
public class HaveDoneBean {
    private int hdId;
    private int userId;
    private int rid;

    public int getHdId()			{ return hdId;    }
    public int getUserId()			{ return userId;    }
	public int getRid()            { return rid;          }

    public void setHdId(int i)        { hdId = i;       }
   	public void setUserId(int id)    { userId = id;   }
    public void setRid(int i)        { rid = i;       }
}
