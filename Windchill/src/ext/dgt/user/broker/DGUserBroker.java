package ext.dgt.user.broker;

import ext.dgt.common.CommonUtil;
import wt.org.WTUser;

public class DGUserBroker {
	private String fullName;
	private String email;
	private String org;
	private String regDate;
	private String displayName;

	public DGUserBroker(WTUser user) throws Exception {
		this.fullName = user.getFullName();
		this.email = user.getEMail();
		this.org =CommonUtil.checkNull(user.getOrganizationName());
		this.regDate = user.getCreateTimestamp().toString();
		this.displayName = "<a href='/Windchill/servlet/dgt/user/viewUser2?fullName=" + user.getFullName() + "'>"
				+ user.getFullName() + "</a>";
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getOrg() {
		return org;
	}

	public void setOrg(String org) {
		this.org = org;
	}

	public String getRegDate() {
		return regDate;
	}

	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

}
