package databeans;

import org.genericdao.PrimaryKey;

@PrimaryKey("ingredientId")
public class IngredientBean {
	private int ingredientId = -1;
	private int rid = -1;
	private String ingredientName = null;
	private String ingredientAmount = null;
	private boolean main;

	public boolean isMain() {
		return main;
	}
	public void setMain(boolean main) {
		this.main = main;
	}
	public int getRid() {
		return rid;
	}
	public int getIngredientId() {
		return ingredientId;
	}
	public String getIngredientName() {
		return ingredientName;
	}
	public String getIngredientAmount() {
		return ingredientAmount;
	}

	public void setRid(int i) {
		rid = i;
	}
	public void setIngredientId(int i) {
		ingredientId = i;
	}
	public void setIngredientName(String s) {
		ingredientName = s;
	}
	public void setIngredientAmount(String s) {
		ingredientAmount = s;
	}
}