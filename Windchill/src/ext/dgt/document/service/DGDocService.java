package ext.dgt.document.service;

import java.util.List;
import java.util.Map;

import ext.dgt.document.DGTechDoc;
import ext.dgt.document.broker.DGTechBroker;
import wt.method.RemoteInterface;

@RemoteInterface
public interface DGDocService {
	public List<DGTechBroker> getDocList() throws Exception;
	
	public DGTechDoc saveDoc(Map<String, Object> map)throws Exception;
	
	public List<DGTechBroker> getDGdoc(Map<String, Object> param) throws Exception;
	
	public DGTechBroker getDetail(Map<String, Object> param) throws Exception;
	
	public DGTechDoc updateDoc(Map<String, Object> param) throws Exception;
	
	public void deleteTechDoc(Map<String, Object> param) throws Exception;
}
