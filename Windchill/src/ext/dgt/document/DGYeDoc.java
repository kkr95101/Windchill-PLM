package ext.dgt.document;

import com.ptc.windchill.annotations.metadata.GenAsPersistable;
import com.ptc.windchill.annotations.metadata.GeneratedProperty;
import com.ptc.windchill.annotations.metadata.PropertyConstraints;

import wt.doc.WTDocument;
import wt.util.WTException;

@GenAsPersistable(superClass=WTDocument.class,properties= {
		@GeneratedProperty(name="userName",type=String.class, constraints = @PropertyConstraints(upperLimit = 2000)), // 추가할 속성
		@GeneratedProperty(name="userAge",type=String.class)
})
public class DGYeDoc extends _DGYeDoc {
	static final long serialVersionUID = 1;
	
	public static DGYeDoc newDGTechDoc() throws WTException {
		DGYeDoc instance = new DGYeDoc();
		instance.initialize();
		return instance;
	}
}