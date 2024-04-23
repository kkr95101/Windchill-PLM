package ext.dgt.document;

import com.ptc.windchill.annotations.metadata.GenAsPersistable;
import com.ptc.windchill.annotations.metadata.GeneratedProperty;
import wt.doc.WTDocument;
import wt.util.WTException;

@GenAsPersistable(superClass = WTDocument.class, properties = {
		@GeneratedProperty(name = "place", type = String.class),
		@GeneratedProperty(name = "time", type = String.class)
})
public class DGTestDoc extends _DGTestDoc {
	static final long serialVersionUID = 1;

	public static DGTestDoc newDGTestDoc() throws WTException {
		DGTestDoc instance = new DGTestDoc();
		instance.initialize();
		return instance;
	}
}