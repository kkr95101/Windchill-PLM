package ext.dgt.part.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import ext.dgt.common.CommonUtil;
import ext.dgt.common.IBAUtil;
import ext.dgt.document.DGTechDoc;
import ext.dgt.document.broker.DGTechBroker;
import ext.dgt.part.PartToTechDoc;
import ext.dgt.part.broker.DGPartBroker;
import ext.ptc.common.PTCCommonHelper;
import wt.doc.WTDocument;
import wt.doc.WTDocumentMaster;
import wt.enterprise.RevisionControlled;
import wt.enterprise._RevisionControlled;
import wt.fc.Persistable;
import wt.fc.PersistenceHelper;
import wt.fc.PersistenceServerHelper;
import wt.fc.QueryResult;
import wt.fc.ReferenceFactory;
import wt.folder.Folder;
import wt.folder.FolderHelper;
import wt.iba.value.service.LoadValue;
import wt.inf.container.WTContainerRef;
import wt.lifecycle.LifeCycleHelper;
import wt.org.WTUser;
import wt.part.WTPart;
import wt.part.WTPartDescribeLink;
import wt.part.WTPartHelper;
import wt.part.WTPartMaster;
import wt.part.WTPartReferenceLink;
import wt.part.WTPartTypeInfo;
import wt.pom.Transaction;
import wt.query.QuerySpec;
import wt.query.SearchCondition;
import wt.session.SessionContext;
import wt.session.SessionHelper;
import wt.util.WTException;
import wt.vc.views.View;
import wt.vc.views.ViewHelper;
import wt.vc.wip.WorkInProgressHelper;

@Service
public class StandardDGPartService implements DGPartService {

	@Override
	public List<DGPartBroker> dgPartList() throws Exception {
		WTUser currentUser = (WTUser) SessionHelper.manager.getPrincipal();
		QuerySpec query = new QuerySpec();
		int index = query.addClassList(WTPart.class, true);
		query.appendWhere(new SearchCondition(WTPart.class, "iterationInfo.latest", "TRUE"), new int[] { index });
		query.setAdvancedQueryEnabled(true);
		System.out.println(query.toString());
		QueryResult qr = PersistenceHelper.manager.find(query);
		List<DGPartBroker> partList = new ArrayList<DGPartBroker>();
		DGPartBroker broker = null;
		while (qr.hasMoreElements()) {
			Object[] obj = (Object[]) qr.nextElement();
			if (obj[0] instanceof WTPart) {
				WTPart tempPart = (WTPart) obj[0];
				broker = new DGPartBroker(tempPart);
				partList.add(broker);
			}
		}
		return partList;
	}

	@Override
	public List<DGPartBroker> dgPartSearch(Map<String, Object> param) throws Exception {

		WTUser currentUser = (WTUser) SessionHelper.manager.getPrincipal();
		QuerySpec query = new QuerySpec();
		int index = query.addClassList(WTPart.class, true);
		String name = (String) param.get("name");
		query.appendWhere(new SearchCondition(WTPart.class, "iterationInfo.latest", "TRUE"), new int[] { index });
		query.appendAnd();
		query.appendWhere(new SearchCondition(WTPart.class, "master>name", SearchCondition.LIKE, "%" + name + "%"),
				new int[] { index });
		query.setAdvancedQueryEnabled(true);
		System.out.println("dgPartSearch:::::::::::::::::" + query.toString());
		QueryResult qr = PersistenceHelper.manager.find(query);
		List<DGPartBroker> partList = new ArrayList<DGPartBroker>();
		DGPartBroker broker = null;
		while (qr.hasMoreElements()) {
			Object[] obj = (Object[]) qr.nextElement();
			if (obj[0] instanceof WTPart) {
				WTPart tempPart = (WTPart) obj[0];
				if (CommonUtil.isLatestVersion((RevisionControlled) tempPart)) {
				}
				broker = new DGPartBroker(tempPart);
				partList.add(broker);
			}
		}
		return partList;
	}

	@Override
	public WTPart dgPartSave(Map<String, Object> param) throws Exception {
		WTPart part = null;
		String name = "";
		String material = "";
		String color = "";
		Transaction transaction = new Transaction();

		try {
			transaction.start();

			part = part.newWTPart();

			WTContainerRef containerRef = CommonUtil.getContainerRef("DIGITEK", "testProduct");

			name = CommonUtil.checkNull((String) param.get("name"));
			material = CommonUtil.checkNull((String) param.get("material"));
			color = CommonUtil.checkNull((String) param.get("color"));

			part.setName(name);

			part = (WTPart) LifeCycleHelper.setLifeCycle(part,
					LifeCycleHelper.service.getLifeCycleTemplate(("basic"), containerRef));

			// view
			View view = ViewHelper.service.getView("Design");
			ViewHelper.assignToView(part, view);

			// enditem 유무
//			part.setEndItem(true);

			Folder folder = FolderHelper.service.getFolder("/Default/testPart", containerRef);

			FolderHelper.assignLocation(part, folder);

			part = (WTPart) PersistenceHelper.manager.save(part);

			// 관련문서 저장
			String docArrayStr = (String) param.get("docArray");
			String[] docOidArr = docArrayStr.split("#");

			// 사용자 세션 저장
			SessionContext oid_session = null;
			oid_session = SessionContext.newContext();

			// 관리자 권한변경
			SessionHelper.manager.setAdministrator();

			String partOid = CommonUtil.getOIDString(part);
			System.out.println("partOid::::::::::::" + partOid);

			// 설명자 문서, 참조문서
			if (docOidArr != null && docOidArr.length > 0) {
				DGTechDoc dgTechDoc = null;
				for (int i = 0; i < docOidArr.length; i++) {
					String docOid = docOidArr[i];
					dgTechDoc = (DGTechDoc) CommonUtil.getPersistable(docOid);

					// PartToTechDoc
					savePartToTechDoc(dgTechDoc, part);

//					설명자 문서
//					savePartDescribeLink(dgTechDoc, partOid);
//					참조 문서
//					savePartReferenceLink(dgTechDoc, partOid);
				}
			}
			SessionContext.setContext(oid_session);

			// iba 속성 셋팅--------------

			// checkout
			if (!WorkInProgressHelper.isCheckedOut(part)) {
				part = (WTPart) PTCCommonHelper.service.checkOut(part);
			}
			// iba 속성 셋팅 전 적용
			part = (WTPart) LoadValue.applySoftAttributes(part);

			// iba 속성 저장
			IBAUtil.setIBAValueStr(part, "material", material);
			IBAUtil.setIBAValueStr(part, "color", color);

			// checkin
			part = (WTPart) PTCCommonHelper.service.checkIn(part);

			// iba 속성 셋팅--------------

			transaction.commit();
			transaction = null;

		} catch (Exception e) {
			throw new WTException(e);
		} finally {
			if (transaction != null) {
				transaction.rollback();
				transaction = null;
			}
		}

		return part;
	}

	@Override
	public DGPartBroker dgPartDetail(Map<String, Object> param) throws Exception {
		WTUser currentUser = (WTUser) SessionHelper.manager.getPrincipal();
		QuerySpec query = new QuerySpec();
		int index = query.addClassList(WTPart.class, true);
		Long idA2A2 = Long.valueOf((String) param.get("idA2A2"));
		System.out.println("param:::::::::::" + idA2A2);
		query.appendWhere(new SearchCondition(WTPart.class, "iterationInfo.latest", "TRUE"), new int[] { index });
		query.appendAnd();
		query.appendWhere(new SearchCondition(WTPart.class, "thePersistInfo.theObjectIdentifier.id",
				SearchCondition.EQUAL, idA2A2), new int[] { index });
		query.setAdvancedQueryEnabled(true);
		System.out.println("dgPartSearch:::::::::::::::::" + query.toString());
		QueryResult qr = PersistenceHelper.manager.find(query);
		DGPartBroker broker = null;
		Object[] obj = (Object[]) qr.nextElement();
		if (obj[0] instanceof WTPart) {
			WTPart tempPart = (WTPart) obj[0];
			if (CommonUtil.isLatestVersion((RevisionControlled) tempPart)) {
			}
			broker = new DGPartBroker(tempPart);
		}
		return broker;
	}

	@Override
	public WTPart dgPartUpdate(Map<String, Object> param) throws Exception {
		WTPart part = null;
		String name = "";
		String oid = CommonUtil.checkNull((String) param.get("oid"));
		String material = null;
		String color = null;
		WTUser currentUser = (WTUser) SessionHelper.manager.getPrincipal();
		Transaction transaction = new Transaction();

		try {
			transaction.start();

			part = (WTPart) CommonUtil.getPersistable(oid);
			if (!WorkInProgressHelper.isCheckedOut(part)) {
				part = (WTPart) PTCCommonHelper.service.checkOut(part);
			}
			name = CommonUtil.checkNull((String) param.get("name"));
			material = CommonUtil.checkNull((String) param.get("material"));
			color = CommonUtil.checkNull((String) param.get("color"));
			WTPartMaster master = (WTPartMaster) ((_RevisionControlled) part).getMaster();
			master = WTPartHelper.service.changeWTPartMasterIdentity(master, name, part.getNumber(), null);

			part = (WTPart) PersistenceHelper.manager.save(part);

			// iba 속성 셋팅--------------

			// iba 속성 셋팅 전 적용
			part = (WTPart) LoadValue.applySoftAttributes(part);

			// iba 속성 저장
			System.out.println("material:::::::::::::::::::::" + material);
			System.out.println("color:::::::::::::::::::::" + color);
			IBAUtil.setIBAValueStr(part, "material", material);
			IBAUtil.setIBAValueStr(part, "color", color);

			part = (WTPart) PTCCommonHelper.service.checkIn(part);
			
			//관련문서 삭제
			deleteApprovalToTechDoc(part);
			
			// 관련문서 저장
			String docArrayStr = (String) param.get("docArray");
			String[] docOidArr = docArrayStr.split("#");
			
			// 설명자 문서, 참조문서
			if (docOidArr != null && docOidArr.length > 0) {
				DGTechDoc dgTechDoc = null;
				for (int i = 0; i < docOidArr.length; i++) {
					String docOid = docOidArr[i];
					dgTechDoc = (DGTechDoc) CommonUtil.getPersistable(docOid);
					 savePartToTechDoc(dgTechDoc, part);
				}
			}

			transaction.commit();

			transaction = null;
		} catch (Exception e) {
			throw new WTException(e);
		} finally {
			if (transaction != null) {
				transaction.rollback();
				transaction = null;
			}
		}

		return part;
	}

	@Override
	public void dgPartDelete(Map<String, Object> param) throws Exception {
		WTPart part = null;
		String oid = CommonUtil.checkNull((String) param.get("oid"));
		WTUser currentUser = (WTUser) SessionHelper.manager.getPrincipal();
		Transaction transaction = new Transaction();

		try {
			transaction.start();
			part = (WTPart) CommonUtil.getPersistable(oid);
			if (WorkInProgressHelper.isCheckedOut(part)) {
				PTCCommonHelper.service.checkIn(part);
			}
			deleteApprovalToTechDoc(part);
			PersistenceHelper.manager.delete(part);
			transaction.commit();

			transaction = null;
		} catch (Exception e) {
			throw new WTException(e);
		} finally {
			if (transaction != null) {
				transaction.rollback();
				transaction = null;
			}
		}

	}

	// 설명자 문서(describe link)
	public static void savePartDescribeLink(DGTechDoc techDoc, String partOid) throws WTException {
		ReferenceFactory rf = null;
		WTPartDescribeLink partDesLink = null;
		try {
			rf = new ReferenceFactory();
			WTPart part = (WTPart) rf.getReference(partOid).getObject();
			partDesLink = WTPartDescribeLink.newWTPartDescribeLink(part, techDoc);

			PersistenceServerHelper.manager.insert(partDesLink);
		} catch (Exception e) {
			throw new WTException(e);
		}
	}

	// 참조문서(reference link)
	public static void savePartReferenceLink(DGTechDoc techDoc, String partOid) throws WTException {
		ReferenceFactory rf = null;
		WTPartReferenceLink partRefLink = null;
		WTDocumentMaster master = (WTDocumentMaster) ((_RevisionControlled) techDoc).getMaster(); // 최신리비전가져오기

		try {
			rf = new ReferenceFactory();
			WTPart part = (WTPart) rf.getReference(partOid).getObject();
			partRefLink = WTPartReferenceLink.newWTPartReferenceLink(part, master);

			PersistenceServerHelper.manager.insert(partRefLink);
		} catch (Exception e) {
			throw new WTException(e);
		}
	}

	public static void savePartToTechDoc(DGTechDoc techDoc, WTPart part) throws WTException {
		PartToTechDoc link = null;

		try {
			link = PartToTechDoc.newPartToTehcDoc(part, techDoc); // 모델링한 객체의 생성자
			PersistenceServerHelper.manager.insert(link);
		} catch (Exception e) {
			throw new WTException();
		}
	}

	@Override
	public ArrayList<DGTechBroker> getLinkTechDocList(WTPart part) throws Exception {
		DGPartBroker broker = new DGPartBroker(part);
		ArrayList<DGTechDoc> docList = broker.setOthers(part);
		ArrayList<DGTechBroker> brokerList = new ArrayList<DGTechBroker>();

		for (DGTechDoc doc : docList) {
			DGTechBroker techBroker = new DGTechBroker(doc);

			brokerList.add(techBroker);
		}
		return brokerList;
	}
	
	//관련문서 삭제
	public void deleteApprovalToTechDoc(WTPart part) throws WTException {
		try {
			QueryResult qr = PersistenceHelper.manager.navigate(part, PartToTechDoc.DOCUMENT_ROLE, PartToTechDoc.class, false);
			while (qr.hasMoreElements()) {
				PersistenceServerHelper.manager.remove((Persistable) qr.nextElement());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
