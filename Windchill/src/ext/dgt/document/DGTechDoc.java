package ext.dgt.document;

import com.ptc.windchill.annotations.metadata.GenAsPersistable;
import com.ptc.windchill.annotations.metadata.GeneratedProperty;

import wt.doc.WTDocument;
import wt.util.WTException;

//모델링 속성추가
@GenAsPersistable(superClass = WTDocument.class, properties = {
		@GeneratedProperty(name = "userName", type = String.class), 
		@GeneratedProperty(name = "userAge", type = String.class) })
public class DGTechDoc extends _DGTechDoc {

	static final long serialVersionUID = 1; //Windchill api를 쓰기 위한것

	public static DGTechDoc newDGTechDoc() throws WTException {
		DGTechDoc instance = new DGTechDoc();
		instance.initialize(); //객체초기화

		return instance;
	}
}
