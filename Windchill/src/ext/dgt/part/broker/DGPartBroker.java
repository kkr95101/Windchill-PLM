package ext.dgt.part.broker;

import ext.dgt.common.CommonUtil;
import ext.dgt.common.IBAUtil;
import wt.part.WTPart;

public class DGPartBroker {
	
	private String name;
	private String displayName;
	private String oid;
	private String idA2A2;
	private String iteration;
	private String partType;
	private String material;
	private String color;
	
	public DGPartBroker(WTPart wtPart) throws Exception {
		this.name = wtPart.getName();
		this.displayName = "<a href='/Windchill/servlet/dgt/part/partDetail?idA2A2=" + wtPart.getPersistInfo().getObjectIdentifier().getId()+"'>"+wtPart.getName()+"</a>";
		this.idA2A2 = String.valueOf(wtPart.getPersistInfo().getObjectIdentifier().getId());
		this.iteration =wtPart.getIterationDisplayIdentifier().toString();
		this.partType = String.valueOf(wtPart.getPartType());
		this.oid = CommonUtil.getOIDString(wtPart);
		this.material = IBAUtil.getIBAValueStr(wtPart, "material");
		this.color = IBAUtil.getIBAValueStr(wtPart, "color");
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getOid() {
		return oid;
	}

	public void setOid(String oid) {
		this.oid = oid;
	}

	public String getIdA2A2() {
		return idA2A2;
	}

	public void setIdA2A2(String idA2A2) {
		this.idA2A2 = idA2A2;
	}

	public String getIteration() {
		return iteration;
	}

	public void setIteration(String iteration) {
		this.iteration = iteration;
	}

	public String getPartType() {
		return partType;
	}

	public void setPartType(String partType) {
		this.partType = partType;
	}

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	public String getMaterial() {
		return material;
	}

	public void setMaterial(String material) {
		this.material = material;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}
}
