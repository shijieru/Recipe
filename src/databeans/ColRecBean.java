package databeans;

import org.genericdao.PrimaryKey;

@PrimaryKey("crId")
public class ColRecBean {
    private int crId ;
    private int collectionId ;
    private int rid;

    public int getCrId()   { return crId;    }
    public int getCollectionId()   { return collectionId;    }
	public int getRid()            { return rid;          }

   	public void setCrId(int i)    { crId = i;   }
   	public void setCollectionId(int i)    { collectionId = i;   }
    public void setRid(int i)             { rid = i;           }
}
