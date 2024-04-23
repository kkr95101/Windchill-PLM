package ext.dgt.document.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;


import ext.dgt.common.CommonUtil;
import ext.dgt.document.DGTechDoc;
import ext.dgt.document.broker.DGDocBroker;
import ext.dgt.document.broker.DGTechBroker;
import ext.ptc.common.PTCCommonHelper;
import wt.doc.WTDocument;
import wt.doc.WTDocumentHelper;
import wt.doc.WTDocumentMaster;
import wt.doc.WTDocumentTypeInfo;
import wt.enterprise.Master;
import wt.enterprise.RevisionControlled;
import wt.enterprise._RevisionControlled;
import wt.fc.PersistenceHelper;
import wt.fc.QueryResult;
import wt.folder.Folder;
import wt.folder.FolderHelper;
import wt.inf.container.WTContainerRef;
import wt.lifecycle.LifeCycleHelper;
import wt.org.WTUser;
import wt.pom.Transaction;
import wt.query.QuerySpec;
import wt.query.SearchCondition;
import wt.session.SessionHelper;
import wt.util.WTException;
import wt.vc.VersionControlHelper;
import wt.vc.wip.WorkInProgressHelper;

@Service
public class StandardDGDocService implements DGDocService {

	@Override
	public List<DGTechBroker> getDocList() throws Exception {
		// 유저세션 활성화
		WTUser currentUser = (WTUser) SessionHelper.manager.getPrincipal();
		QuerySpec query = new QuerySpec();
		int idx = query.appendClassList(DGTechDoc.class, true);

		// new SearchCondition(타겟클래스,"컬럼명", "값")
		query.appendWhere(new SearchCondition(DGTechDoc.class, "iterationInfo.latest", "TRUE"), new int[] { idx });
		query.setAdvancedQueryEnabled(true); // 고급 쿼리 기능 활성화
		System.out.println(query.toString());

		QueryResult qr = PersistenceHelper.manager.find(query);

		List<DGTechBroker> docList = new ArrayList<>();
		DGTechBroker broker = null;

		while (qr.hasMoreElements()) {
			Object[] obj = (Object[]) qr.nextElement();
			if (obj[0] instanceof DGTechDoc) {
				DGTechDoc document = (DGTechDoc) obj[0];
				broker = new DGTechBroker(document);
				docList.add(broker);
			}
		}
		return docList;
	}

	@Override
	public QuerySpec makeQuerySpec(HashMap<String, String> map) throws WTException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public DGTechDoc saveDoc(Map<String, Object> map) throws Exception {
		DGTechDoc doc = null;
		String name = "";
		String description = "";
		String userName = "";
		String userAge = "";
		String userSex = "";
		String userOrg = "";
		Transaction transaction = new Transaction();

		try {
			// 트랜잭션 시작
			transaction.start();

			// 객체 생성
			doc = doc.newDGTechDoc(); // 객체 초기화하는 생성자

			// 조직컨테이너 설정
			WTContainerRef containerRef = CommonUtil.getContainerRef("DIGITEK", "testProduct");

			// 파라미터 값 세팅
			name = CommonUtil.checkNull((String) map.get("name"));
			description = CommonUtil.checkNull((String) map.get("description"));
			userName = CommonUtil.checkNull((String) map.get("userName"));
			userAge = CommonUtil.checkNull((String) map.get("userAge"));
			userSex = CommonUtil.checkNull((String) map.get("userSex"));
			userOrg = CommonUtil.checkNull((String) map.get("userOrg"));

			doc.setName(name); // _DGTechDoc에 set이 들어있음
			doc.setDescription(description);
			doc.setUserName(userName);
			doc.setUserAge(userAge);
			WTDocumentTypeInfo info = new WTDocumentTypeInfo();
			//성별
			info.setPtc_str_1(userSex);
			//조직
			info.setPtc_str_2(userOrg);
			
			doc.setTypeInfoWTDocument(info); //속성추가한것에 setter가 없어서 한것
			
			// 라이프사이클 템플릿 지정
			doc = (DGTechDoc) LifeCycleHelper.setLifeCycle(doc,
					LifeCycleHelper.service.getLifeCycleTemplate(("basic"), containerRef));

			// 저장할 폴더 객체 생성 //Default에 DocTechDoc란 의미
			Folder folder = FolderHelper.service.getFolder("/Default/DGTechDoc", containerRef);

			// 객체 저장 위치 지정
			FolderHelper.assignLocation(doc, folder);

			// 저장
			doc = (DGTechDoc) PersistenceHelper.manager.save(doc);

			// 커밋
			transaction.commit();

			// 트랜잭션 초기화
			transaction = null;

		} catch (Exception e) {
			throw new WTException(e);

		} finally {
			if (transaction != null) { // 실패시 트랜잭션이 안비어있기때문에 롤백하고 초기화 다시해주는거
				transaction.rollback();
				transaction = null;
			}
		}
		return doc;
	}

	@Override
	public List<DGTechBroker> getDGdoc(Map<String, Object> param) throws Exception {
		WTUser currentUser = (WTUser) SessionHelper.manager.getPrincipal();
		QuerySpec qs = new QuerySpec();
		int index = qs.addClassList(DGTechDoc.class, true);
		String name = (String) param.get("name");
		qs.appendWhere(new SearchCondition(DGTechDoc.class, "master>name", SearchCondition.EQUAL, name),
				new int[] { index });
		qs.appendAnd();
		qs.appendWhere(new SearchCondition(DGTechDoc.class, "iterationInfo.latest", "TRUE"), new int[] { index }); // 최신iteration가져오기
		qs.setAdvancedQueryEnabled(true); // 고급 쿼리 기능 활성화0
		System.out.println("query:::::::::::" + qs.toString());
		QueryResult qr = PersistenceHelper.manager.find(qs);
		DGTechBroker doc = null;
		List<DGTechBroker> docList = new ArrayList<DGTechBroker>();
		while (qr.hasMoreElements()) {
			Object[] obj = (Object[]) qr.nextElement();
			if (obj[0] instanceof DGTechDoc) {
				DGTechDoc tempDoc = (DGTechDoc) obj[0];
				if (CommonUtil.isLatestVersion((RevisionControlled) tempDoc)) {// 최신version가져오기
					doc = new DGTechBroker(tempDoc);
					docList.add(doc);
					System.out.println("docList:::::::::::::::" + docList);
				}
			}
		}
		return docList;
	}

	@Override
	public DGTechBroker getDetail(Map<String, Object> param) throws Exception {

		QuerySpec qs = new QuerySpec();
		int index = qs.addClassList(DGTechDoc.class, true);
		Long idA2A2 = Long.valueOf((String) param.get("idA2A2"));
		qs.appendWhere(new SearchCondition(DGTechDoc.class, "thePersistInfo.theObjectIdentifier.id",
				SearchCondition.EQUAL, idA2A2), new int[] { index });
		qs.setAdvancedQueryEnabled(true);
		QueryResult qr = PersistenceHelper.manager.find(qs);
		DGTechBroker broker = null;
		Object[] obj = (Object[]) qr.nextElement();
		if (obj[0] instanceof DGTechDoc) {
			DGTechDoc tempDoc = (DGTechDoc) obj[0];
			broker = new DGTechBroker(tempDoc);
		}
		return broker;
	}

	@Override
	public DGTechDoc updateDoc(Map<String, Object> param) throws Exception {
		DGTechDoc doc = null;
		String name = "";
		String description = "";
		String userName = "";
		String userAge = "";
		String userSex = "";
		String userOrg = "";
		String oid = CommonUtil.checkNull((String) param.get("oid"));
		System.out.println(oid+"::::oid");
		WTUser currentUser = (WTUser) SessionHelper.manager.getPrincipal(); // 현재로그인한 사용자 가져오기
		Transaction transaction = new Transaction();

		try {
			// 트랜잭션 시작
			transaction.start();
			
			doc  = (DGTechDoc) CommonUtil.getPersistable(oid);
			// 객체 체크아웃 상태만들기
			if (!WorkInProgressHelper.isCheckedOut(doc)) {
				doc = (DGTechDoc) PTCCommonHelper.service.checkOut(doc);
			}

			// 전달받은 파라미터 값 셋팅
			name = CommonUtil.checkNull((String) param.get("name"));
			description = CommonUtil.checkNull((String) param.get("description"));
			userName = CommonUtil.checkNull((String) param.get("userName"));
			userAge = CommonUtil.checkNull((String) param.get("userAge"));
			userSex = CommonUtil.checkNull((String) param.get("userSex"));
			userOrg = CommonUtil.checkNull((String) param.get("userOrg"));

			// 마스터객체 공통속성 변경 RevisionControlled는 최신버전 가져오는거
			WTDocumentMaster master = (WTDocumentMaster) ((_RevisionControlled) doc).getMaster();
			master = WTDocumentHelper.service.changeWTDocumentMasterIdentity(master, name, doc.getNumber(), null);

			doc.setDescription(description);
			doc.setUserName(userName);
			doc.setUserAge(userAge);
			WTDocumentTypeInfo info = new WTDocumentTypeInfo(); //속성추가한거 객체만들기
			//성별
			info.setPtc_str_1(userSex);
			//조직
			info.setPtc_str_2(userOrg);
			
			doc.setTypeInfoWTDocument(info); //속성추가한것에 setter가 없어서 한것
			System.out.println("doc.getName::::::::::" + doc.getName());

			// 문서저장
			doc = (DGTechDoc) PersistenceHelper.manager.save(doc);

			// 체크인
			doc = (DGTechDoc) PTCCommonHelper.service.checkIn(doc);

			// 커밋
			transaction.commit();

			// 트랜잭션 초기화
			transaction = null;

		} catch (Exception e) {
			throw new WTException(e);

		} finally {
			if (transaction != null) { // 실패시 트랜잭션이 안비어있기때문에 롤백하고 초기화 다시해주는거
				transaction.rollback();
				transaction = null;
			}
		}
		return doc;
	}

	@Override
	public void deleteTechDoc(Map<String, Object> param) throws Exception {
		DGTechDoc doc = null;
		String oid = CommonUtil.checkNull((String) param.get("oid"));
		WTUser currentUser = (WTUser) SessionHelper.manager.getPrincipal(); // 현재로그인한 사용자 가져오기
		Transaction transaction = new Transaction();
		try {
			transaction.start();
			doc = (DGTechDoc) CommonUtil.getPersistable(oid);

			if (WorkInProgressHelper.isCheckedOut(doc)) {
				PTCCommonHelper.service.checkIn(doc);
			}
			PersistenceHelper.manager.delete(doc);
			transaction.commit();

			// 트랜잭션 초기화
			transaction = null;
		} catch (Exception e) {
			throw new WTException(e);
		} finally {
			if (transaction != null) { // 실패시 트랜잭션이 안비어있기때문에 롤백하고 초기화 다시해주는거
				transaction.rollback();
				transaction = null;
			}
		}

	}
}
