package databeans;

import org.genericdao.PrimaryKey;

@PrimaryKey("ufid")
public class UserIdolBean {
    private int ufid;
    private int userId;
    private int idolId;
    private String userName;
    private String idolName;

	public int getUfid()            { return ufid;          }
    public int getUserId()			{ return userId;    }
    public String getUserName()			{ return userName;    }
	public int getIdolId()            { return idolId;          }
	public String getIdolName()			{ return idolName;    }

    public void setUfid(int i)        { ufid = i;           }
   	public void setUserId(int i)    { userId = i;   }
 	public void setUserName(String s)    { userName = s;   }
    public void setIdolId(int i)        { idolId = i;           }
 	public void setIdolName(String s)    { idolName = s;   }
}
