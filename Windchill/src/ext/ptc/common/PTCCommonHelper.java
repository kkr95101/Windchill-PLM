package ext.ptc.common;

import java.io.Externalizable;
import java.io.IOException;
import java.io.ObjectInput;
import java.io.ObjectOutput;

public class PTCCommonHelper implements Externalizable  {
    static final long serialVersionUID = 1;
    private static final String CLASSNAME = PTCCommonHelper.class.getName();
    public static final PTCCommonService service = wt.services.ServiceFactory.getService(PTCCommonService.class);
    
    public String getConceptualClassname() {
        return CLASSNAME;
    }
	@Override
	public void writeExternal(ObjectOutput out) throws IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void readExternal(ObjectInput in) throws IOException, ClassNotFoundException {
		// TODO Auto-generated method stub
		
	}

}
