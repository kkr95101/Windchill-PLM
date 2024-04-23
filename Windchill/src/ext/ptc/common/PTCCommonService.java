package ext.ptc.common;

import wt.method.RemoteInterface;
import wt.util.WTException;
import wt.vc.wip.Workable;

@RemoteInterface
public interface PTCCommonService {
	// check out
	public Workable checkOut( Workable workable ) throws WTException;
	
	// check in
	public Workable checkIn( Workable workable ) throws WTException;

}
