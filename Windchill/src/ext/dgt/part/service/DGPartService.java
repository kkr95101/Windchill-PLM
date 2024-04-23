package ext.dgt.part.service;

import java.util.List;
import java.util.Map;

import ext.dgt.part.broker.DGPartBroker;
import wt.method.RemoteInterface;
import wt.part.WTPart;

@RemoteInterface
public interface DGPartService {

	public List<DGPartBroker> dgPartList() throws Exception;
	
	public List<DGPartBroker> dgPartSearch(Map<String, Object> param) throws Exception;
	
	public WTPart dgPartSave(Map<String, Object> param) throws Exception;
	
	public WTPart dgPartUpdate(Map<String, Object> param) throws Exception;
	
	public DGPartBroker dgPartDetail(Map<String, Object> param) throws Exception;
	
	public void dgPartDelete(Map<String, Object> param) throws Exception;
}
