package ext.ptc.common;

import java.io.Serializable;
import org.apache.ibatis.exceptions.PersistenceException;
import org.springframework.stereotype.Service;
import wt.folder.Folder;
import wt.org.WTPrincipal;
import wt.services.StandardManager;
import wt.session.SessionHelper;
import wt.util.WTException;
import wt.util.WTPropertyVetoException;
import wt.vc.wip.CheckoutLink;
import wt.vc.wip.WorkInProgressException;
import wt.vc.wip.WorkInProgressHelper;
import wt.vc.wip.Workable;

@Service
public class StandardPTCCommonService extends StandardManager implements PTCCommonService, Serializable  {
	private static final long serialVersionUID = 1L;
	private static final String CLASSNAME = StandardPTCCommonService.class.getName();
	
    public String getConceptualClassname() {
        return CLASSNAME;
    }

	public static StandardPTCCommonService newStandardPTCCommonService() throws WTException {
		StandardPTCCommonService instance = new StandardPTCCommonService();
		instance.initialize();
		return instance;
	}
	
	// check out
	@Override
	public Workable checkOut(Workable workable) throws WTException {
        Folder folder = WorkInProgressHelper.service.getCheckoutFolder();
        WTPrincipal wtprincipal = SessionHelper.getPrincipal();
        try {
            if ( WorkInProgressHelper.isCheckedOut( workable, wtprincipal ) ) {
                workable = WorkInProgressHelper.service.workingCopyOf( workable );
            } else {
                if ( !WorkInProgressHelper.isCheckedOut( workable ) ) {
                    Workable latestworkable = (Workable) wt.vc.VersionControlHelper.service.getLatestIteration( (wt.vc.Iterated) workable, false );
                    CheckoutLink checkOutLink = WorkInProgressHelper.service.checkout( latestworkable, folder, null );
                    workable = (Workable) checkOutLink.getWorkingCopy();
                } else {
                    workable = WorkInProgressHelper.service.originalCopyOf( workable );
                }
            }
        } catch ( WTPropertyVetoException wtpropertyvetoexception ) {
            throw new WTException( wtpropertyvetoexception );
        } catch ( WorkInProgressException workinprogressexception ) {
            throw new WTException( workinprogressexception );
        } catch ( PersistenceException persistenceexception ) {
            throw new WTException( persistenceexception );
        } catch ( WTException wtexception ) {
            throw new WTException( wtexception );
        }
        return workable;
	}

	// check in
	@Override
	public Workable checkIn(Workable workable) throws WTException {
		WTPrincipal wtprincipal = SessionHelper.getPrincipal();
        if ( WorkInProgressHelper.isCheckedOut( workable, wtprincipal ) ) {
            if ( !WorkInProgressHelper.isWorkingCopy( workable ) ) {
                workable = WorkInProgressHelper.service.workingCopyOf( workable );
            }
            try {
                workable = WorkInProgressHelper.service.checkin( workable, "" );
            } catch ( Exception e ) {
                throw new WTException( e );
            }

        } else {
            workable = WorkInProgressHelper.service.originalCopyOf( workable );
        }
        return workable;
	}

}
