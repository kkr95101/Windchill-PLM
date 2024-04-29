package ext.dgt.document;

import com.ptc.windchill.annotations.metadata.Cardinality;
import com.ptc.windchill.annotations.metadata.GenAsBinaryLink;
import com.ptc.windchill.annotations.metadata.GeneratedRole;
import com.ptc.windchill.annotations.metadata.Serialization;
import com.ptc.windchill.annotations.metadata.TableProperties;

import wt.fc.ObjectToObjectLink;
import wt.part.WTPart;
import wt.util.WTException;

@GenAsBinaryLink(superClass=ObjectToObjectLink.class,
	serializable = Serialization.EXTERNALIZABLE_BASIC,
	roleA=@GeneratedRole(name="part",type=WTPart.class,cardinality = Cardinality.ONE),
	roleB=@GeneratedRole(name="document",type=DGTechDoc.class,cardinality = Cardinality.ONE_TO_MANY),
	tableProperties=@TableProperties(tableName="PartToTechDocObj"))

public class PartToTechDocObj extends _PartToTechDocObj{
	static final long serialVersionUID = 1;
	
	public static PartToTechDocObj newPartToTechDocObj(WTPart part, DGTechDoc doc)throws WTException {
		PartToTechDocObj instance = new PartToTechDocObj();
		instance.initialize(part,doc);
		return instance;
	}
}
