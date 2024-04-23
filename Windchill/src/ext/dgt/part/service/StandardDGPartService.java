package ext.dgt.part.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import ext.dgt.common.CommonUtil;
import ext.dgt.common.IBAUtil;
import ext.dgt.part.broker.DGPartBroker;
import ext.ptc.common.PTCCommonHelper;
import wt.doc.WTDocument;
import wt.enterprise.RevisionControlled;
import wt.enterprise._RevisionControlled;
import wt.fc.PersistenceHelper;
import wt.fc.QueryResult;
import wt.folder.Folder;
import wt.folder.FolderHelper;
import wt.iba.value.service.LoadValue;
import wt.inf.container.WTContainerRef;
import wt.lifecycle.LifeCycleHelper;
import wt.org.WTUser;
import wt.part.WTPart;
import wt.part.WTPartHelper;
import wt.part.WTPartMaster;
import wt.part.WTPartTypeInfo;
import wt.pom.Transaction;
import wt.query.QuerySpec;
import wt.query.SearchCondition;
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
		System.out.println("param:::::::::::" + name);
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

			// iba 속성 셋팅--------------

			// checkout
			if (!WorkInProgressHelper.isCheckedOut(part)) {
				part = (WTPart) PTCCommonHelper.service.checkOut(part);
			}
			// iba 속성 셋팅 전 적용
			part = (WTPart) LoadValue.applySoftAttributes(part);

			
			System.out.println("material:::::::::::::::::::::"+material);
			System.out.println("color:::::::::::::::::::::"+color);
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
			System.out.println("material:::::::::::::::::::::"+material);
			System.out.println("color:::::::::::::::::::::"+color);
			IBAUtil.setIBAValueStr(part, "material", material);
			IBAUtil.setIBAValueStr(part, "color", color);
			
			part = (WTPart) PTCCommonHelper.service.checkIn(part);

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

		return null;
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

}
