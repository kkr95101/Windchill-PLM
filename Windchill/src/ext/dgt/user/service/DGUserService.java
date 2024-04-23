package ext.dgt.user.service;

import java.util.List;
import java.util.Map;

import ext.dgt.user.broker.DGUserBroker;
import wt.method.RemoteInterface;

@RemoteInterface
public interface DGUserService {
	public List<Map<String, Object>> getUsersMp();
	
	// 회원목록 - QuerySpec
	public List<Map<String, Object>> getUsersQs() throws Exception;
	
	// 회원상세 - QuerySpec
	public Map<String, Object> viewUser(Map<String, Object> param) throws Exception;
	
	// 실습
	public List<DGUserBroker> getUsersQss() throws Exception;
	public DGUserBroker viewUser2(Map<String, Object> param) throws Exception;
	
	
	public String createUser() throws Exception;
	
	
	
}