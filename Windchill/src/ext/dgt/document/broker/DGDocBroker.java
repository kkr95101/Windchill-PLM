package ext.dgt.document.broker;

import wt.doc.WTDocument;

public class DGDocBroker {
	private String name;
	private String state;
	private String type;
	private String version;
	private String iteration;
	private String creator;
	

	public DGDocBroker(WTDocument doc) {
		this.name = doc.getName();
		this.state = doc.getState().toString();
		this.type = doc.getType();
		this.version = doc.getVersionDisplayIdentifier().toString();
		this.iteration = doc.getIterationDisplayIdentifier().toString();
		this.creator = doc.getCreatorName();
	}
	public String getCreator() {
		return creator;
	}

	public void setCreator(String creator) {
		this.creator = creator;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public String getIteration() {
		return iteration;
	}

	public void setIteration(String iteration) {
		this.iteration = iteration;
	}

}
