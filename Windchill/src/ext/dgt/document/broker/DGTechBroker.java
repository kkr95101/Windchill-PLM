 package ext.dgt.document.broker;

import ext.dgt.common.CommonUtil;
import ext.dgt.document.DGTechDoc;

public class DGTechBroker {
	
	private String name; //name
	private String displayName; //<a href 주소 클릭시 controller로 이동+ parametar를 넣으려고
	private String description;
	private String userName;
	private String userAge;
	private String idA2A2;
	private String iteration;
	private String oid;
	private String userSex;
	private String userOrg;
	
	public DGTechBroker(DGTechDoc dgTechDoc) { //생성자
		this.name = dgTechDoc.getName();
		this.displayName = "<a href='/Windchill/servlet/dgt/doc/docDetail?idA2A2=" + dgTechDoc.getPersistInfo().getObjectIdentifier().getId()+"'>"+ dgTechDoc.getName()+"</a>";
		this.description = dgTechDoc.getDescription();
		this.userName = dgTechDoc.getUserName();
		this.userAge = dgTechDoc.getUserAge();
		this.oid=CommonUtil.getOIDString(dgTechDoc); //oid찾는 method
		this.idA2A2=String.valueOf(dgTechDoc.getPersistInfo().getObjectIdentifier().getId());
		this.iteration= dgTechDoc.getIterationDisplayIdentifier().toString();
		this.userSex = dgTechDoc.getTypeInfoWTDocument().getPtc_str_1();
		this.userOrg = dgTechDoc.getTypeInfoWTDocument().getPtc_str_2();
	}   
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserAge() {
		return userAge;
	}
	public void setUserAge(String userAge) {
		this.userAge = userAge;
	}

	public String getIdA2A2() {
		return idA2A2;
	}

	public void setIdA2A2(String idA2A2) {
		this.idA2A2 = idA2A2;
	}

	public String getOid() {
		return oid;
	}

	public void setOid(String oid) {
		this.oid = oid;
	}

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}


	public String getIteration() {
		return iteration;
	}

	public void setIteration(String iteration) {
		this.iteration = iteration;
	}

	public String getUserSex() {
		return userSex;
	}

	public void setUserSex(String userSex) {
		this.userSex = userSex;
	}

	public String getUserOrg() {
		return userOrg;
	}

	public void setUserOrg(String userOrg) {
		this.userOrg = userOrg;
	}
	
}
