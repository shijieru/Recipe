package databeans;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Random;

import org.genericdao.PrimaryKey;

@PrimaryKey("userId")
public class UserBean {
	private int userId;
	private String userName;
	private String userEmail;
	private String selfIntro;
	private byte[] photo;
	private String contentType;

	private String hashedPassword = "*";
	private int salt = 0;

	public byte[] getPhoto() {
		return photo;
	}

	public void setPhoto(byte[] photo) {
		this.photo = photo;
	}

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public boolean checkPassword(String password) {
		return hashedPassword.equals(hash(password));
	}

	public int getUserId() {
		return userId;
	}
	public String getUserName() {
		return userName;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public String getSelfIntro() {
		return selfIntro;
	}

	public String getHashedPassword() {
		return hashedPassword;
	}
	public int getSalt() {
		return salt;
	}

	public int hashCode() {
		return userName.hashCode();
	}

	public void setUserId(int id) {
		userId = id;
	}
	public void setUserName(String s) {
		userName = s;
	}
	public void setUserEmail(String s) {
		userEmail = s;
	}
	public void setSelfIntro(String s) {
		selfIntro = s;
	}

	public void setHashedPassword(String x) {
		hashedPassword = x;
	}
	public void setPassword(String s) {
		salt = newSalt();
		hashedPassword = hash(s);
	}
	public void setSalt(int x) {
		salt = x;
	}

	private String hash(String clearPassword) {
		if (salt == 0)
			return null;

		MessageDigest md = null;
		try {
			md = MessageDigest.getInstance("SHA1");
		} catch (NoSuchAlgorithmException e) {
			throw new AssertionError(
					"Can't find the SHA1 algorithm in the java.security package");
		}

		String saltString = String.valueOf(salt);

		md.update(saltString.getBytes());
		md.update(clearPassword.getBytes());
		byte[] digestBytes = md.digest();

		// Format the digest as a String
		StringBuffer digestSB = new StringBuffer();
		for (int i = 0; i < digestBytes.length; i++) {
			int lowNibble = digestBytes[i] & 0x0f;
			int highNibble = (digestBytes[i] >> 4) & 0x0f;
			digestSB.append(Integer.toHexString(highNibble));
			digestSB.append(Integer.toHexString(lowNibble));
		}
		String digestStr = digestSB.toString();

		return digestStr;
	}

	private int newSalt() {
		Random random = new Random();
		return random.nextInt(8192) + 1; // salt cannot be zero
	}
}
