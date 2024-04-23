package ext.dgt.common;

import wt.enterprise.Master;
import wt.enterprise.RevisionControlled;
import wt.fc.Persistable;
import wt.fc.PersistenceHelper;
import wt.fc.QueryResult;
import wt.fc.ReferenceFactory;
import wt.fc.WTReference;
import wt.inf.container.WTContainerHelper;
import wt.inf.container.WTContainerRef;
import wt.util.WTException;
import wt.vc.VersionControlHelper;

public class CommonUtil {
	public static WTContainerRef getProductContainerRef(String orgName, String productName) {

		WTContainerRef containerRef = null;

		try {
			containerRef = getContainerRef(orgName, productName);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return containerRef;
	}

	public static WTContainerRef getContainerRef(String orgName, String productName) {

		WTContainerRef containerRef = null;

		try {
			if (productName != null && !"".equals(productName))
				containerRef = WTContainerHelper.service.getByPath(
						"/wt.inf.container.OrgContainer=" + orgName + "/wt.pdmlink.PDMLinkProduct=" + productName);
			else
				containerRef = WTContainerHelper.service.getByPath("/wt.inf.container.OrgContainer=" + orgName);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return containerRef;
	}

	// 테이블로 oid가져오는거
	public static String getOIDString(Persistable per) {
		if (per == null)
			return null;

		return PersistenceHelper.getObjectIdentifier(per).getStringValue();
	}

	public static boolean isNotNull(String str) {
		boolean result = false;
		if (!checkNull(str, "").equals("")) {
			result = true;
		}

		return result;
	}

	// null check
	private static String checkNull(String str, String def) {
		if (str == null || "null".equals(str)) {
			str = def;
		} else {
			str = str.trim();
		}

		return str;
	}

	// oid로 객체 가져옴.
	public static Persistable getPersistable(String oid) throws WTException {
		Persistable persistable = null;
		if (isNotNull(oid)) {
			ReferenceFactory referencefactory = new ReferenceFactory();
			WTReference wtreference = referencefactory.getReference(oid);
			if (wtreference != null) {
				persistable = wtreference.getObject();
			}
		}
		return persistable;
	}

	public static long getLongOid(Persistable persistable) throws WTException {
		return PersistenceHelper.getObjectIdentifier(persistable).getId();
	}

	public static String nullCheck(String str) {
		return checkNull(str, "");
	}

	// null값이면 "" 넣어줌 null이면 true 반환이면 false
	public static boolean isNull(String str) {
		boolean result = false;
		if ("".equals(checkNull(str))) {
			result = true;
		}
		return result;
	}

	public static String checkNull(String str) {
		return checkNull(str, "");
	}
	
	//최신버전
	public static boolean isLatestVersion(RevisionControlled obj) throws Exception {
		RevisionControlled lastObject = (RevisionControlled) getLatesObject((Master) obj.getMaster());
		if (lastObject.getVersionIdentifier().getSeries().greaterThan(obj.getVersionIdentifier().getSeries())) {
			return false;
		}
		return true;
	}

	public static RevisionControlled getLatesObject(Master master) throws Exception {
		RevisionControlled rc = null;
		QueryResult qr = VersionControlHelper.service.allVersionsOf(master);
		while (qr.hasMoreElements()) {
			RevisionControlled obj = (RevisionControlled) qr.nextElement();
			if (rc == null || obj.getVersionIdentifier().getSeries().greaterThan(rc.getVersionIdentifier().getSeries())) {
				rc = obj;
			} 
		}
		return rc;

	}

}
