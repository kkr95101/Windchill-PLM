package ext.dgt.part;

import com.ptc.windchill.annotations.metadata.Cardinality;
import com.ptc.windchill.annotations.metadata.GenAsBinaryLink;
import com.ptc.windchill.annotations.metadata.GeneratedRole;
import com.ptc.windchill.annotations.metadata.Serialization;
import com.ptc.windchill.annotations.metadata.TableProperties;

import ext.dgt.document.DGTechDoc;
import wt.part.WTPart;
import wt.util.WTException;
import wt.vc.VersionToVersionLink;

@GenAsBinaryLink(superClass=VersionToVersionLink.class,
				serializable = Serialization.EXTERNALIZABLE_BASIC,
				roleA=@GeneratedRole(name="part",type=WTPart.class,cardinality = Cardinality.ONE),
				roleB=@GeneratedRole(name="document",type=DGTechDoc.class,cardinality = Cardinality.ONE_TO_MANY),
				tableProperties=@TableProperties(tableName="partToTechDoc"))
public class PartToTechDoc extends _PartToTechDoc {
	static final long serialVersionUID = 1;
	
	public static PartToTechDoc newPartToTehcDoc(WTPart part, DGTechDoc doc) throws WTException{
		PartToTechDoc instance = new PartToTechDoc();
		instance.initialize(part , doc);
		
		return instance;
	}
}
