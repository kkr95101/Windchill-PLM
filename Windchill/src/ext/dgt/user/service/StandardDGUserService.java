package ext.dgt.user.service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ext.dgt.user.broker.DGUserBroker;
import ext.dgt.user.dao.DGUserDao;
import wt.fc.Persistable;
import wt.fc.PersistenceHelper;
import wt.fc.QueryResult;
import wt.org.WTUser;
import wt.query.QuerySpec;
import wt.query.SearchCondition;
import wt.session.SessionHelper;

@Service
public class StandardDGUserService implements DGUserService {
	@Autowired
	private DGUserDao dao;

	// 회원목록 - mapper
	@Override
	public List<Map<String, Object>> getUsersMp() {
		List<Map<String, Object>> userList = dao.getUsersMp();
		return userList;
	}

	// 회원목록 - QuerySpec
	@Override
	public List<Map<String, Object>> getUsersQs() throws Exception {
		// 유저 세션 활성화
		WTUser currentUser = (WTUser) SessionHelper.manager.getPrincipal();

		QuerySpec query = new QuerySpec();

		// 고급 쿼리 기능 활성화
		query.setAdvancedQueryEnabled(true);

		int index = query.addClassList(WTUser.class, true);

		QueryResult qr = PersistenceHelper.manager.find(query);
		System.out.println(query.toString());

		// 회원 목록
		List<Map<String, Object>> userList = new ArrayList<Map<String, Object>>();

		while (qr.hasMoreElements()) {
			Object[] obj = (Object[]) qr.nextElement();

			if (obj[0] instanceof WTUser) {
				WTUser tempUser = (WTUser) obj[0];
				Map<String, Object> user = new HashMap<>();
				user.put("idA2A2", tempUser.getPersistInfo().getObjectIdentifier().getId());
				user.put("name", tempUser.getFullName());
				user.put("email", tempUser.getEMail());

				userList.add(user);
			}
		}

		return userList;
	}

	// 회원상세 - QuerySpec
	@Override
	public Map<String, Object> viewUser(Map<String, Object> param) throws Exception {
		// 유저 세션 활성화
		WTUser currentUser = (WTUser) SessionHelper.manager.getPrincipal();

		QuerySpec query = new QuerySpec();
		
		// 고급 쿼리 기능 활성화
		query.setAdvancedQueryEnabled(true);

		int index = query.addClassList(WTUser.class, true);
		long idA2A2 = Long.valueOf(String.valueOf(param.get("idA2A2")));

		query.appendWhere(new SearchCondition(WTUser.class, "thePersistInfo.theObjectIdentifier.id",
				SearchCondition.EQUAL, idA2A2), new int[] { index });

		Map<String, Object> user = new HashMap<>();
		QueryResult qr = PersistenceHelper.manager.find(query);
		while (qr.hasMoreElements()) {
			Object[] obj = (Object[]) qr.nextElement();

			if (obj[0] instanceof WTUser) {
				WTUser tempUser = (WTUser) obj[0];
				user.put("name", tempUser.getFullName());
				user.put("email", tempUser.getEMail());
				user.put("org", tempUser.getOrganizationName());
			}
		}

		return user;
	}

	// 실습
	// queryspec 회원 리스트 (display name 추가)
	@Override
	public List<DGUserBroker> getUsersQss() throws Exception {
		WTUser currentUser = (WTUser) SessionHelper.manager.getPrincipal(); // 유저 세션 활성화
		QuerySpec query = new QuerySpec();
		query.setAdvancedQueryEnabled(true);
		query.addClassList(WTUser.class, true);
		System.out.println("toString :::::::::::::"+query.toString());
		QueryResult qr = PersistenceHelper.manager.find(query);
		List<DGUserBroker> userList = new ArrayList<DGUserBroker>();
		DGUserBroker user = null;
		while(qr.hasMoreElements()) {
			Object[] obj = (Object[]) qr.nextElement();
			if (obj[0] instanceof WTUser) {
				WTUser tempUser = (WTUser) obj[0];
				user = new DGUserBroker(tempUser);
				userList.add(user);
				System.out.println("userList.getFullName:::::::::::"+userList.get(0).getFullName());
			}	
		}
		return userList;
	}
	
	// queryspec 회원 상세
	@Override
	public DGUserBroker viewUser2(Map<String, Object> param) throws Exception {
		WTUser currentUser = (WTUser) SessionHelper.manager.getPrincipal(); // 유저 세션 활성화
		QuerySpec query = new QuerySpec();
		query.addClassList(WTUser.class, true);
		query.setAdvancedQueryEnabled(true);	
		System.out.println(query.toString());
		
		QueryResult qr = PersistenceHelper.manager.find(query);
		DGUserBroker user = null;
		while(qr.hasMoreElements()) {
			Object[] obj = (Object[]) qr.nextElement();
			if (obj[0] instanceof WTUser) {
				WTUser tempUser = (WTUser) obj[0];
				user = new DGUserBroker(tempUser);
			}	
		}
		return user;
	}

	@Override
	public String createUser() throws Exception {
//		String name = (String) param.get("id");
//		String fullName = (String) param.get("fullName");
//		String eMail = (String) param.get("eMail");
//		String org = (String) param.get("org");
		String userName ="gsm04380";
		WTUser user = WTUser.newWTUser("gsm04380");
		user.setAllowLDAPSynchronization(true);
//		user.setDomainRef(domainRef);
		user.setOrganizationName("DIGITEK");
		user.setAuthenticationName(userName);
		HashMap map = new HashMap();
		map.put("preferredLanguage", new String[] { "en_US" });
		map.put("fullName", new String[] { userName });
		map.put("last", new String[] { userName });
		map.put("email", new String[] { userName });
		map.put("organizationName", new String[] { "DIGITEK" });
		map.put("userPassword", new String[] { "1" });
		user.mapAttributes(map);
//		
//		DGUserBroker broker = new DGUserBroker(user);
		
		WTUser newUser = (WTUser) PersistenceHelper.manager.save(user);
		String idA2A2 = String.valueOf(Long.valueOf(newUser.getPersistInfo().getObjectIdentifier().getId()));
		System.out.println(idA2A2);
		return idA2A2;
	}
}