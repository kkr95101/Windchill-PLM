package ext.dgt.user.dao;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Repository;

@Repository
public interface DGUserDao {
	public List<Map<String, Object>> getUsersMp();
}