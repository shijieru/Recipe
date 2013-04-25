package databeans;

import org.genericdao.PrimaryKey;

@PrimaryKey("wtdId")
public class WantToDoBean {
    private int wtdId;
    private int userId;
    private int rid;

    public int getWtdId()			{ return wtdId;    }
    public int getUserId()			{ return userId;    }
	public int getRid()            { return rid;          }

   	public void setWtdId(int id)    { wtdId = id;   }
   	public void setUserId(int id)    { userId = id;   }
    public void setRid(int i)        { rid = i;           }
}

