/* Name: Ke (Kirk) Li; Andrew ID: keli; Course number: 15637; Date: 03/04/2013 */
package databeans;

import org.genericdao.PrimaryKey;

@PrimaryKey("collectionId")
public class CollectionBean {

	private int    collectionId;
	private int    collectionUid;
	private String collectionName;
	private String collectionDescription;
	
	public int    getCollectionId()            { return collectionId;          }
	public int    getCollectionUid()            { return collectionUid;          }
    public String getCollectionName()          { return collectionName;        }
    public String getCollectionDescription()   { return collectionDescription;        }

    public void   setCollectionId(int i)               { collectionId = i;           }
    public void   setCollectionUid(int i)               { collectionUid = i;           }
    public void   setCollectionName(String s)       { collectionName = s;         }
    public void   setCollectionDescription(String s)       { collectionDescription = s;         }

}
